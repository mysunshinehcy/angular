//10种JavaScript开发者必备的VS Code插件:http://www.imooc.com/article/263900
//vs调试:https://blog.csdn.net/onil_chen/article/details/77964095
//batarang-0.4.3

//chrome launch.json配置备份
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}"
        }
    ]
}

// F8: 继续执行
// F10: step over, 单步执行, 不进入函数
// F11: step into, 单步执行, 进入函数
// shift + F11: step out, 跳出函数
// ctrl + o: 打开文件
// ctrl + shit + o: 跳到函数定义位置
// ctrl + shift + f: 所有脚本中搜索