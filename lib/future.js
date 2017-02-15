'use strict';

module.exports = {
	EventTimer : function (time, callback, args){
        try {
            console.log(`Event Timer is Started : Duration is ${time}`);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    return resolve(callback(args))
                }, time);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }

    }
    ,
    DayInterval : function ( callback, args){
        try {
            console.log(`Day Interval event is Started`);
            return new Promise((resolve, reject) => {
                setInterval(() => {
                    return resolve(callback(args))
                }, 864000);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }

    }


};

