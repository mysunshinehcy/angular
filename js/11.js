angular.module('myApp', []).run(function ($rootScope, $timeout) {
    $rootScope.isDisabled = true;
    $timeout(function () {
        $rootScope.isDisabled = false;
        $rootScope.myHref = "http://www.baidu.com";
        //$rootScope.imgSrc = 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E9%9B%A8%E7%BA%B7%E7%BA%B7&step_word=&hs=0&pn=7&spn=0&di=10880330340&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=60802239%2C643422040&os=1160916634%2C3304200761&simid=3405148236%2C499806544&adpicid=0&lpn=0&ln=1941&fr=&fmq=1537884157792_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a0fe56fb95b932f875a9444913b6.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bzv55s_z%26e3Bv54_z%26e3BvgAzdH3Fo56hAzdH3FZMTUnMDAcODQ%3D_z%26e3Bip4s%3FfotpviPw2j%3D5g&gsm=0&rpstart=0&rpnum=0&islist=&querylist=';
    }, 2000);
    $rootScope.appProperty = "hello computer";
    $rootScope.someAction = function () {
        $rootScope.appProperty = "hello human";
    }
}).controller('SomeController', ['$scope', function ($scope) {
    //创建模型
    $scope.someModel = {
        //添加属性
        someProperty: 'hello computer'
    };
    //设置$scope自身的操作
    $scope.someAction = function () {
        $scope.someModel.someProperty = 'hello human';
    }
    /**
     * 我们使用了$rootScope的子作用域提供了一个干净的对象供我们操作。使用子作用域意味着
     * 其上的数据模型和操作在应用的其他地方是无法访问的。显示声明了数据模型，我们说过，这
     * 非常重要。下面是当前例子的变体。在这个例子中，在已有的控制器中嵌套了第二个控制器，
     * 并且没有设置模型对象的属性。
     */
}]).controller('ParentController', function ($scope) {
    //由于原型继承的关系，修改父级对象中的someBareValue会同时修改子对象中的值，但反之则不行
    //反模式，裸值
    $scope.someBareValue = "hello computer";
    //设置$scope本身的操作，这样没问题
    $scope.someAction = function () {
        //在ParentController和ChildCOntroller中设置{{someBareValue}}
        $scope.someBareValue = "hello human,from parent";
    }
}).controller('ChildController', function ($scope) {
    $scope.childAction = function () {
        //在ChildController中设置{{someBareValue}}
        $scope.someBareValue = "hello human,from child";
    }
}).controller('anyParentController', function ($scope) {
    //如果将模型对象的某个属性设置为字符串，它会通过引用进行共享，因此在子$scope属性也会修改父$scope中的这个属性。
    //下面的例子展示了正确的做法
    //最佳实践，永远使用一个模式
    $scope.someModel = {
        someValue: 'hello computer',
    };
    $scope.someAction = function () {
        $scope.someModel.someValue = "hello human,from parent";
    }
}).controller("anyChildController", function ($scope) {
    $scope.childAction = function () {
        $scope.someModel.someValue = "hello human,from child";
    }
}).controller('MyController', function ($scope) {
    //没有了
}).controller("peopleController", function ($scope) {
    $scope.people = [{
        name: 'Ari',
        city: 'San Francisco'
    }, {
        name: 'Erik',
        city: 'Seattle'
    }]
}).controller("EquationController", function ($scope) {
    $scope.equation = {};
    $scope.change = function () {
        $scope.equation.output = parseInt($scope.equation.x) + 2;
    }
}).controller("FormController", function ($scope) {
    $scope.fields = [{
        placeholder: 'Username',
        isRequired: true
    }, {
        placeholder: 'Password',
        isRequired: true
    }, {
        placeholder: 'Email(optional)',
        isRequired: false
    }];
    $scope.submitForm = function () {
        alert("it works!");
    }
}).controller("CountController", function ($scope) {
    $scope.decrement = function () {
        $scope.count = $scope.count - 1;
    }
}).controller("CityController", function ($scope) {
    $scope.cities = [{ name: 'Seattle' },
    { name: 'San Francisco' },
    { name: 'Chicago' },
    { name: 'New York' },
    { name: 'Boston' }]
}).controller("submitController", function ($scope) {
    $scope.person = {
        name: null
    };
    $scope.people = [];
    $scope.submit = function () {
        if ($scope.person.name) {
            $scope.people.push({ name: $scope.person.name });
            $scope.person.name = '';
        }
    };
}).controller("LotteryController", function ($scope) {
    $scope.generateNumber = function () {
        return Math.floor((Math.random() * 10) + 1);
    }
})
