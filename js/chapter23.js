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

/**
 * 创建自定义动画
 */

/**
 * $animate服务给我们在指令中实现自定义动画提供了帮助。把$animate服务注入到我们自
 * 己的应用中之后，可以用暴露出的事件为每个事件触发$animate对象上的关联函数。
 * 
 * 要在我们自己的指令中开始动画，需要注入$animate服务。
 * 至此，就可以把事件绑定到指令上，开始显示我们的动画了。
 */

angular.module('myApp',['ngAnimate'])
.directive('myDirective',function($animate){
    return {
        template:'<div class="myDirective"></div>',
        link:function(scope,ele,attrs){
            //在这里添加动画
            //例如
            $animate['addClass'](element,'ng-hide');
        }
    }
})

/**
 * 建立了指令之后，我们可以调用$animate函数创建一个动画，与我们的指令通信。
 */

angular.module('myApp',['ngAnimate'])
.animation('.scrollerAnimation',function(){
    return {
        animateFun:function(element,done){
            // 我们可以在这个函数中
            // 做任意想做的事
            // 但是需要调用done
            // 来让angular知道动画结束了
        }
    }
})

/**
 * $animate服务暴露了一些方法，为内置指令的动画事件提供帮助。这些$animate服务暴露
 * 出来的事件是：
 * 1)enter;
 * 2)leave;
 * 3)move;
 * 4)addClass;
 * 5)removeClass
 */

/**
 * addClass()方法触发了一个基于className变量的自定义动画事件，并且把className值作
 * 为CSS类添加到元素上。当在DOM元素上添加样式类时，$animate服务给这个className添加了
 * 一个叫-add的后缀来让我们建立动画。
 * 
 * 如果没有CSS过渡，在CSS选择器（[className]-add）上也没有定义关键帧动
 * 画，ngAnimate就不会触发这个动画，只是会把这个样式类加上。
 * 
 * addClass()方法带三个参数
 * 1)element（jQuery/jqLite元素）:正在建立动画的元素。
 * 2)className（字符串）:正在建立动画，并且添加到元素上的CSS类。
 * 3)done（函数）:当动画完成时调用的回调函数。
 * 
 * 调用addClass()方法会经过如下步骤：
 * 1)运行所有在元素上用JavaScript定义的动画
 * 2)[className]-add类被添加到元素上
 * 3)$animate检查CSS样式来寻找过渡/动画的持续时间和延迟属性
 * 4)[className]-add-active类被添加到元素的classList中(触发CSS动画)
 * 5)$animate用定义过的持续时间等待完成
 * 6)动画结束，$animate移除两个添加的类:[className]-add和[className]-add-active类被添加到元素的classList中
 * 7)className类被添加到元素上
 * 8)触发done()回调函数（如果定义了的话）。
 */

angular.module('myApp', ['ngAnimate']).directive('myDirective', function ($animate) {
    return {
        template: '<div class="myDirective"></div>',
        link: function (scope, ele, attrs) {
            ele.bind('click', function () {
                $animate.addClass(ele, 'greenlight');
            })
        }
    }
})

/**
 * removeClass()
 * removeClass()方法触发了一个基于className的自定义动画事件，并且移除在className
 * 值中定义的CSS类。当从DOM元素上移除一个类的时候，$animate服务给这个className添加了
 * 一个叫-remove的后缀来让我们建立动画。
 * 
 * 如果没有CSS过渡，在CSS选择器（[className]-remove）上也没有定义关键
 * 帧动画，ngAnimate就不会触发这个动画，只是会把这个样式类加上。
 * 
 * removeClass()方法带三个参数。
 * element（jQuery/jqLite元素）:正在建立动画的元素。
 * className（字符串）:正在建立动画，并且从元素上移除的CSS类。
 * done（函数）:当动画完成时调用的回调函数。
 * 
 * 调用removeClass()动画方法会经历如下步骤：
 * (1) 运行所有在元素上用JavaScript定义的动画；
 * (2) [className]-remove类被添加到元素上；
 * (3) $animate检查CSS样式来寻找过渡/动画的持续时间和延迟属性；
 * (4) [className]-remove-active类被添加到元素的classList中（触发CSS动画）；
 * (5) $animate用定义过的持续时间等待完成；
 * (6) 动画结束， $animate 移除三个添加的类： [className] 、[className]-remove 和
 * [className]-remove-active；
 * (7) 触发done()回调函数（如果定义了的话）。
 */

angular.module('myApp', ['ngAnimate']).directive('myDirective', function ($animate) {
    return {
        template: '<div class="myDirective"></div>',
        link: function (scope, ele, attrs) {
            ele.bind('click', function () {
                $animate.removeClass(ele, 'greenlight');
            })
        }
    }
})

