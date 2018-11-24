<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>指令属性 示例</title>
    <meta charset="utf-8">
    <style>
        .tiny-tabs-head {
            padding-left: 30px;
            border-bottom: 1px solid black;
            margin-bottom: 5px;
        }
        .tiny-tabs-item {
            padding: 8px;
            display: inline-block;
            border: 1px solid black;
            cursor: pointer;
        }
        .tiny-tabs-item:hover {
            color: blue;
            border: 1px solid blue;
            background-color: #f473ff;
        }
        .tiny-tabs-item-active {
            color: #3dff42;
            border: 1px solid blue;
            background-color: #f473ff;
        }
    </style>
</head>

<body>
    <div ng-controller="myController">
        <tiny-tabs currentItems="currentItems">
            <tiny-tabs-item item="item" ng-repeat="item in items"></tiny-tabs-item>
        </tiny-tabs>
    </div>
</body>

<script src="../../../lib/angular.js"></script>
<script src="test21.js"></script>
</html>



test21-tinyTabsItem-template：<div ng-bind="item.label" ng-click="clickFn()" ng-class="{'tiny-tabs-item-active' : active}" class="tiny-tabs-item"></div>



test21-tinyTabs-template
<div>
    <div ng-transclude class="tiny-tabs-head"></div>
    <div ng-bind="currentItem.detail"></div>
</div>


test.js
var myApp = angular.module("myApp", []);

myApp.controller("myController", ["$scope", function($scope){
    $scope.items = [{
        id : 1,
        label : "中国",
        detail : "中国是一个人口大国。"
    },{
        id : 2,
        label : "日本",
        detail : "小日本不要嚣张哈。"
    },{
        id : 3,
        label : "美国",
        detail : "美国总爱多管闲事。"
    }]
}]);

myApp.directive("tinyTabs", function(){
    return {
        restrict : "E",
        templateUrl : "test21-tinyTabs-template.html",
        replace : true,
        transclude : true,
        scope : {
            currentItem : "="
        },
        controller : ["$scope", function($scope){
            this.setCurrentItem = function(currentItem) {
                $scope.currentItem = currentItem;
            };

            this.tinyTabsScope = $scope;
        }],
        link : function(scope, iElement, attr) {
        }
    };
});

myApp.directive("tinyTabsItem", function(){
    return {
        restrict : "E",
        templateUrl : "test21-tinyTabsItem-template.html",
        replace : true,
        require : "^^tinyTabs", // 将前缀去掉、改为?，在link中打印第四个参数，验证其结果
        scope : {
            item : "="
        },
        link : function(scope, iElement, attr, tinyTabsCtr) {
            console.log(tinyTabsCtr);
            scope.clickFn = function() {
                tinyTabsCtr.setCurrentItem(scope.item);
            };

            tinyTabsCtr.tinyTabsScope.$watch("currentItem", function(newValue, oldValue){
                if (!newValue) {
                    return;
                }

                if (scope.item.id === newValue.id) {
                    scope.active = true;
                } else {
                    scope.active = false;
                }
            });
        }
    };
});
