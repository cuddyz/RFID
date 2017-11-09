var configValues = require('./config');

module.exports = {
    getDB: function() {
        return "mongodb://" + configValues.user +
            ":" + configValues.pass + "@ds155315.mlab.com:55315/stlsc-rfid";
    }
};