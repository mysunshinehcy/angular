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

angular.module('myApp', [])
    .config(function ($httpProvider) {
        $httpProvider.defaults.userXDomain = true;
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

$http.delete("https://api.github.com/api/users/1").sucess(function (data) {
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


/**
 * JSON是JavsScript Object Notation的简写，是一种看起来像JavaScript对象的数据交换格式。
 * 事实上，当JavaScript加载它时，它确实会被当做一个对象来解析。AngularJS也会将所有以JSON
 * 格式返回的JavaScript对象解析为一个与之对应的Angular对象。
 */

//例如，如果服务器返回以下JSON：
[{
    "msg": "This is the first msg",
    state: 1
}, {
    "msg": "This is the second msg",
    state: 2
}, {
    "msg": "This is the third msg",
    state: 1
}, {
    "msg": "This is the fourth msg",
    state: 3
}]

//当AngularJS通过$http服务收到这个数据后，可以像普通JavaScript对象那样来引用其中的数据:

$http.get('/v1/messages.json')
    .success(function (data, status) {
        $scope.first_msg = data[0].msg;
        $scope.first_state = data[0].state;
    });

/**
 * 使用XML
 * 尽管AngularJS能够以完全透明的方式来处理从服务器返回的JSON对象，我们同样可以使用其他的数据格式。
 * 假如服务器返回的是XML而非JSON格式的数据，需要将其转换成JavaScript对象。
 * 
 * 幸好，有不少出色的开源库可以使用，同样，某些浏览器也内置了解析器，可以帮助我们将
 * XML格式转换成JavaScript对象。
 * 
 * 创建一个工厂服务以开始使用这个轻量的XML解析器，这个服务的功能很简单，就是在DOM中解析XML
 */

angular.factory('xmlParser', function () {
    var x2js = new X2JS();
    return {
        xml2json: x2js.xml2json,
        json2xml: x2js.json2xml_str
    };
});

/**
 * 借助这个轻量的解析服务，可以将$http请求返回的XML解析成JSON格式，如下所示
 */

angular.factory('Data', [$http, 'xmlParser', function ($http, xmlParser) {
    $http.get('/api/msgs.xml', {
        transformResponse: function (data) {
            return xmlParser.xml2json(data);
        }
    })
}])

/**
 * 使用AngularJS 进行身份验证
 * 大多数网络应用都有需要保护的资源，这些资源不能被公开访问，只能由可以被识别且信任
 * 的授权用户访问。这些资源可能是付款信息，也可能是管理功能。
 * 
 * 无论保护的资源是什么，进行保护的手段都是类似的。
 * 
 * 如何实现服务器端身份验证并不是本章的内容主旨。本章集中介绍服务器端需要做什么来支
 * 持前端实现此功能。
 * 然后会介绍如何实现客户端的身份验证保护，以及这个流程中的一些边缘情况。
 */


/**
 * 服务器端需求
 * 首先必须保证服务器端API的安全性。由于我们处理的代码是未编译的，且可能是由不信任
 * 的源发送的，不能假设所有的用户都聪明到可以认识到这些潜在的风险。
 * 
 * 下面介绍常被用来保护客户端应用的两种方法。
 * 1. 服务器端视图渲染
 * 如果站点所有的HTML页面都是由后端服务器处理的，可以使用传统的授权方式，由服务器
 * 端进行鉴权，只发送客户端需要的HTML。
 * 
 * 2. 纯客户端身份验证
 * 我们希望客户端和服务端的开发工作可以解耦并各自独立进行，且可以将组件独立地发布到
 * 生产环境中，互相没有影响。因此，需要通过使用服务器端API来保护客户端身份验证的安全，
 * 但并不依赖这些API来进行身份验证。
 * 
 * 通过令牌授权来实现客户端身份验证，服务器需要做的是给客户端应用提供授权令牌。
 * 
 * 令牌本身是一个由服务器端生成的随机字符串，由数字和字母组成，它与特定的用户会话相关联。
 * 
 * uuid库是用来生成令牌的好选择。
 * 
 * 当用户登录到我们的站点后，服务器会生成一个随机的令牌，并将用户会话同令牌之间建立
 * 关联，用户无需将ID或其他身份验证信息发送给服务器。
 * 
 * 客户端发送的每个请求都应该包含此令牌，这样服务器才能根据令牌来对请求的发送者进行
 * 身份验证。
 * 
 * 服务器端则无论请求是否合法，都会将对应事件的状态码返回给客户端，这样客户端才能做
 * 出响应。
 * 
 * 下面是一些常用的状态码：
 * 1)200:一切正常
 * 2)401:未授权的请求
 * 3)403:禁止的请求
 * 4)404:页面找不到
 * 5)500:服务器错误
 * 
 * 当客户端收到这些状态码时会做出相应的响应。
 * 数据流程如下:
 * 1)一个未经过身份验证的用户浏览了我们的站点
 * 2)用户试图访问一个受保护的资源，被重定向到登录页面，或者用户手动访问了登录页面
 * 3)用户输入了他的登录ID(用户名或电子邮箱)以及密码，接着AngularJS应用通过了POST
 * 请求将用户的信息发送到服务端
 * 4)服务端对ID和密码进行校验，检查它们是否匹配
 * 5)如果ID和密码匹配，服务端生成一个唯一的令牌，并将其同一个状态码为200的响应一起返回。
 * 如果ID和密码不匹配，服务器返回一个状态码为401的响应。
 * 
 * 对一个已经通过身份验证的用户(通过了上面5个步骤的用户)，流程如下:
 * 1)用户请求一个受保护的资源路径(比如他自己的账号页面);
 * 2)如果用户尚未登录，应用汇将他重定向到登录页面。如果用户登录了，应用会使用该会话
 * 对应的令牌来发送请求
 * 3)服务器对令牌进行校验，并根据请求返回合适的数据。
 */

/**
 * 客户端身份验证
 * 前面一节定义了身份验证机制需要处理的一些行为
 * 1)重定向未经过身份验证的页面请求
 * 2)捕获所有响应状态码非200的XHR请求，并进行相应的处理
 * 3)在整个页面会话中持续监视用户的身份验证情况
 * 
 * 为了对未通过验证的用户访问受保护资源的行为进行重定向，需要能够对公共资源和受保护资源进行区分。
 * 
 * 有下面几种方法可以将路由定义为公共或非公共
 * 
 * 1.保护API访问的资源
 * 如果想要对一个会发送受保护的API请求(例如，一个服务器可能返回401状态码的API请求)
 * 的路由进行保护，但又希望可以正常加载页面，可以简单地通过$http拦截器来实现。
 * 
 * 想要创建一个$http拦截器并能够处理未通过身份验证的API请求，首先要创建一个拦截器来处理所有的响应。
 * 现在，我们在应用的.config()代码块内设置$http响应拦截器，并将$httpProvider注入其中
 */

angular.module('myApp', []).config(function ($httpProvider) {
    //在这里构造拦截器
    //这个拦截器会处理所有请求的响应以及响应错误
    var interceptor = function ($q, $rootScope, Auth) {
        return {
            'response': function (resp) {
                if (resp.config.url == '/api/login') {
                    //假设API服务器返回的数据格式如下:
                    //{token:'AUTH_TOKEN'}
                    Auth.setToken(resp.data.token);
                }
                return resp;
            },
            'responseError': function (rejection) {
                //错误处理
                switch (rejection.status) {
                    case 401:
                        if (rejection.config.url !== 'api/login')
                            //如果当前不是在登录页面
                            $rootScope.$broadcast('auth:loginRequired');
                        break;
                    case 403:
                        $rootScope.$broadcast('auth:forbidden');
                        break;
                    case 404:
                        $rootScope.$broadcast('page:notFound');
                        break;
                    case 500:
                        $rootScope.$broadcast('server:error');
                        break;
                }
                return $q.reject(rejection);
            }
        }
    }
});

/**
 * 这个授权拦截器会处理特定请求中一些可预见的服务器响应状态码。当拦截器捕获到401状
 * 态码，会通过$broadcasts从$rootScope开始向所有的子作用域广播此事件。
 * 
 * 另外，拦截器会为任何返回200状态码的请求将令牌保存到/api/login登录路由中。
 * 为了实现这个拦截器，需要让$httpProvider将这个拦截器添加到拦截器链中：
 */

 angular.module('myApp',[]).config(function($httpProvider){
     //在这里构造拦截器
     var interceptor=function($q,$rootScope,Auth){
         //...
     };
     //将拦截器和$http的request/response链整合在一起
     $httpProvider.interceptor.push(interceptor);
 })