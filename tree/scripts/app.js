angular.module('myApp', ['ngRoute', 'myApp.services', 'myApp.directives']).config(function ($routeProvider) {
  $routeProvider
     .when('/',{
       controller:'MainController',
       templateUrl:'templates/main.html'
     })
     .otherwise({
       redirectTo:'/'
     })
})

//如果让Angular自动启动我们的应用，我们会进入一个竞态条件。在这种条件下，Google API可能在应用启动时尚未加载。

//为了手动启动应用，我们在window服务中添加了onloadCallback函数。在我们能启动Angular之前，需要确认Google登录客户端
//已经加载。

//Google API客户端，或者gapi，是在运行时间被包含进来的，并且是被默认设置的，以便延迟加载服务。
//通过高速gapi.client在启动应用之前提前记载oauth2库，我们避免了任何潜在的oauth2库不可用的后果。

window.onLoadCallback=function(){
  //当文档对象准备好了
  angular.element(document).ready(function(){
    //启动oauth2库
    gapi.client.load('oauth2','v2',function(){
      //最后，启动我们的Angular应用
      angular.bootstrap(document,['myApp']);
    });
  });
}