/**
 * Google最初编写Ajax采集规范就是为了使用hashbang语法传送URL，这是一个为JS应用程序
 * 创建永久链接的原始方法。
 * 
 * 这需要在应用路由中使用hashPrefix（默认的）配置我们的应用：
 */

angular.module('myApp',[]).config(['$location',function($location){
    $location.hashPrefix('!');
}])

/**
 * 新的HTML5 pushState并不以相同的方式工作:它会修改浏览器的URL和历史记录。为了让Angular
 * 应用'欺骗'搜索机器人，可以在header中添加一个简单的元素
 */

/**
 * 假设要在$location服务中使用HTML5模式，可以像这样设置页面以使用html5Mode
 */

angular.module('myApp',[]).config(['$routeProvider',function($routeProvider){
    $routeProvider.html5Mode(true);
}])

/**
 * 服务端处理SEO的选项
 * 有许多选项可以使我们的站点更好地支持搜索引擎优化（Search Engine Optimization，SEO）。
 * 我们将会使用三种不同的方式演示如何从服务器端交付应用：
 * 1)使用Node/Express中间件
 * 2)使用Apache重写URL
 * 3)使用Ngnix代理URL
 */

/**
 * 使用Node/Express中间件
 * 尽管在这个例子中我们使用的是NodeJS，但这一实现只是使用后端提供静态
 * HTML的一种方式。无论你使用什么样的后端，这一方案都是可行的。
 * 为了使用NodeJS和Express（基于NodeJS的Web应用程序框架）交付静态HTML，我们必须添
 * 加一些用来在查询参数中查找_escaped_fragment_的中间件：
 * 
 * 这个中间件认为我们的快照存放在叫做“/snapshots”的顶级目录中，然后会基于请求路径为
 * 文件提供服务。
 * 
 * 例如，当请求/时，它会提供index.html；当请求为/about时，它会提供snapshots目录中的
 * about.html。
 */

app.use(function(req,res,next){
    var fragment=req.query._escaped_fragment_;
    if(!fragment) return next();
    //如果fragment为空，则服务于首页
    if(fragment===''||fragment==='/'){
        fragment="/index.html";
    }
    //如果fragment不是以'/'开始的，则将'/'前置插入fragment
    if(fragment.charAt(0)!=='/'){
        fragment='/'+fragment;
    }
    //如果fragment不是以'.html'结尾的，则将它插入fragment中
    if(fragment.indexOf('.html')==-1){
        fragment+='.html';
    }
    //服务于静态html快照
    try{
        var file=__dirname+'/snapshots'+fragment;
        res.sendfile(files);
    }catch(err){
        res.send(404);
    }
})

/**
 * 使用Nginx代理URL
 * 如果使用Nginx为Angular应用提供服务，并且在查询字符串中有一个_escaped_fragment_参数，那
 * 也可以添加一些配置以便提供应用的快照。
 * 
 * 和Apache不同，Nginx无需启动什么模块，因此可以简单地更新配置来处理替换文件路径的问题。
 * 在Nginx配置文件中(比如/etc/nginx/nginx.conf)，需要确保配置信息看起来像这样
 */

