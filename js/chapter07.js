/**过滤器 */
/**
 * 在HTML中的模板绑定符号{{}}内通过|符号来调用过滤器。例如，将字符串转换成大写
 */

{{name|uppercase}}

/**使用$filter来调用过滤器。 */
app.controller("DemoController",["$scope","$filter",function($scope,$filter){
    $scope.name=$filter('lowercase')('Ari');
}])

/**以HTML的形式使用过滤器时，如果需要传递参数给过滤器，只要在过滤器名字后面加冒号即可。
 * 如果有多个参数，可以在每个参数后面都加入冒号。
 */
{{123.456789|number:2}}

/**
 * currency过滤器可以将一个数值格式化为货币格式。
 * currency允许我们自己设置货币符号。默认情况下会采用客户端所处区域的货币符号，但是也可以自定义货币符号
 */

{{123|currency}}

/**
 * date过滤器可以将日期格式化成需要的格式。Angular中内置了几种日期格式，如果没有指定使用任何格式，
 * 默认会采用mediunDate格式。
 */

{{ today | date:'medium' }} <!-- Aug 09, 2013 12:09:02 PM -->
{{ today | date:'short' }} <!-- 8/9/1312:09PM -->
{{ today | date:'fullDate' }} <!-- Thursday, August 09, 2013 -->
{{ today | date:'longDate' }} <!-- August 09, 2013 -->
{{ today | date:'mediumDate' }}<!-- Aug 09, 2013 -->
{{ today | date:'shortDate' }} <!-- 8/9/13 -->
{{ today | date:'mediumTime' }}<!-- 12:09:02 PM -->
{{ today | date:'shortTime' }} <!-- 12:09 PM -->
年份格式化
四位年份：{{ today | date:'yyyy' }} <!-- 2013 -->
两位年份：{{ today | date:'yy' }} <!-- 13 -->
一位年份：{{ today | date:'y' }} <!-- 2013 -->
月份格式化
英文月份：{{ today | date:'MMMM' }} <!-- August -->
英文月份简写：{{ today | date:'MMM' }} <!-- Aug -->
数字月份：{{ today |date:'MM' }} <!-- 08 -->
一年中的第几个月份：{{ today |date:'M' }} <!-- 8 -->
日期格式化
数字日期：{{ today|date:'dd' }} <!-- 09 -->
一个月中的第几天：{{ today | date:'d' }} <!-- 9 -->
英文星期：{{ today | date:'EEEE' }} <!-- Thursday -->
英文星期简写：{{ today | date:'EEE' }} <!-- Thu -->
小时格式化
24小时制数字小时：{{today|date:'HH'}} <!--00-->
一天中的第几个小时：{{today|date:'H'}} <!--0-->
12小时制数字小时：{{today|date:'hh'}} <!--12-->
上午或下午的第几个小时：{{today|date:'h'}} <!--12-->
分钟格式化
数字分钟数：{{ today | date:'mm' }} <!-- 09 -->
一个小时中的第几分钟：{{ today | date:'m' }} <!-- 9 -->

秒数格式化
数字秒数：{{ today | date:'ss' }} <!-- 02 -->
一分钟内的第几秒：{{ today | date:'s' }} <!-- 2 -->
毫秒数：{{ today | date:'.sss' }} <!-- .995 -->

字符格式化
上下午标识：{{ today | date:'a' }} <!-- AM -->
四位时区标识：{{ today | date:'Z' }} <!--- 0700 -->

下面是一些自定义日期格式的示例：
{{ today | date:'MMMd, y' }} <!-- Aug9, 2013 -->
{{ today | date:'EEEE, d, M' }} <!-- Thursday, 9, 8-->
{{ today | date:'hh:mm:ss.sss' }} <!-- 12:09:02.995 -->

/**
 * filter过滤器可以从给定数组中选择一个子集，并将其生成一个新数组返回。这个过滤器通常用来过滤需要进行展示的元素。
 * 这个过滤器的第一个参数可以是字符串，对象或是一个用来从数组中选择元素的函数。
 * 
 * 1)字符串：返回所有包含这个字符串的元素。如果我们想返回不包含该字符串的元素，在参数前加!符号
 * 2)对象:AngularJS会将待过滤对象的属性同这个对象中的同名属性进行比较，如果属性值是字符串就会判断是否包含
 * 该字符串。如果我们希望对全部属性都进行对比，可以将$当做键名。
 * 3)函数:对每个元素都执行这个函数，返回非假值的元素会出现在新的数组中并返回。
 * 
 * 第二个参数可以是以下三种情况之一
 * 1)true:angular.equals(expected,actual)对两个值进行严格比较。
 * 2)false:进行区分大小写的子字符串比较。
 * 3)函数:运行这个函数，如果返回真值就接受这个元素。
 */

{{["Ari","likes","to","travel"]|filter:isCapitalized}}

$scope.isCapitalized=function(str){
    return str[0]==str[0].toUpperCase();
}

/**
 * json过滤器可以将一个JSON或JavaScript对象转换成字符串。这种转换对调试非常有用
 */

{{ {'name': 'Ari', 'City': 'SanFrancisco'} | json }}
<!--
{
"name": "Ari",
"City": "San Francisco"
}
-->

/**
 * limitTo过滤器会根据传入的参数生成一个新的数组或字符串，新的数组或字符串的长度取决于传入的参数，通过传入参数的正负值来控制从前面还是从后面开始截取。
 * 如果传入的长度值大于被操作数组或字符串的长度，那么整个数组或字符串都会被返回。
 */

/**lowercase过滤器将字符串转为小写 */

/**number过滤器将数字格式化成文本。它的第二个参数是可选的，用来控制小数点后截取的位数。 */

/**order by
 * orderBy可以接受两个参数，第一个是必需的，第二个是可选的。
 * 第一个参数的类型:
 * 函数:当第一个参数是函数时，该函数会被当作待排序对象的getter方法。
 * 字符串:对这个字符串进行解析的结果将决定数组元素的排序方向。我们可以传入+或-来强制进行升序或降序排列。
 * 数组:在排序表达式中使用数组元素作为谓词。对于与表达式结果并不严格相等的每个元素，则使用第一个谓词
 * 
 * 第二个参数用来控制排序的方向（是否逆向）。
*/

/**
 * uppercase:uppercase过滤器可以将字符串转换为大写形式
 */
