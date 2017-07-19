module.exports = function(exports) {
    // ************************
    // Contacts Methods
    // ************************

    /**
     * Retrieves contacts for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/contacts/user
     *
     * Optional params:
     *
     *   - search
     *   - types
     *   - limit
     *
     * @param {Object}     params
     * @param {Function}   fn
     * */
    exports.contacts = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
    
      var path = '/contacts/';
      var query = params || {};
      exports._request({ path, query, fn });
    };
    
    /**
     * Retrieves nearby Dwolla spots within the range of the provided latitude and longitude.
     * Half of the limit are returned as spots with closest proximity. The other half of the spots
     * are returned as random spots within the range.
     * https://www.dwolla.com/developers/endpoints/contacts/nearby
     *
     * Optional params:
     *
     *   - range
     *   - limit
     *
     * @param {String}   lat
     * @param {String}   lon
     * @param {Object}   params
     * @param {Function} fn
     **/
    exports.nearby = function(lat, lon, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (!lat) { throw new Error('Missing arg lat'); }
      if (!lon) { throw new Error('Missing arg lon'); }
    
      var path = '/contacts/nearby';
      var query = Object.assign({ latitude: lat, longitude: lon }, params || {});
    
      exports._request({ path, query, fn, requireToken: false });
    };
}