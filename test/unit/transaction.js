var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Transaction', function() {

  describe('get transaction by id', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.transactionById('12345678', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/12345678');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('get transactions', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.transactions(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('get transaction stats', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.transactionsStats(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/stats');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('send transaction', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.send('1234', '812-111-1111', '10.00', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/send');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234', destinationId: '812-111-1111', amount: '10.00'});

        complete();
      });
    });
  });

  describe('schedule transaction', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.schedule('1234', '812-111-1111', '10.00', '2015-09-09', 'abcdef', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234', destinationId: '812-111-1111', amount: '10.00', scheduleDate: '2015-09-09', fundsSource: 'abcdef'});

        complete();
      });
    });
  });

  describe('get all scheduled transactions', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.scheduled(init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('get scheduled transaction by ID', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.scheduledById('1234', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled/1234');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({});

        complete();
      });
    });
  });

  describe('edit scheduled transaction by ID', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.editScheduled('abcd3434', '1234', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled/abcd3434');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234'});

        complete();
      });
    });
  });  


  describe('delete scheduled transaction by ID', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.deleteScheduledById('abcd3434', '1234', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled/abcd3434');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({ pin: '1234' });

        complete();
      });
    });
  });

  describe('delete all scheduled transactions', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.deleteAllScheduled('1234', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/scheduled');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.options.query.should.eql({pin: '1234'});

        complete();
      });
    });
  });

  describe('process a refund', function() {
    it('Should make the correct request', function(done) {

      dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.refund('1234', '12345678', '987654321', '10.00', init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/refund');
        lastRequest.options.accessToken.should.equal(init.fakeKeys.accessToken);
        lastRequest.data.should.eql({pin: '1234', transactionId: '12345678', fundsSource: '987654321', amount: '10.00'});

        complete();
      });
    });
  });

  describe('transactions by app', function() {
    it('Should make the correct request', function(done) {
      dwolla.transactionsByApp({limit: 10}, init.assertGoodResponse(done));

      init.lastRequest((lastRequest, complete) => {
        lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/');
        lastRequest.options.query.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, limit: 10});
      
        complete();
      });
    });
  });
});