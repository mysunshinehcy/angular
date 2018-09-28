/**
 * 布尔属性
 * 根据HTML标准的定义，布尔属性代表一个true或false值。当这个属性出现时，这个属性的值就是true(无论实际定义的值是什么)。如果未出现
 * 这个属性的值就是false。
 */

/**
 * ng-disabled:
 * 使用ng-disabled可以把disabled属性绑定到以下表单输入字段上
 * <input>(text、checkbox、radio、number、url、email、submit)
 * <textarea>
 * <select>
 * <button>
 */

 /**
  * ng-readonly:
  * 同其他布尔属性一样，HTML定义只会检查readonly属性是否出现，而不是它的实际值。
  * 通过ng-readonly可以将某个返回真或假的表达式是否出现readonly属性进行绑定
  */

  /**
   * ng-checked:
   * 标准的checked属性是一个布尔属性，不需要进行赋值。通过ng-checked将某个
   * 表达式同是否出现checked属性进行绑定
   */

   /**
    * ng-selected:
    * ng-selected可以对是否出现option标签的selected属性进行绑定
    */

    /**
     * 类布尔属性
     * ng-href、ng-src等属性虽然不是标准的HTML布尔属性，但是由于行为相似，所以
     * Angular源码内部是和布尔属性同等对待的。
     * 
     * ng-href:
     * 当使用当前作用域中的属性动态创建URL时，应该用ng-href代替href.
     * 这里的潜在问题是当用户点击一个由插值动态生成的链接时，如果插值尚未生效，将会到错误的页面(通常是404)
     * 这是，如果使用ng-href,angularJS会等到插值生效(在例子中是两秒以后)后再执行点击的
     * 链接的行为
     * 
     * ng-src:
     * Angular会告诉浏览器在ng-src对应的表达式生效之前不要加载图像
     */

     /**
      * ng-app和ng-controller是特殊的指令，因此它们会修改它们内部的指令的作用域
      * 
      * ng-app为AngularJS应用创建$rootScope,ng-controller则会以$rootScope或另外一个ng-controller
      * 的作用域为原型创建新的子作用域。
      * 
      * 1.ng-app:
      * 任何具有ng-app属性的DOM元素将被标记为$rootScope的起始点。
      * $rootScope是作用域链的起始点，任何嵌套在ng-app内的指令都会继承它。
      * 在JavaScript代码中通过run方法来访问$rootScope.
      * 可以在整个文档中只使用一次ng-app。如果需要在一个页面中放置多个AngularJS应用，需要手动引导应用。
      * 2.ng-controller:
      * 内置指定ng-controller的作用是为嵌套在其中的指令创建一个子作用域，避免将所有操作和模型都
      * 定义在$rootScope上。用这个指令可以在一个DOM元素上放置控制器
      * ng-controller接受一个参数expression，这个参数是必需的。
      * expression参数是一个AngularJS表达式.
      * 子$scope只是一个JavaScript对象，其中含有从父级$scope中通过原型继承得到的方法和属性,包括应用的$rootScope
      * 嵌套在ng-controller中的指令有访问新子$scope的权限，但是要牢记每个指令都应该遵守和作用域相关的规则。
      * $scope对象的职责是承载DOM中指令所共享的操作和模型。
      * 
      * 操作指的是$scope上的标准JavaScript方法。
      * 模型指的是$scope上保存的包含瞬时状态数据的JavaScript对象。持久化状态的数据应该保存到服务中，服务的作用是处理模型的持久化。
      * 由于技术和架构方面的原因，绝对不要直接将控制器中的$scope赋值为值类型对象(字符串、布尔值或数字)
      * DOM中应该始终通过点操作符.来访问数据。遵守这个规则将使你原理不可预期的麻烦。
      * 控制器应该尽可能简单。虽然可以用控制器来组织所有功能，但是将业务逻辑移到服务和指令中是非常好的主意。
      * 
      * 由于原型继承的关系，修改父级对象中的someBareValue会同时修改子对象中的值，但反之则不行
      *
      * 可以看下这个例子的实际效果，首先点击child button,然后点击parentbutton。这个例子充分说明了子控制器是复制而非引用someBareValue.
      * JavaScript对象要么是值复制要么是引用复制。字符串、数字和布尔型变量是值复制。数值、对象和函数则是引用复制
      */

      /**
       * ng-include:
       * 使用ng-include可以加载，编译并包含外部HTML片段到当前的应用中。模板的URL被限制在与应用文档相同
       * 的域和协议下，可以通过白名单或包装成被信任的值来突破限制。更进一步，需要考虑跨域资源共享和同源规则，来确保模板可以在
       * 任何浏览器中正常加载。例如，所有浏览器都不能进行跨域请求，部分浏览器也不能访问file://协议的资源
       * 
       * 使用ng-include时AngularJS会自动创建一个子作用域。如果你想使用某个特定的作用域，例如
       * ControllerA的作用域,必须在同一个DOM元素上添加ng-controller="ControllerA"指令，这样
       * 当模板加载完成后，不会像往常一样从外部作用域继承并创建一个新的子作用域。
       */

      /**
       * ng-switch:
       * 这个指令和ng-switch-when和on="propertyName"一起使用，可以在propertyName发生变化时
       * 渲染不同指令到视图中。
       */

      /**
       * ng-view指令用来设置将被路由管理和放置在HTML中的视图的位置。
       */
