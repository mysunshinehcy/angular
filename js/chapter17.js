/**
 * 没有后端的支持，我们只能展示随页面一起加载进来的数据。AngularJS提供了几种将应用同来自远程服务器的信息集成在一起。
 */

/**
 * 使用$http: 我们可以使用内置$http服务直接同外部进行通信。$http服务只是简单的封装了浏览器
 * 原声的XMLHttpRequest对象。
 * 
 * $http服务是只能接受一个参数的函数，这个参数是一个对象，包含了用来生成HTTP请求的
 * 配置内容。这个函数返回一个promise对象，具有success和error两个方法。
 */

//这个方法最基本的使用场景如下
$http({
    method: 'GET',
    url: '/api/user.json'
}).success(function (data, status, headers, config) {
    //当响应准备就绪时调用
}).error(function (data, status, headers, config) {
    //当响应以错误状态返回时调用
})

/**
 * 请注意，看上去我们向$http中传入了一个回调函数供响应返回调用，但事实并非如此，这个方法实际上返回了一个promise对象。
 * 
 * 当promise返回时，我们可以将$http方法的运行结果当做变量一并返回，并将其他promise同它串联在一起，进行链式调用。
 * 
 * 在创建服务时会频繁使用链式调用技术，因此服务可以返回一个promise对象，而不需要回调函数。
 */

var promise = $http({
    method: 'GET',
    url: '/api/users.json'
})

/**
 *由于$http方法返回一个promise对象，我们可以在响应返回时用then方法来处理回调。如果使用then方法，会得到一个特殊
 的参数，它代表了相应对象的成功或失败信息，还可以接受两个可选的函数作为参数。或者使用success和error回调代替。
 */
promise.then(function (resp) {
    //resp是一个响应对象
}, function (resp) {
    //带有错误信息的resp
});


//或者使用success/error方法
promise.success(function (data, status, headers, config) {
    //处理成功响应
});
//错误处理
promise.error(function (data, status, headers, config) {
    //处理非成功的响应
})

/**
 * 如果响应状态码在200和299之间，会认为响应是成功的，success回调会被调用，否则error回调会被调用。
 * 注意，如果响应结果是重定向的，XMLHttpRequest会跟进这个重定向，error回调并不会被调用。
 *  */

/**
 * 我们可以调用HttpPromise对象上的then()、success()和error()方法。then()方法与其他两种方法的最主要的区别是，它
 * 会接收到完整的响应对象,而success()和error()则会对响应的对象进行析构。
 * 
 * 调用http方法后，在下一个$digest循环运行之前它并不会被真正执行。尽管大部分情况下我嗯都是在$apply
 * 代码块内部使用$http，但也可以在AngularJS的$digest循环以外执行这个方法。
 * 
 * 如果要在AngularJS的$digest循环以外执行$http函数，需要将其封装在一个$apply代码块中。这样会强制$digest循环执行，我们
 * 的promise可以按照预期那样呗resolve.
 */

$scope.$apply(function () {
    $http({
        method: 'GET',
        url: '/api/users.json'
    });
})

