myApp.controller('RecipeController', ['RecipeService', '$routeParams', '$location', function (RecipeService, $routeParams, $location) {
  // console.log('RecipeController created');
  var self = this;
  self.RecipeService = RecipeService;
  console.log('$routeParams ', $routeParams);
  self.RecipeService.params = $routeParams;

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
    self.ingredients = { };
  };

  self.addInstruction = function () {
    // console.log('updateIngredient post route: ', self.recipeInstruction);
    RecipeService.addInstruction(self.recipeInstruction);
    self.recipeInstruction = { };
  }
  RecipeService.getRecipe();
  RecipeService.getIngredient();
  RecipeService.getInstruction();
}]);