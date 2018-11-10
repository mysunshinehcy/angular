//事件

/**
 * Angular的作用域在本质上是分层次的:它们可以通过父子关系很自然地来回沟通。但通常，作用域是不共享变量的
 * 它们执行的功能往往各不相同，跟在父树上的位置无关。
 */

/**
 * 什么是事件
 * 如同浏览器响应浏览器层的事件，比如鼠标点击，页面滚动那样，Angular应用也可以响应Angular事件。
 * 这使我们可以在应用中嵌套的各组件之间进行通信，即使这些组件在创建时并未考虑到其他组件。
 * 
 * 注意,Angular事件系统并不与浏览器事件系统想通，这意味着，我们只能在作用域上监听Angular事件而不是DOM事件。
 * 我们可以认为，事件是在应用中传播的信息片段，通常（可选）包含了在应用中发生的事情的信息。
 */

/**
 * 事件传播
 * 因为作用域是有层次的，所以我们可以在作用域链上传递事件。
 * 通常来说，选择要使用的事件传递方式，一个好的经验法则是:查看将要触发事件的作用域。如果要通知整个事件系统
 * (允许任意作用域处理这个事件)，就要往下广播。
 * 
 * 另一方面，如果要提醒一个全局模块(为了说)，我们最终需要通知高层次的作用域(例如rootScope)，并且需要把事件向上传递。
 * 
 * 限制向全局层面传递通知的数量是个好主意，尤其是因为事件虽然很强大，但增加了系统的复杂度。
 * 
 * 比如，当我们在做路由的时候，'全局'应用状态需要知道应用当前设置了哪个页面。另一方面，如果我们是在一个选项卡指令和它的子面板
 * 指令之间通信，就需要把事件向下传。
 */

/**
 * 使用$emit来冒泡事件
 * 要把事件沿着作用域链向上派送(从子作用域到父作用域)，我们要使用$emit()函数
 * 
 * //发送一个事件
 * //我们的用户以当前user登录了
 * scope.$emit('user:logged_in',scope.user);
 * 
 * 在一个$emit()事件函数的调用中，事件从子作用域冒泡到父作用域。在产生事件的作用域
 * 之上的所有作用域都会收到这个事件的通知。
 * 
 * 当想要跟应用的其他部分交流状态的变更时，我们使用$emit().如果想要跟$rootScope通信，需要
 * $emit()这个事件。
 * 
 * $emit()方法带有两个参数。
 * 1.name(字符串)
 * 要发出的事件名称。
 * 
 * 2.args(集合)
 * 一个参数的集合，作为对象传递到事件监听器中。
 * $emit()方法返回了一个事件对象。
 * 从监听器中发出了的一切异常都会传递到$exceptionHandler服务中。
 */


 /**
  * 使用$broadcast向下传递事件
  * 要把事件向下传递(从父作用域到子作用域)，我们使用$broadcast函数。
  * //等等，购物车去结账了
  * //当购物车在结账的时候
  * //下面所有指令都应当禁用自己
  * scope.$broadcast('cart:checking_out',scope.cart);
  * 在$broadcast()方法上，每个注册了监听器的子作用域都会收到这个信息。事件传播到所有的指令和当前
  * 作用域的间接作用域上，并且一路向下调用每个监听器。
  * 
  * 用了$broadcast()方法之后，就没法取消事件的发送了。
  * $broadcast()方法自身带有两个参数。
  * 1.name(字符串):要发出的事件名称。
  * 2.args(集合):一个参数的集合，作为对象传递到事件监听器中。
  * $emit()方法返回了一个事件对象
  * 从监听器中发出的一切异常都会传递到$exceptionHandler服务中。
  */

  /**
   * 事件监听
   * 要监听一个事件，我们可以使用$on()方法。这个方法为具有某个特定名称的事件注册了一个
   * 监听器。事件名称就是在Angular中触发的事件类型。
   * 
   * 例如，我们可以在路由变更过程被触发时，监听事件
   * scope.$on('$routeChangeStart',function(evt,next,current){//一个新的路由被触发了})
   * 不管什么时候事件$routeChangeStart(路由将要变更的时候，会广播这个事件)被触发，
   * 监听器(这个函数)都会被调用。
   * 
   * Angular把evt对象作为第一个参数传给正在监听的一切事件，不管它是我们自定义的事件还是内置的Angular服务。
   */


   /**
    * 事件对象
    * 
    * 1.targetScope(作用域对象)
    * 这个属性是发送或者广播事件的作用域。
    * 2.currentScope(作用域对象)
    * 这个对象包含了当前处理事件的作用域。
    * 3.name(字符串)
    * 这个字符串是触发之后，我们正在处理的事件的名称
    * 4.stopPropagation(函数)
    * stopPropagation()函数取消通过$emit触发的事件的进一步传播
    * 5.preventDefault(函数)
    * preventDefault把defaultPrevente标志设置为true。尽管不能停止事件的传播，我们可以
    * 告诉子作用域无需处理这个事件(也就是说，可以安全地忽略它们)。
    * 6.defaultPrevented(布尔值)
    * 调用preventDefault()会把defaultPrevented设置为true
    * $on()函数返回了一个反注册函数，我们可以调用它来取消监听器。
    */

    /**
     * 事件相关的核心服务
     * 
     * Angular核心框架发送事件，我们监听之后执行操作。可以用事件让自己的Angular
     * 对象能在全局事件的不同状态上与应用交互。
     * 
     * 我们用$emit()调用的有好几个事件，它们把事件往上发，更多调用的是$broadcast()事件。
     */

