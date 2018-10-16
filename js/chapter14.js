/**
 * ng-view是由ngRoute模块提供的一个特殊指令，它的独特作用是在HTML中给$route对应的视图内容占位。
 * 它会创建自己的作用域并将模板嵌套在内部。
 * ng-view是一个优先级为1000的终极指令。AngularJS不会运行同一个元素上的低优先级指令(例如<div ng-view></div>元素上其他指令都是没有意义的)
 * 
 * ngView指令遵循以下规则:
 * 1)每次触发$routeChangeSuccess事件，视图都会更新
 * 2)如果某个模板同当前的路由相关联：
 *   创建一个新的作用域
 *   移除上一个视图，同上一个作用域也会被清除
 *   将新的作用域同当前模板关联在一起
 *   如果路由中有相关的定义，那么就把对应的控制器同当前作用域关联起来
 *   触发$viewContentLoaded事件
 *   如果提供了onload属性，调用该属性所指定的函数
 */

/**
 * 路由
 * 我们可以使用AngularJS提供的when和otherwise两个方法来定义应用的路由。
 * 用config函数在特定的模块或应用中定义路由。
 */

angular.module('myApp', []).config(['$routeProvider', function ($routeProvider) {
    //在这里定义路由
}])

/**
 * 现在，我们可以用when方法来添加一个特定的路由。这个方法可以接受两个参数(when(path,route)).
 * 下面的例子展示了如何创建一个独立的路由:
 * 
 * 第一个参数是路由路径，这个路径会与$loaction.path进行匹配，$location.path也就是当前URL
 * 的路径。如果路径后面还有其他内容，或使用了双斜线也可以正常匹配。我们可以在URL中存储参数，参数
 * 需要以冒号开头(例如:name)，后面会讨论如何用$routeParams读取这些参数。
 * 
 * 第二个参数是配置对象，决定了当第一个参数中的路由能够匹配时具体做些什么。配置对象中可以进行设置
 * 的属性包括controller、template、templateURL、resolve、redirectTo和reloadOnSearch
 */

angular.module('myApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
}]);

/**
 * 一个复杂的路由方案会包含多个路由，以及一个可以将所有意外路径进行重定向的捕获器。
 */

angular.module('myApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            resolve: {
                user: function (SessionService) {
                    return SessionService.getCurrentUser();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

/**
 * 1.controller
 * controller:'MyController'或者
 * controller:function($scope){}
 * 如果配置对象中设置了controller属性，那么这个指定的控制器会与路由所创建的新作用
 * 域关联在一起。如果参数值是字符型，会在模块中所有注册过的控制器中查找对应的内容，然后
 * 与路由关联在一起。如果参数值是函数型，这个函数会作为模板中DOM元素的控制器并与模板
 * 进行关联。
 * 
 * 2.template
 * template: '<div><h2>Route</h2></div>'
 * AngularJS会将配置对象中的HTML模板渲染到对应的具有ng-view指令的DOM元素中。
 * 
 * 3. templateUrl
 * templateUrl: 'views/template_name.html'
 * 应用会根据templateUrl属性所指定的路径通过XHR读取视图（或者从$templateCache中读
 * 取）。如果能够找到并读取这个模板，AngularJS会将模板的内容渲染到具有ng-view指令的DOM
 * 元素中。
 * 
 * 4.resolve
 * 如果设置了resolve属性，AngularJS会将列表中的元素都注入到控制器中。如果这些依赖是promisde对象
 * 它们在控制器加载以及$routeChangeSuccess被触发之前，会被resolve并设置一个值
 * 
 * 列表对象可以是:
 * 1)键，键值是会被注入到控制器中的依赖的名字
 * 2)工厂,即可以是一个服务的名字，也可以是一个返回值，它是会被注入到控制器中的函数或可以被resolve的promise对象
 * 
 * 5.redirectTo:
 * redirectTo:'/home'
 * 或者redirectTo:function(route,path,search)
 * 如果redirectTo属性的值是一个字符串，那么路径会被替换成这个值,并根据这个目标路径触发路由变化
 * 如果redirectTo属性的值是一个函数，那么路径会被替换成函数的返回值，并根据这个目标路径触发路由变化。
 * 如果redirectTo属性的值是一个函数，AngularJS会在调用它时传入下面的三个参数中:
 * 1)从当前路径中提取出的路由参数
 * 2)当前路径
 * 3)当前URL中的查询串
 * 
 * 6.reloadOnSearch:
 * 如果reloadOnSearch选项被设置为true(默认),当$location.search()发生变化时会重新加载路由。如果设置为false，那么当
 * URL中的查询串部分发生变化时就不会重新加载路由。这个小窍门对路由嵌套和原地分页等需求非常有用。
 * 
 * $routeParams:
 * 前面提到如果我们在路由参数的前面加上:,AngularJS就会把它解析出来并传递给$routeParams.
 */

// resolve:{
//     'data':['$http',function($http){
//         return $http.get('/api').then(function success(resp){
//             return response.data;
//         },function error(reason){
//             return false;
//         })
//     }]
// }

//下面的例子中设置了两个路由:一个首页路由和一个收件箱路由，同时首页路由被设置成默认路由
angular.module('MyApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
        .when('/inbox/:name', {
            controller: 'InboxController',
            templateUrl: 'views/inbox.html'
        })
        .otherwise({
            redirectTo: '/'
        })
}])