/**
 * 快捷方法
 * $http服务提供了一些顺手的快捷方法供我们使用，这些方法简化了复杂设置，只需要提供URL和HTTP
 * 方法(或者POST或PUT请求中包含的数据)即可。
 * 用这些快捷方法，可以将上面的$http的GET请求修改成:
 */

 //快捷的GET请求
 $http.get('/api/users.json');

 /**
  * 1.get():这个方法是发送GET请求的快捷方式
  * get()函数可以接受两个参数
  * url(字符串):一个绝对或相对路径的URL，代表请求的目的地。
  * config(可选，对象):这是一个可选的设置对象
  * get()方法返回HttpPromise对象。
  * 
  * 2.delete():这是用来发送DELETE请求的快捷方式。
  * delete()函数可以接受两个参数。
  * url（字符串）:一个绝对或相对路径的URL，代表请求的目的地。
  * config（可选，对象）:这是一个可选的设置对象。
  * delete()方法返回HttpPromise对象。
  * 
  * 3.head():这是用来发送HEAD请求的快捷方式。
  * head()函数可以接受两个参数。
  * url（字符串）:一个绝对或相对路径的URL，代表请求的目的地。
  * config（可选，对象）:这是一个可选的设置对象。head()方法返回HttpPromise对象。
  * 
  * 4.jsonp():这是用来发送JSONP请求的快捷方式。
  * jsonp()函数可以接受两个参数。
  * url（字符串）:一个绝对或相对路径的URL，代表请求的目的地。为了发送JSONP请求，其中必须包含
  * $http.jsonp("/api/users.json?callback=JSON_CALLBACK");
  * config（可选，对象）:这是一个可选的设置对象。jsonp()方法返回HttpPromise对象。
  * 
  * 5. post():这是用来发送POST请求的快捷方式。
  * post()函数可以接受三个参数。
  * url（字符串）:一个绝对或相对路径的URL，代表请求的目的地。
  * data（对象或字符串）:这个对象包含请求的数据。
  * config（可选，对象）:这是一个可选的设置对象。
  * post()方法返回HttpPromise对象。
  * 
  * 6. put():这是用来发送PUT请求的快捷方式。
  * put()函数可以接受三个参数。
  * url（字符串）:一个绝对或相对路径的URL，代表请求的目的地。
  * data（对象或字符串）:这个对象包含请求的数据。
  * config（可选，对象）:这是一个可选的设置对象。
  * put()方法返回HttpPromise对象。
  */

  /**设置对象 */
  /**
   * 当我们将$http当作函数来调用时，需要传入一个设置对象，用来说明如何构造XHR对象。
   * 例如，可以像下面这样将$http当作函数来调用：
   */
  $http({
      method:'GET',
      url:'/api/users.json',
      params:{
          'username':'asuser'
      }
  })

  /**
   * 设置对象包含以下键
   * 1.method(字符串):
   * 这个键是我们希望发送的请求的HTTP方法。它的值是下列各项其中之一:GET’、‘DELETE’、‘HEAD’、‘JSONP’、‘POST’、‘PUT’。
   * 
   * 2. url（字符串）
   * 绝对或相对的URL，是请求的目标。
   * 
   * 3.params(字符串map或对象)
   * 这个键的值是一个字符串map或对象，会被转换成查询字符串追加到URL后面。如果值不是字符串，会被JSON
   * 序列化
   * //参数会被转换成?name=ari的形式
   * $http({params:{'name':'ari'}})
   * 
   * 4.data(字符串或对象)
   * 这个对象中包含了将会被当做消息体发送给服务器的数据。通常在发送POST请求时使用
   * 从AngularJS1.3开始，它还可以在POST请求里发送二进制数据。要发送一个blob对象。你可以简单地通过
   * 使用data参数来传递它。例如:
   * var blob = new Blob(['Hello World'], {type: 'text/plain'});
   * $http({
   *   method: 'POST',
   *   url: '/',
   *   data: blob
   * });
   * 
   * 5.一个列表，每一个元素都是一个函数，它会返回代表随请求发送的HTTP头。如果函数的返回值是null
   * 对应的头不会被发送。
   * 
   * 
   * 6. xsrfHeaderName（字符串）
   * 保存XSFR令牌的HTTP头的名称。
   * 
   * 7. xsrfCookieName（字符串）
   * 保存XSFR令牌的cookie的名称。
   * 
   * 8. transformRequest（函数或函数数组）
   * 这是一个函数或函数数组，用来对HTTP请求的请求体和头信息进行转换，并返回转换后的
   * 版本。通常用于在请求发送给服务器之前对其进行序列化。
   * 
   * 这个函数看起来是这样的：
   * function(data,headers) {}
   * 
   * 9. transformResponse（函数或函数数组）
   * 这是一个函数或函数数组，用来对HTTP响应的响应体和头信息进行转换，并返回转换后的
   * 版本。通常用来进行反序列化。
   * 这个函数看起来是这样的：
   * function(data,headers) {}
   * 
   * 10. cache（布尔型或缓存对象）
   * 如果cache属性被设置为true，那么AngularJS会用默认的$http缓存来对GET请求进行缓存。
   * 如果cache属性被设置为一个$cacheFactory对象的实例，那么这个对象会被用来对GET请求进
   * 行缓存。
   * 
   * 11. timeout（数值型或promise对象）
   * 如果timeout被设置为一个数值，那么请求将会在推迟timeout指定的毫秒数后再发送。如
   * 果被设置为一个promise对象，那么当该promise对象被resolve时请求会被中止。
   * 
   * 12. withCredentials（布尔型）
   * 默认情况下，CORS请求不会发送cookie， 而withCredentials标记会在请求中加入
   * Access-Control-Allow-Credentials头，这样请求就会将目标域的cookie包含在请求中。
   * 
   * 13. responseType（字符串）
   * responseType选项会在请求中设置XMLHttpRequestResponseType属性。我们可以使用以下
   * HTTP请求类型其中之一：
   * 1)""（字符串，默认）
   * 2)"arraybuffer"（ArrayBuffer）；
   * 3)"blob"（blob对象）；
   * 4)"document"（HTTP文档）；
   * 5)"json"（从JSON对象解析而来的JSON字符串）；
   * 6)"text"（字符串）
   * 7)"moz-blob"（Firefox的接收进度事件）
   * 8)"moz-chunked-text"（文本流）；
   * 9)"moz-chunked-arraybuffer"（ArrayBuffer流）。
   */

   /**
    * 响应对象
    * AngularJS传递给then()方法的响应对象包含四个属性。
    * 1)data（字符串或对象）:这个数据代表转换过后的响应体（如果定义了转换的话）。
    * 2)status（数值型）:响应的HTTP状态码。
    * 3)headers（函数）:这个函数是头信息的getter函数，可以接受一个参数，用来获取对应名字的值。例如，用如下代码获取X-Auth-ID的值：
    * $http({
    *    method: 'GET',
    *    url: '/api/users.json'
    * }).then (resp) {
    * // 读取X-Auth-ID
    *    resp.headers('X-Auth-ID');
    * });
    * 4)config（对象）:
    * 这个对象是用来生成原始请求的完整设置对象。
    * 5)statusText（字符串）
    * 这个字符串是响应的HTTP状态文本。
    */

    /**
     * 缓存HTTP请求
     * 默认情况下，$http服务不会对请求进行本地缓存。在发送单独的请求时，我们可以通过向$http请求传入一个布尔值或者缓存实例来启用缓存。
     * 
     */

     $http.get('/api/users.json',{cache:true}).success(function(data){
         //
     }).error(function(data){
        //
     })

     /**
      * 第一次发送请求时，$http服务会向/api/user.json发送一个GET请求。第二次发送同一个GET请求时，$http服务会从缓存
      * 中取回请求的结果，而不会真的发送一个HTTP GET请求。
      * 
      * 在这个例子里，由于设置了启用缓存，AngularJS默认会使用$cacheFactory,这个服务是AngularJS在启动时自动创建的。
      * 
      * 如果要使用LRU(Least Recenlty Used，最近最少使用)缓存，可以像下面这样传入缓存实例对象:
      * 
      */

     var lru=$cacheFactory('lru'{
         capacity:20
     });

     //$http请求
     $http.get('/api/users.json',{cache:lru})
     .success(function(data){

     }).error(function(data){

     })

     /**
      * 现在，最新的20个请求会被缓存。第21个请求会导致LRU从缓存中将时间比较老的请求移除掉。
      * 
      * 每次发送请求时都传入一个自定义缓存是很麻烦的事情(即使在服务中)。可以通过应用的.config()函数给所有$http请求设置一个默认的缓存
      */

      angular.module("myApp",[]).config(function($httpProvider,$cacheFactory){
          $httpProvider.defaults.cache=$cacheFactory('lru',{
              capacity:20
          })
      })

      //现在，所有的请求都会使用我们自定义的LRU缓存了。

      /**
       * 拦截器
       * 任何时候我们如果想要为请求添加全局功能，例如身份验证，错误处理等，在请求发送给服务器之前或者从服务器返回时对其进行拦截，是比较好的实现手段。
       * 
       * 例如对于身份验证，如果服务器返回401状态码，我们会希望将用户重定向到登录页面。
       * 
       * AngularJS通过拦截器提供了一个从全局层面对响应进行处理的途径。
       * 
       * 拦截器，实际上是$http服务的基础中间件，用来向应用的业务流程中注入新的逻辑。
       * 
       * 拦截器的核心是服务工厂，通过向$httpProvider.interceptors数组中添加服务工厂,在$httpProvider中进行注册。
       * 
       * 一个有四种拦截器，两种成功拦截器，两种失败拦截器。
       * 
       * 1)request
       * AngularJS通过$http设置对象来对请求拦截器进行调用。它可以对设置对象进行修改，或者创建一个新的设置对象，它需要返回一个更新过的设置对象，或者一个可以返回新的设置对象的promise
       * 2)response:
       * AngularJS通过$http设置对象来响应拦截器进行调用。它可以对响应进行修改，或者创建一个新的响应，它需要返回一个更新过的响应，或者一个可以返回新响应的promisde.
       * 3)requestError:
       * AngularJS会在上一个请求拦截器抛出错误，或者promise被reject时调用此拦截器。
       * 4)responseError:
       * AngularJS会在上一个响应拦截器抛出错误，或者promisde被reject时调用此拦截器。
       * 
       * 调勇模块的.factory()方法来创建拦截器，可以在服务中添加一种或多种拦截器
       */

       angular.module('myApp',[]).factory('myInterceptor',function($q){
           var interceptor={
               'request':function(config){
                   //成功的请求方法
                   return config;//或者$q.when(config);
               },
               'response':function(response){
                   //响应成功
                   return response;//或者$q.when(config);
               },
               'requestError':function(rejection){
                   //请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
                   return response;//或新的promise
                   //或者，可以通过返回一个rejection来阻止下一步
                   //return $q.reject(rejection);
               },
               'responseError':function(rejection){
                   //请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
                   return rejection;//或新的promise
                   // 或者，可以通过返回一个rejection来阻止下一步
                   // return $q.reject(rejection);
               }
           };
           return interceptor;
       });

       //我们需要使用$httpProvider在.config()函数中注册拦截器
       angular.module('myApp',[]).config(function($httpProvider){
           $httpProvider.interceptors.push('myInterceptor');
       })

       /**
        * 设置$httpProvider
        * 使用.config()可以向所有请求头中添加特定的HTTP头
        * 
        * 默认的请求头保存在$httpProvider.defaults.headers.common对象中。默认的头如下所示
        * Accept:application/json,text/plain,
        * 
        * 通过.config()函数可以对这些头进行修改或扩充，如下所示
        * 
        * 
        */

       angular.module('myApp',[]).config(function($httpProvider){
           $httpProvider.defaults.headers.common['X-Request-By']='MyAngualrApp';
       });

       /**
        * 也可以在运行时通过$http对象的defaults属性对这些默认值进行修改。例如，通过如下方法可以动态添加一个头
        */

        $http.defaults.common['X-Auth']='RandomString'

        /**
         * 这个功能可以通过使用请求转换器实现，对于单个请求，也可以通过设置$http请求的headers选项实现
         * 也可以只对POST和PUT类型的请求进行设置。POST请求的默认头如下所示
         * content-Type:application/json
         * 
         * 可以在.config函数中对POST请求的头进行修改或扩充，如下所示
         * angular.module('myApp',[])
         * .config(function($httpProvider){
         *      $httpProvider.defaults.headers.post['X-Posted-By']='MyAngularApp';
         *  });
         * 
         * 也可以对所有的PUT请求做同样的设置。PUT请求的默认头如下所示：
         * Content-Type: application/json
         * 可以在.config()函数中对PUT请求的头进行修改或扩充，如下所示：
         * angular.module('myApp', []) .config(function($httpProvider){
         *      $httpProvider.defaults.headers.put['X-Posted-By'] = 'MyAngularApp';
         * })
         */

