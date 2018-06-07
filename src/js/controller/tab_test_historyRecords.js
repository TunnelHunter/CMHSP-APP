app.controller('tabTestHistoryRecordsCtrl', ['$scope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout',
    function ($scope, $ionicLoading, $ionicPopup, ajax_service, $http, $timeout) {
        $scope.show = false;


        // //创建加载动作
        // $ionicLoading.show({
        //     content: 'Loading',
        //     animation: 'fade-in',
        //     showBackdrop: false,
        //     template:"正在加载...",
        //     maxWidth: 200,
        //     showDelay: 0
        // });


        // 定时关闭加载动作
        $timeout(function () {
            // $ionicLoading.hide();
            $scope.items = [
                {id: 0},
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5},
                {id: 6},
                {id: 7},
                {id: 8},
                {id: 9},
                {id: 10},
                {id: 11},
                {id: 12},
                {id: 13},
                {id: 14},
                {id: 15},
                {id: 16},
                {id: 17},
                {id: 18},
                {id: 19},
                {id: 20},
                {id: 21},
                {id: 22},
                {id: 23},
                {id: 24},
                {id: 25},
                {id: 26},
                {id: 27},
                {id: 28},
                {id: 29},
                {id: 30},
                {id: 31},
                {id: 32},
                {id: 33},
                {id: 34},
                {id: 35},
                {id: 36},
                {id: 37},
                {id: 38},
                {id: 39},
                {id: 40},
                {id: 41},
                {id: 42},
                {id: 43},
                {id: 44},
                {id: 45},
                {id: 46},
                {id: 47},
                {id: 48},
                {id: 49},
                {id: 50}
            ];
        }, 1000);

        $scope.data = {
            showDelete: false
        };

        $scope.edit = function (item) {
            alert('Edit Item: ' + item.id);
        };
        $scope.share = function (item) {
            alert('Share Item: ' + item.id);
        };

        $scope.moveItem = function (item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };

        $scope.onItemDelete = function (item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };


        // Triggered on a button click, or some other target
        $scope.showPopup = function () {
            $scope.data = {};

            // 自定义弹窗
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="data.wifi">',
                title: 'Enter Wi-Fi Password',
                subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                // 不允许用户关闭，除非输入 wifi 密码
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
            $timeout(function () {
                myPopup.close(); // 3秒后关闭弹窗
            }, 3000);
        };
        //  confirm 对话框
        $scope.showConfirm = function (obj) {
            var confirmPopup = $ionicPopup.confirm({
                title: '删除记录',
                template: '您确定要删除'+obj.id+'吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $scope.onItemDelete(obj);
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        //  alert（警告） 对话框
        $scope.showAlert = function (obj) {
            var alertPopup = $ionicPopup.alert({
                title: obj.id+'的详细信息',
                template: obj.id+'您上次的得分为100分'
            });
            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };


    }]);