angular.module("myApp", []).directive("myDirective", function () {
    return {
        restrict: 'A',
        template: 'Inside myDirective, isolate scope: {{ myProperty }}',
        scope: {}
    }
}).directive('myInheritScopeDirective', function () {
    return {
        restrict: 'A',
        template: 'Inside myDirective, isolate scope: {{ myProperty }}',
        scope: true
    };
});