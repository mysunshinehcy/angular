angular.module('myApp.services', []).factory('githubService', function ($http) {
    var githubUrl = 'http://api.github.com',
        githubUsername;
    var runUserRequest = function (username, path) {
        //从使用JSONP调用Github API的$http服务中返回promise
        return $http({
            method: 'JSONP',
            url: githubUrl + '/users/' +
            username + '/' +
            path + '?callback=JSON_CALLBACK'
        });
    };
    //返回一个带有events函数的服务对象
    //this is my test:https://api.github.com/users/study0918/events?callback=JSON_CALLBACK
    //事件
    //如setUsername
    return {
        events: function (username) {
            return runUserRequest(username, 'events');
        },
        setUsername: function (username) {
            githubUsername = username;
        }
    }
})

/**
 * 由于$http返回的是promise对象，可以通过.success()方法像直接调用$http一样调用返回的对象
 * 
 * 并不推荐在控制器中使用$watch,这里只是为了方便演示。在实际生产中会将这个功能封装进一个指令，并在指令中设置$watch
 * 
 * 在这个例子中，你可能会注意到在输入字段发生变化前，有一个延时。如果不延时，将导致
 * 输入字段中的任何一个键盘输入都会让终端对GitHub API进行调用，这显然不是我们希望的。
 * 
 * 通过内置服务$timeout来介绍一下这个延时。同注入githubService一样，需要将$timeout服务注入到控制器中
 * 
 * 注意:在自定义服务前注入所有的AngularJS内置服务，这是约定俗成的规则。
 * 
 * 修改一下：
 * 
 * 现在可以在控制器中使用$timeout服务了。在这个例子中$timeout服务会取消所有网络请求，并在输入字段的两次变化
 * 之间延时350ms。换句话说，如果用户两次输入之间有350ms的间隔，就推断用户已经完成了输入，然后开始向GitHub发送请求
 * 
 * 到现在为止，我们只介绍了服务如何将类似的功能打包在一起，而使用服务也是在控制器之间共享数据的典型方法。
 * 
 * 例如:如果我们的应用需要后端服务的授权，可以创建一个SessionsService服务处理用户的授权过程，并保存服务端返回的令牌。
 * 
 * 当应用中任何地方要发送一个需要授权的请求，可以通过SessionService来访问令牌。
 * 
 * 如果我们的应用中有一个用来设置GitHub用户名的设置页面，我们希望在应用中所有的控制器之间共享用户名。
 * 
 * 为了在控制器之间共享数据，需要在服务中添加一个用来储存用户名的方法。记住，服务在应用的生命周期内是单例模式的，因此可以将用户名安全地储存在其中。
 */
angular.module('myApp', ['myApp.services']).controller('ServiceController', function ($scope, $timeout, githubService) {
    //注意username属性的变化
    //如果有变化就运行该函数
    //添加了$timeout服务
    var timeout;
    $scope.$watch('username', function (newUsername) {
        //从使用JSONP调用Github API的$http服务中返回promise
        if (newUsername) {
            //如果在进度中有一个超时(timeout)
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function () {
                githubService.events(newUsername).success(function (data, status, headers) {
                    //success函数在数据中封装响应
                    //因此我们需要调用data.data来获取原始数据
                    $scope.events = data.data;
                    console.log($scope.events);
                })
            }, 350)
        }
    });
    $scope.setUsername = githubService.setUsername;
})
