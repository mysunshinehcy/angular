/**
 * ng-view是由ngRoute模块提供的一个特殊指令，它的独特作用是在HTML中给$route对应的视图内容占位。
 * 它会创建自己的作用域并将模板嵌套在内部。
 * ng-view是一个优先级为1000的终极指令。AngularJS不会运行同一个元素上的低优先级指令(例如<div ng-view></div>元素上其他指令都是没有意义的)
 * 
 * ngView指令遵循以下规则:
 * 1)每次触发$routeChangeSuccess事件，视图都会更新
 * 2)如果某个模板同当前的路由相关联：
 *   创建一个新的作用域
 *   移除上一个视图，同上一个作用域也会被清除
 *   将新的作用域同当前模板关联在一起
 *   如果路由中有相关的定义，那么就把对应的控制器同当前作用域关联起来
 *   触发$viewContentLoaded事件
 *   如果提供了onload属性，调用该属性所指定的函数
 */

/**
 * 路由
 * 我们可以使用AngularJS提供的when和otherwise两个方法来定义应用的路由。
 * 用config函数在特定的模块或应用中定义路由。
 */

angular.module('myApp', []).config(['$routeProvider', function ($routeProvider) {
    //在这里定义路由
}])

/**
 * 现在，我们可以用when方法来添加一个特定的路由。这个方法可以接受两个参数(when(path,route)).
 * 下面的例子展示了如何创建一个独立的路由:
 * 
 * 第一个参数是路由路径，这个路径会与$loaction.path进行匹配，$location.path也就是当前URL
 * 的路径。如果路径后面还有其他内容，或使用了双斜线也可以正常匹配。我们可以在URL中存储参数，参数
 * 需要以冒号开头(例如:name)，后面会讨论如何用$routeParams读取这些参数。
 * 
 * 第二个参数是配置对象，决定了当第一个参数中的路由能够匹配时具体做些什么。配置对象中可以进行设置
 * 的属性包括controller、template、templateURL、resolve、redirectTo和reloadOnSearch
 */

angular.module('myApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
}]);

/**
 * 一个复杂的路由方案会包含多个路由，以及一个可以将所有意外路径进行重定向的捕获器。
 */

angular.module('myApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            resolve: {
                user: function (SessionService) {
                    return SessionService.getCurrentUser();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

/**
 * 1.controller
 * controller:'MyController'或者
 * controller:function($scope){}
 * 如果配置对象中设置了controller属性，那么这个指定的控制器会与路由所创建的新作用
 * 域关联在一起。如果参数值是字符型，会在模块中所有注册过的控制器中查找对应的内容，然后
 * 与路由关联在一起。如果参数值是函数型，这个函数会作为模板中DOM元素的控制器并与模板
 * 进行关联。
 * 
 * 2.template
 * template: '<div><h2>Route</h2></div>'
 * AngularJS会将配置对象中的HTML模板渲染到对应的具有ng-view指令的DOM元素中。
 * 
 * 3. templateUrl
 * templateUrl: 'views/template_name.html'
 * 应用会根据templateUrl属性所指定的路径通过XHR读取视图（或者从$templateCache中读
 * 取）。如果能够找到并读取这个模板，AngularJS会将模板的内容渲染到具有ng-view指令的DOM
 * 元素中。
 * 
 * 4.resolve
 * 
 */