/**
 * 使用$resource
 * AngularJS还提供另外一个非常有用的可选服务$resource供我们使用。这个服务可以创建一个资源对象，
 * 我们可以用它非常方便地同支持RESTful的服务端数据源进行交互，当同支持RESTful的数据模型一起工作时，它就派上用场了。
 * 
 * REST是Representational State Transfer（表征状态转移）的缩写，是服务器用来智能化地提供数据服务的一种方式。
 * 
 * $resource服务难以置信地方便，它对很多复杂的细节进行了抽象，只留下同后端服务器进行真正有意义的交互，前提是服务器支持RESTful的数据模型。
 * 
 * $resource服务可以将$http请求转换成save和update等简单形式。我们可以通过$resource服务来处理复杂的细节，而无需自己编写重复和繁琐的业务代码。
 * 
 * https://www.bootcdn.cn/angular-resource/
 * 
 * 这个模块需要在AngularJS之后进行引用。
 * <script src="js/vendor/angular.js"></script>
 * <script src="js/vendor/angular-resource.js"></script>
 * 最后，需要在我们的应用中将ngResource当作依赖进行引用
 * angular.module('myApp', ['ngResource']);
 * 现在可以使用$resource服务了。
 */

 /**
  * 应用$resource
  * $resource服务本身是一个创建资源对象的工厂。返回的$resource对象中包含了同后端服务
  * 器进行交互的高层API。
  * var User=$resource('/api/users/:userId.json',{
  *     userId:'@id'
  * });
  * 
  * $resource返回包含了几个默认动作的资源类对象。可以把User对象理解成同RESTful的后
  * 端服务进行交互的接口。
  * 
  * 资源类对象本身包含的方法可以同后端服务进行简洁的交互。
  * 默认情况下，这个对象包含了五个常用的方法，可以同资源集合进行交互，或者创建资源对
  * 象的实例。它会生成两个基于HTTP GET类型的方法，以及三个非GET类型的方法。
  */

  /**
   * 基于HTTP GET方法
   * 两个HTTP GET类型的方法可以接受下面三个参数
   * params(对象):随请求一起发送的参数。它们可以是URL中的具名参数，也可以是查询参数。
   * successFn(函数):
   * 当HTTP响应成功时的回调函数。
   * error(函数):
   * 当HTTP响应非成功时的回调函数。
   * 
   * 1. get(params, successFn, errorFn)
   * get方法向指定URL发送一个GET请求，并期望一个JSON类型的响应。
   * 像上面那样不定义具体的参数，get()请求通常被用来获取单个资源。
   * // 发起一个请求：
   * // GET /api/users
   * User.get(function(resp) {
   * // 处理响应成功
   * }, function(err) {
   * // 处理错误
   * });
   * 如果参数中传入了具名参数（我们例子中的参数是id），那么get()方法会向包含id的URL发送请求：
   * // 发起一个请求：
   * // GET /api/users/123
   * User.get({
   *   id: '123'
   * }, function(resp) {
   * // 处理响应成功
   * }, function(err) {
   * // 处理错误
   * });
   * 
   * 2. query(params, successFn, errorFn)
   * query向指定URL发送一个GET请求，并期望返回一个JSON格式的资源对象集合。
   * // 发起一个请求：
   * // GET /api/users
   * User.query(function(users) {
   * // 读取集合中第一个用户
   * var user = users[0];
   * });
   * query()和get()方法之间唯一的区别是AngularJS期望query()方法返回数组。
   */

   /**
    * 3.remove(params,payload,successFn,errorFn)
    * remove方法和delete()方法的作用是完全相同的，它存在的意义是因为delete是JavaScript的
    * 保留字，在IE浏览器中会导致额外的问题
    * //发起一个请求:
    * //DELETE /api/users
    * User.remove({},{
    *    id:'123'
    * },function(response){
    *    //处理成功的删除响应
    * },function(response){
    *    //处理非成功的删除响应
    * })
    */

 /**
  * $resource实例
  * 上述方法返回数据时，响应会被一个原型类所包装，并在实例上添加一些有用的方法。
  * 实例对象上会被添加下面三个实例方法:
  * $save()
  * $remove()
  * $delete()
  * 
  * 除非在一个单独的资源上而不是一个集合上被调用，否则这三个方法与资源上对应的方法是一样的。
  * 
  * 这三个方法可以在资源实例上被调用。如下所示:
  * //使用实例方法$save()
  * User.get({id:'123'},function(user){
  *     user.name='Ari';
  *     User.$save();//save the User
  * });
  * //This is eqivalent to the collection-level
  * //resource call
  * User.save({id:'123'},{name:'Ari'});
  *  */ 
 
 /**
  * $resource实例是异步的
  * 需要格外注意，这三个方法在调用时$resource对象会立即返回一个空的数据引用。由于所有方法都是
  * 异步执行的，所以这个数据是一个空的引用，并不是真实的数据。
  * 
  * 因此，虽然获取实例的调用看起来是同步的，但实际上不是。事实上，它只是数据的引用，当数据
  * 从服务器返回AngularJS会自动将数据填充进去。
  * 
  * //$scope.user将为空
  * $scope.user=User.get({id:'123'});
  * 
  * 这些方法也提供了回调函数，在数据返回时按预期方式调用
  * User.get({id:'123'},function(user){
  *     $scope.user=user;
  * })
  *  */ 


