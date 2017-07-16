var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Requests', function() {
  describe('make money request', function () {
    it('Should make the correct request', function (done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.request('812-111-1111', '5.00', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({sourceId: '812-111-1111', amount: '5.00'});

        complete();
      });
    });
  });

  describe('list pending requests', function () {
    it('Should make the correct request', function (done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.requests(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('get request details by id', function () {
    it('Should make the correct request', function (done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.requestById('12345678', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/12345678');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('cancel a request', function () {
    it('Should make the correct request', function (done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.cancelRequest('12345678', (err, response) => {
        should.not.exist(err);
        response.should.equal(true);
        done();
      });

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/12345678/cancel');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({});

        complete();
      });
    });
  });

  describe('fulfill a request', function () {
    it('Should make the correct request', function (done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.fulfillRequest('1234', '12345678', '10.00', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/12345678/fulfill');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234', request_id: '12345678', amount: '10.00'});

        complete();
      });
    });
  });
});