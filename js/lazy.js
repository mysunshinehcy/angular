window.loadScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(script.readyState){ // IE
        script.onreadystatechange = function(){
            if(script.readyState == "complete"){
                script.onreadystatechange = null;
                callback && callback();
            }
        };
    }else{ // FF, Chrome, Opera, ...
        script.onload = function(){
            callback && callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var myApp = angular.module("myApp");
console.log("aaa")
myApp.lazyRegisterController("homeController", ["$scope", function($scope){
    $scope.name = "home";
    console.log("home")
}]);
