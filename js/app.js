// function MyController($scope, $timeout) {
//     var updateClock = function () {
//         $scope.clock = new Date();
//         $timeout(function () {
//             updateClock();
//         }, 1000)
//     }
//     updateClock();
// }

/**
 * 由于JavaScript自身的特点，以及它在传递值和引用值的不同处理方式，通常认为，在视图中通过对象的属性而非对象本身来进行引用绑定，是Angular中的最佳实践。
 */

function MyController($scope) {
    $scope.clock = {
        now: new Date()
    };
    var updateClock = function () {
        $scope.clock.now = new Date();
    }
    setInterval(function () {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
}
