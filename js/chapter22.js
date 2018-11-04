/**
 * 预期
 * 使用expect()函数来建立预期。expect()函数带有一个单值参数。这个参数被称为真实值。
 * 要建立一个预期，我们给它串联一个带单值参数的匹配器函数，这个参数就是期望值。
 * 这些匹配器函数实现了一个在真实值和期望值之间的布尔比较。可以通过在调用匹配器之前
 * 调一个not来创建测试的否定式。
 * 
 * Jasmine自带一大堆内置的匹配器，我们可以在测试应用的过程中使用。要写一个自定义的
 * 匹配器也很容易。
 */

describe('A spec suite', function () {
    it('contains a passing spec', function () {
        expect(true).toBe(true);
    });
    if ('contains another passing spec', function () {
        expect(false).not.toBe(true);
        });
})

/**
 * 内置匹配器
 */

 /**
  * 1.toBe
  * toBe()匹配器使用JavaScript操作符===来比较值
  */

describe('A spec suite',function(){
    it('contains passing specs',function(){
        var value=10,
        another_value=value;
        expect(value).toBe(another_value);
        expect(value).not.toBe(null);
    })
})

/**
 * 2.toEqual
 * toEqual()匹配器比较的是值，对简单字面量和变量有效
 */

describe('A spec suite',function(){
    it('contains a passing spec',function(){
        var value=10;
        expect(value).toEqual(10);
    })
})

/**
 * 3.toMatch
 * toMatch()匹配器使用正则表达式匹配字符串
 */
describe('A spec suite',function(){
    it('contains a passing spec',function(){
        var value="<h2>Header element:welcome</h2>";
        expect(value).toMatch(/welcome/);
        expect(value).toMatch('welcome');
        expect(value).not.toMatch('goodbye');
    })
})

/**
 * 4.toBeDefined
 * toBeDefined()匹配将值与undefined进行比较
 */

 describe('A spec suite',function(){
     it('contains a passing spec',function(){
         var value=10,
         undefined_value=undefined;
         expect(value).toBeDefined();
         expect(undefined_value).not.toBeDefined();
     })
 })


 /**
  * 5.toBeUndefined
  * toBeUndefined()匹配器的功能跟toBeDefined()匹配器
  */

  describe('A spec suite',function(){
      it('contains a passing spec',function(){
          var value =10,
          undefined_value=undefined;
          expect(undefined_value).toBeUndefined();
          expect(value).not.toBeUndefined();
      })
  })

  /**
   * 6.toBeNull
   * toBeNull()匹配器将值与null进行比较
   */

   describe('A spec suite',function(){
       it('contains a passing spec',function(){
           var value=null,
           not_null_value=10;
           expect(value).toBeNull();
           expect(not_null_value).not.toBeNull();
       })
   })


/**
* 7.toBeTruthy
* toBeTruthy()匹配器把值转换为布尔值类型之后与true进行比较
*/

describe('A spec suite',function(){
    var value=10,undefined_value;
    expect(value).toBeTruthy();
    expect(undefined_value).not.toBeTruthy();
})

/**
 * 8.toBeFalsy
 * tobeFalsy()匹配器把值转换成布尔类型之后与false比较
 */

    describe('A spec suite',function(){
        it('contains a passing spec',function(){
            var value=10,
            undefined_value;
            expect(undefined_value).toBeFalsy();
            expect(value).not.toBeFalsy();
        })
    })

    /**
     * 9.toContain
     * toContain()匹配器检测一个条目是否在数组中
     */

    describe('A spec suite',function(){
        it('contains a passing spec',function(){
            var arr=[1,2,3,4];
            expect(arr).toContain(4);
            expect(arr).not.toContain(12);
        })
    })

    /**
     * 10.toBeLessThan
     * toBeLessThan()匹配器建立了一个期望，比较一个数值是否小于预期
     */

    describe('A spec suite',function(){
        it('contains a passing spec',function(){
            var value=10;
            expect(value).toBeLessThan(20);
            expect(value).not.toBeLessThan(5);
        })
    })

    /**
    * 11.toBeGreaterThan
    * toBeGreaterThan()匹配器建立了一个期望，比较一个数值是否大于预期
    */

    describe('A spec suite',function(){
        it('contains a passing spec',function(){
            var value=30;
            expect(value).toBeGreaterThan(40);
            expect(value).not.toBeGreaterThan(20);
        })
    })

    /**
     * 12.toBeCloseTo
     * toBeCloseTo()匹配器在一个指定的精度级别内比较一个值是否接近另一个值
     */

    describe('A spec suite',function(){
        it('contains a passing spec',function(){
            var value=30.02;
            expect(value).toBeCloseTo(30,0);
            expect(value).not.toBeCloseTo(20,2);
        })
    })

    /**
     * 13.toThrow
     * toThrow()匹配器验证一个函数是否抛出了异常
     */

