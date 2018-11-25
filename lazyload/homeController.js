var myApp = angular.module("myApp");
console.log("aaa")
myApp.lazyRegisterController("homeController", ["$scope", function ($scope) {
    $scope.name = "home";
    console.log("home")
}]);