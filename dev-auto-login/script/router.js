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