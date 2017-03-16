const promise 		= require('bluebird');
const config 		= require('config');
const logger 		= require('../logger').create(config, null);
const authC			= require('../authC').create(config, logger)
const assert		= require('chai').assert;

describe('authC', function() {
    it('Success', function(done) {
        authC.authenticate('6940A330-108D-4FB6-AD0F-C5B65C5D3236')
            .then(function(response){
                assert.equal(response, true, 'Response should be true!');
            })
            .done(function(){
                done();
            });

    });

    it('Failure', function(done) {
        authC.authenticate('bad-apple')
            .then(response => {
                assert.notEqual(response, false, 'Response should be false!')
            })
            .catch(function(response){
                assert.equal(response, false, 'Response should be false!');
            })
            .done(function(){
                done();
            });

    });    
});
