myApp.service('RecipeService', ['$http', '$location', function ($http, $location) {
    // console.log('RecipeService Loaded');

    var self = this;
    self.recipe = {
        list: []
    };

    self.ingredient = {
        list: []
    };

    self.instruction = {
        list: []
    };

    self.recipeIngredient = [];
    self.recipeDisplay = [];
    self.recipeInstruction = [];

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
        console.log('self.params: ', self.params);
        $http.post('/recipe/ingredient/' + self.params.id, newIngredient).then(function (response) {
            // console.log('service post was returned: ', response);
            self.getIngredient();
        });
    } // END INGREDIENT POST ROUTE

    // RECIPE GET ROUTE
    self.getRecipe = function () {
        $http.get('/recipe').then(function (response) {
            // console.log('get route: ', response.data);
            // console.log('self.params: ', self.params);
            self.recipe.list = response.data;
            for(i = 0; i < self.recipe.list.length; i++) {
                if(self.recipe.list[i].id === self.params) {
                    self.recipeDisplay.push(self.recipe.list[i]);
                }
            }
        });
    } // END GET RECIPE ROUTE

    // INGREDIENT GET ROUTE
    self.getIngredient = function () {
        $http.get('/recipe/ingredient').then(function (response) {
            // console.log('get ingredient route: ', response.data);
            self.ingredient.list = response.data;
            // self.recipeIngredient = [];
            // console.log('self.params ', self.params);
        });
    } // END INGREDIENT GET ROUTE

    self.getInstruction = function () {
        $http.get('/recipe/instruction').then(function (response) {
            // console.log('get Instruction route: ', response.data, self.params);
            self.instruction.list = response.data;
            self.recipeInstruction = [];            
            // console.log('self.params: ', self.params.id);
            console.log('self.instruction.list: ', self.instruction.list);


        });
    } // END INGREDIENT GET ROUTE

    self.addInstruction = function(recipeInstruction) {
        // console.log('recipeInstruction SERVICE', recipeInstruction, self.params);
        $http.post('/recipe/instruction/' + self.params.id, recipeInstruction).then(function (response) {
            // console.log('response: ', response);
            self.getInstruction();
        });
    }
}]);