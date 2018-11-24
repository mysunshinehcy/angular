angular.module('myApp', ['ngRoute'])
    .provider('Weather', function () {
        var apiKey = "";
        this.getUrl = function (type, ext) {
            return "http://api.wunderground.com/api/" +
                this.apiKey + "/" + type + "/q/" +
                ext + '.json';
        };
        this.setApiKey = function (key) {
            if (key) this.apiKey = key;
        };
        this.$get = function ($q, $http) {
            var self = this;
            return {
                //服务对象
                //创建API来调用Weather服务，帮我们从Wunderground的API中获取最新的预测数据
                //我们将会创建自己的，可以用来在视图中解析数据的promise，因为我们只希望从API调用中返回相关的结果
                getWeatherForecast: function (city) {
                    var d = $q.defer();
                    $http({
                        method: 'GET',
                        //url: getUrl.call(this,"forecast", city),
                        url: self.getUrl("forecast", city),
                        cache: true
                    }).success(function (data) {
                        //Wunderground API返回
                        //嵌套在forecast.simpleforcast属性内的forecasts对象
                        d.resolve(data.forecast.simpleforecast);
                    }).error(function (err) {
                        d.reject(err);
                    })
                    //采坑，可以在deferred对象上以属性的方式访问promise，deferred.promise，而不是deferred.promise()
                    return d.promise;
                }
            }
        };

    })
    .controller('MainController', function ($scope, $timeout, Weather) {
        //构建date对象
        //https://blog.csdn.net/zangxueyuan88/article/details/81100054
        $scope.date = {};
        //更新函数
        var updateTime = function () {
            $scope.date.raw = new Date();
            $timeout(updateTime, 1000);
        }
        //启动更新函数
        updateTime();
        $scope.weather = {};
        console.log($scope.weather);
        Weather.getWeatherForecast("autoip").then(function (data) {
            $scope.weather.forcast = data;
        })
    })
    .controller('SettingsController', function ($scope) {

    })

    .config(function (WeatherProvider) {
        //此处YOUR_API_KEY赋值为7528801ea9a07daa
        //WeatherProvider.setApiKey('YOUR_API_KEY');
        WeatherProvider.setApiKey('7528801ea9a07daa');
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'MainController'
            })
            .when('/settings', {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsController'
            })
            .otherwise({
                redirectTo: '/'
            })
    }])