var bodyParser = require('body-parser');
var Games = require('../models/gameModel');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/active-game', function(req, res) {
        Games.findOne({ "active": true}, function(err, data) {
           if (err) res.send("Error fetching active game");

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
            if (err) res.send("Error creating game");

            res.send('Success');
        })
    });

    app.put('/api/edit-game', function(req, res) {
        Games.findByIdAndUpdate(req.body.id,
            {   name: req.body.name,
                locations: req.body.locations }, function(err) {
                if (err) res.send("Error updating game");
            });

        res.send('Success');
    });

    app.put('/api/deactivate-game', function(req, res) {
        Games.findByIdAndUpdate(req.body.id,
            {   active: false }, function(err) {
                if (err) res.send("Error deactivating game");
            });

        res.send('Success');
    });
};