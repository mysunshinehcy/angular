angular.module('myApp', []).directive('myDirective', function () {
    return {
        restrict: 'A',
        replace: true,
        scope:{
            myUrl:'@',
            myLinkText:'@'
        },
        template: '<a href="{{myUrl}}">{{myLinkText}}</a>'
    }
}).directive('cusDirective', function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<div>\
        we have access to {{someProperty}}\
        <div>',
        controller:function($scope){
            //指令可以有它自己的控制器
            //那种情况下我们可以将
            //$scope.someProperty设置成"someProperty with @binding"
            //$scope.someProperty==='need to be set';
        }
    }
})
