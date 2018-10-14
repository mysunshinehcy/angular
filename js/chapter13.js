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