/**
 * AngularJS会在$routeParams中添加一个名为name的键，它的值会被设置为加载进来的URL中的值
 * 如果浏览器加载/inbox/all这个URL,那么$routeParams对象看起来是下面这样
 * {name:'all'}
 * 需要注意，如果想要在控制器中访问这些变量，需要把$routeParams注入进控制器
 * app.controller('InboxController',function($scope,$routeParams){//在这里访问$routeParams})
 */
angular.module('MyApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/inbox/:name', {
            controller: 'InboxController',
            templateUrl: 'views/inbox.html'
        })
}])

/**
 * $location服务
 * AngularJS提供了一个服务用以解析地址栏中的URL，并让你可以访问应用当前路径所对应的路由。它同样提供了修改路径和处理各种形式导航的能力。
 * 
 * $location服务对JavaScript中的window.location对象的API进行了更优雅地封装，并且和AngularJS集成在一起。
 * 
 * 当应用需要在内部进行跳转时是使用$location服务的最佳场景，比如当用户注册后，修改或者登陆后进行的跳转。
 * 
 * $location服务没有刷新整个页面的能力。如果需要刷新整个页面，需要使用$window.location(window.location的一个接口)
 * 
 * 1.path() path()用来获取页面当前的路径  $location.path();//返回当前路径
 * 修改当前路径并跳转到应用中的另一个URL:$location.path('/');//把路径修改为'/'路由
 * path()方法直接和HTML5的历史API进行交互，所有用户可通过点击后腿按钮退回到上一个页面
 * 
 * 2.replace()
 * 如果你希望跳转后用户不能点击后腿按钮(对于登录之后的跳转这种发生在某个跳转之后的再次跳转很有用),AngularJS提供了replace()方法来实现这个功能
 * $location.path('/home');
 * $location.replace();
 * 或者$location.path('/home').replace();
 * 
 * 3.absUrl():absUrl()方法用来获取编码后的完整URL
 * $location.absUrl()
 * 
 * 4.hash():hash()方法用来获取URL中的hash片段
 * $location.hash();//返回当前的hash片段
 * 
 * 5.host():host()方法用来获取URL中的主机
 * $location.host();//当前URL的主机
 * 
 * 6.port():port()方法用来获取URL中的端口号
 * $location.port();//获取当前URL的端口
 * 
 * 7.protocol():protocol()方法用来获取URL中的协议
 * $location.protocol();//当前URL的协议
 * 
 * 8.search():search()方法用来获取URL中的查询串
 * $location.search()
 * 我们可以向这个方法中传入新的查询参数，来修改URL中的查询串部分
 * //用对象设置查询
 * $location.search({name:'Ari',username:'auser'});
 * //用字符串设置查询
 * $location.search('name=Ari&username=auser');
 * search方法可以接受两个参数
 * 1)search（可选，字符串或对象）:这个参数代表新的查询参数。hash对象的值可以是数组。
 * 2)paramValue（可选，字符串）:如果search参数的类型是字符串，那么paramValue会做为该参数的值覆盖URL当中的对应值。如果paramValue的值是null，对应的参数会被移除掉。
 * 
 * 9.url():url()方法用来获取当前页面的URL：$location.url(); // 该URL的字符串
 * 如果调用url()方法时传了参数，会设置并修改当前的URL，这会同时修改URL中的路径、查询串和hash，并返回$location。
 * // 设置新的URL
 * $location.url('/home?name=Ari#hashthing');
 * url()方法可以接受两个参数。
 * url（可选，字符串）:新的URL的基础的前缀。
 * replace（可选，字符串）:想要修改成的路径。
 */

