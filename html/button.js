var app = angular.module('myApp', [])
app.directive('myButton', function() {
    return {
        restrict: 'EAMC',
        replace: true,
        template: '<div class="buttonDefault"></div>'
    };
});

app.directive('id', function($document) {
    debugger;

    return function(scope, element, attrs) {   
        // text
        element[0].textContent = scope[attrs.text]
        $('#'+attrs.id).attr("text",scope[attrs.text])  


        // listeners
        buttonEvent = scope[attrs.listeners]
        for(var event in buttonEvent){
            element.bind(event,scope[attrs.listeners][event])
        }
    }
});
angular.element(document).ready(function(scope) {
    debugger
})