/**
 * 附加属性
 * $resource集合和实例有两个特殊的属性用来同底层的数据定义交互。
 * $promise(promise):
 * $promise属性是为$resource生成的原始promise对象。这个属性是特别用来同$routeProvider.when()
 * 在resolve时进行连接的。
 * 
 * 如果请求成功了，资源实例或集合对象会随promise的resolve一起返回。如果请求失败了，promise被resolve
 * 时返回HTTP响应对象，其中没有resource属性。
 * 
 * $resolved(布尔型)
 * $resolved属性在服务器首次响应时会被设置为true(无论请求是否成功)。
 *  */  

 /**
  * 自定义$resource方法
  * 尽管$resource服务提供了五种方法供我们使用，但它本身也具有良好扩展性，我们可以用自定义方法对
  * 资源对象进行扩展。
  * 
  * 为了在$resource对象中创建自定义方法，需要向包含修改过的$http设置对象的资源类传入第三个参数，它被当做自定义方法。
  * 
  * 在这个对象中，键是方法的名称，值是$http设置对象。
  * 
  * var User=$resource('/api/users/:userId.json',{
  *     userId:'@id',
  *     sendEmail:{
  *        method:'POST'
  *     },
  *     allInboxes:{
  *        method:'JSONP',
  *        isArray:true
  *     }
  * })
  * 
  * 借助这个User资源，资源集合（User资源对象）中的个体实例现在可以使用sendEmail()和
  * update()方法了（也就是user.$sendEmail()和user.$update()）。
  */

  /**
   * $resource 设置对象
   * $resource设置对象和$http设置对象十分相似，仅有少量的不同。
   * 对象中的值，也就是动作，是资源对象中某个方法的名字。
   * 它可以包含以下键
   * 1. method（字符串）
   * method指的是我们想要用来发送HTTP请求的方法。它必须是以下值之一：‘GET’、‘DELETE’、
   * ‘JSONP’、‘POST’、‘PUT’。
   * 
   * 2. url（字符串）
   * 一个URL，用来覆盖为该方法的具体路由设置的URL。
   * 
   * 3. params（字符串map或对象）
   * 这个键中包含了此动作可选的预绑定参数。如果任何一个值都是函数，那么每当我们需要读
   * 取一个请求的参数时，它就会被执行一次。
   * 
   * 4. isArray（布尔型）
   * 如果isArray被设置为true，那么这个动作返回的对象会以数组的形式返回。
   * 
   * 5. transformRequest（函数或函数数组）
   * 这个函数或函数数组用来对HTTP请求的请求体和头信息进行转换，并返回转换后的版本。
   * 通常用来进行序列化。
   * 
   * 
   * var User = $resource('/api/users/:id',{
   *     id: '@'
   * },{
   *     sendEmail:{
   *     method: 'PUT',
   *     transformRequest:function(data,headerFn) {
   *         // 返回修改后的请求数据
   *         return JSON.stringify(data);
   *      }
   *   }
   * });
   * 
   * 
   * 6.transformResponse（函数或函数数组）
   * 这个函数或函数数组用来对HTTP响应体和头信息进行转换，并返回转换后的版本。通常用
   * 来进行反序列化。
   * 
   * var User = $resource('/api/users/:id',{
   *     id:'@'
   *  }, {
   *     sendEmail: {
   *     method: 'PUT',
   *     transformResponse: function(data, headerFn)
   *       {
   *         // Return modified data for the response
   *         return JSON.parse(data);
   *       }
   *     }
   * });
   * 
   * 
   * 7. cache（布尔型或缓存对象）
   * 如果cache属性被设置为true，那么AngularJS会用默认的$http缓存对GET请求进行缓存。
   * 如果cache属性被设置为$cacheFactory对象的一个实例，那么这个对象会用来对GET请求进行
   * 缓存。
   * 
   * 如果cache属性被设置为false，那么$resource服务所发送的请求不会被缓存。
   * 
   * 8. timeout（数值型或promise对象）
   * 如果timeout被设置为一个数值，那么请求将会在推迟timeout指定的毫秒数后再发送。如
   * 果被设置为一个promise对象，那么当该promise对象被resolve时，请求会被中止。
   * 
   * 9. withCredentials（布尔型）
   * 如果该属性被设置为true，那么XHR请求对象中会设置withCredentials标记。
   * 默认情况下，CORS请求不会发送cookie，而withCredentials标记会在请求中加入Access-
   * Control-Allow-Credentials头，这样请求就会携带目标域的cookie。
   * 
   * 10. responseType（字符串）
   * responseType选项会在请求中设置XMLHttpRequestResponseType属性。我们可以使用以下
   * HTTP请求类型之一：
   * " "（字符串，默认）；
   * "arraybuffer"（ArrayBuffer）；
   * "blob"（blob对象）
   * "document"（HTTP文档）
   * "json"（从JSON对象解析而来的JSON字符串）
   * "text"（字符串）；
   * "moz-blob"（Firefox的接收进度事件）；
   * "moz-chunked-text"（文本流）；
   * "moz-chunked-arraybuffer"（ArrayBuffer流）。
   * 
   * 11. interceptor（对象）
   * 拦截器属性有两个可选的方法:response或responseError。这些拦截器像普通的$http
   * 拦截器一样，由$http请求对象调用。
   */

  /**
   * $resource 服务
   * 我们可以将$resource服务当作自定义服务的基础。创建自定义服务给了我们对应用进行高
   * 度自定义的能力，可以对远程服务通信进行抽象，并且从控制器和视图中解耦出来。
   * 
   * 最后，我们强烈建议在自定义的服务对象内部使用$resource。这不仅可以将加载远程服务
   * 抽象成一个独立的AngularJS服务，同时将其从控制器中解耦，保证控制器的代码清洁。另外，
   * 还使得我们可以不必关心控制器是如何取得数据的。
   * 
   * AngularJS对象内部的这种解耦方式同样对测试有益，因为我们可以将后端请求的结果进行
   * 储存和模拟，而不用担心在测试时真的会将请求发送给后端。
   * 
   * 要创建一个封装$resource的服务，需要将$resource的服务注入到我们用来封装的服务对
   * 象中，并像平时一样调用其中的方法。
   */

  angular.module('myApp',['ngResource']).factory('UserService',['$resource',function($resource){
      return $resource('/api/users/:id',{
          id:'@'
      },{
          update:{
              method:'PUT'
          }
      });
  }])

  /**
   * $resourceAPI
   * 通过$resource()方法来使用$resource服务。这个方法可以接受三个参数。
   * url（字符串）
   * 我们在这里传入一个包含所有参数的，用来定位资源的参数化URL字符串模板（参数以:符
   * 号为前缀）。对URL中的每个参数，都可以通过它们的名字来为其赋值：
   * $resource('/api/users/:id.:format', {
   *    format: 'json',
   *    id: '123'
   * });
   * 这里需要注意，如果:之前的参数是空的（上面例子中的:id），那么URL中的这部分会被压
   * 缩成一个.符号。
   * 
   * 如果我们使用的服务器要求在URL中输入端口号，例如http://localhost:3000，
   * 我们必须对URL 进行转义。这种情况下URL 规则看起来是这样的：
   * $resource('http://localhost\\:3000/api/users/:id.json')。
   * 
   * paramDefaults（可选，对象）
   * 第二个参数中包含了发送请求时URL中参数的默认值。对象中的键会与参数名进行匹配。如
   * 果我们传入了一个没有在URL中设置过的参数，那它会以普通的查询字符串的形式被发送。
   * 
   * 例如，如果URL字符串具有/api/users/:id这样的签名，并且我们将默认值设置为{id:
   * '123', name: 'Ari' }，那么URL最终会被转换成/api/users/123?name=Ari。
   * 
   * 这里可以像上面一样硬编码一个默认值来传入一个静态值，也可以设置它从一个数据对象中
   * 读取动态值。
   * 
   * 如果要设置动态值，需要在值之前加上@字符作为前缀。
   * 
   * actions（可选，对象）
   * 动作对象是具有自定义动作，并且可以对默认的资源动作进行扩展的hash对象。
   * 在这个对象中，对象的键就是自定义动作的名字，而$http设置对象的值会对URL中相应的
   * 参数进行替换。
   * 
   * 例如，我们可以用如下形式在资源上定义一个新的update动作：
   * $resource('/api/users/:id.:format', {
   *    format: 'json',
   *    id: '123'
   * }, { 
   *    update: { 
   *    method: 'PUT'
   *    }
   * });  
   */

