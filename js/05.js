var app = angular.module("myApp", []);
app.controller("FirstController", ["$scope", function ($scope) {
    $scope.counter = 0;
    $scope.add = function (amount) {
        $scope.counter += amount;
    };
    $scope.substract = function (amount) {
        $scope.counter -= amount;
    };
    $scope.person = {
        name: "Ari Lerner"
    }
}])

app.controller("ParentController", ["$scope", function ($scope) {
    $scope.person = {
        greeted: false
    };
}])

app.controller("ChildController", ["$scope", function ($scope) {
    $scope.sayHello = function () {
        $scope.person.name = "Ari Lerner";
    }
}])
