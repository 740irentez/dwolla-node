var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);

describe('Account', function() {
  describe('get balance', function() {
    it('Should make the correct request', function(done) {
      
      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.balance(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/balance/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});
        complete();
      });
    });
  });

  describe('get basicAccountInfo', function() {
    it('Should make the correct request', function(done) {
      var FAKE_EMAIL = 'some@email.com';
      dwolla.basicAccountInfo(FAKE_EMAIL, init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/users/' + FAKE_EMAIL);
        should.not.exist(lastRequest.options.accessToken);
        lastRequest.options.query.should.eql({
          client_id: init.fakeKeys.appKey,
          client_secret: init.fakeKeys.appSecret
        });
        complete()
      });
    });
  });

  describe('toggle auto withdrawal', function() {
    it('Should make the correct request', function(done) {
      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.toggleAutoWithdraw(true, '1234567', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/accounts/features/auto_withdrawl');
        lastRequest.data.should.eql({enabled: true, fundingId: '1234567'});
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        complete();
      });
    });
  });

  describe('get auto withdrawal status', function() {
    it('Should make the correct request', function(done) {
      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.getAutoWithdrawalStatus(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/accounts/features/auto_withdrawl');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});
        complete();
      });
    });
  });

  describe('full account info', function() {
    it('Should make the correct request', function(done) {
      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.fullAccountInfo(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/users/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});
        complete();
      });
    });
  });

  describe('get nearby users', function() {
    it('Should make the correct request', function(done) {
      dwolla.nearbyUsers('45', '45', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/users/nearby/');
        should.not.exist(lastRequest.options.accessToken);
        lastRequest.options.query.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, latitude: '45', longitude: '45'});
        complete();
      });
    });
  });


});
