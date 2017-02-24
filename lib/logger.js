let fs = require('fs');

class Logger {

     constructor () {
         this.name = 'logger';
         this.date = new Date();
         this.logFile = 'log',
        this.writer = fs.createWriteStream(this.logFile, { flags:'a+' });
     }

    log (data) {
         this.writer.write('\nLog => ' + ' time : ' + this.date + ' : ' + data);
     }

    info(data) {
        this.writer.write('\nInfo => ' + ' time : ' + this.date + ' : ' + data);
    }

    warning (data) {
        this.writer.write('\nWarning  => ' + ' time : ' + this.date + ' : ' + data);
    }

    error (data) {
        this.writer.write('\nError => ' + ' time : ' + this.date + ' : ' + data);
    }
 }

module.exports = Logger;
