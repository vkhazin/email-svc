const promise 		= require('bluebird');
const config 		= require('config');
const logger 		= require('../logger').create(config, null);
const index			= require('../index')
const assert		= require('chai').assert;

describe('index', function() {
    it('echo', function(done) {
        const context = {
            done: function(err, res) {
            }
        }
        return index(context, {
            method: 'GET',
            headers: {
                "cache-control": "no-cache",
                "connection": "Keep-Alive",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, sdch, br",
                "accept-language": "en-US, en; q=0.8",
                "host": "tsc-dev-email-svc.azurewebsites.net",
                "max-forwards": "10",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
                "x-app-key": "aaa",
                "postman-token": "2b30d2d0-ca9d-1b66-fd9c-26c94828fef6",
                "dnt": "1",
                "x-liveupgrade": "1",
                "x-original-url": "/api/email",
                "x-arr-log-id": "3c2b78d5-234e-4d5a-9a6e-e83cfd6c5e34",
                "disguised-host": "tsc-dev-email-svc.azurewebsites.net",
                "x-site-deployment-id": "tsc-dev-email-svc",
                "was-default-hostname": "tsc-dev-email-svc.azurewebsites.net",
                "x-forwarded-for": "162.208.80.4:22403",
                "x-arr-ssl": "2048|256|C=US, S=Washington, L=Redmond, O=Microsoft Corporation, OU=Microsoft IT, CN=Microsoft IT SSL SHA2|CN=*.azurewebsites.net"
                },
                "params": {}            
        })
        .then(function(response){
            assert.equal(response.status, 200, 'Response status should be equal 200!');
        })
        .done(function(){
            done();
        });

    });

    it('sendEmail success', function(done) {
        const context = {
            done: function(err, res) {
            }
        }
        return index(context, {
            method: 'POST',
            headers: {
                "cache-control": "no-cache",
                "connection": "Keep-Alive",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, sdch, br",
                "accept-language": "en-US, en; q=0.8",
                "host": "tsc-dev-email-svc.azurewebsites.net",
                "max-forwards": "10",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
                "x-app-key": "aaa",
                "postman-token": "2b30d2d0-ca9d-1b66-fd9c-26c94828fef6",
                "dnt": "1",
                "x-liveupgrade": "1",
                "x-original-url": "/api/email",
                "x-arr-log-id": "3c2b78d5-234e-4d5a-9a6e-e83cfd6c5e34",
                "disguised-host": "tsc-dev-email-svc.azurewebsites.net",
                "x-site-deployment-id": "tsc-dev-email-svc",
                "was-default-hostname": "tsc-dev-email-svc.azurewebsites.net",
                "x-forwarded-for": "162.208.80.4:22403",
                "x-arr-ssl": "2048|256|C=US, S=Washington, L=Redmond, O=Microsoft Corporation, OU=Microsoft IT, CN=Microsoft IT SSL SHA2|CN=*.azurewebsites.net",
                "x-api-key": "6940A330-108D-4FB6-AD0F-C5B65C5D3236"
            },
            "params": {},
            body: {
                from: 'vladimir.khazin@icssolutions.ca',
                to: 'vladimir.khazin@icssolutions.ca',
                subject: 'Contractor Vlad Khazin',
                body: '<b>Please advise the contractor that his services are no more required effective immediately!</b>'
            }  
        })
        .then(function(response){
            assert.equal(response.status, 200, 'Response status should be equal 200!');
        })
        .catch(err => {
            logger.error(err);
            assert.fail();
        })
        .done(function(){
            done();
        });
    });  

    it('fail sending email due authC error', function(done) {
        const context = {
            done: function(err, res) {
            }
        }
        return index(context, {
            method: 'POST',
            headers: {
                "cache-control": "no-cache",
                "connection": "Keep-Alive",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, sdch, br",
                "accept-language": "en-US, en; q=0.8",
                "host": "tsc-dev-email-svc.azurewebsites.net",
                "max-forwards": "10",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
                "x-app-key": "aaa",
                "postman-token": "2b30d2d0-ca9d-1b66-fd9c-26c94828fef6",
                "dnt": "1",
                "x-liveupgrade": "1",
                "x-original-url": "/api/email",
                "x-arr-log-id": "3c2b78d5-234e-4d5a-9a6e-e83cfd6c5e34",
                "disguised-host": "tsc-dev-email-svc.azurewebsites.net",
                "x-site-deployment-id": "tsc-dev-email-svc",
                "was-default-hostname": "tsc-dev-email-svc.azurewebsites.net",
                "x-forwarded-for": "162.208.80.4:22403",
                "x-arr-ssl": "2048|256|C=US, S=Washington, L=Redmond, O=Microsoft Corporation, OU=Microsoft IT, CN=Microsoft IT SSL SHA2|CN=*.azurewebsites.net",
            },
            "params": {},
            body: {
                from: 'vladimir.khazin@icssolutions.ca',
                to: 'vladimir.khazin@icssolutions.ca',
                subject: 'Contractor Vlad Khazin',
                body: '<b>Please advise the contractor that his services are no more required effective immediately!</b>'
            }  
        })
        .then((response) => {
            assert.equal(response.status, 401, 'Response status should be equal 401!');
        })
        .done(function(){
            done();
        });
    });  
});
