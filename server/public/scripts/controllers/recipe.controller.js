myApp.controller('RecipeController', ['RecipeService' , '$routeParams', function (RecipeService, $routeParams) {
  console.log('RecipeController created');
  var self = this;
  self.RecipeService = RecipeService;
  console.log('$routeParams ', $routeParams);

  // ADD RECIPE POST ROUTE
  self.addRecipe = function () {
    console.log('addRecipe post route: ', self.recipe)
    RecipeService.addRecipe(self.recipe);
    // $location.path('recipeDisplay/' + RecipeService.newRecipe.id);
    self.recipe = {};
    RecipeService.getRecipe();
  };

  RecipeService.getRecipe();

}]);