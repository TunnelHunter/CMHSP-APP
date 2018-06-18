app.controller('tabTestExaminationsBankCtrl', ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout',
    function ($scope, $rootScope,$ionicLoading, $ionicPopup, ajax_service, $http, $timeout) {
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





        $scope.fn_get_questions_data = function () {
            $http({
                method: "get",
                url: ajax_service.get_questions(),
                data: JSON.stringify(get_questions_data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (response) {

                    $rootScope.questions = response;
                    console.log($rootScope.questions);

                })
                .error(function (response) {
                    //$rootScope.fn_common_showAlertTxt($rootScope.var_common_notAllowString, 1);

                });
        };
        // $scope.fn_get_questions_data();



        $scope.data1 = "11111";

        $scope.serverSideChange = function(item) {
            console.log("Selected Serverside, text:", item.text, "value:", item.value);
        };




        // 定时关闭加载动作
        $timeout(function () {
            // $ionicLoading.hide();
            // $scope.items = [
            //     {id: 0},
            //     {id: 1},
            //     {id: 2},
            //     {id: 3},
            //     {id: 4},
            //     {id: 5},
            //     {id: 6},
            //     {id: 7},
            //     {id: 8},
            //     {id: 9}
            // ];
            //
            // $scope.serverSideList = [
            //     { text: "抑郁症测试题1", value: "11111" },
            //     { text: "抑郁症测试题2", value: "22222" },
            //     { text: "狂躁症测试题1", value: "33333" }
            // ];
            $scope.examinations_list1 = {};
            $scope.examinations_list1 = $rootScope.examinations_list;
        }, 1000);

        $scope.data = {
            showDelete: false
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