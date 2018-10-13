angular.module('myApp', [])
    .controller('SomeCtrl', function ($scope) {
        // we can leave it empty, it just needs to be defined
    })
    .controller('SecondCtrl', function ($scope) {
        // also can be empty
    })
    .directive('myDirective', function () {
        return {
            restrict: 'A',
            scope: false
            //这里为myDirective设置了一个高优先级。由于ngInit指令会以非零的优先
            //级运行，这个例子将会优先运行ngInit指令，然后才是我们定义的指定，并且这个
            //myProperty在$scope对象中是有效的。
        }
    })