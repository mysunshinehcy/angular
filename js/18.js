angular.module('myApp', []).factory('greeter', function () {
    return {
        greet: function (msg) {
            alert(msg);
        }
    }
}).controller('MyController', function ($scope, greeter) {
    $scope.sayHello = function () {
        greeter.greet("Hello");
    }
})

/**
 * 在内部AngularJS,AngularJS的处理过程是下面这样的:
 * //使用注入器加载应用
 * var injector=angular.injector(['ng','myApp']);
 * //通过注入器加载$controller服务:var $controller=injector.get('$controller');
 * var scope=injector.get('$rootScope').$new();
 * //加载控制器并传入一个作用域,同AngularJS在运行时做的一样
 * var MyController=$controller('MyController',{$scope:scope})
 */

/**
 * Angular通过annotate函数，在实例化时从传入的函数中把参数列表提取出来。在chrome的开发者工具中输入下面的代码可以查看这个函数
 * injector.annotate(function($q, greeter) {});  =>["$q", "greeter"]
 * 实际生效需要这样:
 * var injector=angular.injector(['ng','myApp']);
 * injector.annotate(function($q, greeter) {});  =>["$q", "greeter"]
 * 
 * 在任何一个AngularJS的应用中，都有$injector在进行工作，无论我们知道与否。当编写
 * 控制器时，如果没有使用[]标记或进行显式的声明，$injector就会尝试通过参数名推断依赖
 * 关系。
 */
