var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scanSchema = new Schema({
    gameId: String,
    scanId: String,
    location: Number,
    scanner: Number,
    scanTime: Date
});

var Scans = mongoose.model('Scans', scanSchema);

module.exports = Scans;