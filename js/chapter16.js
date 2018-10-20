/**服务 */
/**
 * 控制器只会在需要时被实例化，并且不再需要就会被销毁。这意味着每次切换路由或重新加载视图时，当前的控制器会被AngularJS清除掉
 * 
 * 服务提供了一种能在应用的整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。
 * 
 * 服务是一个单例对象，在每个应用中只会被实例化一次(被$injector实例化)，并且是延迟加载的
 * (需要时才会被创建)。服务提供了把特定功能相关联的方法的方法集中在一起的接口。
 * 
 * 以AngularJS的$http服务为例，它提供了对浏览器的XMLHttpRequest对象的底层访问功能，我们可以通过
 * $http的API同XMLHttpRequest进行交互，而不需要因为调用这些底层代码而污染应用。
 */

//示例服务，在应用的整个生命周期内保存current_user
angular.module('myApp', []).factory('UserService', function ($http) {
    var current_user;
    return {
        getCurrentUser: function () {
            return current_user;
        },
        setCurrentUser: function (user) {
            current_user = user;
        }
    }
})

/**
 * AngularJS服务提供了一些内置服务，在任何地方使用它们的方式都是统一的。同时，为复杂应用创建我们自己的服务也是非常有用的。
 * 在AngularJS中创建自己的服务是非常有用的：只需要注册这个服务即可。服务被注册后，AngularJS编译器就可以引用它，
 * 并且在运行时把它当做依赖加载进来。服务名称的注册表使得在测试中伪造和剔除相互隔离的应用依赖变得非常容易。
 */

/**注册一个服务 */
/**
 * 使用angular.module的factory API创建服务，是最常见也是最灵活的方式
 */

angular.module('myApp.service', []).factory('githubService', function () {
    var serviceInstance = {};
    //我们的第一个服务
    return serviceInstance;
})

/**
 * 服务的工厂函数用来生成一个单例的对象或函数，这个对象或函数就是服务，它会存在于应用的整个生命周期内。当我们的AngularJS
 * 应用加载服务时，这个函数会被执行并返回一个单例的服务对象
 */

/**同创建控制器的方法一样，服务的工厂函数既可以是一个函数也可以是一个数组 */
//用方括号声明工厂
angular.module('myApp.services', []).factory('githubService', [function ($http) {

}])

/**githubService需要访问$http服务，所以我们将$http服务当作AngularJS应用的一个依赖，并将它注入到工厂函数中。 */
angular.module('myApp.services', []).factory('githubService', function ($http) {
    //我们的serviceInstance现在可以在函数定义中访问$http服务
    var serviceInstance = {};
    return serviceInstance;
})

/**无论何处需要访问GitHub API都不需要通过$http来进行了，可以通过githubService来代替，并让它处理所有复杂的业务逻辑和远程服务。 */

/**
 * GitHub API提供了一个读取用户活动流的方法（活动流就是用户记录在GitHub中的最近的事
 * 件列表）。在我们的服务中，可以创建一个访问这个API的方法，并将API的请求结果返回。
 */

/**通过将方法设置为服务对象的一个属性来将其暴露给外部 */
angular.module('myApp.services', []).factory('githubService', function ($http) {
    var githubUrl = 'http://api.github.com';
    var runUserRequest = function (username, path) {
        //从使用JSONP调用Github API的$http服务中返回promise
        return $http({
            method: 'JSONP',
            url: githubUrl + '/users/' +
            username + '/' +
            path + '?callback=JSON_CALLBACK'
        });
    };
    //返回一个带有events函数的服务对象
    //this is my test:https://api.github.com/users/study0918/events?callback=JSON_CALLBACK
    return {
        events: function (username) {
            return runUserRequest(username, 'events');
        }
    }
})

/**
 * 在AngularJS应用中，factory()方法是用来注册服务的最常规方式，同时还有其他一些API可以在特定情况下帮助我们减少代码量。
 * 1)factory()
 * 2)service()
 * 3)constant()
 * 4)value()
 * 5)provider()
 */

/**
 * factory():
 * 如前所见，factory()方法是创建和配置服务的最快捷方式。factory()函数可以接受两个参数
 * 1)name(字符串):需要注册的服务名
 * 2)getFn(函数):这个函数会在AngularJS创建服务实例时被调用
 * 因为服务是单例对象，getFn()在应用的生命周期内只会被调用一次。同其他AngularJS的服务一样，在定义服务时，getFn可以接受一个包含可被注入对象的数组或函数
 * getFn函数可以返回简单类型、函数乃至对象等任意类型的数据(同value()函数类似)。
 */

