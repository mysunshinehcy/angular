/**
 * 设置$sce保护，需要注入$sce服务
 */

 angular.module('myApp',[]).directive('myDirective',['$sce',function($sce){
     //这里有权使用$sce服务
 }]).controller('MyController',['$scope','$sce',function($scope,$sce){
     //这里也有权使用$sce服务
 }])