myApp.service('RecipeService', ['$http', '$location', function($http, $location){
    console.log('RecipeService Loaded');
  
    var self = this;
    self.recipe = { list: [] };
    self.currentRecipe = { list: [] };
        
    // RECIPE POST ROUTE
    self.addRecipe = function(newRecipe) {
        self.newRecipe = newRecipe;
        console.log('newRecipe: ', newRecipe);
        $http.post('/recipe', newRecipe).then(function(response) {
            console.log('service post was returned: ', response);
            // $location.path('recipeDisplay/' + response.data.rows[0].id);
        });

    }; //END ADD RECIPE

    // INGREDIENT POST ROUTE
    self.addIngredient = function(newIngredient) {
        self.newIngredient = newIngredient;
        console.log('newIngredient: ', newIngredient);
        $http.post('/recipe/ingredient', newIngredient).then(function(response) {
            console.log('service post was returned: ', response);
        });
    }

    // RECIPE GET ROUTE
    self.getRecipe = function() {
        $http.get('/recipe').then(function(response) {
            console.log('get route: ', response.data);
            self.recipe.list = response.data;
        });
    } // END GET RECIPE ROUTE
}]);