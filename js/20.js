angular.module('myApp',[]).controller('DashboardController',['$scope','githubService',function($scope,UserService){
    // GithubService的getPullRequests()方法
    // 返回了一个promise
    User.getPullRequest(123).then(function(data){
        $scope.pullRequests=data.data;
    })
}])
