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
 * 2.使用路由定义受保护资源
 * 如果我们希望始终多某些路径进行保护，或者请求的API不会对路由进行保护，那就需要监视路由的变化，以
 * 确保访问受保护路由的用户是处于登录状态的。
 * 
 * 为了监视路由变化，需要为$routeChangeStart事件设置一个事件监听器。这个事件会在路由属性开始
 * resolve时触发，但此时路由还没有真的发生变化。
 * 
 * 如果同拦截器协同工作，这种方式会更加有效。如果不通过拦截器检查状态码，用户依然有可能发送未经授权的请求。
 * 
 * 通过监听器对事件进行监听，并检查路由，看它是否定义为可被当前用户访问。
 * 
 * 首选要定义应用的访问规则。可以通过在应用中设置常量，然后在每个路由中通过对比这些常量来判断用户是否具有访问权限。
 */

angular.module('myApp', ['ngRoute'])
    .constant('ACCESS_LEVELS', {
        pub: 1,
        user: 2
    });

//通过把ACCESS_LEVELS设置为常量，可以将它注入到.config()和.run()代码块中，并在整个应用范围内使用。

//下面，使用这些常量来为每个路由都定义访问级别

angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider, ACCESS_LEVELS) {
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'views/main.html',
                success_level: ACCESS_LEVELS.pub
            })
            .when('/account', {
                controller: 'AccountController',
                templateUrl: 'views/account.html',
                ACCESS_LEVELS: ACCESS_LEVELS.user
            })
            .otherwise({
                redirectTo: '/'
            });
    });
/**
 * 上面每一个路由都定义了自身的access_level，可以根据这一点判断当前用户的授权状态，以及用户的级别是否有权限访问当前路由。
 * 
 * 此时，用户可能处于以下两种状态
 * 1)未经过身份验证的匿名用户
 * 2)通过身份验证的已知用户
 * 
 * 为了验证用户的身份，需要创建一个服务来对已经存在的用户进行监视。同时需要让服务能够访问浏览器的cookie，这样当用户重新登录时，只要会话有效就
 * 无需再次进行身份验证。
 * 
 * 这个小服务包含了一些操作用户对象的辅助函数。
 */

angular.module('myApp.services', [])
    .factory('Auth', function ($cookieStore, ACCESS_LEVELS) {
        var _user = $cookieStore.get('user');

        var setUser = function (user) {
            if (!user.role || user.role < 0) {
                user.role = ACCESS_LEVELS.pub;
            }
            _user = user;
            $cookieStore.put('user', _user);
        };
        return {
            isAuthorized: function (lvl) {
                return _user.role >= lvl;
            },
            setUser: setUser,
            isLoggedIn: function () {
                return _user ? true : false;
            },
            getUser: function () {
                return _user;
            },
            getId: function () {
                return _user ? _user.id : '';
            },
            getToken: function () {
                return _user ? _user.token : '';
            },
            logout: function () {
                $cookieStore.remove('user');
                _user = null;
            }
        }
    })

//现在，当用户已经通过身份验证并登录后，可以在$routeChangeStart事件中对其有效性进行检查。
angular.module('myApp', []).run(function ($rootScope, $location, Auth) {
    //给$routeChangeStart设置监听
    $rootScope.$on('$routeChangeStart', function (evt, next, curr) {
        if (!Auth.isAuthorized(next.$$route.access_levels)) {
            if (Auth.isLoggedIn()) {
                //用户登录了，但没有访问当前视图的权限
                $location.path('/');
            } else {
                $location.path('/login');
            }
        }
    })
})

/**
 * 发送经过身份验证的请求
 * 
 * 当我们通过了身份验证，并取回了用户的授权令牌后，就可以在向服务器发送请求时使用令牌。同前面
 * 内容介绍的一样，我们希望服务器可以根据这个唯一的令牌对用户进行验证。从服务器的角度看，当收到
 * 一个带有令牌的请求时，验证令牌的有效性是服务器的责任之一。
 * 
 * 如果提供的令牌是合法的，且与一个合法用户是关联的状态，那服务器就会认为用户的身份是合法且安全的。
 * 
 * 通过令牌进行身份验证的安全性取决于通信所采用的通道，因此尽可能地使用SSL连接可以提高安全性。
 * 
 * 如果用户已经通过了身份验证，可以在发送请求时单独给每个请求都加入验证信息，或者把令牌附加到所有的请求中。
 * 
 * 手动使用身份令牌手动创建一个可以发送令牌的请求，只要将token当作参数或请求头添加到请求中即可。
 * 
 * 例如，如果我们相对服务器发出一个请求，此时我们正在这个服务器上通过Backend服务请求用户分析数据。
 */

