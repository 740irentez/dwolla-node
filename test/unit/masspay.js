var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('MassPay', function() {

  describe('create masspay job', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);

      /*
      This is not the correct items syntax for creating an MP job in production,
      however, all we are testing is if the request sends with the same correct
      initial data. We can use any dummy object in order to mock this and verify
      if there are any points of failure. 
      */
      dwolla.createMassPayJob('12345678', '1234', { item: 'test' }, {}, init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({fundsSource: '12345678', pin: '1234', items: { item: 'test' }});

        complete();
      });
    });
  });

  describe('get masspay job', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.getMassPayJob('12345678', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/12345678');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('get masspay job items', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.getMassPayJobItems('12345678', { limit: 10, skip: 5 }, init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/12345678/items');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({ limit: 10, skip: 5 });

        complete();
      });
    });
  });

  describe('get a masspay job item', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.getMassPayJobItem('12345678', '987654321', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/12345678/items/987654321');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('get all masspay jobs created by a user', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.getMassPayJobs(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

});