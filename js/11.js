angular.module('myApp', []).run(function ($rootScope, $timeout) {
    $rootScope.isDisabled = true;
    $timeout(function () {
        console.log($rootScope);
        $rootScope.isDisabled = false;
        $rootScope.myHref = "http://www.baidu.com";
        $rootScope.imgSrc = 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E9%9B%A8%E7%BA%B7%E7%BA%B7&step_word=&hs=0&pn=7&spn=0&di=10880330340&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=60802239%2C643422040&os=1160916634%2C3304200761&simid=3405148236%2C499806544&adpicid=0&lpn=0&ln=1941&fr=&fmq=1537884157792_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a0fe56fb95b932f875a9444913b6.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bzv55s_z%26e3Bv54_z%26e3BvgAzdH3Fo56hAzdH3FZMTUnMDAcODQ%3D_z%26e3Bip4s%3FfotpviPw2j%3D5g&gsm=0&rpstart=0&rpnum=0&islist=&querylist=';
    }, 2000);
    $rootScope.appProperty = "hello computer";
    $rootScope.someAction = function () {
        $rootScope.appProperty = "hello human";
    }
})