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
  */