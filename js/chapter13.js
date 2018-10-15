/**
 * AngularJS模块可以在被加载和执行之前对其自身进行配置。我们可以在应用的加载阶段应用不同的逻辑组。
 */

/**
 * 配置:
 * 在模块的加载阶段，AngularJS会在提供者注册和配置的过程中对模块进行配置。在整个AngularJS的工作流中，这个阶段
 * 是唯一能够在应用启动前进行修改的部分。
 */

angular.module('myApp', []).config(function ($provide) {
    //写点什么
})

/**
 * 这本书大部分内容都在使用config()函数的语法糖，并在配置阶段执行。例如，我们在某个模块上创建一个服务或指令时
 */

angular.module("myApp", []).factory("myFactory", function () {
    var service = {};
    return service;
}).directive("myDirective", function () {
    return {
        template: '<button>Click me </button>'
    }
})

// AngularJS会在编译时执行这些辅助函数。它们在功能上等同于下面的写法
angular.module("myApp", []).config(function ($provide, $compileProvider) {
    $provide.factory("myFactory", function () {
        var service = {};
        return service;
    });
    $compileProvider.directive("myDirective", function () {
        return {
            template: '<button>Click me </button>'
        }
    })
})

/**
 * 需要特别注意，AngularJS会以这些函数书写和注册的顺序来执行它们。也就是说我们无法注册一个尚未注册的提供者。
 * 
 * 唯一的例外是constant()方法，这个方法总会在所有配置块之前被执行。
 * 
 * 当对模块进行配置时，需要格外注意只有少数几种类型的对象可以被注入到config()函数中:提供者和常量。
 * 如果我们将一个服务注入进去，会在真正对其进行配置之前就以外地把服务实例化了。
 * 
 * 这种对配置服务进行严格限制的另外一个副作用就是，我们只能注入用provider()语法构建的服务，其他的则不行。
 * 
 * 这些config()代码块可以对我们的服务进行自定义配置，例如设置API密钥或自定义URL等。
 * 
 * 也可以定义多个配置块，它们会按照顺序执行，这样就可以将应用不同阶段的配置代码集中在不同的代码块中。
 * 
 * config()函数接受一个参数。
 * configFunction（函数）：AngularJS在模块加载时会执行这个函数。
 */

angular.module("myApp", []).config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'WelcomeController',
        template: 'views/welcome.html'
    });
}).config(function (ConnectProvider) {
    ConnectProvider.setApiKey('SOME_API_KEY');
});

/**
 * 和配置块不同，运行块在注入器创建之后被执行，它是所有AngularJS应用中第一个被执行的方法。
 * 运行块是AngularJS中与main方法最接近的概念。运行块中的代码通常是很难进行单元测试，它是和应用本身高度耦合的。
 * 运行块通常用来注册全局的事件监听器。例如，我们会在.run()块中设置路由事件的监听器以及过滤未经授权的1请求。
 * 假设我们需要在每次路由发生变化时，都执行一个函数来验证用户的权限，放置这个功能唯一合理的地方就是run方法。
 */

/**
 * run()函数接受个参数。
 * initialzeFn(函数)AngularJS在注入器创建后会执行这个函数。
 */
angular.module("myApp", []).run(function ($rootScope, AuthService) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
        //如果用户未登陆
        if (!AuthService.userLoggedIn()) {
            if (next.templateUrl === 'login.html') {
                //已经转向登陆路由因此无需重定向
            } else {
                $location.path('/login');
            }
        }
    })
})