angular.module('myApp').factory('myService', function () {
    return {
        'username': 'auser'
    };
});

angular.module('myApp').factory('githubService', ['$http', function ($http) {
    return {
        getUserEvents: function (username) {
            //write something
        }
    }
}])

/**
 * service():
 * 使用service()可以注册一个支持构造函数的服务，它允许我们为服务对象注册一个构造函数。
 * service()方法接受两个参数。
 * name(字符串)
 * 要注册的服务名称。
 * constructor(函数)
 * 构造函数，我们调用它来实例化服务对象。
 * service()函数会在创建实例时通过new关键字来实例化服务对象。
 */

var Person = function ($http) {
    this.getName = function () {
        return $http({
            method: 'GET',
            url: '/api/user'
        });
    };
}

angular.service('personService', Person);

/**
 * provider()
 * 所有服务工厂都是由$provider服务创建的,$provide服务负责在运行时初始化这些提供者。
 * 提供这是一个具有$get()方法的对象，$injector通过调用$get方法创建服务实例。$provider
 * 提供了数个不同的API用于创建服务，每个方法都有各自的特殊用途。
 * 
 * 所有创建服务的方法都构建在provider方法之上。provider()方法负责在$providerCache中注册服务。
 * 
 * 从技术上说，当我们假定传入的函数就是$get()时，factory()函数就是用provider()方法注册服务的简略形式。
 */

/**下面两种方法的作用完全一样，并且会创建同一个服务。 */
angular.module('myApp', []).factory('myService', function () {
    return {
        'username': 'auser'
    };
})

//这与上面工厂的用法等价
.provider('myService', {
    $get: function () {
        return {
            'username': 'auser'
        }
    }
})

/**是否可以一直使用.factory()方法来代替.provider()呢
 * 答案取决于是否需要用AngularJS的.config()函数来对.provider()方法来返回的服务进行额外的扩展配置。
 * 同其他创建服务的方法不同，config()方法可以被注入特殊的参数。
 * 
 * 比如我们希望在应用启动前配置githubService的URL
 */

//使用'.provider'注册该服务
angular.module('myApp',[]).provider('githubService',function($http){
    //默认的私有状态
    var githubUrl='https://github.com'
    setGithubUrl: function(url){
        //通过.config改变默认属性
        if(url){
            githubUrl=url;
        }
    },
    method:JSONP,//如果需要，可以重写
    $get:function($http){
        self=this;
        return $http(){
            method: self.method,
            url: githubUrl + '/events'});
        }
    }
})

/**
 * 通过使用.provider()方法，可以在多个应用使用同一个服务时获得更强的扩展性，特别是
 * 在不同应用或开源社区之间共享服务时。
 * 
 * 在上面的例子中，provider()方法在文本githubService后添加Provider生成了一个新的提
 * 供者，githubServiceProvider可以被注入到config()函数中。
 */

angular.module('myApp',[]).config(function(){
    githubServiceProvider.setGithubUrl('git@github.com');
})

/**
 * 如果希望在config()函数中可以对服务进行配置，必须用provider()来定义服务。
 * provider()方法为服务注册提供者。可以接受两个参数。
 * 1)name(字符串):name参数在providerCache中是注册的名字。name+Provider会成为服务的提供者。同时name也是服务实例的名字。
 * 例如，如果定义了一个githubService，那它的提供者就是githubServiceProvider。
 * 2)aProvider（对象/函数/数组）
 * aProvider可以是多种形式。如果aProvider是函数，那么它会通过依赖注入被调用，并且负责通过$get方法返回一个对象。
 * 如果aProvider是数组，会被当做一个带有行内依赖注入声明的函数来处理。数组的最后一个元素应该是函数，可以返回一个带有$get方法的对象。
 * 
 * 如果aProvider是对象，它应该带有$get方法。provider()函数返回一个已经注册的提供者实例。
 * 
 */

