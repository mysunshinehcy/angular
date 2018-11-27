manifest.json
{
    "name": "hijack analyse plug",
    "version": "0.0.1",
    "manifest_version": 2,
  
    // 简单描述
    "description": "啦啦啦，自动登录~~~",
    "icons": {
      "16": "image/icon16.png",
      "48": "image/icon48.png"
    },
    // 选择默认语言
    // "default_locale": "en",
  
    // 浏览器小图表部分
    "browser_action": {
      "default_title": "自动登录",
      "default_icon": "image/icon16.png",
      "default_popup": "html/switch.html"
    },
  
    // 引入一个脚本
    "content_scripts": [
      {
        "js": ["script/router.js"],
        // 在什么情况下使用该脚本
        "matches": [
          "https://*/authui/login*"
        ],
        // 什么情况下运行
        "run_at": "document_start"
      }
    ],
    // 应用协议页面
    "permissions": [
      "http://*/*",
      "https://*/*"
    ]
  }

  script/router.js:
  console.log("heheh");
  
  function onReady(fn) {
      var readyState = document.readyState;
      if (readyState === 'complete') {
          fn();
      } else {
          window.addEventListener("DOMContentLoaded", fn);
      }
  
  }
  
  onReady(function () {
      // 假装DOM加载完毕了
      console.log(document.querySelectorAll("#userNameId"));
      if (document.querySelectorAll("#userNameId").length < 1) {
          setTimeout(function () {
              //杭州类生产
              if (window.location.hostname === 'auth.huaweicloud.com') {
                  document.querySelectorAll("#userNameId")[0].value = "zhengxihui66";
                  document.querySelectorAll("#pwdId")[0].value = "Huawei@345";
                  document.querySelectorAll("#btn_submit")[0].click();
  
                  // 本地环境
              } else {
                  document.querySelectorAll("#userNameId")[0].value = "xieweiwei1990";
                  document.querySelectorAll("#pwdId")[0].value = "Huawei@456";
                  document.querySelectorAll("#btn_submit")[0].click();
              }
          }, 1000);
      }
  
  });
  

  locales\zh_CN\messages.js
  空js

  html\switch.html
  <div style="width:100px;"><input type="checkbox" checked>enable</div>
