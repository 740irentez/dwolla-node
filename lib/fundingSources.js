module.exports = function(exports) {
    // ************************
    // Funding Sources Methods
    // ************************

    /**
     * Retrieves verified funding source by identifier for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/details
     *
     * @param {String}     fundingId
     * @param {Function}   fn
     **/
    exports.fundingSourceById = function(id, fn) {    
      var path = `/fundingsources/${id}`;
      exports._request({ path, fn });
    };
    
    /**
     * Retrieves a list of verified funding sources for the user
     * associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/list
     *
     * @param {Function}   fn
     **/
    exports.fundingSources = function(fn) {
      exports._request({ path: '/fundingsources/', fn });
    };

    /**
     * Use this method to add a new funding source for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/add
     *
     * @param {String} account_number
     * @param {String} routing_number
     * @param {String} account_type
     * @param {String} name
     * @param {Function} fn
     */

    exports.addFundingSource = function(account_number, routing_number, account_type, name, fn) {
        if (!account_number) { throw new Error('Missing arg account_number'); }
        if (!routing_number) { throw new Error('Missing arg routing_number'); }
        if (!account_type) { throw new Error('Missing arg account_type'); }
        if (!name) { throw new Error('Missing arg name'); }

        var path = '/fundingsources/';
        var data = { account_number, routing_number, account_type, name};
        exports._post({ path, data, fn});
    };

    /**
     * Use this method to verify a new funding source for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/verify
     *
     * @param {String} deposit1
     * @param {String} deposit2
     * @param {String} fundingId
     * @param {Function} fn
     */

    exports.verifyFundingSource = function(deposit1, deposit2, fundingId, fn) {
        if (!deposit1) { throw new Error('Missing arg deposit1'); }
        if (!deposit2) { throw new Error('Missing arg deposit2'); }
        if (!fundingId) { throw new Error('Missing arg fundingId'); }

        var path = `/fundingsources/${fundingId}/verify`;
        var data = { deposit1, deposit2 };

        exports._post({path, data, fn});
    };

    /**
     * Use this method to withdraw funds from a Dwolla account, and into a bank account, for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/withdraw
     *
     * @param {Number} pin
     * @param {String} amount
     * @param {String} fundingId
     * @param {Function} fn
     */

    exports.withdrawToFundingSource = function(pin, amount, fundingId, fn) {
        if (!pin) { throw new Error('Missing arg pin'); }
        if (!amount) { throw new Error('Missing arg amount'); }
        if (!fundingId) { throw new Error('Missing arg fundingId'); }

        var path = `/fundingsources/${fundingId}/withdraw`;
        var data = { pin, amount };

        exports._post({ path, data, fn});
    };

    /**
     * Use this method to deposit funds from a bank account, and into a Dwolla account balance for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/withdraw
     *
     * @param {Number} pin
     * @param {String} amount
     * @param {String} fundingId
     * @param {Function} fn
     */

    exports.depositFromFundingSource = function(pin, amount, fundingId, fn) {
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!amount) { throw new Error('Missing arg amount'); }
      if (!fundingId) { throw new Error('Missing arg fundingId'); }

      var path = `/fundingsources/${fundingId}/deposit`;
      var data = { pin, amount };

      exports._post({ path, data, fn});
    };
};