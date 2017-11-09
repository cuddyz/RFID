var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gameSchema = new Schema({
    name: String,
    active: Boolean,
    locations: [
        {
            number: Number,
            name: String,
            numScanners: Number,
            scanners: [
                {
                    number: Number,
                    text: String,
                    type: String
                }
            ]
        }
    ]
});

var Games = mongoose.model('Games', gameSchema);

module.exports = Games;