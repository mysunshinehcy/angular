/**
 * 对于指令，可以把它简单的理解成在特定DOM元素上运行的函数，指令可以扩展这个元素的功能
 * 
 * AngularJS应用的模块中有很多方法可以使用，其中directive()这个方法是用来定义指令的
 */

angular.module("myApp", []).directive("myDirective", function ($timeout, UserDefinedService) {
    //指令定义放这里
})

/**
 * directive()方法可以接受两个参数
 * 1.name(字符串)
 * 指令的名字，用来在视图中引用特定的指令。
 * 2.factory_function(函数)
 * 这个函数返回一个对象，其中定义了指令的全部行为。$compile服务利用这个方法返回的对象，在DOM调用
 * 指令时构造指令的行为。
 */

angular.application("myApp", []).directive("myDirective", function () {
    //一个指令定义对象
    return {
        //通过设置项来定义指令，在这里进行复写
    }
})

/**
 * 我们也可以返回一个函数代替对象来定义指令，但是像上面的例子一样，通过对象来定义是最佳的方式。
 * 当返回一个函数时，这个函数通常被称作链接传递(postLink)函数,利用它我们可以定义指令的链接(link)
 * 功能。由于返回函数而不是对象会限制定义指令时的自由度，因为只在构造简单的指令是才比较有用。
 */

/**
 * 当AngularJS启动应用时，它会把第一个参数当做一个字符串，并以此字符串为名来注册第二个参数返回的对象。
 * AngularJS编译器会解析主HTML的DOM中的元素、属性、注释和CSS类名中使用了这个名字的地方，并在
 * 这些地方引用对应的指令。当它找到某个已知的指令时，就会在页面中插入所对应的DOM元素。
 */

/**
 * 为了避免与未来的HTML标准冲突，给自定义的指令加入前缀来代表自定义的命名空间。AngularJS本身已经
 * 使用了ng-前缀，所以可以选择除此之外的名字。
 */

/**
 * 指令的工厂函数只会在编译器第一次匹配到这个指令时调用一次。和controller函数类似，我们通过
 * $injector.invoke来调用指令的工厂函数。
 */

/**
 * 当AngularJS在DOM中遇到具名的指令时，会去匹配已经注册过的指令，并通过名字在注册过的对象中查找。
 * 此时，就开始了一个指令的生命周期，指令的生命周期开始于$compile方法并结束于link方法。
 */

/**
 * 一个JavaScript对象由键和值组成。当一个给定键的值被设置为一个字符串、布尔值、数值、或对象时，
 * 我们把这个键称为属性。当把键设置为函数时，我们把它叫做方法。
 */

/**可能的选项如下所示，每个键的值说明了可以将这个属性设置为何种类型或者什么样的函数 */

angular.module('myApp', []).directive("myDirective", function () {
    return {
        restrict: String,
        priority: Number,
        terminal: Boolean,
        template: String or Template Function: function (tElement, tAttrs) {

        },
        templateUrl: String,
        replace: Boolean or String,
        scope: Boolean or Obeject,
        transclude: Boolean,
        controller: String or function(scope, element, attrs, transclude, otherInjectables)){

},
controllerAs: String,
    require:String,
        link:function(scope, iElement, iAttrs) {

        },
compile://返回一个对象或连接函数，如下所示:
function(tElement, tAttrs, transclude) {
    return {
        pre: function (scope, iElement, iAttrs, controller) {

        },
        post: function (scope, iElement, iAttrs, controller) {

        }
    }
    //或者
    return function postLink(...){
        //...
    }
}
    };
});

/**
 * restrict(string):
 * restrict是一个可选的参数。它告诉AngularJS这个指令在DOM中以何种形式被声明。默认AngularJS
 * 认为restrict的值是A，即以属性的形式来进行声明。
 * 
 * E（元素）
 * <my-directive></my-directive>
 * A（属性，默认值）
 * <div my-directive="expression"></div>
 * C（类名）
 * <div class="my-directive:expression;"></div>
 * M（注释）
 * <--directive:my-directive expression-->
 */

/**这些选项可以单独使用，也可以混合在一起使用 */
angular.module("myDirective", function () {
    return {
        restrict: 'EA' //输入元素或属性
    }
})

/**
 * 上面的配置可以同时用属性或注释的方式来声明指令：
 * <-- 作为一个属性 -->
 * <div my-directive></div>
 * <-- 或者作为一个元素 -->
 * <my-directive></my-directive>
 * 属性是用来声明指令最常用的方式，因为它能在包括老版本的IE浏览器在内的所有浏览器中正常工作，并且不需要在文档头部注册新的标签
 */

// 尽量避免用注释方式来声明属性。这种方式最初被用来声明由多个标签组成的
// 指令。这种方法在某些情况下特别有用，比如在<table>元素内使用ng-repeat
// 指令， 但在AngularJS 1.2 中ng-repeat 可以通过ng-repeat-start 和
// ng-repeat-end来更优雅地满足这个需求，注释模式就没有什么用武之地了。
// 如果你对此很好奇，可以通过Chrome开发者工具的element标签观察一下使用
// ng-repeat时被隐式添加的注释。
