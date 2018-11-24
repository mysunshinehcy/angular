var Brower = require('zombie'),
    url = require('url'),
    fs = require('fs'),
    saveDir = __dirname + '/snapshots';

var scriptTagRegExp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
var stripScriptTags = function (html) {
    return html.replace(scriptTagRegExp, '');
}

var browerOpts = {
    waitFor: 2000,
    loadCSS: fase,
    runScripts: true
}

var saveSnapshot = function (url, body) {
    var lastIdx = uri.lastIndexOf('#/');
    if (lastIdx < 0) {
        //如果使用html5mode
        path = url.parse(uri).pathname;
    } else {
        // 如果使用hashbang模式
        path = uri.substring(lastIdx + 1, uri.length);
    }

    if (path === '/') path = '/index.html';

    if (path.indexOf('.html') == -1) path += '.html';

    var filename = saveDir + path;
    fs.open(filename, 'w', function (e, fd) {
        if (e) return;
        fs.write(fd, body);
    })
}


// 上面的浏览器配置中设置了一个相对较大的waitFor。这个选项会覆盖我们所关心的90%的
// 情况。如果想在获取一个快照时使用更精确的方式，而不是等待2秒，则需要修改Angular应用来
// 触发一个事件，然后在Zombie浏览器中监听这个事件。
// 由于我们希望尽可能自动化，而不想污染Angular代码，因此宁愿设置一个相对较高的超时
// 来尝试让代码保持稳定。 

//crawlPage()函数：
var crawlPage = function (idx, arr) {
    //location=window.location
    if (idx < arr.length) {
        var uri = arr[idx];
        var brower = new Brower(browerOpts);
        var promise = brower.visit(uri).then(function () {
            //将链接转换为绝对链接，然后保存它们
            //如果需要并且还没准备好就抓取它们
            var links = brower.queryAll('a');
            links.forEach(function (link) {
                var href = link.getAttribute('href');
                var absUrl = url.resolve(uri, href);
                link.setAttribute('href', absUrl);
                if (arr.indexOf(absUrl) < 0) {
                    arr.push(absUrl);
                }
            });

            //保存
            saveSnapshot(uri, brower.html());
            //在下次迭代中再次调用
            crawlPage(idx + 1, arr);
        })
    }
}

//现在，可以在我们的页面中调用这个方法了：
crawlPage(0, ["http://localhost:9000"]);

