/**
 * 在我们的指令中，要做下面这些事情
 * 1)创建一个DOM元素，能够设置样式(使用一个模板);
 * 2)设置在指令中需要的Google+属性
 * 3)clientid
 * 4)作用域
 * 5)oauth响应的回调
 * 6)设置结束登录响应的自定义回调方法
 * 7)允许指令的用户基于成功登录定义一个自定义函数
 * 
 * 上面列出的我们指令的部分都是很明确的，可以在下面的完整代码中看到。上面列表中的一个组件是这个指令独有的
 * 它允许用户定义一个方法，在成功登录之后运行。
 * 
 * 在隔离的作用域方法中，我们会添加一个自定义函数，它能够在指令中指向所包含的作用域上定义的一个函数
 * 为了做到这个，我们会使用&符号来告诉Angular，我们感兴趣的是绑定一个函数，而不是简单的数据
 * 
 * scope:{afterSignin:'&'}
 */
angular.module('myApp.directive', []).directive('googleSignin', function () {
  return {
    restrict: 'A',
    template: '<span id="signinButton"></span>',
    replace: true,
    scope: {
      afterSignin: '&'
    },
    link: function (scope, ele, attrs) {
      //设置标准的google类
      attrs.$set('class', 'g-signin');
      //设置clientid
      attrs.$set('data-clientid', attrs.clientId + '.apps.googleusercontent.com');
      //简历作用域的url
      var scopes = attrs.scopes || ['auth/plus.login', 'auth/userinfo.email'];
      var scopeUrls = [];
      for (var i = 0; i < scopes.length; i++) {
        scopeUrls.push('https://www.googleapis.com/' + scopes[i]);
      };
      //创建一个自定义回调方法
      var callbackId = '_googleSigninCallback',
        directiveScope = scope;
      window[callbackId] = function () {
        var oauth = arguments[0];
        directiveScope.afterSignin({
          oauth: oauth
        });
        window[callbackId] = null;
      };
      //设置标准的google登录按钮的设置
      attrs.$set('data-callback', callbackId);
      attrs.$set('data-cookiepolicy', 'single_host_origin');
      attrs.$set('data-requestvisibleactions', 'http://schemas.google.com/AddActivity')
      attrs.$set('data-scope', scopeUrls.join(' '));

      //最后，刷新客户端库
      //强迫按钮在浏览器中重绘
      (function () {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByName('script')[0];
        s.parentNode.insertBefore(po, s);
      })();
    }
  }
})