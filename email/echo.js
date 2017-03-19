'use strict';
const promise 				= require('bluebird');
const packageJson           = require('../package.json');

exports.create =  function (cnf, lgr) {
	return (function () {
	    return {
	        echo: function () {
                return promise.resolve({
                    name: packageJson.name,
                    version: packageJson.version,
                    description: packageJson.description,
					author: packageJson.author
                });
	        }
	    };
	}());
};
