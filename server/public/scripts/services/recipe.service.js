myApp.service('RecipeService', ['$http', '$location', function($http, $location){
    console.log('RecipeService Loaded');
  
    var self = this;
    self.recipe = { list: [] };

    // RECIPE POST ROUTE
    self.addRecipe = function(newRecipe) {
        console.log('newRecipe: ', newRecipe);
        $http.post('/recipe', newRecipe).then(function(response) {
            console.log('service post was returned: ', response);
        });

    }; //END ADD RECIPE

    // RECIPE GET ROUTE
    self.getRecipe = function() {
        $http.get('/recipe').then(function(response) {
            console.log('get route: ', response.data);
            self.recipe.list = response.data;
        });
    } // END GET RECIPE ROUTE
}]);