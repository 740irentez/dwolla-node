module.exports = function(exports) {
    // ************************
    // Offsite Gateway Methods
    // ************************
    var vars = exports.vars;

    /**
     * Create an Off-Site Gateway Checkout.
     *
     * @param {string} URL to send the user to after the checkout is completed or cancelled
     * @param {object} purchaseOrder object.
     * @param {object} optional params
     * @param {function} callback, which takes (error, checkoutURL)
     *
     * Calls callback with an object containing the checkout's checkoutId and checkoutURL.
     *
     * Read the spec: http://developers.dwolla.com/dev/docs/spec/#create-a-checkout
     *
     * Read about the flow: https://developers.dwolla.com/dev/pages/gateway
     */
    exports.createCheckout = function(redirect, purchaseOrder, params, fn) {
      // Verify required parameters
      if (!redirect) { throw new Error('Missing arg redirect'); }
      if (!purchaseOrder) { throw new Error('Missing arg purchaseOrder'); }
      if (!purchaseOrder.destinationId) { throw new Error('purchaseOrder is missing desintationId'); }
      if (!purchaseOrder.total) { throw new Error('purchaseOrder is missing total'); }

      var data = Object.assign({ redirect, purchaseOrder }, params || {});
      var path = '/offsitegateway/checkouts';
      var callback = function(err, data) {
        if (err) fn(err);
        else {
          var checkout = {
            checkoutURL: `https://${exports.host()}/payment/checkout/${data.CheckoutId}`,
            checkoutId: data.CheckoutId
          };
          fn(null, checkout);
        } 
      };
      // Send off the request
      exports._post({ path, data, fn: callback, requireToken: false});
    };

    /**
     * Retrieve an existing checkout to get its status, etc.
     *
     * http://developers.dwolla.com/dev/docs/spec/#retrieve-a-checkout
     *
     * @param {String}     checkoutId
     * @param {Function}   fn
     **/

    exports.getCheckout = function(checkoutId, fn) {
      if (!checkoutId) { throw new Error('Missing arg checkoutId'); }

      var path = `/offsitegateway/checkouts/${checkoutId}`;

      exports._request({ path, fn, requireToken: false });
    };

    /**
     * Complete a PayLater checkout
     *
     * http://developers.dwolla.com/dev/docs/spec/#complete-a-paylater-checkout
     *
     * @param {String}     checkoutId
     * @param {Function}   fn
     **/

    exports.completeCheckout = function(checkoutId, fn) {
      if (!checkoutId) { throw new Error('Missing arg checkoutId'); }

      var path = `/offsitegateway/checkouts/${checkoutId}/complete`

      exports._post({ path, fn, requireToken: false});
    };

    /**
     * Verify a signature that came back
     * with an offsite gateway redirect
     *
     * @param {string} Proposed signature; (required)
     * @param {string} Dwolla's checkout ID; (required)
     * @param {string} Dwolla's reported total amount; (required)
     *
     * @return {boolean} Whether or not the signature is valid
     */
    exports.verifyGatewaySignature = function(signature, checkout_id, amount) {
        // Verify required paramteres
        if (!signature) { throw new Error('Missing arg signature'); }
        if (!amount) { throw new Error('Missing arg checkout_id'); }
        if (!checkout_id) { throw new Error('Missing arg amount'); }

        // Require crypto lib
        var crypto = require('crypto');

        // Normalize parameters
        amount = parseFloat(amount).toFixed(2);

        // Calculate an HMAC-SHA1 hexadecimal hash
        // of the checkoutId and amount ampersand separated
        // using the consumer secret of the application
        // as the hash key.
        //
        // @doc: http://developers.dwolla.com/dev/docs/gateway
        hash = crypto.createHmac('sha1', vars._client_secret).update(`${checkout_id}&${amount}`).digest('hex');

        return hash == signature;
    };
};