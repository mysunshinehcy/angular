/**
 * XHR实践
 */

/**
 * 跨源和同源策略
 * 浏览器在全局层面禁止了页面加载或执行与自身来源不同域的任何脚本。
 * 
 * 同源策略允许页面从同一站点加载和执行特定的脚本。浏览器通过对比每一个资源的协议、主机名和端口号
 * 来判断资源是否与页面同源。站外其他来源的脚本同页面的交互则被严格限制。
 * 
 * 跨域资源共享是一个解决跨域问题的好方法，从而可以使用XHR从不同源加载数据和资源。
 * 
 * 幸好，除CORS以外还有几个方法可以用来从外部的数据源将数据加载到应用中。
 * 
 * 1)JSONP
 * 2)CORS
 * 3)服务器代理
 */


/**
 * JSONP:
 * JSONP是一种可以绕过浏览器的安全限制，从不同的域请求数据的方法。使用JSONP需要服务器端提供必要的支持。
 * 
 * JSONP的原理是通过<script>标签发起一个GET请求来取代XHR请求。JSONP生成一个<script>标签并插到DOM中
 * 然后浏览器会接管并向src属性所指向的地址发送请求。
 * 
 * 当服务器返回请求时，响应结果会被包装成一个JavaScript函数，并由该请求所对应的回调函数调用。
 * 
 * AngularJS在$http服务中提供了一个JSONP辅助函数。通过$http服务的jsonp方法可以发送请求，如下所示:
 * 
 * $http.jsonp("https://api.github.com?callback=JSON_CALLBACK").success(function(data){
 *    //数据
 * })
 * 
 * 当请求被发送的，AngularJS会在DOM中生成一个如下所示的<script>标签
 * 
 * <script src="https://api.github.com?callback=angular.callbacks._0" type="text/javascript"></script>
 * 
 * 注意，JSON_CALLBACK被替换成了一个特地为此需求生成的自定义函数。
 * 
 * 当支持JSONP的服务器返回数据时，数据会被包装在由AngularJS生成的具名函数angular.callbacks._0中
 * 
 * 在这个例子中，GitHub服务器会返回包含在回调函数中的JSON数据，响应看起来如下所示
 * 
 * // 简写
 * 
 * angular.callbacks._0({
 *      'meta':{
 *          'X-RateLimit-Limit':'60',
 *          'status':200
 *    },{
 *       'data':{
 *          'current_user_url':'https://api.github.com/user' 
 *    }
 * })
 * 
 * 当AngularJS调用指定的回调函数会对$http的promise对象进行resolve。
 * 
 * 当我们自己开发支持JSONP的后端服务时，要确保响应的数据被包含在请求所指定的回调函数中。
 * 
 * 使用JSONP需要意识到潜在的安全风险。首先，服务器要安全开放，允许后端服务调用应用中的任何JavaScript。
 * 
 * 不受我们控制的外部站点(或者蓄意攻击者)可以随时更改脚本，使我们的整个站点变得脆弱。服务器或中间人有可能
 * 会将额外的JavaScript逻辑返回页面，从而将用户的隐私数据暴露出来。
 * 
 * 由于请求是由<script>标签发送的，所以只能通过JSONP发送GET请求。并且脚本的异常也很难处理。使用JSONP
 * 一定要谨慎，同时只跟信任并可以控制的服务器进行通信。
 */

/**
 * 使用CORS
 * 近年来，W3C制定了跨域资源共享来通过标准的方式取代JSONP。
 * CORS规范简单地扩展了标准的XHR对象，以允许JavaScript发送跨域的XHR请求。它会通过预检查(preflight)
 * 来确认是否有权限向目标服务器发送请求。
 * 
 * 预检查可以让服务器接受或拒绝来自全部服务器，特定服务器或一组服务器的请求。这意味着客户端和服务端
 * 应用需要协同工作，才能向客户端或服务器发送数据。
 * 
 * W3C指定CORS规范时对很多细节进行了抽象，并使其对客户端开发者透明，让开发者可以像发送同域请求一样方便地
 * 发送跨域请求。
 */

/**
 * 设置
 * 为了在AngularJS中使用CORS，首先需要告诉AngularJS我们正在使用CORS。使用config()方法在应用模块上设置
 * 两个参数以达到此目的。
 * 
 * 首先，告诉AngularJS使用XDomain，并从所有的请求中把X-Requset-With头移除掉。
 * 
 * X-Requset-With头默认就是移除掉的，但是再次确认它已经被移除没有坏处。
 */

angular.module('myApp',[])
  .config(function($httpProvider){
      $httpProvider.defaults.userXDomain=true;
      delete $httpProvider.defaults.headers.common['X-Requset-With'];
  })


