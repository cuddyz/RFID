var bodyParser = require('body-parser');
var Games = require('../models/gameModel');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/active-game', function(req, res) {
        Games.findOne({ "active": true}, function(err, data) {
           if (err) res.send("Error fetching games");

           res.send(data);
        });
    });

    app.post('/api/create-game', function(req, res) {
        var newGame = Games({
            name: req.body.name,
            active: true,
            locations: req.body.locations
        });
        newGame.save(function(err) {
            if (err) throw err;

            res.send('Success');
        })
    });



};