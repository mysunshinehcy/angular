/**服务 */
/**
 * 控制器只会在需要时被实例化，并且不再需要就会被销毁。这意味着每次切换路由或重新加载视图时，当前的控制器会被AngularJS清除掉
 * 
 * 服务提供了一种能在应用的整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。
 * 
 * 服务是一个单例对象，在每个应用中只会被实例化一次(被$injector实例化)，并且是延迟加载的
 * (需要时才会被创建)。服务提供了把特定功能相关联的方法的方法集中在一起的接口。
 * 
 * 以AngularJS的$http服务为例，它提供了对浏览器的XMLHttpRequest对象的底层访问功能，我们可以通过
 * $http的API同XMLHttpRequest进行交互，而不需要因为调用这些底层代码而污染应用。
 */

//示例服务，在应用的整个生命周期内保存current_user
angular.module('myApp', []).factory('UserService', function ($http) {
    var current_user;
    return {
        getCurrentUser: function () {
            return current_user;
        },
        setCurrentUser: function (user) {
            current_user = user;
        }
    }
})

/**
 * AngularJS服务提供了一些内置服务，在任何地方使用它们的方式都是统一的。同时，为复杂应用创建我们自己的服务也是非常有用的。
 * 在AngularJS中创建自己的服务是非常有用的：只需要注册这个服务即可。服务被注册后，AngularJS编译器就可以引用它，
 * 并且在运行时把它当做依赖加载进来。服务名称的注册表使得在测试中伪造和剔除相互隔离的应用依赖变得非常容易。
 */

/**注册一个服务 */
/**
 * 使用angular.module的factory API创建服务，是最常见也是最灵活的方式
 */

angular.module('myApp.service', []).factory('githubService', function () {
    var serviceInstance = {};
    //我们的第一个服务
    return serviceInstance;
})

/**
 * 服务的工厂函数用来生成一个单例的对象或函数，这个对象或函数就是服务，它会存在于应用的整个生命周期内。当我们的AngularJS
 * 应用加载服务时，这个函数会被执行并返回一个单例的服务对象
 */

/**同创建控制器的方法一样，服务的工厂函数既可以是一个函数也可以是一个数组 */
//用方括号声明工厂
angular.module('myApp.services', []).factory('githubService', [function ($http) {

}])

/**githubService需要访问$http服务，所以我们将$http服务当作AngularJS应用的一个依赖，并将它注入到工厂函数中。 */
angular.module('myApp.services', []).factory('githubService', function ($http) {
    //我们的serviceInstance现在可以在函数定义中访问$http服务
    var serviceInstance = {};
    return serviceInstance;
})

/**无论何处需要访问GitHub API都不需要通过$http来进行了，可以通过githubService来代替，并让它处理所有复杂的业务逻辑和远程服务。 */

/**
 * GitHub API提供了一个读取用户活动流的方法（活动流就是用户记录在GitHub中的最近的事
 * 件列表）。在我们的服务中，可以创建一个访问这个API的方法，并将API的请求结果返回。
 */

/**通过将方法设置为服务对象的一个属性来将其暴露给外部 */
angular.module('myApp.services', []).factory('githubService', function ($http) {
    var githubUrl = 'http://api.github.com';
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
    return {
        events: function (username) {
            return runUserRequest(username, 'events');
        }
    }
})
