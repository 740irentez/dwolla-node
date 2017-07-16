module.exports = function(exports) {
    // ************************
    // Transaction Methods
    // ************************
    var vars = exports.vars;

    /**
     * Retrieves a transaction by ID for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/details
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.transactionById = function(id, fn) {
      if (!id) { throw new Error('Missing arg id'); }
      var path = `/transactions/${id}`
      exports._request({ path, fn });
    };

    /**
     * Retrieves transactions for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/list
     *
     * Optional params:
     *
     *   - sinceDate
     *   - types
     *   - limit
     *   - skip
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactions = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      var path = '/transactions/';
      var query = params || {};
      exports._request({ path, query, fn });
    };

    /**
     * Retrieves all transactions which have been facilitated by the
     * requesting application.
     *
     * https://www.dwolla.com/developers/endpoints/transactions/list
     *
     * Optional params:
     *
     *   - sinceDate
     *   - types
     *   - limit
     *   - skip
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactionsByApp = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      var path = '/transactions/';
      var query = params || {};
      exports._request({ path, query, fn, requireToken: false });
    };

    /**
     * Retrieves transactions stats for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/stats
     *
     * Optional params:
     *
     *   - types
     *   - startDate
     *   - endDate
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactionsStats = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      var path = '/transactions/stats';
      var query = params || {};
      exports._request({ path, query, fn });
    };


    /**
     * Send funds to a destination user for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/send
     *
     * Optional params:
     *
     *   - destinationType
     *   - facilitatorAmount
     *   - assumeCosts
     *   - notes
     *
     * @param {Number}   pin
     * @param {String}   destinationId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.send = function(pin, destinationId, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!destinationId) { throw new Error('Missing arg destinationId'); }
      if (!amount) { throw new Error('Missing arg amount'); }

      var path = '/transactions/send';
      var data = Object.assign({ pin, destinationId, amount}, params || {});

      exports._post({ path, data, fn });
    };

    /**
     * Use this method to (completely or partially) refund a payment that the user received. Only Commercial, Non-Profit, 
     * and Government type accounts may issue refunds. Refunds do not incur a transfer fee.
     * https://developers.dwolla.com/dev/docs/transactions/refund
     *
     * Optional params:
     *   - notes
     *
     * @param {Number}   pin
     * @param {String}   transactionId
     * @param {String}   fundsSource
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.refund = function(pin, transactionId, fundsSource, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!transactionId) { throw new Error('Missing arg transactionId'); }
      if (!fundsSource) { throw new Error('Missing arg fundsSource'); }
      if (!amount) { throw new Error('Missing arg amount'); }

      var path = '/transactions/refund';
      var data = Object.assign({ pin, transactionId, fundsSource, amount }, params || {});

      exports._post({ path, data, fn });
    };

   /**
     * Send funds to a destination user for the user associated with the authorized access token,
     * on a date in the future.
     * https://www.dwolla.com/developers/endpoints/transactions/send
     *
     * Optional params:
     *
     *   - destinationType
     *   - recurrence
     *   - assumeCosts
     *   - notes
     *
     * @param {Number}   pin
     * @param {String}   destinationId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.schedule = function(pin, destinationId, amount, scheduleDate, fundsSource, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }

      if (!pin) { throw new Error('Missing arg pin'); }
      if (!destinationId) { throw new Error('Missing arg destinationId'); }
      if (!amount) { throw new Error('Missing arg amount'); }
      if (!scheduleDate) { throw new Error('Missing arg scheduleDate'); }
      if (!fundsSource) { throw new Error('Missing arg fundsSource'); }

      var path = '/transactions/scheduled';
      var data = Object.assign({ pin, destinationId, amount, scheduleDate, fundsSource }, params || {});

      exports._post({ path, data, fn });
    };


    /**
     * Retrieves scheduled transactions for the user for the authorized access token.
     *
     * Optional params:
     *
     *   - status
     *   - limit
     *   - skip
     *
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.scheduled = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      var path = '/transactions/scheduled';
      var query = params || {};
      exports._request({ path, query, fn });
    };

   /**
     * Retrieves a scheduledtransaction by ID for the user for the authorized access token.
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.scheduledById = function(id, fn) {
      var path = `/transactions/scheduled/${id}`;
      exports._request({ path, fn });
    };

   /**
     * Edit a scheduled transaction by its ID. All parameters optional
     * other than the PIN.
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.editScheduled = function(id, pin, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!id) { throw new Error('Missing arg id'); }

      var path = `/transactions/scheduled/${id}`;
      var data = Object.assign({ pin }, params || {});
      exports._put({path, data, fn});
    };


    /**
     * Deletes a scheduled transaction by its ID
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.deleteScheduledById = function(id, pin, fn) {
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!id) { throw new Error('Missing arg id'); }

      var path = `/transactions/scheduled/${id}`;
      var query = { pin }
      exports._delete({ path, query, fn });
    };


    /**
     * Deletes a scheduled transaction by its ID
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.deleteAllScheduled = function(pin, fn) {
      if (!pin) { throw new Error('Missing arg pin'); }
      var path = '/transactions/scheduled';
      var query = { pin };
      exports._delete({ path, query, fn });
    };    

};