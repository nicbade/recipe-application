myApp.controller('RecipeController', function(RecipeService) {
    console.log('RecipeController created');
    var self = this;
    self.RecipeService = RecipeService;

    self.addRecipe = function() {
      console.log('addRecipe post route: ', self.recipe)
      RecipeService.addRecipe(self.recipe);
      self.recipe = {};
    }
  });