var app = angular.module("myApp", []);
app.controller("signupController", ["$scope", function ($scope) {
    $scope.submitted = false;
    $scope.signupForm = function () {
        if ($scope.signup_form.$valid) {
            //
        } else {
            $scope.signup_form.submitted = true;
        }
    }
}])

app.directive("ngFocus", [function () {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function (evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function () {
                    ctrl.$focused = true;
                })
            }).blur('blur', function (evt) {
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function () {
                    ctrl.$focused = false;
                })
            })
        }
    }
}])
