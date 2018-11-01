angular.module('myApp', []).controller('DashboardController', ['$scope', 'githubService', function ($scope, UserService) {
    // GithubService的getPullRequests()方法
    // 返回了一个promise
    User.getPullRequest(123).then(function (data) {
        $scope.pullRequests = data.data;
    })
}]).factory('GithubService', function ($q, $http) {
    //从仓库获取事件
    var getEventsFromRepo = function () {
        //任务
    }
    var service = {
        makeMultipRequests: function (repos) {
            var d = $q.defer(),
                percentComplete = 0,
                output = [];
            for (var i = 0; i < repos.length; i++) {
                output.push(getEventsFromRepo(repos[i]));
                percentComplete = (i + 1) / repos.length * 100;
                d.notify(percentComplete);
            }
            d.resolve(output);
            return d.promise;
        }
    }
    return service;
}).controller('HomeController', function ($scope, GithubService) {
    GithubService.makeMultipRequests(['auser/beehive', 'angular/angular.js']).then(function (result) {
        //处理结果
    }, function (err) {
        //发生错误了
    }, function (percentComplete) {
        $scope.progress = percentComplete;
    })
})
