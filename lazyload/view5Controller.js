var myApp = angular.module("myApp");
myApp.lazyRegisterController("view5Controller", ["$scope", function ($scope) {
    $scope.name = "view5";
    console.log("view5")
}]);