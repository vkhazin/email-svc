'use strict';
exports.create =  function (config, context) {

    const logLevel = (config.log && config.log.level)? config.log.level: 2; //Info

    const logger = (context && context.log)? context: console;

    return (function () {

        return {
            trace: function (msg) {
                if (logLevel >= 3) {
                    logger.log(msg);
                }
            },
            info: function (msg) {
                if (logLevel >= 2) {
                    logger.log(msg);
                }
            },
            log: function (msg) {
                if (logLevel >= 1) {
                    logger.log(msg);
                }
            },
            error: function (msg) {
                if (logLevel >= 0) {
                    logger.log(msg)
                }
            }
        };
    }());
};