/**
 * 核心系统的$emitted事件
 * 
 * 下面的事件从指令向上发送到包含指令调用的作用域。我们可以使用$on()在这个链网上的
 * 任意作用域里监听这些方法
 * 
 * $scope.$on('$includeContentLoaded',function(evt){})
 * 
 * 1.$includeContentLoaded
 * $includeContentLoaded事件当ngInclude的内容重新加载时，从ngInclude指令上触发。
 * 2.$includeContentRequested
 * $includeContentRequested事件从调用ngInclude的作用域上发送。每次ngInclude的内容
 * 被请求时，它都会被发送。
 * 3.$viewContentLoaded
 * $vieContentLoaded事件每当ngView内容被重新加载时，从当前ngView作用域上发送。
 */

 /**
  * 核心系统的$broadcast事件
  * 1.$locationChangeStart
  * 当Angular从$location服务(通过$location.path()、$location.search()等)对浏览器
  * 的地址作更新，会触发$locationChangeStart事件
  * 
  * 2.$locationChangeSuccess
  * 当且仅当浏览器的地址成功变更，又名义做阻止$locationChangeStart的情况下，
  * $locationChangeSuccess事件会从$rootScope上广播出来。
  * 
  * 3.$routeChangeStart
  * 在路由变更发生之前，$routeChangeStart事件从$rootScope发送出来。也就是在路由服务
  * 开始解析路由变更所需的所有依赖项时。
  * 这个过程通常涉及获取视图模板和解析route属性上所有依赖项的时候。
  * 
  * 4. $routeChangeSuccess
  * 在所有路由依赖项跟着$routeChangeStart 被解析之后， $routeChangeSuccess 被从
  * $rootScope上广播出来。
  * ngView指令使用$routeChangeSuccess事件来获悉何时实例化控制器并渲染视图。
  * 
  * 5. $routeChangeError
  * 如果路由对象上任意的resolve属性被拒绝了，$routeChangeError就会被触发（比如它们失
  * 败了）。这个事件是从$rootScope上广播出来的。
  * 
  * 6. $routeUpdate
  * 如果$routeProvider上的reloadOnSearch属性被设置成false，并且使用了控制器的同一个
  * 实例，$routeUpdate事件会被从$rootScope上广播。
  * 
  * 7. $destroy
  * 在作用域被销毁之前，$destroy事件会在作用域上广播。这个顺序给子作用域一个机会，在
  * 父作用域被真正移除之前清理自身。
  * 
  * 例如，如果我们在控制器中有一个正在运行的$timeout，我们不希望在包含它的控制器已经
  * 不存在的情况下，它还继续触发。
  */

  angular.module('myApp',[]).controller('MainController',function($scope,$timeout){
      var timer;
      var updateTime=function(){
          $scope.date=new Date();
          timer=$timeout(updateTime,1000);
      }
      //开始更新事件
      timer=$timeout(updateTime,1000);
      //在销毁控制器之前
      //清除定时器
      $scope.$on('$destory',function(){
          if(timer){
              $timeout.cancel(timer);
          }
      })
  })