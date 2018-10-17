/**
 * 一个对象通常有三种方式可以获得对其依赖的控制权
 * 1)在内部创建依赖
 * 2)通过全局变量进行引用
 * 3)在需要的地方通过参数进行传递
 */

/**
 * AngularJS使用$inject(注入器服务)来管理依赖关系的查询和实例化。事实上，$inject负责实例化AngularJS
 * 中所有的组件，包括应用的模块，指令和控制器。
 * 
 * 在运行时，任何模块启动时$injector都会负责实例化，并将其需要的所有依赖传递进去。
 */

/**
 * 推断式注入声明
 * 
 * 如果没有明确的声明，AngularJS会假定参数名称就是依赖的名称。因此，它会在内部调用函数对象的
 * toString()方法，分析并提取出函数参数列表，然后通过$injector将这些参数注入进对象的实例。注入的过程如下:
 * injector.invoke(function($http,greeter){});
 * 请注意，这个过程只适用于未经过压缩和混淆的代码，因为AngularJS需要原始未压缩的参数列表来进行解析。
 * 有了这个根据参数名称进行推断的过程，参数顺序就没有什么重要的意义了，因为AngularJS会帮助我们把属性以正确的顺序注入进去。
 * 
 * JavaScript的压缩器通常会将参数名改写成简单的字符，以减小源文件体积（同
 * 时也会删除空格、空行和注释等）。如果我们不明确地描述依赖关系，AngularJS
 * 将无法根据参数名称推断出实际的依赖关系，也就无法进行依赖注入。
 */

/**
 * 显式注入声明
 * 
 * AngularJS提供了显示的方法来明确定义一个函数被调用时需要用到的依赖关系。通关这种方法声明依赖，即使
 * 在源代码呗压缩，参数名称发生改变的情况下依然能够正常工作。
 * 
 * 可以通过$inject属性来实现显示注入声明的功能。函数对象的$inject属性是一个数组，数组元素的类型是字符串，它们的值
 * 就是需要被注入的服务的名称。
 * 
 * 对于这种声明方式来讲，参数顺序是非常重要的，因为$inject数组元素的顺序必须和注入
 * 参数的顺序一一对应。这种声明方式可以在压缩后的代码中运行，因为声明的相关信息已经和函
 * 数本身绑定在一起了。
 */

//下面是示例的代码
var aControllerFactory = function aController($scope, greeter) {
    console.log('LOADED controller', greeter);
}

//我们应用的控制器
angular.module('myApp', []).controller('MyController', aControllerFactory).factory('greeter', greeterService);
//获取注入器并创建一个新的作用域
var injector = angular.injector(['ng', 'myApp']);
controller = injector.get('$controller');
rootScope = injector.get('$rootScope');
newScope = rootScope.$new();
//调用控制器
controller('MyController', { $scope: newScope });

/**
 * 行内注入声明
 * AngularJS提供的注入声明的最后一种方式，是可以随时使用的行内注入声明。这种方式其
 * 实是一个语法糖，它同前面提到的通过$inject属性进行注入声明的原理是完全一样的，但允许
 * 我们在函数定义时从行内将参数传入。此外，它可以避免在定义过程中使用临时变量。
 * 
 * 在定义一个AngularJS的对象时，行内声明的方式允许我们直接传入一个参数数组而不是一
 * 个函数。数组的元素是字符串，它们代表的是可以被注入到对象中的依赖的名字，最后一个参数
 * 就是依赖注入的目标函数对象本身。
 * 由于需要处理的是一个字符串组成的列表，行内注入声明也可以在压缩后的代码中正常运
 * 行。通常通过括号和声明数组的[]符号来使用它。
 */
