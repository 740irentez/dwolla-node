var should = require('should');
var config = require('./config.js');

var dwolla = require('../../lib/dwolla')(config.appKey, config.appSecret);

dwolla.sandbox = true;

describe('Account', function() {
	describe('get balance', function() {
		it('Should be successful and return a valid response', function(done) {
			dwolla.setToken(config.accessToken);

			dwolla.balance(function(err, balance) {
				// sample balance: 28041.6
				balance.should.be.a.Number;
				done();
			});

    });
	});

	describe('get basicAccountInfo', function() {
		it('Should be successful and return a valid response', function(done) {
			dwolla.basicAccountInfo('gordon@dwolla.com', function(err, info) {
				// sample accountInfo:
				// { Id: '812-742-3301',
			 	//  Name: 'Gordon Zheng',
			 	//  Latitude: 0,
			 	//  Longitude: 0 }

			 	info.should.have.properties('Id', 'Name', 'Latitude', 'Longitude');
			 	info.Id.should.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
			 	info.Name.should.be.a.String;
			 	info.Latitude.should.be.a.Number;
			 	info.Longitude.should.be.a.Number;

				done();
			});
		});
	});

	describe('full account info', function() {
		it('Should be successful and return a valid response', function(done) {
		  dwolla.setToken(config.accessToken);
      dwolla.fullAccountInfo(function(err, response) {
      	// sample:
     		// { City: 'Test',
			  // State: 'NY',
			  // Type: 'Commercial',
			  // Id: '812-742-8722',
			  // Name: 'Cafe Kubal',
			  // Latitude: -1,
			  // Longitude: -1 }

			  response.should.have.properties('City', 'State', 'Type', 'Id', 'Name', 'Latitude', 'Longitude');
			  response.City.should.be.a.String;
			  response.State.should.be.a.String;
			  response.Type.should.be.a.String;
			  response.Id.should.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
			  response.Name.should.be.a.String;
			 	response.Latitude.should.be.a.Number;
			 	response.Longitude.should.be.a.Number;

      	done();
      });
    });
	});

	describe('toggle auto withdrawal', function() {
		it('Should be successful and return a valid response', function(done) {
		  dwolla.setToken(config.accessToken);
      dwolla.toggleAutoWithdraw(true, config.fundingSource, function(err, response) {
      	response.should.equal('Enabled');
      	done();
      });
	  });
	});

	describe('get auto withdrawal status', function() {
		it('Should be successful and return a valid response', function(done) {
		  dwolla.setToken(config.accessToken);
      dwolla.getAutoWithdrawalStatus(function(err, response) {
      	// sample: { Enabled: false, FundingId: '' }

      	response.Enabled.should.be.Boolean;
      	response.FundingId.should.equal(config.fundingSource);
      	done();
      });
    });
	});

});
