module.exports = function(exports, API_PATH) {
    // ************************
    // Helper Methods
    // ************************
    var restler = require('restler');
    var vars = exports.vars;
    var host = () => exports.sandbox ? 'sandbox.dwolla.com' : 'www.dwolla.com';

    exports.host = host;

    var buildUrl = (path) => {
      var fullPath = exports.vars.API_PATH + path;
      return `https://${host()}${fullPath}`;
    }

    var validateFn = (fn) => {
      if (!fn || typeof fn !== 'function') { throw new Error('Missing callback'); }
      return fn;
    }

    var buildOptions = (requireToken) => {
      var options = {};
      if (requireToken) {
        if (!vars._token) { throw new Error('Missing arg token'); }
        options.accessToken = vars._token;
      }
      return options;
    }

    var buildData = (data, requireToken) => {
      data = data || {}
      if (!requireToken) {
        if (!vars._client_id) { throw new Error('Missing arg client_id'); }
        if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
        data.client_id = vars._client_id;
        data.client_secret = vars._client_secret;
      }
      return data;
    }

    var parseResponse = (data, fn) => {
      if (data.Success) {
        fn(null, data.Response);
      } else {
        fn(new Error(data.Message));
      }
    }

    var completeResponse = (fn) => {
      return (result, response) => {
        if (result instanceof Error) fn(result.message);
        else parseResponse(result, fn);
      }
    }

    exports.setToken = function(token) {
        vars._token = token;
        return true;
    };

    exports.getToken = function() {
        return vars._token;
    };

    exports._request = function(params) {
      params = Object.assign({ requireToken: true }, params);
      var fn = validateFn(params.fn);
      var options = buildOptions(params.requireToken);
      options.query = buildData(params.query, params.requireToken);
      var url = buildUrl(params.path);

      restler.get(url, options)
        .on('complete', completeResponse(fn));
    };

    exports._post = function(params) {
      params = Object.assign({ requireToken: true }, params);
      var fn = validateFn(params.fn);
      var options = buildOptions(params.requireToken);
      var data = buildData(params.data, params.requireToken);
      var url = buildUrl(params.path);

      restler.postJson(url, data, options)
        .on('complete', completeResponse(fn));
    };

    exports._put = function(params) {
      params = Object.assign({ requireToken: true }, params);
      var fn = validateFn(params.fn);
      var options = buildOptions(params.requireToken);
      var data = buildData(params.data, params.requireToken);
      var url = buildUrl(params.path);

      restler.putJson(url, data, options)
        .on('complete', completeResponse(fn));
    };

    exports._delete = function(params) {
      params = Object.assign({ requireToken: true }, params);
      var fn = validateFn(params.fn);
      var options = buildOptions(params.requireToken);
      options.query = buildData(params.query, params.requireToken);
      var url = buildUrl(params.path);

      restler.del(url, options)
        .on('complete', completeResponse(fn));
    };    

};
