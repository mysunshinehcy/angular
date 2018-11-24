/**
 * 设置$sce保护，需要注入$sce服务
 */

 angular.module('myApp',[]).directive('myDirective',['$sce',function($sce){
     //这里有权使用$sce服务
 }]).controller('MyController',['$scope','$sce',function($scope,$sce){
     //这里也有权使用$sce服务
 }])

 /**
  * 在模块的config()函数内可以设置新的白名单和黑名单
  */

  angular.module('myApp',[]).config(['$sceDelegateProvider',function($sceDelegateProvider){
      //设置一个新的白名单
      $sceDelegateProvider.resourceUrlWhitelist(['self']);
  }])

  /**
   * 可以使用resourceUrlWhitelist()方法设置新的白名单。这个函数接受一个可选的参数。
   * 白名单列表(数组)。
   * 
   * 如果没有传入参数，那么这个函数就作为一个getter方法，同时返回当前设置的白名单数组。
   * 如果传入了白名单参数，resourceUrlWhitelist就会使用新的数组替换原来的数组。
   * 
   * 每个数组元素必须是一个正则表达式或者是字符串'self'。当设置为'self'时，Angular会确保
   * 所有的URL都只匹配与应用所在域一致的URL。使用一个正则表达式时，Angular会匹配与测试资源
   * 对应的绝对URL。
   * 
   * 如果这个数组为空，$sce会阻塞所有的URL。
   * 
   * 使用'self'时可以在HTML文档中使用https协议的资源。
   * 
   * 为了启动每个独立的URL，每个域都要加入白名单
   * 
   * 默认情况下，白名单被设置为['self']。
   */

  angular.module('myApp',[]).config(['$sceDelegateProvider',function($sceDelegateProvider){
      //设置新的白名单
      $sceDelegateProvider.resourceUrlWhitelist(['.*']);
  }])

  /**
   * URL黑名单
   * 也可以使用黑名单URL替换白名单。它通常比较依靠白名单更安全，但是你可以结合使用它们。对于可信任的域而言，白名单很有用，黑名单通常服务于域名
   * 重定向操作。
   * 
   * 可以使用resourceUrlBlacklist()方法设置新的黑名单。这个方法也接受一个可选的参数。
   * 1)黑名单列表(数组)
   * 如果没有传入参数，这个函数就会返回当前设置的黑名单数组。
   * 如果传入了黑名单参数，新的数组就会替换原来的黑名单。
   * 
   * 黑名单数组中的每个元素必须是一个正则表达式或者字符串'self'，尽管在使用黑名单的情况下，它
   * 没什么用。但是使用正则表达式时，它匹配与测试资源相对的绝对URL。
   * 
   * 对于可信任的内容，黑名单总是最后才决定什么是可接受的，什么是不可接受的。
   * 默认情况下，黑名单被设置为一个空数组[]。
   */


  /**
   * $sce库中有两个我们会用到的主要函数，以及一系列辅助函数。
   * 1.getTrusted
   * 要获取一个特定类型的可信任版本的值，可以调用getTrusted()方法。
   * 1)这个getTrusted()方法接受两个参数
   *   类型:这个字符串代表使用该值的上下文类型。对于可用类型可以查看sce类型列表。
   *   maybeTrusted:这个值是从$sce.trustAs返回的值。如果无效，它抛出一个异常。
   * 
   * 2.parse
   * 类似于$parse服务，parse方法用于将Angular表达式转换为函数。如果表达式是一个恒定的字面量
   * 它就调用$parse服务，否则，调用$sce.getTrusted()服务。
   * 
   * parse()方法接受两个参数。
   * 1)类型(字符串):这个类型代表使用该值的$sce上下文类型。对于可用类型可以查看sce类型列表
   * 2)表达式(字符串):Angular要编译的表达式
   * parse()方法返回一个:function(context,locals)形式的函数
   *    ---context(对象):这个对象表示表达式应该在哪里被求值。通常是一个$scope对象。
   *    ---locals(对象):局部变量，在context中重写值时非常有用。
   * 
   * 3.trustAs
   * trustAs()方法返回一个对象，Angular信任该对象，可以在特定的严格上下文转义环境中使用它。比如
   * ng-bind-html和ng-include绑定，使用给它们提供的值。
   * 
   * 这个trustAs()方法接受两个参数。
   * 1)类型:这个$sce上下文类型表示哪里的值是安全的。对于可用类型可以查看sce类型列表。
   * 2)值:这个值表示我们可以用它来代替提供的值
   * 
   * 4.isEnabled
   * isEnabled()方法没有参数，同时它返回一个布尔值，该值告诉我们是否启动了sce环境。如果启用了
   * 它返回true，否则返回false。
   */

  /**
   * 配置$sce
   * 如果想在运行应用时完全禁用sce子系统（虽然不鼓励这么做，默认情况下它还是提供了安全性保护）
   * 可以在应用的config函数中像这样禁用它
   */

  angular.module('myApp',[]).config(['$sceProvider',function($sceProvider){
      //关闭SCE
      $sceProvider.enable(false);
  }])
