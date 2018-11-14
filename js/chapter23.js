/**
 * ngAnimate在模块API上添加了.animation方法；这个方法提供了一个接口，我们可以用来创建动画。
 * 
 * animation()方法带有两个参数
 * classname(字符串)
 * 这个classname会匹配要产生动画的元素class。到现在为止的例子里，这个动画应当被命名为:fade-in
 * 
 * animateFun(函数)
 * animate函数预期会返回一个对象，包含了指令会触发的不同事件函数(当使用的时候)
 * 
 * $animate服务为指定的元素调用这些函数。在这些函数里，我们可以对这个元素做任何事情。唯一的
 * 要求是在动画结束时，需要调用回调函数done()
 * 
 * 在这些函数中，我们可以返回一个end函数，它会在动画结束或者动画被取消时调用。
 * 
 * 当动画触发时，$animate为事件查找匹配的动画函数。如果找到了匹配事件的函数，它会执行这个函数
 * 否则就完全跳过这个动画。
 */

angular.module('myApp',['ngAnimate']).animation('.fade-in',function(){
    return {
        enter:function(element,done){
            //运行动画
            //当动画结束的时候调用done
            return function(cancelled){
                //关闭或者取消的回调
            }
        }
    }
})

/**
 * 微调动画，对CSS类作过滤
 * 对CSS类作过滤
 * 默认情况下，ngAnimate会自动尝试让每个通过$animate服务传递过来的元素都动起来。但是
 * 不必担心，只有包含了用CSS或者JavaScript动画注册了的CSS类的元素才会真的动起来。
 * 
 * 尽管这个系统在运作时，必须检查每个可能的CSS类，这可能会在低速设备上慢一些。因此，
 * 在angular.js的1.2.13发布版本中，ngAnimate提供了一个配置项。让$animate提供者可以使用
 * 正则表达式对元素进行过滤，以去掉不匹配元素上的动画操作。
 * 
 * 现在有了给定的正则表达式，/animated/，只有以animate开始的CSS类会被为动画而处理。
 * 结果，我们的.fade-in动画不会再运行了，它需要被重命名成.animate-fade-in才能真正运行。
 */

myModule.config(function($animateProvider){
    //唯一合法的参数是正则表达式
    $animateProvider.classNameFilter(/\banimate-/);
})

/**
 * 当动画在一个元素产生时，我们想要检测DOM操作什么时候发生，可以在$animate服务上注册一个事件。事件如下
 */

element.on('$animate:before',function(evt,animationDetails){

})

element.on('$animate:after',function(evt,animationDetails){
    
})
