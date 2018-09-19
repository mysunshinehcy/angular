angular.module("emailParser", []).config(["$interpolateProvider", function ($interpolateProvider) {
    $interpolateProvider.startSymbol('__');
    $interpolateProvider.endSymbol('__');
}]).factory('EmailParser', ['$interpolate', function ($interpolate) {
    //处理解析的服务
    return {
        parse: function (text, context) {
            var template = $interpolate(text);
            return template(context);
        }
    }
}])

var app = angular.module('myApp', ['emailParser']);
app.controller("MyController", ["$scope", "EmailParser", function ($scope, EmailParser) {
    //设置监听
    $scope.$watch('emailBody', function (body) {
        if (body) {
            //var template = $interpolate(body);
            $scope.previewText = EmailParser.parse(body, {
                to: $scope.to
            });
        }
    })
}])
