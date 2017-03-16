'use strict';
/*********************************************************************************
Dependencies
**********************************************************************************/
const promise 				= require('bluebird');
const emailjs               = require('emailjs/email');

exports.create =  function (cnf, lgr) {

	var config 	= cnf;
	var logger 	= lgr;

    const connect = () => {
        let smtp = promise.promisifyAll(emailjs.server.connect({
            host: config.smtp.host,
            port: config.smtp.port,
            ssl: config.smtp.ssl,
            user: config.smtp.username,
            password: config.smtp.password
        }));      
        return promise.resolve(smtp);
    };

	return (function () {
	    return {
	        send: function (from, to, subject, body) {
                return connect()
                    .then(smtp=> {
                        const message = {
                            from: from, // sender address
                            to: to, // list of receivers comma separated
                            subject: subject, // Subject line
                            attachment: [{
                                data: body, 
                                alternative: true                                
                            }]
                        };
                        return smtp.sendAsync(message);
                    })
                    .then(smtpResponse => {
                        return promise.resolve({
                            messageId: smtpResponse.header['message-id']
                        })
                    })
                    .catch(err => {
                        logger.error(err);
                        return promise.reject(err);
                    });
	        }
	    };
	}());
};
