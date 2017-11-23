myApp.controller('DashboardController', function(UserService) {
  console.log('DashboardController created');
  var vm = this;
  vm.userService = UserService;
});
