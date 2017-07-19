module.exports = function(exports) {
    // ************************
    // Contacts Methods
    // ************************

    /**
     * Use this method to toggle and set the auto withdrawal feature for the user associated with the authorized access token.
     * https://developers.dwolla.com/dev/docs/accounts/autowithdraw
     *
     * @param {String}     enabled
     * @param {String}     fundingId
     * @param {Function}   fn
     **/

    exports.toggleAutoWithdraw = function(enabled, fundingId, fn){ 
      if (typeof enabled == 'undefined') { throw new Error('Missing arg enabled'); }
      if (!fundingId) { throw new Error('Missing arg fundingId'); }

      var data = { enabled, fundingId };
      var path = '/accounts/features/auto_withdrawl';
      exports._post({ path, data, fn });
     };


    /**
     * Use this method to find out if the auto withdrawal feature is enabled for the user associated with the authorized access token
     * https://developers.dwolla.com/dev/docs/accounts/autowithdrawstatus
     *
     * @param {Function}   fn
     **/

     exports.getAutoWithdrawalStatus = function(fn) {
       var path = '/accounts/features/auto_withdrawl';
        exports._request({ path, fn });
     };
    
    /**
     * Retrieves the basic account information for the Dwolla account associated with the account identifier.
     * https://developers.dwolla.com/dev/docs/accounts/autowithdrawstatus
     *
     * @param {String}     id
     * @param {Function}   fn
     **/
    exports.basicAccountInfo = function(id, fn) {
      if (!id) { throw new Error('Missing arg id'); }
    
      var path = `/users/${id}`;
      exports._request({path, requireToken: false, fn});
    };
    
    /**
     * Retrieves the account information for the user assoicated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/users/accountinformation
     *
     * @param {Function}   fn
     **/
    exports.fullAccountInfo = function(fn) {
      exports._request({ path: '/users/', fn });
    };
    
    /**
     * Retrieves the account balance for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/balance/account
     *
     * @param {Function}   fn
     * */
    exports.balance = function(fn) {
      exports._request({ path: '/balance/', fn });
    };

    /**
     * Use this method to retrieve nearby Dwolla users within the range of the provided latitude and longitude.
     * https://developers.dwolla.com/dev/docs/users/nearby
     *
     * @param {String}     lat
     * @param {String}     lon
     * @param {Function}   fn
     * */

    exports.nearbyUsers = function(lat, lon, fn) {
      if (!lat) { throw new Error('Missing arg lat'); }
      if (!lon) { throw new Error('Missing arg lon'); }
    
      var path = '/users/nearby/';
      var query = { latitude: lat, longitude: lon };
      exports._request({ path, query, fn, requireToken: false });
    };
};