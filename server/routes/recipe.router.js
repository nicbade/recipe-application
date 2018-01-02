var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

// NEW RECIPE POST
router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('logged in ', req.user);

        var newRecipe = req.body;
        console.log('addRecipe post was hit: ', newRecipe);
        pool.connect(function (err, client, done) {
            if (err) {
                // db connection failed
                console.log('Error connecting to db ', err);
                res.sendStatus(500);
            } else {
                // HAPPY PATH
                client.query('INSERT INTO recipes (name, type, servings) VALUES ($1, $2, $3) RETURNING id;', [newRecipe.name, newRecipe.type, newRecipe.servings],
                    function (errMakingQuery, result) {
                        done();
                        if (errMakingQuery) {
                            console.log('Error making db query ', errMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.send(result);
                        }
                    });
            }
        }); // END POOL.CONNECT
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
}); // END RECIPE POST

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('logged in ', req.user);

        pool.connect(function (err, client, done) {
            if (err) {
                // db connection failed
                console.log('Error connecting to db ', err);
                res.sendStatus(500);
                done();
                return;
            } else {
                client.query('SELECT * FROM recipes ORDER BY id DESC LIMIT 1;', function (errMakingQuery, result) {
                    done();
                    if (errMakingQuery) {
                        console.log('Error making db query ', errMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                }); // end query
            }
        }); // END POOL.CONNECT
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
}); // END RECIPE GET

module.exports = router;