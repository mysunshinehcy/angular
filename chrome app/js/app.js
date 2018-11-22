angular.module('myApp', [])
    .controller('MainController', function ($scope, $timeout) {
        //构建date对象
        $scope.date = {};
        //更新函数
        var updateTime = function () {
            $scope.date.raw = new Date();
            $timeout(updateTime, 1000);
        }
        //启动更新函数
        updateTime();
    })
    .provider('Weather', function () {
        console.log(this);
        var apiKey = "";
        this.setApiKey = function (key) {
            if (key) {
                this.apiKey = key;
            }
        };
        this.$get = function ($http) {
            return {
                //服务对象
            }
        }
    })