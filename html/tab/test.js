var myApp = angular.module("myApp", []);

myApp.controller("myController", ["$scope", function ($scope) {
    $scope.items = [{
        id: 1,
        label: "中国",
        detail: "中国是一个人口大国。"
    }, {
        id: 2,
        label: "日本",
        detail: "小日本不要嚣张哈。"
    }, {
        id: 3,
        label: "美国",
        detail: "美国总爱多管闲事。"
    }]
}]);

myApp.directive("tinyTabs", function () {
    return {
        restrict: "E",
        templateUrl: "test21-tinyTabs-template.html",
        replace: true,
        transclude: true,
        scope: {
            currentItem: "="
        },
        controller: ["$scope", function ($scope) {
            this.setCurrentItem = function (currentItem) {
                $scope.currentItem = currentItem;
            };

            this.tinyTabsScope = $scope;
        }],
        link: function (scope, iElement, attr) {}
    };
});

myApp.directive("tinyTabsItem", function () {
    return {
        restrict: "E",
        templateUrl: "test21-tinyTabsItem-template.html",
        replace: true,
        require: "^^tinyTabs", // 将前缀去掉、改为?，在link中打印第四个参数，验证其结果
        scope: {
            item: "="
        },
        link: function (scope, iElement, attr, tinyTabsCtr) {
            console.log(tinyTabsCtr);
            scope.clickFn = function () {
                tinyTabsCtr.setCurrentItem(scope.item);
            };

            tinyTabsCtr.tinyTabsScope.$watch("currentItem", function (newValue, oldValue) {
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