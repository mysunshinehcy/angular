var myApp = angular.module("myApp");
myApp.lazyRegisterController("view3Controller", ["$scope", function ($scope) {
    $scope.name = "view3";
    console.log("view3")
}]);