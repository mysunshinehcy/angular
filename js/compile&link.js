/**
 * compile与link
 */

 /**
  * 加载阶段
  * 加载angular.js，找到ng-app指令，确定应用的边界
  * 
  * 编译阶段
  * 1)遍历DOM，找到所有指令
  * 2)根据指令代码中的template、replace、transclue转换DOM结构
  * 3)如果存在compile函数则调用
  * 
  * 链接阶段
  * 1)对每一条指令运行link函数
  * 2)link函数一般用来操作DOM、绑定事件监听器
  * 
  * 
  * compile函数用来对模板自身进行转换，而link函数负责在模型和视图之间进行动态关联
  * 作用域在链接阶段才会被绑定到编译之后的link函数上
  * compile函数仅仅在编译阶段运行一次，而对于指令的每个实例，link函数都会执行一次
  * compile可以返回preLink和postLink函数，而link函数只会返回postLink函数
  * 如果需要修改DOM结构，应该在postLink中来做这件事情，而如果preLink中做这件事情会导致错误
  * 大多数时候我们只要编写link函数即可
  */
