var myApp = angular.module("myApp");
myApp.lazyRegisterController("view2Controller", ["$scope", function ($scope) {
    $scope.name = "view2";
    console.log("view2")
}]);