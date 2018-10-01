/**
 * 对于指令，可以把它简单的理解成在特定DOM元素上运行的函数，指令可以扩展这个元素的功能
 * 
 * AngularJS应用的模块中有很多方法可以使用，其中directive()这个方法是用来定义指令的
 */

Angular.module("myApp",[]).directive("myDirective",function($timeout,UserDefinedService){
    //指令定义放这里
})

/**
 * template(字符串或函数)
 * template参数是可选的，必须被设置为以下两种形式之一:
 * 1)一段HMTL文本
 * 2)一个可以接受两个参数的函数，参数为tElement和tAttrs，并返回一个代表模板的字符串。tElement和tAttrs的t代表template，是相对于
 * instance的。在讨论链接和编译设置时会详细介绍，模板元素或属性与实例元素或属性之间的区别。
 * 
 * AngularJS会同处理HTML一样处理模板字符串。模板中可以通过大括号标记来访问作用域，例如{{expression}}
 * 
 * 如果模板字符串中海油多个DOM元素，或者只由一个单独的文本节点后塍，那它必须被包含在一个父元素内。换句话说，必须存在一个根DOM元素。
 * 
 * 注意每一行末尾的反斜线，这样AngularJS才能正确解析多行字符串。
 */

/**
 * templateUrl:(字符串或函数)
 * 1)一个代表外部HTML文件路径的字符串
 * 2)一个可以接受两个参数的函数，参数为tElement和tAttrs，并返回一个外部HTML文件路径的字符串
 * 
 * 无论哪种方式，模板的URL都将通过Angular内置的安全层，特别是$getTrusted ResourceUrl，这样可以保护模板不会被不信任的源加载。
 * 
 * 默认情况下，调用指令时会在后台通过Ajax来请求HTML模板文件。有两件事情需要知道
 * 
 * 1)在本地开发时，需要再后台运行一个本地服务器，用以从文件系统加载HTML模板，否则会导致Cross Origin Request Script（CORS）错误。
 * 2)模板加载是异步的，意味着编译和链接要暂停，等待模板加载完成。
 * 
 * 通过Ajax异步加载大量的模板将严重拖慢一个客户端应用的速度。为了避免延迟，可以在部署应用之前对HTML模板进行缓存。在大多数场景下
 * 缓存都是一个非常好的选择，因为AngularJS通过减少请求数量提升了性能。
 * 
 * 模板加载后，AngularJS会将它默认缓存到$templateCache服务中。在实际生产中，可以提前将模板缓存到一个定义模板的JavaScript文件中，这样
 * 就不需要通过XHR来加载模板了。
 */

 /**
  * replace:
  * replace是一个可选参数，如果设置了这个参数，值必须为true，因为默认值为false。默认值意味着模板会被当做子元素插入到调用此指令的元素内部
  */

  <div>
      .directive("someDirective",fucntion(){
          return {
              template:'<div>some stuff here</div>'
          };
      })
  </div>

  //调用指令之后的结果如下(这是默认replace为false时的情况)
  <div some-directive>
    <div>some stuff here<div>
  </div>

  //</div>如果replace被设置为了true：
  </div>
    .directive('someDirective', function() {
    return {
        replace: true // 修饰过
        template: '<div>some stuff here<div>'
    };
});
 //指令调用后的结果将是：
 <div>some stuff here<div>
    