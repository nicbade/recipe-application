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
            self.recipe.list = response.data;
        });
    } // END GET RECIPE ROUTE

    // INGREDIENT GET ROUTE
    self.getIngredient = function () {
        $http.get('/recipe/ingredient').then(function (response) {
            console.log('get ingredient route: ', response.data);
            self.ingredient.list = response.data;
            console.log('self.ingredient.list', self.ingredient.list);
            console.log('self.ingredient.list.recipe_id ', self.ingredient.list[0].id);
            console.log('self.params ', self.params);
            for(i = 0; i < self.ingredient.list.length; i++) {
                if(self.ingredient.list[i].id === self.params) {
                    self.recipeIngredient.push(self.ingredient.list[i]);
                } 
                
            }
            console.log('did it work?', self.recipeIngredient);

        });
    } // END INGREDIENT GET ROUTE
}]);