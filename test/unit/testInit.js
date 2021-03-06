var mockery = require('mockery');
var events = require('events');
var should = require('should');

var FAKE_CREDENTIALS = {
  appKey: 'fakekey',
  appSecret: 'fakesecret',
  accessToken: 'faketoken'
};

/* 
 * Mock the Restler module so we can see requests
 * and provide fake responses.
 *
 * restler always returns a RestRequest object which is essentially an 
 * event emitter.  So, we return an event emitter and then store it in 
 * mockEmitter so that our tests can emit from it like so:
 *
 * restlerMock.mockEmitter.emit('complete', 'RESPONSE HERE')
 *
 * We can access the last request made:
 * 
 * restlerMock.lastRequest.url
 * restlerMock.lastRequest.options   // any querystrings or JSON request body
 */

var restlerMock = {
	mockEmitter: null,
	lastRequest: null,
  get: function(url, options) {
    this.lastRequest = { url, options };

    // store and return fake RestRequest object:
    this.mockEmitter = new events.EventEmitter();
    return this.mockEmitter;
  },
  postJson: function(url, data, options) {
  	this.lastRequest = { url, data, options };
    this.mockEmitter = new events.EventEmitter();
    return this.mockEmitter;
  },
  putJson: function(url, data, options) {
    this.lastRequest = { url, data, options };
    this.mockEmitter = new events.EventEmitter();
    return this.mockEmitter;
  },
  del: function(url, options) {
    this.lastRequest = { url, options };

    // store and return fake RestRequest object:
    this.mockEmitter = new events.EventEmitter();
    return this.mockEmitter;
  }
};
var someResponse = { test: 'value' };
var complete = (response) => {
  restlerMock.mockEmitter.emit('complete', { Success: true, Message: "Success", Response: response || someResponse });
}

mockery.registerMock('restler', restlerMock);
mockery.enable({
  warnOnUnregistered: false
});

// Return restlerMock so in tests we can inspect lastRequest and 
// provide fake response:

module.exports = {
	restlerMock: restlerMock,
  fakeKeys: FAKE_CREDENTIALS,
  someResponse: someResponse,
  lastRequest: function(cb) {
    cb(restlerMock.lastRequest, complete);
  },
  assertGoodResponse: (done) => {
    return (err, response) => {
      should.not.exist(err);
      response.should.eql(someResponse)
      done();
    };
  }
};