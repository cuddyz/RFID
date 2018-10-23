var configValues = require('./config');

module.exports = {
    getDB: function() {
        return "mongodb://" + configValues.user +
            ":" + configValues.pass + "MLAB_DB_GOES_HERE";
    }
};