/**
 * Restangular 简介
 * 为什么不用$http或$resource？尽管$http和$resource是AngularJS的内置服务，但这两个
 * 服务在某些方面的功能是有限的。Restangular通过完全不同的途径实现了XHR通信，并提供了良
 * 好的使用体验。
 * 
 * 使用Restangular能带来的所有好处在Restangular的README①文件中都有详细说明，这里我
 * 们简单介绍几个。
 * 
 * 1.promise
 * Restangular支持promise模式的异步调用，使用起来更符合AngularJS的习惯。可以像使用原
 * 始的$http方法一样对响应进行链式操作。
 * 2. promise展开
 * 也可以像使用$resource服务一样使用Restangular，通过很简单的方式同时操作promise和对象。
 * 3. 清晰明了
 * Restangular库几乎没有复杂或神奇的东西，无需通过猜测或研究文档就可以知道它是如何工
 * 作的。
 * 4. 全HTTP方法支持
 * Restangular支持所有的HTTP方法。
 * 5. 忘记URL
 * $resource要求明确的指定想要拉取数据的URL，Restangular并不需要事先知道URL或提前
 * 指定它们（除基础URL外）。
 * 6. 资源嵌套
 * Restangular可以直接处理嵌套的资源，无需创建新的Restangular实例。
 * 7. 一个实例
 * 同$resource不同，使用过程中仅需要创建一个Restangular资源对象的实例。
 */


 /**
  * 通过Restangular有两种方式创建拉取数据的对象。可以为拉取数据的对象设置基础路由：
  * var User=Restangular.all('users');
  * 这样设置Restangular服务会让所有的HTTP请求将/users路径作为根路径来拉取数据。例如，
  * 调用上述对象的getList()方法会从/users拉取数据:
  * 当然也可以通过单个对象来发送嵌套的请求，可以用唯一的ID来代替路由发送请求
  * var oneUser=Restangular.one('users','abc123');
  * 上面代码的效果是调用oneUser上的get()时向/users/abc123
  * oneUser.get().then(function(user){
  *     // GET /users/abc123/inboxes
  *     user.getList('inboxes');
  * })
  * 从上面可以看出，Restangular非常聪明，知道如何根据在Restangular源对象上调用的方法来
  * 构造URL。但设置拉取数据的URL是很方便的，特别是当后端不支持纯粹的RESTful API时。
  * 通过向allUrl方法传入一个独立的参数来指定请求的URL：
  * // 搜索的所有URL都将使用
  * // `http://google.com/`asthebaseUrl
  * var searches =Restangular.allUrl('one', 'http://google.com/');
  * // 将发送一个请求到GET http://google.com/
  * searches.getList();
  * 另外也可以通过oneURL方法针对特定的请求，设置基础URL而不是操作整个请求：
  * var singleSearch =  Restangular.oneUrl('betaSearch', 'http://beta.google.com/1');
  * // 触发一个请求到GET http://google.com/1
  * singleSearch.get();
  */

  /**
   * 使用Restangular
   * 当Restangular将初始化的对象返回给我们后，可以通过几种不同的方法与后端API进行交互。
   * 假设我们创建了一个Restangular对象代表公共讨论列表：
   * 将/messages路径作为根路径来拉取数据
   * var messages = Restangular.all('messages');
   * 通过这个对象，可以使用getList()来获取所有信息。getList()方法返回了一个集合，其
   * 中包含了可以用来操作特定集合的方法。
   * 
   * // 所有消息都是一个将被resolve成所有消息列表的promise
   * var allMessages = messages.getList();
   * 同样可以使用Restangular对象来创建信息。使用post()方法来创建message对象。
   * 
   * post方法可以接受一个必要参数，参数类型是对象，并向指定的URL发送一个POST请求。
   * 我们也可以向请求中添加查询参数和头。
   * 
   * // POST到/messages
   * var newMessage = {
   *     body: 'Hello world'
   * };
   * 
   * messages.post(newMessage);
   * // 或者我们将在一个元素上调用这个函数
   * // 以创建嵌套的资源
   * var message = Restangular.one('messages', 'abc123'); message.post('replies', newMessage);
   * 由于Restangular返回promise对象，我们可以调用promise对象上的方法，因此我们可以在
   * promise对象完成时运行函数。
   * 
   * Restangular返回的是增强过的promise对象，因此除了可以调用then方法，还可以调用一些特
   * 殊的方法，比如$object。$object会立即返回一个空数组（或对象），在服务器返回信息后，数
   * 组会被用新的数据填充。这对更新一个集合后，在作用域中立即重新拉取集合的场景很有用：
   * // 然后在promise中调用
   * messages.post(newMessage).then(function(newMsg){
   * // 首先将消息设置成空数组
   * // 然后一旦getList是完整的就填充它
   *    $scope.messages = messages.getList().$object;
   * }, function(errorReason)
   * // 出现了一个错误
   * });
   * 
   * 我们也可以从集合中移除一个对象。使用remove()方法可以发送一个DELETE HTTP请求给
   * 后端。通过调用集合中一个对象（或元素）的remove()方法来发送删除请求。
   * 
   * var message = messages.get(123);
   * message.remove(); // 发送DELETE HTTP请求
   * 
   * 更新和储存对象是常见的操作。通常情况下，这种操作由HTTP PUT方法完成。Restangular
   * 通过put()方法来支持这个功能。
   * 
   * 要更新一个对象，首先要查询这个对象，然后在实例中设置新的属性值，再调用对象的put()
   * 方法将更新保存到后端。
   * 
   * 注意，在修改一个对象之前对其进行复制，然后对复制的对象进行修改和保存是一
   * 个好做法。Restangular有自己的复制版本，因此无需对一系列方法重新进行绑定。在更
   * 新对象时使用Restangular.copy()是一个比较好的实践。
   * 
   * 现在我们已经了解了如何操作集合中的实例，下面详细介绍嵌套资源。嵌套资源是指包含在
   * 其他组件内部的组件。例如，一个特定作者所写过的所有书籍。
   * Restangular默认支持嵌套资源。事实上，我们可以从集合中查询出特定的嵌套资源实例。
   * var author = Restangular.one('authors', 'abc123');
   * var author = Restangular.one('authors', 'abc123');
   * var books = author.getList('books');
   * Restangular中另外一个酷炫的功能是不仅可以在one和all方法创造的对象上调用post、put、
   * getList等方法，也可以在服务器返回的对象上调用。例如，我们可以在代码中首先拉取一个作
   * 者并进行展示，然后获取他的书籍列表：
   * 
   * Restangular.one('authors', 'abc123').then(function(author) {
   *    $scope.author = author;
   * });
   * 
   * // 然后在代码中将
   * // 构建一个GET到/authors/abc123/authors的请求
   * // 使用$scope.author，它是从服务器返回的真实对象
   * $scope.author.getList('books');
   */

   /**
    * 我的HTTP方法们怎么办
    * Restangular支持所有的HTTP方法。它支持GET、PUT、POST、DELETE、HEAD、TRACE、
    * OPTIONS和PATCH。
    * author.get(); // GET/authors/abc123
    * author.getList('books');// GET/authors/abc123/books
    * author.put(); // PUT/authors/abc123
    * author.post(); // POST/authors/abc123
    * author.remove(); // DELETE/authors/abc123
    * author.head(); // HEAD/authors/abc123
    * author.trace(); // TRACE/authors/abc123
    * author.options(); // OPTIONS/authors/abc123
    * author.patch(); // PATCH/author/abc123
    * 
    * 如果后端服务器映射资源的方式和我们预期的不符，Restangular也支持自定义HTTP方法。
    * 例如，如果我们想得到作者的传记（不是RESTful资源），可以使用customMETHOD()函数设
    * 置URL（METHOD可以被下面的方法替代：GET、 GETLIST、DELETE、POST、PUT、HEAD、
    * OPTIONS、PATCH、TRACE）：
    * 
    * // 映射一个GET到/users/abc123/biography的请求
    * author.customGET("biography");
    * // 或者带有一个新bio对象的POST
    * // as {body: "Ari's bio"}
    * // 中间的两空字段是
    * // 参数字段或任意自定义头部
    * author.customPOST({body: 'Ari\'s Bio'},// post body
    * "biography", // 路由
    * {}, // 自定义参数
    * {}); // 自定义头部
    */

    /**自定义查询参数和头
     * 每一个HTTP方法都可以自定义查询参数和头
     * 为了添加自定义查询参数，需要添加一个JavaScript对象，将其作为第二个参数添加到我们的方法调用中
     * 还可以添加一个JavaScript对象作为第三个参数。最重要的是，在资源上调用这些方法会将这两个参数作为可选参数。
     * 
     * 使用了自定义查询参数，一个post方法看起来像这样
     * var queryParamObj={role:'admin'},headerObj={'x-user':'admin'};
     * message.getList=('accounts',queryParamObj,headerObj);
     */


    /**
     * 设置Restangular
     * Restangular具有高度的可定制性，可以根据应用的需要进行相应的设置。每个属性都有默认值，我们
     * 也无需在不必要的情况下对其设置。
     * 
     * Restangular可以在几个不同地方进行设置，比如全局或自定义服务中。
     * 将RestangularProvider注入到config()函数中，或者将Restangular注入到一个run()函数中，用这些方式对Restangular
     * 进行设置，无论在哪里使用Restangular都可以利用这些设置。
     * 
     * 一个决定在何处设置Restangular实例的好方法:如果设置Restangular时需要用到其他服务，那么就在run()
     * 方法中设置，否则就在config()中进行设置。
     * 
     * 1.设置baseUrl
     * 通过setBaseUrl()方法给所有后端API请求设置baseUrl。例如,如果API地址是/api/vi而不是服务器的根路径，可以进行如下设置
     * 
     * angular.module("myApp",[restangular])
     * .config(function(RestangularProvider){
     *      RestangularProvider.setBaseUrl('/api/v1');
     * })
     * 
     * 2.添加元素转换
     * Restangular加载了资源之后，我们可以添加资源转换器
     * 使用elementTransformers可以在Restangular对象被加载后为其添加自定义方法。
     * 这个方法会在资源被加载后当回调函数调用，在AngularJS对象中使用这些资源前可以对资源对象进行更新或修改。
     */

    angular.module('myApp',['restangular'])
        .config(function(RestangularProvider){
            //3个参数
            //route
            //如果它是一个集合---布尔值(true/false)或者
            //如果你需要这两个选项以及变换器
            //则不发送
            RestangularProvider.addElementTransformer('authors',false,function(element){
                element.fetchedAt=new Date();
                return element;
            });
        });