//当向后端发送请求时，请求会被添加token参数
angular.module('myApp', []).service('Backend', function ($http, $q, $rootScope, Auth) {
    this.getDashboardData = function () {
        $http({
            method: 'GET',
            url: 'http://myserver.com/api/dashboard',
            //简单地将token当作参数(或请求头)发送就可以进行令牌验证
            params: {
                token: Auth.getToken()
            }
        }).success(function (data) {
            return data.data;
        }).catch(function (reason) {
            $q.reject(reason);
        });
    };
});


/**
 * 自动添加身份令牌
 * 更进一步，如果想要为每个请求都添加上当前用户的令牌，可以创建一个请求拦截器，并将令牌当做参数添加进请求中。
 * 
 * 创建请求拦截器的方法和前面创建相应拦截器的方法类似，只要将拦截目标从response换成requesr即可
 */

angular.module('myApp', []).config(function ($httpProvider) {
    //在这里构造拦截器
    var interceptor = function ($q, $rootScope, Auth) {
        return {
            'request': function (req) {
                return req;
            },
            'requestError': function (reqErr) {
                return reqErr;
            }
        }
    }
})

/**
 * 在请求拦截器内部可以加入向请求中添加token参数的业务逻辑，通过用户是否持有令牌来检查身份验证情况
 * 同时需要确保不会将手动添加的同名参数覆盖。
 */

// function($q,$rootScope,Auth){
//     return {
//         'request':function(req){
//             req.params=req.params||{};
//             if(Session.isAuthenticated()&&!req.params.token){
//                 req.params.token=Auth.getToken();
//             }
//             return req;
//         }
//     }
// }


/**和MongoDB通信 */
/**
 * 即使没有后端服务，我们依然可以直接同提供了RESTful接口的数据库进行通信。
 * 
 * 可以直接同Mongo进行通信，而无需创建后端服务。
 * 
 * 在这个例子中，我们使用MongoLab，这是一个SAAS服务，提供了可管理的MongoDB实例。
 * 
 * 为了同MongoDB通信，首先需要针对Restangular对象进行一些自定义配置。
 * 
 * 下面的配置会改变全局的Restangular对象。如果我们想将设置封装起来，针对单个数据库进行配置
 * 就需要创建一个服务，将自定义的Restangular对象封装起来。
 */

//首先设置API密钥，鉴于这个密钥在整个应用中都是不变的，可以将它设置成常量。
var app = angular.module('myApp', ['restangular']).constant('apiKey', 'YOUR_API_KEY');

//现在这个密钥可以被注入到应用的任何部分当中。接下来在模块的config()代码块中进行设置。

//为了使用MongoLab，需要将baseUrl设置成API的切入点
//...
app.config(function (RestangularProvider, apiKey) {
    RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/YOURDB/collections');
});

//接下来，任何发送给后端数据库的请求都需要设置API密钥。通过Restangular的setDefault RequestParams()方法可以方便地进行设置
app.config(function (RestangularProvider, apiKey) {
    //
    RestangularProvider.setDefaultRequestParams({
        apiKey: apiKey
    });
});

//接下来需要更新Restangular中的字段映射，将MongoDB的_id.$oid字段映射到Restangular的id字段上。通过
//setRestangularFields()函数可以方便地实现这个需求：
app.config(function (RestangularProvider, apiKey) {
    //...
    RestangularProvider.setRestangularFields({
        id: '_id.$oid'
    });
});

//最后需要覆盖_id字段，这个字段是MongoDB在更新记录时设置的。Mongo不允许覆盖_id字段，所以我们通过
//Restangular来模拟这个过程。鉴于Restangular会调用路由来更新元素，我们不需要担心对象无法被覆盖。

app.config(function (RestangularProvider, apiKey) {
    //..
    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {
        if (operation === 'put') {
            elem._id = undefined;
            return elem;
        }
        return elem;
    });
});

//为了保证完整性，下面是完整的配置代码
angular.module('myApp', ['restangular'])
    .constant('apiKey', 'API_KEY')
    .config(function (RestangularProvider, apiKey) {
        RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/YOURDB/collections');
        RestangularProvider.setDefaultRequestParams({
            apiKey: apiKey
        });
        RestangularProvider.setRestangularFields({
            id: '_id.$oid'
        });
        RestangularProvider.setRequestInterceptor(function (elem, operation, what) {
            if (operation === 'put') {
                elem._id = undefined;
                return elem;
            }
            return elem;
        })
    })
