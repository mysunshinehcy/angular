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
 */
