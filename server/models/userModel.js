var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    alias: String,
    scannerId: String
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;