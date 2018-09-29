/**
 * 对于指令，可以把它简单的理解成在特定DOM元素上运行的函数，指令可以扩展这个元素的功能
 * 
 * AngularJS应用的模块中有很多方法可以使用，其中directive()这个方法是用来定义指令的
 */

Angular.module("myApp",[]).directive("myDirective",function($timeout,UserDefinedService){
    //指令定义放这里
})