describe('A spec suite',function(){
    it('contains a passing spec',function(){
        expect(function(){
            return a+10;
        }).toThrow();
        expect(function(){
            return 2+10;
        }).not.toThrow();
    })
})

/**
 * 创建自定义匹配器
 * 在代码中面对更复杂的情况时，会需要创建自己的匹配器，Jasmine让这变得非常容易。要创
 * 建一个匹配器，我们可以在Jasmine块中调用addMatch()函数，带入一个值
 */

 describe('A spec suite',function(){
     this.addMatchers({
         toBeLessThanOrEqual:function(expected){
             return this.actual<=expected;
         }
     })
 })

 //然后就可以在测试套件里定义的任意测试中调用这个toBeLessThanOrEqual()匹配器了。


 /**
  * 安装和卸载
  * 除了手动在每个测试中设置测试条件，我们使用beforeEach()方法来运行一组设置函数。
  * beforeEach()函数带一个参数:一个函数，在每个细则运行之前被调用一次。它可以在一个描述
  * 块中使用，就像这样
  */

  describe('A spec suite',function(){
      var message;
      beforeEach(function(){
          message='hello';
      });
      it('should say hello world',function(){
          expect(message+'world').toEqual('hello world');
      });
      it('should say hello ari',function(){
          expect(message+'ari').toEqual('hello ari');
      });
  });

  /**
   * 我们也可以重置条件(例如，使用afterEach()函数清除数据库，或者通过模拟冲掉所有请求)。
   * 与beforeEach()函数类似，它也带有一个参数:一个函数，会在每个细则跑完之后执行。
   */

   describe('A spec suite',function(){
       var count;
       afterEach(function(){
           count=0;
       });
       it('should add one to count',function(){
           count+=1;
           expect(count).toEqual(1);
       });
       it('should check for the reset value',function(){
           expect(count).toEqual(0);
       })
   })

   //在嵌套的描述块中，这些beforeEach和afterEach方法是被串起来的，所以我们可以建立更
   //复杂的测试树，而无需重复代码。

   /**
    * 端到端介绍
    * 做端到端测试时，我们会使用Angular场景运行器。Angular场景运行器模拟了用户交互，这
    * 样我们可以更准确地评估应用的状态。
    * 
    * 编写场景测试时，我们要描述应用在不同情境下应有的行为。就像在单元测试里，我们也用
    * Jasmine来建立期望和行为。
    * 
    * 测试应用时，我们会直接使用场景运行器的API来控制浏览器。利用这个API，我们能通过
    * 不同的动作操作浏览器，包括在输入框中输入数据，选择元素，导航页面，控制浏览器的流，
    * 等等。
    * 
    * 我们要使用的核心基础API是browser()方法，这个方法返回一个对象，为了控制浏览器，
    * 可以在这个对象上面串一些方法。
    * 
    * 场景运行器通过打开一个浏览器窗口，嵌入一个iframe的方式来运行。这个iframe就是Karme
    * 运行应用测试，跟踪场景运行器成功或者失败结果的地方。
    * 
    * 1. 导航页面
    * 要在测试浏览器frame里面加载一个URL，我们使用navigateTo函数，它带有一个参数：要
    * 加载的URL。
    * 
    * browser().navigateTo(url)
    * 我们也可以通过调用一个方法取得一个URL的方式来动态加载这个URL。这个调用一般用于
    * 我们在写测试或者检测某个操作的结果时，不知道目的URL的情况下。
    */

    browser().navigateTo(title,function(){
        //在这里返回动态url
        return '/';
    });

    /**
     * 2.刷新页面
     */
    browser().reload()

    /**
     * 3.操作window对象
     * 可以获取在测试frame里当前加载页面的超链接
     */

     browser().window().href();
     //要回去测试frame中当前加载页面的路径，用下面这个语句
     browser().window().path();
     //要获取测试frame中当前加载页面的搜索字符串，执行
     browser().window().search();
     //可以像下面这样获取测试frame里当前加载页面最后一次的hash
     //散列返回的时候不带#
     browser().window().hash();

     /**
      * 4.位置
      */