/**
 * 服务器端CORS支持
 * 尽管这一章不深究服务端CORS的设置（第18章才会深入讨论），但是确保服务器支持CORS
 * 是很重要的。
 * 
 * 支持CORS的服务器必须在响应中加入几个访问控制相关的头。
 * 1)Access-Control-Allow-Origin:
 *        这个头的值可以是与请求头的值相呼应的值，也可以是*,从而允许接受从任何来源发来的请求。
 * 2)Access-Control-Allow-Credentials(可选):
 *        默认情况下，CORS请求不会发送cookie。如果服务器返回了这个头，那么就可以通过将withCredentials设置为true
 *        来将cookie同请求一同发送出去。
 * 如果将$http发送的请求中的withCredentials设置为true，但服务器没有返回Access-Control-Allow-Credentials
 * 请求就会失败，反之亦然。
 * 后端服务器必须能处理OPTIONS方法的HTTP请求。
 * CORS请求分为简单和非简单两种类型。
 */

/**
 * 简单请求使用下面一种HTTP方法就是简单请求:
 * HEAD;
 * GET;
 * POST;
 * 
 * 如果请求除了下面列表中的一个或多个HTTP头以外，没有使用其他头:
 * Accept;
 * Accept-Language;
 * Content-Language;
 * Last-Event-ID;
 * 
 * Content-Type:
 * application/x-www-form-urlencoded;
 * multipart/form-data;
 * text/plain
 * 我们把这类请求归类为简单请求，因为浏览器可以不需要使用CORS就发送这类请求。简单请求不要求浏览器和服务器之间有任何特殊通信。
 * 
 * 一个使用$http服务的简单CORS请求和其他简单请求看起来是下面这样的:
 * $http.get("https://api.github.com").success(function(data){
 *     //数据
 * })
 */

/**
 * 非简单请求
 * 不符合简单请求标准的请求被称为非简单请求。如果想要支持PUT或DELETE方法，又或者想给请求设置
 * 特殊的内容类型，就需要发送非简单请求。
 * 
 * 尽管这些请求在客户端开发者看起来没什么不同，但浏览器会以不同的方式处理它们。
 * 
 * 浏览器实际上会发送两个请求:预请求和请求。浏览器会首先向服务器发送预请求来获得发送请求的许可，只有许可通过了，
 * 浏览器才会发送真正的请求。
 * 
 * 浏览器处理CORS的过程是透明的。
 * 
 * 同简单请求一样，浏览器会给预请求和请求都加上Origin头。
 * 
 * 预请求
 * 浏览器发送的预请求是OPTIONS类型的，预请求中包含以下头信息：
 * Access-Control-Request-Method:
 *       这个头是请求所使用的HTTP方法，会始终包含在请求中。
 * Access-Control-Request-Headers (可选):
 *       这个头的值是一个以逗号分隔的非简单头列表，列表中的每个头都会包含在这个请求中。
 *       服务器必须接受这个请求，然后检查HTTP方法和头的合法性。如果通过了检查，服务器会在响应中添加
 * 下面这个头。
 * Access-Control-Allow-Origin:
 *       这个头的值必须和请求的来源相同，或者是*符号，以云溪接受来自任何来源的请求。
 * Access-Control-Allow-Methods:
 *       这个是一个可以接受的HTTP方法列表，对在客户端缓存响应结果很有帮助，并且未来发送的请求可以不必总是发送预请求。
 * Access-Control-Allow-Headers:
 *       如果设置了Access-Control-Request-Headers头，服务器必须在响应中添加同一个头。
 * 我们希望服务器在可以接受这个请求时返回200状态码。如果服务器返回了200状态码，真正的请求才会发出。
 * AngularJS中的非简单请求与普通请求看起来没有什么区别：
 */

$http.delete("https://api.github.com/api/users/1").sucess(function(data){
    //数据
})

/**
 * 服务器端代理
 * 实现向所有服务器发送请求的最简单方式是使用服务器端代理。这个服务器和页面处在同一个域中
 * （或者不在同一个域中但支持CORS），做为所有远程资源的代理。
 * 
 * 可以简单地通过使用本地服务器来代替客户端向外部资源发送请求，并将响应结果返回给客户端。
 * 
 * 通过这种方式，老式浏览器不必使用需要发送额外请求的CORS(只有现代浏览器支持CORS)也能发送跨域请求，
 * 并且可以在浏览器中采用标准的安全策略。
 * 
 * 为了实现服务器端代理，需要架设一个本地服务器来处理我们所有的请求，并负责向第三方发送实际的请求。
 */
