var myApp = angular.module("myApp");
myApp.lazyRegisterController("view4Controller", ["$scope", function ($scope) {
    $scope.name = "view4";
    console.log("view4")
}]);