//要获取测试frame中当前加载页面的$location.url(),我们用
browser().location().url()

//可以用这种方式获取测试frame中当面加载页面的$location.path()
browser().location().path();

//要像这样获取当前页面的$location.search()也是很容易的
browser().location().search();

//最后，也能获取到当前页面的hash
browser().location().hash()

/**
 * 5.建立预期
 * 想真正校验我们的应用是按照期望来运行的，需要建立对某一状态的断言。我们可以用端到
 * 端和场景API的组合来做到这一点。
 * 
 * 使用expect()，我们断言给定future对象是否与匹配器相符。场景API给出的任何返回值都是
 * 一个场景运行器将要解析的future对象，我们会校验这个最终的值是不是我们所期望的结果。
 */

 expect(browser().location().path()).toBe('/')

 //或者not()来否定这个期望
 expect(browser().location().path()).not().toBe('/home');


 /**
  * 6.跟内容交互
  * 端到端测试特别强大，因为我们实际就在加载用户将要看到的页面，所以我们可以窥视他们
  * 所能看到的结果，并且验证它看上去是对的，并且以我们预期的样子在运行。
  * 我们可以选择元素，在输入框中输入值，点击按钮，校验内容是否出现在该出现的地方，遍
  * 历循环器，等等。
  * 
  * 要选择页面上的元素，使用element()方法。这个API带两个参数：
  * 1)选择器-jQuery HTML元素选择器
  * 2)标签-用于在浏览器或者终端输出的文本字符串
  */
 Element('form','the signup form')

 //有了这个选中元素，我们就可以执行方法来查询它在页面上的状态。要检测匹配给定jQuery
 //选择器的元素数目
 element('input','input elements').count()

 //要点击一个元素(比如一个提交按钮)，可以调用
 element('button','submit button').click()

 //可以使用query()方法在给定jQuery选择器上执行一个方法

 //选择页面上所有的链接
 element('a','all links').query(
     //所有这些链接
     //都会作为元素传递给函数
     function(elements,done){
         //对每个元素做些想做的事
         angular.forEach(elements,function(ele){
             expect(ele.attr('ng-click')).toBeDefined();
         });
         done();//告诉场景运行器我们做完了
 });

 //可以查阅每个元素，在jQuery属性上设置不同的期望
 //可以获取或者设置一个元素的值
 element("button","submit button").val()
 //设置
 element("button","submit button").val("Enter");

 //可以获取或者设置文本
 //获取一块HTML的文本内容
 element('h1','header').text()
 //设置
 element("h1","header").text("Header text");

 //可以获取或者设置元素的HTML：
element('h1','header').html()
//设置
element('h1','header').html('<h2>New header</h2>');

//要设置或者获取高度
//获取元素的高度
element("div","signup box").height()
//设置
element("div","signup box").height('200px')

//要获取或者设置innerHeight
element('div','signup box').innerHeight()
//设置
element('div','signup box').innerHeight('190px')

//要设置或者获取outerHeight:
//获取元素的outerHeight
element('div','signup box').outerHeight()
//设置
element('div','signup box').outerHeight('210px')

//要设置或者获取宽度：
// 获取元素的宽度
element("div", "signup box").width()
// 设置
element("div", "signup box").width('300px')

