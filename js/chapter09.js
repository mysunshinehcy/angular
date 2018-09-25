/**HTML文档
 * 
 * HTML文档是一个纯文本文件，包含了页面的解构以及由CSS定义的样式，或者可以操作样式的JavaScript代码。
 */

 /**HTML节点 
  * HTML节点是嵌套在另一个元素内的元素或一串字符。除了文本节点外，所有元素都是节点。
 */

 /**
  * HTML元素
  * HTML元素由一个开始标签和一个结束标签组成。
  */

  /**
   * HTML标签
   * HTML标签用来标记元素的开始和结束。标签本身用尖括号来声明。
   * 开始标记的名字会同时被当作元素的名字，同时标签还会包含用来修饰元素的属性。
   */

   /**
    * 属性
    * 属性用来给HTML元素添加额外的信息。这些属性设置在开始标记中。可以使用形如key="value"的键值
    * 对设置它们，或者只设置键。
    * 
    * 我们看看<a>超链接标签，它可以创建从一个页面到另一个页面的链接:很多标签和超链接
    * 标签一样，会有很多特殊的属性，这些属性就好比标签的参数。例如:超链接标签的href属性会
    * 激活该标签的行为，同时在大多数浏览器中会将开始和结束标记中间的文本装换为默认的蓝色。
    */

    <a href="http://google.com">Click me to go to Google</a>

    /**
     * <a>标签定义了一个从当前页面到本站或者站外另一个页面之间的链接，href属性定义了链接的目标。
     */

     //而下面这个按钮元素则与此非常不同
<button href="http://google.com" type="submit">Click me</button>
/**
 * 默认情况下超链接标签是蓝色且有下划线的，而按钮标签在浏览器中看起来是一个可点击的按钮。超链接标签知道当自己的href
 * 属性被设置为http://google.com之后，如果用户点击这个超链接，它应该修改地址栏的URL并加载Google的首页。
 * 
 * 而按钮标签知道当自己的href属性被设置为http://google.com之后，如果用户点击这个超链接，它应该修改地址栏的URL属性
 * 并加载Google的首页。
 * 
 * 而按钮标签则完全忽略href属性，并不会在被点击时有同样的行为。
 * 
 * 因此，修改地址栏的URL并将你带到一个新的页面是超链接的预置行为，而不是按钮的预置行为。
 * 
 * 最后，两个标签在设置title属性时则有相同的行为:当用户将鼠标悬停在元素上时会出现一个提示框。
 */

 <a href="http://google.com" title="click me">Click me to go to Google</a>
 <button type="submit" title="click me">Click me</button>

 /**
  * 总的来说，浏览器会渲染HTML元素的样式和行为，这个能力是Web强大的功能的基础之一。
  */

  /**
   * 假设我们已经创建了一个完整的HTML文档，其中包含了AngularJS,并且DOM中已经用ng-app指令标识出了
   * 应用的根元素，当AngularJS编译HTML时就会调用指定。
   * 
   * 调用指令意味着执行指令背后与之相关联的JavaScript代码，这些代码是我们用指定定义写出来的。
   */


   <my-directive></my-directive>
   angular.module("myApp",[]).directive("myDirective",function(){
       return {
           restrict:'E',
           template:'<a href="http://google.com">Click me to go to Google</a>',
       }
   })

   /**
    * 通过AngularJS模块API中的.directive()方法，我们可以通过传入一个一个字符串和一个函数来注册一个新指令。
    * 其中字符串是这个指令的名字，指令名应该是驼峰命名风格的，函数应该返回一个对象
    */

    /**
     * 驼峰命名风格用来将一个短语写在一个单词中，除了第一个单词外其他单词首字母大写，中间不加空格。
     * 例如,bumpy,roads用驼峰风格来写应该是bumpyRoads。
     */

     /**
      * 默认情况下，Angular将模板生成的HTML代码嵌套在自定义标签<my-directive>内部。
      * 
      * 下面向指令定义中添加一些新的设置:我们可以将自定义标签从生成的DOM中完全移除掉，并只留下由模板生成的链接。
      * 将replace设置为true就可以实现这个效果
      */

      angular.module("myApp",[]).directive("myDirective",function(){
          return {
              restrict:"E",
              replace:true,
              template:'<a href="http://google.com">Click me to go to Google</a>'
          };
      });

      /**
       * Angular允许创建新的子作用域或者隔离作用域
       * 
       * 同之前在当前作用域中介绍的继承作用域(子作用域)不同，隔离作用域同当前DOM的作用域是完全分隔
       * 开的。为了给这个新的对象设置属性，我们需要显式地通过属性传递数据，同在JavaScript或Ruby中给方法传递参数类似。
       */
      /**当用如下代码将指令的作用域设置成一个只包含它自己的属性的干净对象时:
       * scope:{
       *    someProperty:'need to be set'
       * }
       * 
       * 实际上创造的是隔离作用域。本质上，意味着指令有了一个属于自己的$scope对象，这个对象只能在指令的方法中或指令的模板字符串中使用
       * 实际上不能像上面的例子那样，在作用域对象内部直接设置someProperty属性
       * scope:{
       *    //这样行不通
       *    someProperty:'need to be set'
       * }
       * 
       * 实际上要在DOM中像之前提到过那样，像给函数传递函数一样，通过属性来设置值
       * 
       * <div my-directive some-property="someProperty with @binding"></div>
       * 
       * 现在，我们在作用域对象内部把someProperty值设置为@这个绑定策略。这个绑定策略告诉
       * Angular将DOM中some-property属性的值复制给新作用域对象中的someProperty属性
       * 
       * scope:{
       *     someProperty:'@'
       * }
       * 
       * 注意，默认情况下someProperty在DOM中的映射是some-property属性。如果我们想显式指定绑定的的
       * 属性名，可以用如下方式:
       * 
       * scope:{
       *    someProperty:'@someAttr'
       * }
       * 
       * 在这个例子中，被绑定的属性名是some-attr而不是some-property.
       * <div my-directive some-attr="someProperty with @binding"></div>
       * 
       * 默认情况下约定DOM属性和JavaScript对象属性的名字是一样的(除非对象的属性名采用的是驼峰式写法)。
       * 
       * 由于作用域中属性经常是私有的，因此可以(虽然不常见)指定我们希望将这个内部属性同哪个DOM属性进行绑定:
       * 
       * scope:{
       *    myUrl:'@someAttr',
       *    myLinkText:'@'
       * }
       * 
       * 上面的隔离作用域中的内容是:将指令的私有属性$scope.myUrl同DOM中some-attr属性的值绑定起来。
       * 这个值既可以是硬编码的也可以是当前作用域(例如Some-attr="{{expression}}")中某个表达式的运算结果。
       * 
       * 在DOM中要用some-attr代替my-url
       * 
       * <div my-directive some-attr="http://google.com" my-link-text="Click me to go to Google"></div>
       * 
       * 更进一步，还可以在DOM对应的作用域上运算表达式，并将结果传递给指令，在指令内部最终被绑定到属性上
       * 
       * <div my-directive some-attr="{{'http://'+'google.com'}}"></div>
       * */      