/**直接使用provider() API是最原始的创建服务的方法： */
//在模块对象上直接创建provider的例子
angular.module('myApp',[]).provider('UserService',{
    favoriteColor:null,
    setFavoriteColor:function(newColor){
        this.favoriteColor=newColor;
    },
    //$get函数可以接受injectables
    $get:function($http){
        return {
            'name':'Ari',
             getFavoriteColor:function(){
                return this.favoriteColor||'unknown';
            }
        }
    }
})

/**
 * 用这个方法创建服务，必须返回一个定义有$get()函数的对象，否则会导致错误。
 */

//Get the injector
var injector=angular.injector(['myApp']);
injector.invoke(['UserService',function(UserService){
    //UserService returns
    // {
    //     'name':'Ari',
    //     getFavoriteColor:function(){

    //     }
    // }
}])

//.provider()是非常强大的，可以让我们在不同的应用中共享服务。

/**
 * constant():
 * 可以将一个已经存在的变量值注册为服务，并将其注入到应用的其他部分中。例如，假设我们需要给后端服务一个apikey，
 * 可以用constant()将其当作常量保存下来。
 * 
 * constant()函数可以接受两个参数
 * name(字符串):需要注册的常量的名字
 * value(常量):需要注册的常量的值(值或者对象)
 * constant()方法返回一个注册后的服务实例。
 */

 angular.module('myApp').constant('apikey','123123123')

//这个常量服务可以像其他服务一样被注入到配置函数中
//这个常量不能被装饰器拦截

angular.module('myApp').controller('MyController',function($scope,apikey){
    //可以像上面一样用apikey作为常量
    //123123123作为字符串的值
    $scope.apikey=apikey;
})

/**
 * value():
 * 如果服务的$get方法返回的是一个常量，那就没必要定义一个包含复杂功能的完整服务，可以通过value()函数方便的注册服务
 * value方法可以接受两个参数
 * name(字符串):同样是需要注册的服务名
 * value(值):将这个值作为可以注入的实例返回。
 * value()方法返回以name参数的值为名称的注册后的服务实例
 */
angular.module('myApp').value('apiKey','123123123');

/**
 * 何时使用value()和constant()
 * value()方法和constant()方法之间最主要的区别是，常量可以注入到配置函数中，而值不行。
 * 通常情况下，可以通过value()来注册服务对象或函数,用constant()来配置数据。
 */

 angular.module('myApp',[])
 .constant('apikey','123123123')
 .config(function(apikey){
     //在这里apikey将被赋值为123123123
     //就像上面设置的那样
 })
 .value('FBid','231231231')
 .config(function(FBid){
     //这里抛出一个错误，未知的provider:FBid
     //因为在config函数内部无法访问这个值
 });

 /**
  * decorator()
  * $provide服务提供了在服务实例创建时对其进行拦截的功能，可以对服务进行扩展，或者用另外的内容完全代替它。
  * 装饰器是非常强大的，它不仅可以应用在我们自己的服务上，也可以对AngularJS的核心服务进行拦截，中断
  * 甚至替换功能的操作。事实上AngularJS中很多功能的测试就是借助$provide.decorator()
  * 建立的。
  * 
  * 对服务进行装饰的场景有很多，比如对服务进行扩展，将外部缓存进localStorage的功能，
  * 或者对服务进行封装以便在开发中进行调试和跟踪等
  * 
  * 例如，我们想给之前定义的githubService服务加入日志功能，可以借助decorator()函数方便地
  * 实现这个功能，而不需要对原始的服务进行修改。
  * 
  * decorator()函数可以接受两个参数。
  * name(字符串):将要拦截的服务名称。
  * decoratorFn(函数):在服务实例化时调用该函数，这个函数由injector.invoke调用，可以将服务注入这个函数中
  * 
  * $delegate是可以进行装饰的最原始的服务，为了装饰其他服务，需要将其注入进装饰器
  */

  //下面的代码展示了如何给githubService添加装饰器。从而为每个请求都加上一个时间戳
  var githubDecorator=function($delegate,$log){
      var events=function(path){
          var startedAt=new Date();
          var events=$delegate.events(path);
          //事件是一个promise
          events.finally(function(){
              $log.info('Fetching events'+"took"+(new Date()-startedAt)+"ms");
          });
          return events;
      }
      return {
          events:events
      };
  };

  angular.module('myApp').config(function($provide){
      $provide.decorator('githubService',githubDecorator);
  });