/**
 * ng-if:
 * 使用ng-if指令可以完全根据表达式的值在DOM中生成或移除一个元素。如果赋值给ng-if的表达式的值是false，
 * 那对应的元素将会从DOM中移除，否则对应元素的一个克隆将被重新插入DOM中。
 * 
 * ng-if同ng-show和ng-hide指令最本质的区别是，它不是通过CSS显示或隐藏DOM节点，而是真正生成或移除节点。
 * 
 * 当一个元素被ng-if从DOM中移除，同它关联的作用域也会被销毁。而且当它重新加入DOM中时，会通过
 * 原型继承从它的父作用域生成一个新的作用域。
 * 
 * 同时还有同一个重要的细节需要知道,ngIf重新创建元素时用的是它们编译后的状态。如果ng-if内部的代码加载之后被
 * jQuery修改过(例如用.addClass)，那么当ng-if的表达式值为false时，这个DOM元素会被移除，表达式
 * 再次为true时这个元素及其内部的子元素会被重新插入DOM，此时这些元素的状态会是它们的原始状态，而不是它们
 * 上次被移除时的状态。也就是说无论用jQuery的.addClass添加了什么类都不会存在了。
 */

 /**
  * ng-repeat用来遍历一个集合或为集合中的每个元素生成一个模板实例。集合中的每个元素都会
  * 被赋予自己的模板和作用域。同时每个模板实例的作用域都会暴露一些特殊的属性。
  * 
  * $index:遍历的进度(0...length-1)
  * $first:当元素是遍历的第一个时值为true
  * $middle:当元素处于第一个和最后元素之间时值为true
  * $last:当元素是遍历的最后一个时值为true
  * $even:当$index值是偶数时值为true
  * $odd:当$index值是奇数时值为true
  */

  /**
   * ng-init:
   * ng-init指令用来在指令被调用时设置内部作用域的初始状态
   * ng-init最常见的使用场景是:在类似本节的例子中那样，需要创建小的示例代码的时候
   * 对于任何需要健壮结构的场景，请在控制器中用数据模型对象来设置状态。
   */

  /**
   * {{}}
   * {{}}语法是AngularJS内置的模板语法，它会在内部$scope和视图之间创建绑定。基于这个绑定,
   * 只要$scope发生变化，视图就会随之自动更新。
   * 
   * 事实上它也是指令，虽然看起来不像，实际上它是ng-bind的简略形式，用这种形式不需要创建新的
   * 元素，因此它常被用在行内文本中。
   * 
   * 注意，在屏幕可视的区域内使用{{}}会导致页面加载时未渲染的元素发生闪烁，用ng-bind可以避免这个问题。
   */

  /**
   * ng-bind:
   * 尽管可以在视图中使用{{}}模板语法(AngularJS内置的方式)，我们也可以通过ng-bind指令实现同样的行为
   */

  /**
   * ng-cloak:
   * 除使用ng-bind来避免未渲染元素闪烁，还可以在含有{{}}的元素上使用ng-cloak指令
   * 
   * ng-cloak指令会在内部元素隐藏，直到路由调用对应的页面时才显示出来
   */

  /**
   * ng-bind-template:
   * 同ng-bind指令类似，ng-bind-template用来在视图中绑定多个表达式
   */

  /**
   * ng-model:
   * ng-model指令用来将input、select、textarea或自定义表单空间同包含它们的作用域中的属性进行绑定。
   * 它可以提供并处理表单验证功能，在元素上设置相关的CSS类(ng-valid、ng-invalid等)，并负责在
   * 父表单中注册控件。
   * 
   * 它将当前作用域中运算表达式的值同给定的元素进行绑定。如果属性并不存在，它会隐式创建并将其添加到当前作用域中。
   * 
   * 我们应该始终用ngModel来绑定$scope上一个数据模型内的属性，而不是$scope上的属性，这可以避免
   * 在作用域或后代作用域中发生属性覆盖。
   */

  /**
   * ng-show/ng-hide:
   * ng-show和ng-hide根据所给表达式的值来显示或隐藏HTML元素。当赋值给ng-show指令的值为false时
   * 元素会被隐藏。类似地，当赋值给ng-hide指令的值为true时元素也会被隐藏。
   * 
   * 元素的显示或隐藏是通过移除或添加ng-hide这个CSS类来实现的。.ng-hide类被预先定义在了AngularJS
   * 的css文件中，并且它的display属性的值为none(用了!important标记)
   */

  /**
   * ng-change
   * 这个指令会在表单输入发生变化时计算给定表达式的值。因为要处理表单输入，这个指令要和ngModel联合起来使用。
   * */ 

  /**
   * ng-form用来在一个表单内部嵌套另一个表单。普通的HTML <form>标签不允许嵌套，但是ng-form可以。
   * 
   * 这意味着内部所有的子表单都合法时，外部的表单才会合法。这对于用ng-repeat动态创建表单是非常有用的。
   * 
   * 由于不能通过字符插值来给输入元素动态地生成name属性，所以需要将ng-form指令内每组重复的输入字段都包含
   * 在一个外部表单元素内。
   * 
   * 下面的CSS类会根据表单的验证状态自动设置:
   * 表单合法时设置ng-valid
   * 表单不合法时设置ng-invalid
   * 表单未进行修改时设置ng-pristion
   * 表单进行过修改时设置ng-dirty
   * 
   * Angular不会将表单提交到服务器，除非它指定了action属性。要指定提交表单时调用哪个JavaScript方法，
   * 使用下面两个指令中的一个。
   * 
   * ng-submit:在表单元素上使用。
   * ng-click:在第一个按钮或submit类型(input[type=submit])的输入字段上使用。
   * 
   * 如果想要屏蔽浏览器对表单的默认验证行为，可以在表单元素上添加novalidate标记。
   * */ 

  /**
   * ng-click:
   * ng-click用来指定一个元素被点击时调用的方法或表达式
   */

  /**
   * ng-select:
   * ng-select用来将数据同HTML的<select>元素进行绑定。这个指令可以和ng-model以及ng-options指令一同使用，
   * 构建精细且表现优良的动态表单。
   * 
   * ng-options的值可以是一个内涵表达式，简单来说就是它可以接受一个数组或对象，并对它们进行循环，
   * 将内部的内容提供给select标签内部的选项。它可以是下面两种形式。
   * 
   * 数组作为数据源：
   * 用数组中的值做标签；
   * 用数组中的值作为选中的标签；
   * 用数组中的值做标签组；
   * 用数组中的值作为选中的标签组。
   * 
   * 对象作为数据源：
   * 用对象的键-值（key-value）做标签；
   * 用对象的键-值作为选中的标签；
   * 用对象的键-值作为标签组；
   * 用对象的键-值作为选中的标签组。
   */

  /**
   * ng-submit:
   * ng-submit用来将表达式同onsubmit事件进行绑定。这个指令同时会阻止默认行为(发送请求并重新加载页面)
   * 除非表单不含有action属性。
   */

 /**
  * ng-class:
  * 使用ng-class动态设置元素的类，方法是绑定一个代表所有需要添加类的表达式。重复的类不会添加。当表达式
  * 发生变化时，先前添加的类会被移除，新类会被添加
  */

  /**
   * ng-attr-(suffix):
   * 当AngularJS编译DOM时会查找花括号{{some expression}}内的表达式。这些表达式会被
   * 自动注册到$watch服务中并更新到$digest循环中，成为它的一部分
   * 
   * 有时浏览器会对属性会进行很苛刻的限制。SVG就是一个例子
   * <svg><circle cx="{{cx}}"></circle></svg>
   * 
   * 运行上面的代码会抛出一个错误，指出我们有一个非法的属性。可以用
   * ng-attr-cx来解决这个问题。注意，cx位于这个名称的尾部。在这个属性中，通过用{{}}来写表达式，达到前面提到的目的。
   * <svg><circle ng-attr-cx="{{ cx }}"><circle></svg>
   */
