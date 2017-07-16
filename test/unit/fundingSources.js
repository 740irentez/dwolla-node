var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Funding', function() {
  describe('get funding source by id', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.fundingSourceById('9999999', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/9999999');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      })
    });
  });

  describe('get funding sources', function() {
    it('Should make the correct request', function(done) {
    
      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.fundingSources(init.assertGoodResponse(done));
      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      })
    });
  });

  describe('add a funding source', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.addFundingSource('12345678', '87654321', 'Checking', 'My Bank', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({account_number: '12345678', routing_number: '87654321', account_type: 'Checking', name: 'My Bank'});

        complete();
      })
    });
  });

  describe('verify a funding source', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.verifyFundingSource('0.02', '0.05', '12345678', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/12345678/verify');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({deposit1: '0.02', deposit2: '0.05'});

        complete();
      })
    });
  });

  describe('withdraw from account balance to funding source', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.withdrawToFundingSource('1234', '5.00', '12345678', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/12345678/withdraw');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234', amount: '5.00'});

        complete();
      })
    });
  });

  describe('deposit from funding source to account balance', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.depositFromFundingSource('1234', '5.00', '12345678', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/12345678/deposit');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234', amount: '5.00'});

        complete();
      })
    });
  });
});