'use strict';
/*********************************************************************************
Dependencies
**********************************************************************************/
const promise       = require('bluebird');
const process       = require('process');
const ns2ms         = 1000000;
//require('config') fails on Azure Web Function
const config 		= require('./config/default.json');
const logger 		= require('./logger').create(config, null);
const echoModule    = require('./echo').create(config, logger);
const authC         = require('./authC').create(config, logger);
const postman       = require('./postman').create(config, logger);
/*********************************************************************************/

const parseInput = function (input) {
    var output = {};
    if (typeof input == 'string') {
        output = JSON.parse (input);
    } else {
        output = input || {};
    }
    return output;
};

const echo = () => {
    return echoModule.echo()
        .then(response => {
            const httpResponse = {
                status: 200,
                body: response
            };
            return promise.resolve(httpResponse);
        });
}

const sendEmail = (body) => {
    return postman.send(
        body.from,
        body.to,
        body.subject,
        body.body
    ).then(response => {
        const httpResponse = {
            status: 200,
            body: response
        };
        return promise.resolve(httpResponse);
    });
};

module.exports = function (context, req) {

    logger.trace(req);
    
    if (req.method.toLowerCase() == 'get' && req.headers['x-original-url'].toLowerCase() == '/api/email') {
        return promise.resolve(echo());
    } else if (req.method.toLowerCase() == 'post') {

        const xApiKey = (req.headers)? req.headers[config.authC.apiKeyHeader]: null;
        const handlerStart = process.hrtime();

        return authC.authenticate(xApiKey)
            .then(authCResult => {
                if (authCResult == true) {
                    return promise.resolve(sendEmail(req.body))
                        .then((httpResponse) => {
                            logger.info('Performance::handler::success::' + (process.hrtime(handlerStart)[1]) / ns2ms)
                            return promise.resolve(httpResponse);
                        })
                        //Unknown error
                        .catch(err => {
                            logger.info('Performance::handler::failure::' + (process.hrtime(handlerStart)[1]) / ns2ms)
                            logger.error(err);
                            err = {
                                status: 500,
                                body: {
                                    message: 'Unknown error has occurred'
                                }
                            };
                            logger.error(err)
                            return promise.reject(err)
                        });
                } else {
                    let response = {
                        status: 401,
                        body: {
                            message: "Invalid or missing x-api-key"
                        }
                    };
                    return promise.resolve(response);
                }               
            })
    } else {
        let response = {
            status: 400,
            message: 'Bad Request'
        };
        return promise.resolve(response)
    }
};