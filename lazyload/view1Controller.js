var myApp = angular.module("myApp");
myApp.lazyRegisterController("view1Controller", ["$scope", function ($scope) {
    $scope.name = "view1";
    console.log("view1")
}]);