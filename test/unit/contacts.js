var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Contacts', function() {
  describe('get contacts', function() {
    it('Should make the correct request', function(done) {
      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.contacts(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/contacts/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});
        complete();
      });
    });
  });

  describe('get nearby', function() {
      it('Should make the correct request', function(done) {
      dwolla.nearby('35', '25', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/contacts/nearby');
        should.not.exist(lastRequest.options.accessToken);
        lastRequest.options.query.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, latitude: '35', longitude: '25'});
        complete();
      });
    });
  });
});