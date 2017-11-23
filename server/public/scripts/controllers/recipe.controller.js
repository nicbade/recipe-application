myApp.controller('RecipeController', function(RecipeService) {
    console.log('RecipeController created');
    var self = this;
    self.RecipeService = RecipeService;
  });