const promise 		= require('bluebird');
const config 		= require('config');
const logger 		= require('../logger').create(config, null);
const postman		= require('../postman').create(config, logger)
const assert		= require('chai').assert;

describe('postman', function() {
    describe('#send()', function() {
        it('Success', function(done) {
            const result = postman.send(
                    from='vladimir.khazin@icssolutions.ca',
                    to='vladimir.khazin@icssolutions.ca',
                    subject='Contractor Vlad Khazin',
                    body='<b>Please advise the contractor that his services are no more required effective immediately!</b>'
                )
                .then(function(response){
                    assert.isNotNull(response.messageId, 'messageId should not be null!');
                    console.log(response);
                })
                .done(function(){
                    done();
                });

        });
    });
});
