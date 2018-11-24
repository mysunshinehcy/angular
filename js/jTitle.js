define([], function () {
    var jTitle = function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var tipPanelMaxWidth = 480;
                    var titleText;
                    var fontSize = 14;
                    var lineHeight = 20;
                    var screenWidth = document.body.clientWidth;
                    var screenHeight = document.body.clientHeight;
                    var tipPanelWH;

                    function shouldRemoveTip(e) {
                        if (e.clientX - tipPanel[0].offsetLeft <= tipPanel[0].offsetWidth
                            && e.clientX - tipPanel[0].offsetLeft >= 0
                            && e.clientY - tipPanel[0].offsetTop <= tipPanel[0].offsetHeight
                            && e.clientY - tipPanel[0].offsetTop >= 0) {
                            return false;
                        }
                        return true;
                    }


                    function noContentNoTip() {
                        if (!attrs.jTitle) {
                            return true;
                        }
                        return false;
                    }

                    var tipPanel = $('#jTitle').length > 0 ? $('#jTitle').eq(0) : $('<div>').css({
                        position: 'fixed',
                        background: '#fff',
                        padding: '10px',
                        'box-shadow': '2px 2px 5px 0 rgba(0,0,0,.15)',
                        color: '#666',
                        'z-index': '9999',
                        'max-width': '480px',
                        'white-space': 'normal',
                        'word-break': 'break-all',
                        border: '1px solid #eee',
                        'font-size': fontSize + 'px',
                        'line-height': lineHeight + 'px',
                        display: 'none'
                    }).attr('id', 'jTitle');

                    var fakeTipPanel = $('#fakeTipPanel').length > 0 ? $('#fakeTipPanel').eq(0) :
                        tipPanel.clone().attr('id', "fakeTipPanel").css({
                            'left': '0',
                            'top': '0',
                            display: 'block',
                            visibility: 'hidden'
                        });
                    if ($('#jTitle').length === 0) {
                        $("body").append(tipPanel);
                        $("body").append(fakeTipPanel);
                    }

                    function initFakeTipContent() {
                        if (titleText) {
                            fakeTipPanel.text(titleText).show();
                        }
                        tipPanelWH = fakeTipPanel[0].getBoundingClientRect();
                    }

                    function refreshTitle() {
                        if (titleText) {
                            tipPanel.text(titleText);
                        } else {
                            tipPanel.hide();
                        }
                    }

                    scope.$watch(attrs.jTitle, function (value) {
                        titleText = value;
                        initFakeTipContent();
                        refreshTitle();
                    });

                    element.mouseenter(function (e) {
                        canShowTip = true;
                        if (titleText) {
                            var left = e.clientX;

                            // in FF: e.offsetY is `undefined`, POLYFILL: `e.pageX - $(e.target).offset().top`
                            var top = e.clientY + (element[0].offsetHeight - (e.offsetY === undefined ? e.pageY - $(e.target).offset().top : e.offsetY));

                            var cssPos = {left: '', right: '', top: '', bottom: ''};

                            // short tipPanel no need to shift
                            if (screenWidth - e.clientX < tipPanelWH.width) {
                                cssPos.right = "10px";
                            }

                            if (screenHeight - e.clientY < tipPanelWH.height + 5) {
                                cssPos.bottom = screenHeight - top + element[0].clientHeight + 'px';
                            }

                            if (!cssPos.right) {
                                cssPos.left = left + 'px';
                            }

                            if (!cssPos.bottom) {
                                cssPos.top = top + 'px';
                            }

                            tipPanel.text(titleText).css(cssPos).show();
                        }
                    });

                    element.mouseleave(function (e) {
                        if (shouldRemoveTip(e)) {
                            tipPanel.hide();
                        }
                    });

                    tipPanel.mouseleave(function (e) {
                        tipPanel.hide();
                    });
                },
                replace: true
            };
        }
        ;

    var dataCraftModule = angular.module('dataAccess.config');
    dataCraftModule.tinyDirective('jTitle', jTitle);
})
;
