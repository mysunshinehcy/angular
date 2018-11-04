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