/**
 * 什么是promise
 * promise是一种用异步方式处理值(或者非值)的方法。promise是对象，代表了一个函数最终可能的返回值或者
 * 抛出的异常。在与远程对象打交道时，promise会非常有用，可以把它们看作远程对象的一个代理。
 * 
 * 习惯上，JavaScript使用闭包或者回调来响应非同步的有意义的数据，比如页面加载之后的
 * XHR请求。我们可以跟数据进行交互，就好像它已经返回了一样，而不需要回调函数的触发。
 * 
 * 回调已经被使用了很长时间，但开发人员用它时都会很痛苦。回调使得调用不一致，得不到
 * 保证，当依赖于其他回调时，它们篡改代码的流程，通常会让调试变得非常难。每一步调用之后，
 * 都需要显式处理错误。
 * 
 * 在执行异步方法时触发一个函数，然后期待一个回调能运行起来。与之不同的是，promise提供了另外
 * 一种抽象:这些函数返回promise对象。
 */

//例如，在传统的回调代码中，我们可能会有一个方法，用户使用该方法向他的朋友发送数据。
//示例回调代码
User.get(fromId, {
    success: function (err, user) {
        if (err) return {
            error: err
        };
        user.friends.find(toId, function (err, friend) {
            if (err) return {
                error: err
            };
            user.sendMessage(friend, message, callback);
        });
    },
    failure: function (err) {
        return {
            error: err
        }
    }
});

//这个回调金字塔已经失控了，而且我们还没有加入健壮的错误处理代码。此外，在被调用的
//回调内部，也需要知道参数的顺序。
//刚才基于promise版本的代码看上去更接近于：
User.get(fromId).then(function (user) {
    return user.friends.find(toId);
}, function (err) {
    //没找到用户
}).then(function (friend) {
    return user.sendMessage(friend, message);
}, function (err) {
    //用户的朋友返回了异常
}).then(function(success){
    //user was sent the message
},function(err){
    //发生错误了
})

/**
 * 代码不仅仅是可读性变高了，也更容易理解了。我们可以保证回调是一个值，而不用处理回
 * 调接口。
 * 
 * 注意，在第一个例子中，我们需要用跟处理正常状况不同的方式去处理异常。需要确定什么
 * 时候使用回调来处理错误，在一个传统的API响应函数签名（惯例的方法签名通常是(err, data)）
 * 中检查错误是否已定义。我们所有的API方法都需要实现同样的结构。
 * 
 * 在第二个例子里，我们用同样的方式处理成功和错误。合成对象将会以常见的方式接收到错
 * 误。promise API就是用于明确地执行或者拒绝promise的，所以不必担心我们的方法实现了不同
 * 的方法签名。
 */

 /**
  * 为什么使用promise
  * 使用promise的附带收获之一是逃脱了回调地狱。promise让异步函数看上去像同步的。基于
  * 同步函数，我们可以按照预期来捕获返回值和异常值。
  * 
  * 可以在程序中的任何时刻捕捉错误，并且绕过依赖于程序异常的后续代码。我们不需要思考
  * 这个同步代码带来的好处，就已经达到上述目的了 —— 它就在代码的本质中。
  * 因此，使用promise的目的是:获得功能组合和错误冒泡能力的同时，保持代码异步运行的能力。
  * 
  * promise是头等对象，自带了一些约定。
  * 只有一个resolve或者reject会被调用到
  *  1)resolve被调用时，带有一个履行值
  *  2)reject被调用时要带一个拒绝原因
  * 如果promise被执行或者拒绝了，依赖于它们的处理程序仍然会被调用
  * 处理程序总是会被异步调用
  * 此外，可以把promise串起来，并且允许代码以通常运行的方式来处理。从一个promise冒出的异常会贯穿整个promise链。
  * promise总是异步执行的，可以放心使用，无需担心它们会阻塞应用的其他部分。
  */

  /**
   * Angular中的promise
   * Angular的事件循环给予了Angular特有的能力，能在$rootScope.$evalAsync阶段中执行promise
   * promise会坐等$digest运行循环结束。
   * 
   * 这件事让我们能毫无压力地把promise的结果转换到视图上。它也能让我们不加思考地把
   * XHR调用的结果直接赋值到$scope对象的属性上。
   */

  /**
   * 如何创建一个promise
   * 想要在Angular中创建promise，可以使用内置的$q服务。$q服务在它的deferred API中提供了一些方法。
   */

  //首先，需要把$q服务注入到想要使用它的对象中
  angular.module('myApp',[]).factory('GithubService',['$q',function($q){
      //现在就可以访问到$q库了
  }])

  //要创建一个deferred对象，可以调用defer()方法
  var deferred=$q.defer();

  //deferred对象暴露了三个方法，以及一个可以用于处理promise的promise属性
  //resolve(value):resolve函数用这个值来执行deferred promise
  deferred.resolve({name:'Ari',username:'@auser'})
  //reject(reason):这个方法一个原因来拒绝deferred promise。它等同于使用一个'拒绝'
  //来执行一个promise。
  deferred.reject("can't update user");
  //等同于
  deferred.resolve($q.reject("can't update user"));

  //notify(value):这个方法用promise的执行状态来进行响应。

  /**
   * 例如，如果我们要从promise返回一个状态，可以使用notify()函数来传递它。
   * 假设我们想要从一个promise创建多个长时间运行的请求，可以通过notify函数发回一个过程通知
   */