/**
 * enter()
 * enter()方法把元素添加到它在DOM中的父元素，然后运行enter动画。动画开始之后，
 * $animation服务会添加ng-enter和ng-enter-active类，给指令一个机会来建立动画。
 * enter()方法最多可以带四个参数。
 * 1)element（jQuery/jqLite元素）:正在建立动画的元素。
 * 2)parent（jQuery/jqLite元素）:这个元素的父元素，它是我们enter动画的焦点。
 * 3)after（jQuery/jqLite元素）:这个元素的兄弟元素，它将会成为enter动画的焦点。
 * 4)done（函数）:当动画完成时调用的回调函数。
 * 调用enter()动画方法会经历如下步骤：
 * (1) 本元素被插入父元素中，或者是after元素后面；
 * (2) $animate运行所有在元素上用JavaScript定义的动画；
 * (3) .ng-enter类被添加到元素的classList中；
 * (4) $animate检查CSS样式来寻找过渡/动画的持续时间和延迟属性。
 * (5) .ng-enter-active类被添加到元素的classList中（触发动画）；
 * (6) $animate用定义过的持续时间等待完成；
 * (7) 动画结束，$animate从元素移除.ng-enter和.ng-enter-active类；
 * (8) 触发done()回调函数（如果定义了的话）。
 */

angular.module('myApp',['ngAnimate']).directive('myDirective',function($animate){
    return {
        template: '<div class="myDirective">' +'<h2>Hi</h2></div>',
        link:function(scope,ele,attrs){
            $animate.enter(ele,ele.parent());
        }
    }
})

/**
 * leave()
 * leave()方法运行leave动画。当它结束运行时，会把元素从DOM移除。动画开始之后，它
 * 会在元素上添加.ng-leave和.ng-leave-active类。
 * leave()方法带两个参数。
 * 1)element（jQuery/jqLite元素）:正在建立动画的元素。
 * 2)done（函数）:当动画完成时调用的回调函数。
 * 
 * 调用leave()动画方法会经历如下步骤：
 * (1) $animate可运行所有在元素上用JavaScript定义的动画；
 * (2) .ng-leave类被添加到元素的classList中；
 * (3) $animate检查CSS样式来寻找过渡/动画的持续时间和延迟属性；
 * (4) .ng-leave-active类被添加到元素的classList中（触发动画）；
 * (5) $animate用定义过的持续时间等待完成；
 * (6) 动画结束，$animate从元素移除.ng-leave和.ng-leave-active类；
 * (7) 元素被从DOM移除；
 * (8) 触发done()回调函数（如果定义了的话）。
 */

angular.module('myApp',['ngAnimate']).directive('myDirective',function($animate){
    return {
        template: '<div class="myDirective">' +'<h2>Hi</h2></div>',
        link:function(scope,ele,attrs){
            ele.bind('click',function(){
                $animate.leave(ele);
            })
        }
    }
})


/**
 * move()
 * move()函数触发move DOM动画。在动画开始之前，$animate服务或者把元素插入父容器中，或
 * 者直接加到after元素之后，如果有的话。动画开始后，为了动画的持续，.ng-move和.ng-move-active
 * 就会被添加。
 * 
 * move()方法带有四个参数
 * element（jQuery/jqLite元素）:正在建立动画的元素。
 * parent（jQuery/jqLite元素）:这个元素的父元素，它是我们enter动画的焦点。
 * after（jQuery/jqLite元素）:这个元素的兄弟元素，它将会成为enter动画的焦点。
 * done（函数）:当动画完成时调用的回调函数。
 * 
 * 调用move()动画方法会经历如下步骤：
 * (1) 元素被移到父元素中，或者在after元素之后；
 * (2) $animate可运行所有在元素上用JavaScript定义的动画；
 * (3) .ng-move类被添加到元素的classList中；
 * (4) $animate检查CSS样式来寻找过渡/动画的持续时间和延迟属性；
 * (5) .ng-move-active类被添加到元素的classList中（触发动画）；
 * (6) $animate用定义过的持续时间等待完成；
 * (7) 动画结束，$animate从元素移除.ng-move和.ng-move-active类；
 * (8) 触发done()回调函数（如果定义了的话）。
 */

angular.module('myApp',['ngAnimate']).directive('myDirective',function($animate){
    return {
        template: '<div class="myDirective">' +'<h2>Hi</h2></div>',
        link:function(scope,ele,attrs){
            ele.bind('click',function(){
                $animate.move(ele,ele.parent());
            })
        }
    }
})


// 1536-0694

// 7Ga+O4EDJshK97jKYYGsxL37J3tVaCBjygk4tKLCnZKwSUPp1ipbKzRiO
// 9oPSurXQQZ7Mpeo5neTXJESU0dvCjQDKG8ugD66N+hr-vy+KZiaHQ+wKW
// BaloIJlucyiDIGuWTzWXjDlZf6Q4BlB3ubm5cLSk0QrKCtLYMOBhh42Z2

// 9359-4830

// -deRRlIQsVS-m1ID0UQxNz178K3oOcheTlgWqnIgN4tukjfBPzqLePaox
// R2+kOHsAvEx6YQUowGtk-hxGQkrN97YPRdB9-RF3rCxhGw+r3qch1O7w-
// jJXlIgwNEwDiEx6G6uCUngfgNowbOXAgKlT12h3OVcv447K74ysqUD1WQ