/**
 * 路由模式
 * 不同的路由模式在浏览器的地址栏中会以不同的URL格式呈现。$location服务默认会使用标签模式来进行路由。
 * 路由模式决定你的站点在URL常成什么样子。
 * 1.标签模式
 * 标签是AngularJS用来同你的应用内部进行链接的技巧。标签模式是HTML5模式的降级方案，URL路径会以#符号开头。
 * 标签模式不需要重写<a href=""></a>标签，也不需要任何服务器端的支持。如果没有进行额外的指定，
 * AngularJS将默认使用标签模式。
 * 
 * 使用标签模式的URL看起来是这样的:
 * http://yoursite.com/#!/inbox/all
 * 如果要显式指定配置并使用标签模式，需要在应用模块的config函数中进行配置
 * angular.module('myApp',['ngRoute']).config(['$locationProvider',function($locationProvider){$locationProvider.htmlMode(false);}])
 * 
 * 我们还可以配置hashPrefix,也就是标签模式下标签默认的前缀!符号。这个前缀也是AngularJS在比较老的浏览器中降级机制的一部分。这个符号是可以配置的:
 * angular.module('myApp',['ngRoute']).config(['$locationProvider',function($locationProvider){$locationProvider.htmlMode(false);$locationProvider.hashPrefix('!');}])
 */

/**
 * HTML5模式
 * AngularJS支持的另一种路由模式是html5模式。在这个模式中，URL看起来和普通的URL一样（在老式浏览器中看起来还是使用标签的URL）
 * 例如:同样的路由在HTML5模式中看起来是这样的:http://yoursite.com/inbox/all
 * 在AngularJS内部，$location服务通过HTML5历史API让应用能够使用普通的URL路径来路由。当浏览器不支持HTML5历史API时，$location服务会自动使用标签模式的URL作为替代方案。
 * $location服务还有一个有趣的功能，当一个支持HTML5历史API的现代浏览器加载了一个带标签的URL时，它会为用户重写这个URL。
 * 
 * 在HTML5模式中，AngularJS会负责重写<a href=""></a>中的链接。也就是说AngularJS会
 * 根据浏览器的能力在编译时决定是否要重写href=""中的链接。
 * 例如<a href="/person/42?all=true">Person</a>这个标签，在老式浏览器中会被重写成
 * 标签模式的URL：/index.html#!/person/42?all=true。但在现代浏览器中会URL会保持本来
 * 的样子。
 * 后端服务器也需要支持URL重写，服务器需要确保所有请求都返回index.html，以支持HTML5
 * 模式。这样才能确保由AngularJS应用来处理路由。
 * 当在HTML5模式的AngularJS中写链接时，永远都不要使用相对路径。如果你的应用是在根
 * 路径中加载的，这不会有什么问题，但如果是在其他路径中，AngularJS应用就无法正确处理路
 * 由了。
 * 另一个选择是在HTML文档的HEAD中用<base>标签来指定应用的基础URL：
 * <base href="/base/url" />
 */

/**
 * 路由事件
 * $route服务在路由过程中的每个阶段都会触发不同的事件，可以为这些不同的路由事件设置
 * 监听器并做出响应。
 * 这个功能对于控制不同的路由事件，以及探测用户的登录和授权状态等场景是非常有用的。
 * 我们需要给路由设置事件监听器，用$rootScope来监听这些事件。
 * 1. $routeChangeStart
 * AngularJS在路由变化之前会广播$routeChangeStart事件。在这一步中，路由服务会开始加
 * 载路由变化所需要的所有依赖，并且模板和resolve键中的promise也会被resolve。
 * $routeChangeStart事件带有两个参数：
 * 1)将要导航到的下一个URL；
 * 2)路由变化前的URL。
 * 
 * 2. $routeChangeSuccess
 * AngularJS会在路由的依赖被加载后广播$routeChangeSuccess事件。
 * $routeChangeStart事件带有三个参数：
 * 1)原始的AngularJS evt对象；
 * 2)用户当前所处的路由；
 * 3)上一个路由（如果当前是第一个路由，则为undefined）。
 * 
 * 3.$routeChangeError
 * AngularJS会在任何一个promise被拒绝或者失败时广播$routeChangeError事件。
 * $routeChangeError事件有三个参数：
 * 1)当前路由的信息；
 * 2)上一个路由的信息
 * 3)被拒绝的promise的错误信息。
 * 
 * 4.$routeUpdate
 * AngularJS在reloadOnSearch属性被设置为false的情况下，重新使用某个控制器的实例时，
 * 会广播$routeUpdate事件。
 */

/**
 * 更多关于路由的内容
 * 页面重新加载
 * $location服务不会重新加载整个页面，它只会单纯地改变URL。如果我们想重新加载整个
 * 页面，需要用$window服务来设置地址。
 * $window.location.href = "/reload/page";
 * 
 * 异步的地址变化
 * 如果我们想要在作用域的生命周期外使用$location服务，必须用$apply函数将变化抛到
 * 应用外部。因为$location服务是基于$digest来驱动浏览器的地址变化，以使路由事件正常工
 * 作的。
 */
