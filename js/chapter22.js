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