/**
 * 对于扩展数据模型或集合有跨界方法可以使用。例如，如果我们只想更新anthors资源，可以用如下方法
 */
angular.module('myApp',['restangular'])
    .config(function(RestangularProvider){
        //3个参数
        //route
        //如果它是一个集合--布尔值(true/false)或者
        //如果你需要这两个选项以及变换器
        //则不发送
        RestangularProvider.extendModel('authors',function(element){
            element.getFullName=function(){
                return element.name+' '+element.lastName;
            }
            return element;
        });
    })

/**
 * 3.设置responseInterceptors
 * Restangular可以设置响应拦截器。responseInterceptors在需要对服务器返回的响应进行转换时非常有用。
 * 例如，如果服务器返回的数据将我们需要的数据藏在了嵌套资源中，可以用esponseInterceptors把这些数据挖出来。
 * 
 * getList方法始终返回数组是非常重要的，如果响应中包含带有元信息和嵌套数组的对象，我们应该用responseInterceptors把它解析处理。
 * 
 * responseInterceptore在每个响应从服务器返回时被调用。调用时会传入以下参数。
 * data:从服务器取回的数据。
 * operation:使用的HTTP方法。
 * what:所请求的数据模型。
 * url:请求的相对URL。
 * response:完整的服务器响应，包括响应头。
 * deferred:请求的promise对象。
 */

