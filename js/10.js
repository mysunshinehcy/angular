angular.module('myApp', []).run(function ($rootScope) {
    //使用.run访问$rootScope
    $rootScope.rootProperty = "root scope";
}).controller('ParentController', function ($scope) {
    //使用.controller访问'ng-controller'内部的属性
    //DOM忽略的$scope中，根据当前控制器进行推断
    $scope.parentProperty = 'parent scope';
}).controller('ChildController', function ($scope) {
    $scope.childProperty = "child scope";
    //同在DOM中一样，我们可以通过当前$scope直接访问原型中的任意属性
    $scope.fullSentenceFromChild = 'Same $scope:we can access:' + $scope.rootProperty + ' and ' + $scope.parentProperty + ' and ' + $scope.childProperty;
})