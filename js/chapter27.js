/**
 * document.querySelector()并不是在所有浏览器中都可用，它一般适合选择不复杂的元素，而Sizzle或者jQuery支持更复杂的选择。
 * 
 * 可以通过ngApp指令所在的元素来从DOM中检索$rootScope，然后将它包装为一个Angular元素(使用angular.element()方法)
 * 
 * 对于一个Angular元素，可以从DOM内部调用不同的方法来检查我们的Angular应用。这样做，需要从DOM中选择元素。在只使用JavaScript
 * 和Angular的情况下（这里的意思是除了使用Angular，不使用其他任何库），可以以下面这种方式实现：
 * 可以使用这个元素提取应用程序的不同部分。
 * 
 */

 var rootEle=document.querySelector("html");
 var ele=angular.element(rootEle);

 /**
  * 1.scope()
  * 在元素上使用scope()方法时，可以从该元素(或者父元素)上提取它的$scope对象
  * 
  * 使用元素的作用域时，可以检查任意作用域属性，比如在控制器中设置给作用域对象的自定
  * 义变量。还可以窥探元素，查看它的$id、$parent对象、设置给它的$$watchers，甚至是手动
  * 遍历它的作用域链。
  */

  var scope=ele.scope();

  /**
   * 2.controller()
   * 通过使用controller()方法可以提取当前元素(或者父元素)的控制器
   */

   var ctrl=ele.controller();
   //或者
   var ctrl=ele.controller('ngModel');

   /**
    * 3.injector()
    * 通过在被选中的元素上使用injector()方法可以提取当前元素(或者包含它的元素)的注入器。
    * 然后可以使用这个注入器在应用内实例化任意Angular对象，比如服务，其他控制器或者任意其他对象。
    */

   var injector = ele.injector();

   /**
    * 4.inheritedData()
    * 通过在元素上使用inheritedData()方法可以获取该元素$scope对象关联的数据。
    * 这个inheritedData()方法就是在Angular在作用域链中查找数据的方式，它会遍历DOM直到找到一个
    * 特定的值或者找到最顶层的作用域。
    * 
    * 如果你使用Chrome，可以使用开发者工具提供的一些快捷方式。比如要简单地
    * 查找你所感兴趣的元素，只需在浏览器中右击，然后选择审查元素。这个元素
    * 本身存储在一个叫做$0的变量中，然后你可以通过调用angular.element($0)
    * 的方式提取被Angular化的元素。
    * 
    */