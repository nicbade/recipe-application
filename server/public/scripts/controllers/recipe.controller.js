myApp.controller('RecipeController', ['RecipeService', '$routeParams', '$location', function (RecipeService, $routeParams, $location) {
  // console.log('RecipeController created');
  var self = this;
  self.RecipeService = RecipeService;
  // console.log('$routeParams ', $routeParams);
  // ADD RECIPE POST ROUTE
  self.addRecipe = function () {
    // console.log('addRecipe post route: ', self.recipe)
    RecipeService.addRecipe(self.recipe);
    // self.recipe = {};
    $location.path('recipeDisplay/' + RecipeService.recipe.id);
  };

  self.addIngredient = function () {
    // console.log('addIngredient post route: ', self.ingredients);
    RecipeService.addIngredient(self.ingredients);
    self.ingredients = {};
  };

  RecipeService.getRecipe();
  RecipeService.getIngredient();
}]);