/**
 * 下面的设置会使getList()返回一个带有元信息的数组，在这种情况下，数组中的元素就是同路由具有相同名称的属性的值。
 * 例如:向/customers发送GET请求会返回一个像{customers:[]}这样的数组。
 */

angular.module('myApp',['restangular'])
  .config(function(RestangularProvider){
      RestangularProvider.setResponseInterceptor(function(data,operation,what){
          if(operation=='getList'){
              var list=data[what];
              list.metadata=data.metsdata;
              return list;
          };
          return data;
      });
  });

  /**
   * 使用requestInterceptors
   * Restangular同样还支持一种对应的操作:我们可以在将数据实际发送给服务器之前对其进行操作。
   * 
   * 如果要在将对象发送给服务器之前对其进行操作，那么requestInterceptors非常有用。例如，我们可以直接
   * 用_id字段同MongoDB进行通信，所以在使用PUT操作将其发送回服务器之前需要把这个字段移除。
   * 小提示:我们可以同时使用requestInterceptors和responseInterceptors来实现全页面范围内的加载提示。
   * 在每个请求之前开始加载提示，在收到请求后停止加载提示。
   * 
   * 使用setRequestInterceptor()来设置requestInterceptor。这个方法可以接受下面四个参数。
   * element:发送给服务器的资源
   * operation:所使用的HTTP方法
   * what:所请求的数据模型。
   * url:所请求的相对URL。
   */

  angular.module('myApp',['restangular'])
    .config(function(RestangularProvider){
        RestangularProvider.setRequestInterceptor(function(elem,operation,what){
            if(operation==='put'){
                elem.id=undefined;
                return elem;
            }
            return elem;
        });
    });


