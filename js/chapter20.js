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
}).then(function (success) {
    //user was sent the message
}, function (err) {
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
angular.module('myApp', []).factory('GithubService', ['$q', function ($q) {
    //现在就可以访问到$q库了
}])

//要创建一个deferred对象，可以调用defer()方法
var deferred = $q.defer();

//deferred对象暴露了三个方法，以及一个可以用于处理promise的promise属性
//resolve(value):resolve函数用这个值来执行deferred promise
deferred.resolve({ name: 'Ari', username: '@auser' })
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

/**
 * 可以用两种不同方式跟promise交互。
 * then(successFn,errFn,notifyFn):
 * 无论promise成功还是失败了，当结果可用之后，then都会立刻异步调用successFn或者errFn。这个方法
 * 始终用一个参数来调用回调函数，结果，或者是拒绝的路由。
 * 
 * 在promise被执行或者拒绝之前，notifyFn回调可能会被调用0到多次，以提供过程状态的提示。
 * 
 * then()方法总是返回一个新的promise，可以通过successFn或者errFn这样的返回值执行或者被拒绝。
 * 它也可能通过notifyFn提供通知。
 * 
 * catch(errFn):
 * 这个方法就只是个帮助函数，能让我们用.catch(function(reason){})取代err回调
 * $http.get('/repos/angular/angular.js/pulls').catch(function(reason){deferred.reject(reason);});\
 * 
 * finally(callback):
 * finally方法允许我们观察promise的履行或者拒绝，而无需修改结果的值。当我们需要释放一个资源，或者是运行
 * 一些清理工作，不管promise是成功还是失败时，这个方法很有用。
 * 
 * 我们不能直接调用这个方法，因为finally是IE中JavaScript的一个保留字。纠结到最后，好这样调用它了。
 * promise['finally'](function(){});
 * 
 * Angular的$q deferred对象是可以串成链，这样即使是then，返回的也是一个promise。这个promise一被执行，then返回的
 * promise就已经是resolved或者rejected的了。
 * 
 * 这些promise也就是Angular能支持$http拦截器的原因。
 * 
 * $q服务类似于原始的Kris Kowal的Q库:
 * 1)$q是跟Angular的$rootScope模型继承的，所以在Angular中，执行和拒绝都很快。
 * 2)$q promise是跟Angular模板引擎继承的，这意味着在视图中找到的任何promise都会在视图中被执行或者拒绝。
 * 3)$q很小，所以没有包含Q库的完整功能。
 */

/**
 * 链式请求
 * then方法在初始promise被执行后，返回一个新的派生promise。这种返回形式给了我们一种特有的能力，把另一个then接在初始的then方法结果之后。
 */

//一个响应promise的服务
GithubService.then(function (data) {
    var events = [];
    for (var i = 0; i < data.length; i++) {
        events.push(data[i].events);
    }
    return events;
}).then(function (events) {
    $scope.events = events;
})

/**这个中断也是$http服务实现请求和响应拦截器的方式。
 * $q库自带了几个不同的有用方法。
 * 
 * 1)all(promises):
 * 如果我们有多个promise，想要把它们合并成一个，可以使用$q.all(promises)方法来把它们合并成一个
 * promise。这个方法带有一个参数。
 * 
 * promises(数组或者promise对象)
 * 一个promise数组或者promise的hash。
 * all()方法返回单个promise，会执行一个数组或者一个散列的值。每个值会响应promise散列中的相同序号或者键。
 * 如果任意一个promise被拒绝了，结果的promise也会被拒绝。
 * 
 * 2.defer():defer()方法创建一个deferred对象，它没有参数，返回deferred对象的一个实例。
 * 
 * 3.reject(reason):
 * 这个方法创建了一个promise，被以某一原因拒绝执行了。它专门用于让我们能在一个promise链中转发拒绝的promise。
 * 类似于JavaScript中的throw。在同样意义上，我们能在JavaScript中捕获一个异常，也能够转发这个拒绝，我们需要把这个错误重新抛出。
 * 可以通过$q.reject(reason)来做到这点。
 * 
 * 这个方法带有单个参数:reason(常量，字符串，异常，对象)
 * 拒绝的原因。reject()方法返回一个已经用某个原因拒绝的promise。
 * 
 * 4.when(value)
 * when()函数把一个可能是值或者能接着then的promise包装成一个$q promise。这样我们就能处理一个可能是也可能不是promise的对象。
 * 
 * when()函数有一个参数:value
 * 该参数是个值，或者是promise
 * when()函数返回了一个promise，我们可以像使用其他promise一样使用它。
 */
