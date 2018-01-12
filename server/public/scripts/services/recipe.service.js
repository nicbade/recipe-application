myApp.service('RecipeService', ['$http', '$location', function ($http, $location) {
    // console.log('RecipeService Loaded');

    var self = this;
    self.recipe = {
        list: []
    };

    self.ingredient = {
        list: []
    };

    self.recipeIngredient = [];
    self.recipeDisplay = [];

    // RECIPE POST ROUTE
    self.addRecipe = function (newRecipe) {
        self.newRecipe = newRecipe;
        $http.post('/recipe', newRecipe).then(function (response) {
            // console.log('service post was returned: ', response.data);
            $location.path('recipeDisplay/' + response.data.rows[0].id);
            // PARAMS TO ADD TO DB UNDER INGREDIENT
            self.params = response.data.rows[0].id;
        });
    }; //END ADD RECIPE

    // INGREDIENT POST ROUTE
    self.addIngredient = function (newIngredient) {
        self.newIngredient = newIngredient;
        $http.post('/recipe/ingredient/' + self.params, newIngredient).then(function (response) {
            // console.log('service post was returned: ', response);
            self.getIngredient();
        });
    } // END INGREDIENT POST ROUTE

    // RECIPE GET ROUTE
    self.getRecipe = function () {
        $http.get('/recipe').then(function (response) {
            // console.log('get route: ', response.data);
            // console.log('self.params: ', self.params);
            self.recipe.list = response.data;
            for(i = 0; i < self.recipe.list.length; i++) {
                if(self.recipe.list[i].id === self.params) {
                    self.recipeDisplay.push(self.recipe.list[i]);
                }
            }
        });
    } // END GET RECIPE ROUTE

    // self.recipeDetail = function () {
    //     for(i = 0; i < self.recipe.list.length; i++) {
    //         if(self.recipe.list[i].id === self.params) {
    //             self.recipeDisplay.push(self.recipe.list[i]);
    //         }
    //     }
    // }
    // INGREDIENT GET ROUTE
    self.getIngredient = function () {
        $http.get('/recipe/ingredient').then(function (response) {
            // console.log('get ingredient route: ', response.data);
            self.ingredient.list = response.data;
            self.recipeIngredient = [];
            // console.log('self.params ', self.params);
            for(i = 0; i < self.ingredient.list.length; i++) {
                // ADD IF STATEMENT TO FILTER IF THE INGREDIENT EXSISTS AS TO NOT HAVE DUPLICATES
                if(self.ingredient.list[i].id === self.params) {
                    self.recipeIngredient.push(self.ingredient.list[i]);
                    // console.log('recipeIngredient', self.recipeIngredient);
                } 
            }
        });
    } // END INGREDIENT GET ROUTE

    // ADD RECIPE INSTRUCTION TO THE RECIPE DB
    self.updateRecipe = function (recipeInstruction) {
        // console.log('recipeInstruction SERVICE', recipeInstruction, self.params);
        $http.put('/recipe/' + self.params, recipeInstruction).then(function (response) {
            // console.log('response: ', response);
            self.getRecipe();
        });
    }
}]);