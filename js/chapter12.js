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

  /**
   * scope参数(布尔型或对象)
   * 
   * scope参数是可选的，可以被设置为true或一个对象。默认值是false。
   * 当scope设置为true时，会从父作用域继承并创建一个新的作用域对象。
   * 如果一个元素上有多个指令使用了隔离作用域，其中只有一个可以生效。只有指令模板中的根元素
   * 可以获得一个新的作用域。因此，对于这些对象来说scope默认被设置为true。
   * 
   * 内置指令ng-controller的作用，就是从父级作用域继承并创建一个新的子作用域。它会创建一个新的从父作用域
   * 继承而来的子作用域。
   * 
   * 作用域的继承机制是向下而非向上进行的
   */

   /**
    * 绑定策略：
    * 本地作用域属性:使用@符号将本地作用域同DOM属性的值进行绑定。指令内部的作用域可以使用外部作用域的变量
    * 
    * 双向绑定:通过=可以将本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。就像普通的数据绑定一样，
    * 本地属性会反映出父数据模型中所发生的改变。
    * 
    * 父级作用域绑定:通过&符号可以对父级作用域进行绑定，以便在其中运行函数。意味着者对这个值进行设置时会生成一个
    * 指向父级作用域的包装函数。
    * 
    * 要使调用带有一个参数的父方法，我们需要传递一个对象，这个对象的键是参数的名称，值是要传递给参数的内容。
    */

    /**
     * transclude:
     * transclude是一个可选的参数。如果设置了，其值必须为true，它的默认值是false。
     * 只有当你希望创建一个可以包含任意内容的指令时，才使用transclude: true。
     */

     /**
      * controller
      * controller参数可以是一个字符串或者一个函数。当设置为字符串时，会以字符串的值为名字，来查找注册在应用中的控制器的构造函数
      * 可以在指令内部通过匿名构造函数的方式来定义一个内联的控制器
      * 
      * 指令的控制器和link函数可以进行互换。控制器主要用来提供可在指令间复用的行为，但链接函数只能在当前内部指令中定义行为，且无法在
      * 指令间复用。
      * 
      * link函数可以将指令互相隔离开来，而controller则定义可复用的行为。
      * 
      * 由于指令可以require其他指令所使用的控制器，因此控制器常用来放置多个指令间共享的动作。
      * 
      * 如果我们希望将当前指令的API暴露给其他指令使用，可以使用controller参数，否则可以使用link来构造当前指令元素的功能性。
      * 如果我们使用了scope.$watch()或者想要与DOM元素做实时交互，使用链接会是更好的选择。
      * 
      * 技术上讲，$scope会在DOM元素被实际渲染之前传入到控制器中。在某些情况下，例如使用了嵌入，控制器中的作用域所反映的
      * 作用域可能与我们所期望的不一样，这种情况下，$scope对象无法保证可以被正常更新。
      * 
      * 当想要同当前屏幕上的作用域交互时，可以使用被传入到link函数中的scope参数。
      */

      /**
       * controllerAs(字符串)
       * controllerAs参数是用来设置控制器的别名，可以以此为名来发布控制器，并且作用域可以访问
       * controllerAs。这样就可以在视图中引用控制器，甚至无需注入$scope。
       */

       