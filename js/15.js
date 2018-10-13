angular.module("myApp",[]).controller("MainController",function($scope){

}).directive("myDirective",function(){
    return {
        restrict:'A',
        scope:{},
        priority:100,
        template:'<div>Inside myDirective {{ myProperty }}</div>'
    }
})