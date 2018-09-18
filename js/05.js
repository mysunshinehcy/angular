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
//复杂的控制器
app.controller("complexController",["$scope",function($scope){
    $scope.shouldShowLogin=true;
    $scope.showLogin=function(){
        $scope.shouldShowLogin=!$scope.shouldShowLogin;
    };
    $scope.clickButton=function(){
        $('#btn span').html("Clicked");
    };
    $scope.onLogin=function(user){
        $http({
            method:'POST',
            url:'/login',
            data:{
                user:user
            }
        }).success(function(data){
            //user
        })
    }
}])

//简洁的控制器
app.controller("simpleController",["$scope",function(){
    //内容可以被指令控制
    $scope.onLogin=function(user){
        UserSrv.runLogin(user);
    }
}])