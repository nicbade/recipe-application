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
                client.query('SELECT * FROM recipes ORDER BY id DESC;', function (errMakingQuery, result) {
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

// RECIPE DELETE ROUTE
router.delete('/:id', function (req, res) {
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);

        var recipeId = req.params.id;
        console.log('review delete was hit!', recipeId);
        // pool.connect(function (errorConnectingToDatabase, client, done) {
        //     if (errorConnectingToDatabase) {
        //         // when connecting to database failed
        //         console.log('Error connecting to database', errorConnectingToDatabase);
        //         res.sendStatus(500);
        //     } else {
        //         client.query('DELETE FROM instruction WHERE recipe_id=$1;', [recipeId],
        //             function (errorMakingQuery, result) {
        //                 done();
        //             });
        //         // when connecting to database worked!
        //     }
        // });

    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        res.sendStatus(403);
    }
}); // end router.delete


// NEW INGREDIENT POST
router.post('/ingredient/:id', function (req, res) {
    var newIngredient = req.body;
    var recipeParams = req.params.id;
    console.log('recipeParams: ', recipeParams);
    if (req.isAuthenticated()) {
        console.log('logged in ', req.user);
        console.log('addIngredient post was hit: ', newIngredient);
        pool.connect(function (err, client, done) {
            if (err) {
                // db connection failed
                console.log('Error connecting to db ', err);
                res.sendStatus(500);
            } else {
                // HAPPY PATH
                client.query('INSERT INTO ingredients (ingredient, quantity, measure, recipe_id) VALUES ($1, $2, $3, $4) RETURNING id;', [newIngredient.ingredient, newIngredient.quantity, newIngredient.measure, recipeParams],
                    function (errMakingQuery, result) {
                        done();
                        if (errMakingQuery) {
                            console.log('Error making db query ', errMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.send(result);
                            // console.log('result: ', result);
                        }
                    });
            }
        }); // END POOL.CONNECT
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
}); // END INGREDIENT POST

// INGREDIENT GET ROUTE
router.get('/ingredient', function (req, res) {
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
                client.query('SELECT * FROM ingredients JOIN recipes ON recipes.id = ingredients.recipe_id WHERE recipes.id = ingredients.recipe_id;', function (errMakingQuery, result) {
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
}); // END INGREDIENT GET

// INGREDIENT POST REQUEST
router.post('/instruction/:id', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('logged in ', req.user);

        var newInstruction = req.body;
        var instructionParams = req.params.id;
        // console.log('addRecipe post was hit: ', newInstruction, instructionParams);
        pool.connect(function (err, client, done) {
            if (err) {
                // db connection failed
                console.log('Error connecting to db ', err);
                res.sendStatus(500);
            } else {
                // HAPPY PATH
                client.query('INSERT INTO instruction (recipe_instruction, recipe_id) VALUES ($1, $2) RETURNING id;', [newInstruction.instruction, instructionParams],
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
}); // END INGREDIENT POST

// INSTRUCTION GET ROUTE
router.get('/instruction', function (req, res) {
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
                client.query('SELECT * FROM instruction JOIN recipes ON recipes.id = instruction.recipe_id  WHERE recipes.id = instruction.recipe_id ORDER BY created_at;', function (errMakingQuery, result) {
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
}); // END INGREDIENT GET

module.exports = router;