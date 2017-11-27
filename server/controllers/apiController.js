var bodyParser = require('body-parser');
var Games = require('../models/gameModel');
var Scans = require('../models/scanModel');
var Users = require('../models/userModel');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    //GAME ENDPOINTS
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


    //SCANNER ENDPOINTS
    app.post('/api/scan', function(req, res) {
        Scans.findOne({ "scanId": req.body.scanId, "location": req.body.location, "gameId": req.body.gameId}, function(err, data) {
            if (err) res.send("Error checking existing scans");
            if (data && data !== null) {
                res.statusCode = 400;
                res.send("Already scanned at this location");
            } else {

                var newScan = Scans({
                    gameId: req.body.gameId,
                    scanId: req.body.scanId,
                    location: req.body.location,
                    scanner: req.body.scanner
                });
                newScan.save(function (err) {
                    if (err) res.send("Error submitting scan");

                    res.send('Success');
                })
            }
        });
    });


    //USER ENDPOINTS
    app.post('/api/user', function(req, res) {
        Users.findOne({ "scanId": req.body.scanId, "gameId": req.body.gameId}, function(err, data) {
            if (err) res.send("Error checking existing scans");
            if (data && data !== null) {
                res.statusCode = 400;
                res.send("User already exists on this RFID Card");
            } else {

                var newUser = Users({
                    alias: req.body.alias,
                    scanId: req.body.scanId,
                    gameId: req.body.gameId
                });
                newUser.save(function (err) {
                    if (err) res.send("Error creating user");

                    res.send('Success');
                })
            }
        });
    });


    //RESULT ENDPOINTS
    app.get('/api/results/game', function(req, res) {
        Scans.find({ "gameId": req.body.gameId}, function(err, data) {
            if (err) res.send("Error fetching active game's results");

            res.send(data);
        });
    });
};