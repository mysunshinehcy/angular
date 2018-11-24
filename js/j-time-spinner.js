define([], function () {
    var jTimeSpinner = function ($timeout) {
        var currentDom;

        function format2FixedStr(srcValue, length) {
            var formatted = new Array(length).join('0') + srcValue;
            return formatted.slice(formatted.length - length);
        }

        function validTime(value, type) {
            if (isNaN(Number.parseInt(value))) {
                return '00';
            }
            var tempValue = Number.parseInt(value);
            if (type === 'm' || type === 's') {
                if (tempValue > 59) {
                    return '00';
                } else if (tempValue < 0) {
                    return '59';
                }
            } else if (type === 'h') {
                if (tempValue > 23) {
                    return '00';
                } else if (tempValue < 0) {
                    return '23';
                }
            } else {
                return '00';
            }

            return format2FixedStr(value, 2);
        }

        function setValue(scope) {
            scope.value = (scope.show.h ? scope.showValue.h : '')
            + (scope.show.m ? ':' + scope.showValue.m : '')
            + (scope.show.s ? ':' + scope.showValue.s : '');
        }

        function initShow(scope) {
            scope.show = {};
            var formatArr = scope.format.split(":");

            scope.show.h = formatArr.indexOf('hh') > -1;
            scope.show.m = formatArr.indexOf('mm') > -1;
            scope.show.s = formatArr.indexOf('ss') > -1;
        }

        function useNowTime() {
            var nowTime = new Date(), value;
            value = format2FixedStr(nowTime.getHours(), 2) + ':';
            value += format2FixedStr(nowTime.getMinutes(), 2) + ':';
            value += format2FixedStr(nowTime.getSeconds(), 2);
            return value;
        }

        function initShowValue(scope) {
            scope.showValue = {};
            scope.value = scope.value || (scope.useNow ? useNowTime() : '00:00:00');
            var timeArr = scope.value.split(':');
            scope.showValue.h = validTime(timeArr[0], 'h');
            scope.showValue.m = validTime(timeArr[1], 'm');
            scope.showValue.s = validTime(timeArr[2], 's');
            setValue(scope);
        }

        function initEvent(scope, element) {
            scope.add = function () {
                $timeout(function(){
                    element.find('.j-spinner').focus();
                    currentDom.select();
                },0);

                scope.showValue[scope.currentType] = validTime(+scope.showValue[scope.currentType] + 1, scope.currentType);
                setValue(scope);
            };

            scope.minus = function () {
                $timeout(function(){
                    element.find('.j-spinner').focus();
                    currentDom.select();
                },0);
                scope.showValue[scope.currentType] = validTime(+scope.showValue[scope.currentType] - 1, scope.currentType);
                setValue(scope);
            };
            scope.currentType = 'h';
            scope.focus = function ($event, type) {
                $timeout(function(){
                    $event.target.select();
                },0);

                currentDom = $event.target;
                scope.currentType = type;
            };

            scope.change = function () {
                scope.showValue[scope.currentType] = validTime(scope.showValue[scope.currentType], scope.currentType);
                setValue(scope);
            }
        }


        function init(scope, element, attrs) {
            initShow(scope);

            initShowValue(scope);

            initEvent(scope, element);
        }

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                init(scope, element, attrs);
            },
            scope: {
                format: '=',
                value: '=', // 时间值。格式：时：分：秒
                disable: '=',
                useNow: '=' //设置默认时间为当前时间

            },
            templateUrl: 'j-time-spinner.html',
            replace: true
        };
    };

    var dataCraftModule = angular.module('dataAccess.config');
    dataCraftModule.tinyDirective('jTimeSpinner', jTimeSpinner);
})
;
