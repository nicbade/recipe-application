myApp.service('RecipeService', ['$http', '$location', function($http, $location){
    console.log('RecipeService Loaded');
  
    var self = this;
    self.recipe = { list: [] };
    self.currentRecipe = { list: [] };
    self.ingredient = { list: [] };

    // RECIPE POST ROUTE
    self.addRecipe = function(newRecipe) {
        self.newRecipe = newRecipe;
        console.log('newRecipe: ', newRecipe);
        $http.post('/recipe', newRecipe).then(function(response) {
            console.log('service post was returned: ', response.data);
            $location.path('recipeDisplay/' + response.data.rows[0].id);
            self.params = response.data.rows[0].id;
            console.log('HERE I AM!!: ', self.params);
            console.log('response.data.rows[0].id', response.data.rows[0].id);
        });
    }; //END ADD RECIPE

    // INGREDIENT POST ROUTE
    self.addIngredient = function(newIngredient) {
        self.newIngredient = newIngredient;
        console.log('newIngredient: ', newIngredient);
        $http.post('/recipe/ingredient/' + self.params, newIngredient).then(function(response) {
            console.log('service post was returned: ', response);
            self.getIngredient();
        });
    } // END INGREDIENT POST ROUTE

    // RECIPE GET ROUTE
    self.getRecipe = function() {
        $http.get('/recipe').then(function(response) {
            console.log('get route: ', response.data);
            self.recipe.list = response.data;
        });
    } // END GET RECIPE ROUTE

    // INGREDIENT GET ROUTE
    self.getIngredient = function() {
        $http.get('/recipe/ingredient').then(function(response) {
            console.log('get ingredient route: ', response.data);
            self.ingredient.list = response.data;
        });
    } // END INGREDIENT GET ROUTE
}]);