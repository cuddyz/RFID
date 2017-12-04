var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gameSchema = new Schema({
    name: String,
    active: Boolean,
    created: Date,
    locations: [
        {
            number: Number,
            name: String,
            numScanners: Number,
            scanners: []
        }
    ]
});

var Games = mongoose.model('Games', gameSchema);

module.exports = Games;