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
      */