/**
 * 自定义字段
 * Restangular支持自定义字段，这对与非服务器通信非常有用。例如:同MongoDB数据库进行通信，在这种场景
 * 中id字段不会映射到真id上，在MongoDB中id字段实际上会映射到_id.$oid上。
 */

angular.module('myApp',['restangular'])
    .config(function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id:'_id.$oid'
        });
    });

/**
 * 通过errorInterceptors来捕获错误
 * 通过设置错误拦截器可以捕获Restangular内的错误。通过errorInterceptor可以将错误消息在应用中进行传递。
 * 
 * 如果errorInterceptor返回false，promise链就会被中断，并且我们的应用永远都不需要处理错误。
 * 
 * 例如，此时是处理验证失败的好时机。任何请求如果返回了401，可以通过errorInterceptor将其捕获并将用户重定向到登录页面。
 */

angular.module('myApp',['restangular'])
   .config(function(RestangularProvider){
       RestangularProvider.setErrorInterceptor(function(resp){
           displayError();
           return false;//停止promise链
       });
   });


   /**
    * 孤立资源设置
    * 如果我们想加载一个没有嵌套在其他资源中的资源，可以使用setParentless设置告诉Restangular不要构造嵌套结构的URL
    * setParentless设置函数可以接受两种不同类型的参数:
    * 1)布尔型:如果参数值为true，所有的资源都会被当做孤立资源处理，没有任何URL会进行嵌套
    * 2)数组:只有定义在这个数组中的资源会当做孤立资源处理，数组的元素是字符串，字符串的值是资源的标识。
    */

    angular.module('myApp',['restangular'])
      .config(function(RestangularProvider){
          RestangularProvider.setParentless(['cars']);
      });

/**
 * 8.使用超媒体
 * 在实践中，只通过一个切入点(主URL)来同后端服务器进行通信是非常好的做法，其他数据模型通过链接来指向相关联的资源、。
 * Restangular通过selfLink、oneUrl和allUrl来支持这个有用的做法。
 * 
 * 首先要设置selfLink字段。同设置ID非常相似，selfLink将路径设置为数据模型的一个属性，而数据模型通过链接同对应的资源相关联。
 * 这样我们可以知道应该讲PUT或GET请求发送到哪个URL。
 */

angular.module('myApp',['restangular'])
   .config(function(RestangularProvider){
       RestangularProvider.setRestangularFields({
           selfLink:'link.href'
       });
   });

//设置好后，就可以开始使用这个非常有用的功能了。
//首先读取所有作者的列表，这也是应用的主路由。
//$object会立即返回一个空数组（或对象），在服务器返回信息后，数组会被用新的数据填充。
$scope.authors=Restangular.all('authors').getList().$object; 

//基于前面的设置，每一个作者都对应一个指向自己的链接，同样还有一个指向该作者对应的
//书籍的URL。可以像下面这样使用这些属性：
var firstAuthor = authors[0]; 
firstAuthor.name="John";
// PUT到/authors/1988-author-1
// url在firstAuthor.link.href中
firstAuthor.put();

// GET到/books/for-author/1988-author-1
var books = Restangular.allUrl('books', firstAuthor.books.href).getList().$object; 


/**
 * 自定义Restangular服务
 * 最后，强烈建议将Restangular封装在一个自定义服务对象内。这样做非常有用，因为在每个自定义服务中
 * 都可以对Restangula进行独立的设置。通过使用服务可以将同服务器通信的逻辑与AngularJS对象解耦，并让处理通信的业务。
 * 
 * AngularJS对象内部的解耦同样对测试非常有帮助，因为我们在测试时模拟后端请求的返回数据，而无需担心会真的向
 * 后端发送请求。
 * 
 * 通过将Restangular服务注入到工厂函数中，就可以方便地对Restangular进行封装。在工厂函数内部，使用withconfig()
 * 函数来创建自定义设置。
 * 例如
 */

angular.module('myApp',['restangular'])
 .factory('messageService',['Restangular',function(Restangular){
     var restAngular=Restangular.withConfig(function(Configurer){
         Configurer.setBaseUrl('/api/v2/message');
     });

     var _messageService=restAngular.all('messages');

     return {
         getMessage:function(){
             return _messageService.getList();
         }
     }
 }])
