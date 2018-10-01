/**
 * 指令作用域
 * 为了完全理解指令定义对象剩下的参数，需要先介绍指令作用域是如何工作的
 */

 //$rootScoep这个特殊的对象会在DOM中声明ng-app时被创建
 <div ng-app="myApp" ng-init="someProperty='some data'"></div>
 <div ng-init="siblingProperty='more data'">
    Inside Div Two
    <div ng-init="aThirdProperty"></div>
 </div>

 /**
  * 上面的代码中，我们在应用的根作用域中设置了三个属性:someProperty、siblingProperty和anotherSiblingProperty
  * 
  * 从这里开始，DOM中每个指令调用时都可能会
  * 1)直接调用相同的作用域对象;
  * 2)从当前作用域对象继承一个新的作用域对象;
  * 3)创建一个同当前作用域相隔离的作用域对象。
  * 
  * 上面的例子展示的是第一种情况。前面两个div是兄弟元素，可以通过get和set访问$rootScope。第二个div内部的div
  * 同样可以通过get和set访问相同的根作用域。
  * 
  * 指令嵌套并不一定意味着需要改变它的作用域。默认情况下，子指令会被赋予访问父DOM元素对应的作用域的能力，这样做的原因可以
  * 通过介绍指令的scope参数来理解，scope参数默认是false.
  */