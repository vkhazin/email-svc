//TODO: move apiKeys to external configuration storage
'use strict';
const promise 				= require('bluebird');
exports.create =  function (cnf, lgr) {

	var config 	= cnf;
	var logger 	= lgr;

	return (function () {
	    return {
	        authenticate: function (apiKey) {
logger.log(config);				
	        	const authC = (config.authC.apiKeys.indexOf(apiKey) >= 0)
                return promise.resolve(authC);
	        }
	    };
	}());
};
