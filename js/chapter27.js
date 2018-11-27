/**
 * 优化$digest循环
 * 
 * 查找性能，最明显的地方是从$digest循环开始。简而言之，Angular通过运行一系列监控列表来跟踪实时数据
 * 绑定。页面上每一个可能改变的实时数据都有一个监控函数。
 */
//优化前
app.factory("poller", function ($rootScope, $http) {
    var pollForEvent = function (timeout) {
        $http.get('/events').success(function (data) {
            var events = data.events;
            if (service.handlers[event]) {
                for (handler in service.handlers[event]) {
                    $rootScope.$apply(function () {
                        handler.apply(event);
                    });
                }
            }
            //设置下一个延时
            setTimeout(pollForEvent, timeout);
        });
    };
    //每半秒轮询一次
    setTimeout(function () {
        pollForEvent(500);
    });
    var service = {
        handlers: {},
        on: function (evt, callback) {
            if (!service.handlers[evt]) {
                service.handlers[evt] = [];
            }
            service.handlers[evt].push(callback);
        }
    }
    return service;
})

//优化后,节流函数
var throttle = function (fn, atMost, ctx) {
    var ctx = ctx || this;
    var atMost = atMost || 250;//毫秒
    var last, defer, result;
    return function () {
        var now = new Date(),
            args = arguments;
        if (last && now < last + atMost) {
            //延迟执行
            clearTimeout(defer);
            defer = setTimeout(function () {
                last = now;
                fn.apply(ctx, args);
            }, atMost);
        } else {
            result = fn.apply(ctx, args);
        }
        return result;
    }
}

//为了使用throttle函数设置$digest循环节流，你可以在事件循环中调用它：
for (var i = 0; i < events.length; i++) {
    var event = events[i];
    if (service.handlers[event])
        for (handler in service.handlers[event])
            throttle(function () {
                $rootScope.$apply(function () {
                    handler.apply(event);
                });
            }, 500);
}

/**优化$digest 调用 */
/**
 * 在改变一个变量时通常可以确定什么时候会运行$disgest循环，以及运行$digest循环会影
 * 响哪些作用域。在这种情况下，你无需在$rootScope上使用$scope.$apply()（这会导致每个子
 * 作用域$scope 跑进$digest 循环中）调用完整的$digest 循环。作为替代可以直接调用
 * $scope.$digest()。
 * 
 * 调用$scope.$digest()只会在调用了$digest()及其子节点的具体作用域上运行digest
 * 循环。
 */