//要设置或者获取innerWidth：
// 获取元素的'innerWidth'
element("div", "signup form").innerWidth()
// 设置
element("div", "signup form").innerWidth('200px')

//要设置或者获取outerWidth：
// 获取元素的'outerWidth'
element("div", "signup form").outerWidth()
// 设置
element("div", "signup form").outerWidth('305px')

//要设置或者获取元素的位置：
// 获取元素的位置
element(".logo", "our logo").position()
// 设置
element(".logo", "our logo").position("absolute")

//要获取或者设置scrollLeft：
// 获取元素的scrollLeft
element("#signup_form", "signup form").scrollLeft()
// 设置
element("#signup_form", "signup form").scrollLeft(0)

//要获取或者设置scrollTop的值，用这个值可以强制浏览器滚定到指定元素：
// 获取元素的scrollTop值
element("#signup_form", "signup form").scrollTop()
// 设置
element("#signup_form", "signup form").scrollTop(0)

//要获取或者设置偏移量：
// 获取元素的偏移量
element("#signup_form", "signup form").offset()
// 设置
element("#signup_form", "signup form").offset(0);

//也可以在jQuery选择器中查询或者变更一个元素的值，可以获取特性（使用attr）：
element("div", "signup box").attr('width')
// 设置
element("div", "signup box").attr('width', '100%')

//可以获取一个属性（使用prop）：
element("div", "signup box").prop('width')
// 设置
element("div", "signup box").prop('width', '100%')

//还可以获取CSS（使用css）：
element("div", "signup box").css('border-color')
// 设置
element("div", "signup box").css('border-color', 'red')

//除了使用element()获取元素，还有其他与内容交互的方式。Angular的场景运行器包含了一
//不同的帮助方法，能让我们查询和操作已渲染的DOM。

//我们可以追溯自己所感兴趣的：Angular对不同元素的元素的认知。可以选中它们，找到绑
//，与输入元素交互，查询页面以测试原生的Angular绑定。

/**
 * 选择页面上的元素
 * 场景运行器为我们建立的最底层帮助函数之一是using()函数。利用该函数，我们可以用jquery
 * 类型的元素选择符定位指定的元素
 * 
 * using()方法最多可带两个参数。
 * 1)jQuery选择器。我们用这个选择器来选定页面上的元素
 * 2)标签(可选的字符串)。这个字符串是一个标签，运行器用它在测试的输出中标识这个选择器
 */

 it('does not test anyting yet',function(){
     //定位指定元素
     using('.input_email').binding('email');
 })

 /**
  * 8.与Angular的绑定进行交互
  * 场景运行器包含了一个途径，可以深入到Angular建立的绑定中，这样就可以从DOM上查询到
  * Angular的绑定，然后从这个指定元素上选择第一个绑定关系
  * 
  * binding()方法带有一个名称参数，该参数是字符串类型。
  * 
  * 这个字符串是我们在查询中所关注的DOM元素上的绑定名称。
  */

it('should update the name',function(){
    using('.form').input('name').enter('Ari');
    expect(using('.form').binding('name')).toBe('Ari');
})

/**
 * 9.与输入元素交互
 * 我们也可以跟页面上的输入元素交互。如果想要在一个文本框中输入文字，选中一个复选框
 * 或者选择一个option元素的值，可以使用input()方法。
 * 
 * input()方法自身返回一个对象， 们可以调用这个对象的方法来跟元素进行交互。它带有一个名称参数
 * 该参数是字符串类型。
 * 
 * 这个名称是相应的ng-model的名称。
 * 我们能从输入框上调用下列方法。
 */

 //enter()。enter()方法向一个输入框输入值。
 //可以这样向输入框输入'Ari':
 input('name').enter('Ari');

 //check()。check()方法检测一个复选框的值
 input('name').check();

 //select()。select()方法选中一个单选按钮的指定值。
 input('color').select('red');

 //val()。最后，可以简单地通过调用输入元素的.val()来获取输入框的当前值。我们会用这个来检验指定输入元素的当前值
 input('color').select('red');
 input('color').val();//颜色将是'red'