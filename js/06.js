//Angular通过$parse这个内部服务来进行表达式的运算，这个服务能够访问当前所处的作用域。
//这个过程允许我们访问定义在$scope上的原始JavaScript数据和函数。

//将$parse服务注入到控制器中，然后调用它就可以实现手动解析表达式。
var app = angular.module("myApp", []);

app.controller("MyController", ["$scope", "$parse", function ($scope, $parse) {
    $scope.$watch('expr', function (newVal, oldVal, scope) {
        if (newVal !== oldVal) {
            //用该表达式来设置parseFun
            var parseFun = $parse(newVal);
            //获取经过解析后表达式的值
            $scope.parsedValue = parseFun(scope);
        }
    })
}])

app.controller("secondController", ["$scope", "$interpolate", function ($scope, $interpolate) {
    //设置监听
    $scope.$watch("emailBody", function (body) {
        console.log(body);
        if (body) {
            var template = $interpolate(body);
            $scope.previewText = template({
                to: $scope.to
            });
        }
    })
}])