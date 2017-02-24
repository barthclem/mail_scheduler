'use strict';

let logger = require('logger');

module.exports = {
    EventTimer: function (time, callback, args) {
        try {
            logger.log(`Event Timer is Started : Duration is ${time}`);
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(callback(args)), time);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }

    },

    DayInterval: function (callback, args) {
        try {
            logger.log(`Day Interval event is Started`);
            return new Promise((resolve, reject) => {
                setInterval(() => resolve(callback(args)), 864000);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }

    }

};

