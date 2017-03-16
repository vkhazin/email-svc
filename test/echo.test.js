const promise 		= require('bluebird');
const config 		= require('config');
const logger 		= require('../logger').create(config, null);
const echo			= require('../echo').create(config, logger)
const assert		= require('chai').assert;

describe('echo', function() {
    it('Get Echo', function(done) {
        echo.echo()
            .then(function(response){
                assert.isNotNull(response, 'Response should not be null!');
                // console.log(response);
            })
            .done(function(){
                done();
            });

    });
});
