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
                },
                getCityDetails: function (query) {
                    var d = $q.defer();
                    $http({
                        method: 'GET',
                        url: "http://autocomplete.wunderground.com/aq?query=" + query
                    }).success(function (data) {
                        d.resolve(data.RESULTS);
                    }).error(function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                }
            }
        };

    })
    .factory('UserService', function () {
        var defaults = {
            location: 'autoip'
        };
        var service = {
            user: {},
            save: function () {
                sessionStorage.presenty = angular.toJson(service.user);
            },
            restore: function () {
                //从sessionStorage中拉取配置
                service.user = angular.fromJson(sessionStorage.presenty) || defaults
                return service.user;
            }
        };
        //立即调用它，从session.storage中恢复配置
        //因此这里的用户数据是立即可用的
        service.restore();
        return service;
    })
    .controller('MainController', function ($scope, $timeout, Weather, UserService) {
        //构建date对象
        //https://blog.csdn.net/zangxueyuan88/article/details/81100054
        $scope.date = {};
        $scope.user = UserService.user;
        //更新函数
        var updateTime = function () {
            $scope.date.tz = new Date(new Date().toLocaleString("en-US", {
                timeZone: $scope.user.timezone
            }));
            $timeout(updateTime, 1000);
        }
        //启动更新函数
        updateTime();
        $scope.weather = {};
        Weather.getWeatherForecast("autoip").then(function (data) {
            $scope.weather.forcast = data;
        })
    })
    .controller('SettingsController', function ($scope, UserService, Weather) {
        $scope.user = UserService.user;
        $scope.save = function () {
            UserService.save();
        }
        //console.log($scope.user);
        $scope.fetchCities = Weather.getCityDetails;
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
    }]).directive('autoFill', function ($timeout) {
        return {
            //replace是一个可选参数，如果设置了这个参数，值必须为true，因为默认值为false。默
            //认值意味着模板会被当作子元素插入到调用此指令的元素内部
            restrict: 'EA',
            scope: {
                autoFill: '&',
                ngModel: '='
            },
            //因为这里会创建一个新元素，因此需要使用compile函数而不只是link函数和模板，因为
            //<ul>元素不能嵌套在一个<input>元素中。
            compile: function (tEle, tAttrs) {
                //编译函数
                //这里的tEle是编译之前的element，也就是setting模板里面的<input type="text" ng-model="user.location"auto-fill="fetchCities" autocomplete="off" placeholder="Location" />
                console.log(tEle);
                var tplEl = angular.element('<div class="typeahead">' +
                    '<input type="text" autocomplete="off" />' +
                    '<ul id="autolist" ng-show="reslist">' +
                    '<li ng-repeat="res in reslist" ' +
                    '>{{res.name}}</li>' +
                    '</ul>' +
                    '</div>');
                var input = tplEl.find('input');
                input.attr('type', tAttrs.type);
                input.attr('ng-model', tAttrs.ngModel);
                input.attr('timezone', tAttrs.timezone);
                tEle.replaceWith(tplEl);
                return function (scope, ele, attrs, ctrl) {
                    console.log(scope);
                    //链接函数
                    //这里的ele是编译之后的ele，也就是上面的tplEl
                    //这里的ele和compile函数里面的tEle不一样，但是attrs和compile的tAttrs是一样的
                    var minKeyCount = attrs.minKeyCount || 3,
                        timer,
                        input = ele.find('input');
                    input.bind('keyup', function (e) {
                        val = ele.val();
                        if (val.length < minKeyCount) {
                            if (timer) {
                                $timeout.cancel(timer);
                                scope.reslist = null;
                                return;
                            }
                        } else {
                            if (timer) {
                                $timeout.cancel(timer);
                            }
                            timer = $timeout(function () {
                                scope.autoFill()(val).then(function (data) {
                                    if (data && data.length) {
                                        scope.reslist = data;
                                        scope.ngModel = data[0].zmw;
                                        scope.timezone = data[0].tz;
                                    }
                                });
                            }, 300)
                        }
                    });
                    //失去焦点时隐藏reslist
                    input.bind('blur', function (e) {
                        scope.reslist = null;
                        scope.$digest();
                    })
                }
            }
        }
    })