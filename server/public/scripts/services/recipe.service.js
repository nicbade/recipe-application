myApp.service('RecipeService', function($http, $location){
    console.log('RecipeService Loaded');
  
    var self = this;

    // RECIPE POST ROUTE
    self.addRecipe = function(newRecipe) {
        console.log('newRecipe: ', newRecipe);
        $http.post('/recipe', newRecipe).then(function(response) {
            console.log('service post was returned: ', response);
            // self.getRecipes();
        });

    }; //END ADD RECIPE
});