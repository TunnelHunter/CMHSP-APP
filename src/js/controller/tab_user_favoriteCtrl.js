app.controller('tabUserFavoriteCtrl', ['$scope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $ionicLoading, $ionicPopup, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();
        $scope.arr_test_historyRecords = [];

        var arr_test = [
            {
                "testType": "1",
                "testId": "1",
                "testName": "抑郁症测试题(一)",
                "testScore": "12",
                "summary": "没有抑郁症",
                "time": "2018-6-18",
                "conclusion": "你的状态很不错。你的情绪已经很好了。这是正常范围，大多数总分这么低的人都会感到快乐满足。你现在的心理状况非常的好，请继续保持你的良好心态，想提醒你的是如果累了就休息休息。也可以总结影响自己心情的因素有哪些。"
            },
            {
                "testType": "2",
                "testId": "2",
                "testName": "焦虑症测试题(一)",
                "testScore": "56",
                "summary": "严重焦虑症",
                "time": "2018-6-18",
                "conclusion": "你的抑郁程度已非常严重。按照你的测试结果，情况不是特别好。你的情绪容易狂躁不安，这很可能会非常危险，因为人在绝望无助的时候往往会有自杀的冲动。如有条件，请去寻求专业帮助。"
            },
            {
                "testType": "3",
                "testId": "3",
                "testName": "焦虑症测试题(二)",
                "testScore": "34",
                "summary": "中度焦虑症",
                "time": "2018-6-18",
                "conclusion": "你最近的心情明显很低落。这个分数的你，表示你有可能陷入中度抑郁中。不过，请不要被“中度”这个词所蒙蔽，得分在这个范围内足以说明你的痛苦已非常深重。我们大多数人只会暂时情绪低落，一般很快就能摆脱。如果你这个状态超过两个星期，请务必考虑专业治疗。"
            }
        ];


        /*
        获取该用户的测试记录
         */

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.fn_get_historyRecords();

        });


        $scope.fn_get_historyRecords = function () {

            var userId = window.localStorage.getItem("userId");

            $http({
                method: "post",
                url: ajax_service.get_userTestRecords(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.arr_test_historyRecords = response.data;

                    }

                })
                .error(function (response) {
                    $scope.arr_test_historyRecords = arr_test;

                })
        };

        //点击测试列表 弹框显示测试记录详细信息
        $scope.showAlert = function (record) {
            var alertPopup = $ionicPopup.alert({
                title: record.testName,
                subTitle: record.testScore + '分' + '  ' + record.summary,
                template: '测试结论: ' + record.conclusion,
                buttons: [
                    {
                        text: '知道了',
                        type: 'button-balanced'
                    }
                ]
            });
            //弹窗消失后要执行的动作
            // alertPopup.then(function (res) {
            //     console.log('Thank you for not eating my delicious ice cream cone');
            // });
        };

        /*
        以下代码 包括 操作列表弹框 如：删除、编辑  暂时不用
         */
        // $scope.data = {
        //     showDelete: false
        // };
        // $scope.edit = function (item) {
        //     alert('Edit Item: ' + item.id);
        // };
        // $scope.share = function (item) {
        //     alert('Share Item: ' + item.id);
        // };
        //
        // $scope.moveItem = function (item, fromIndex, toIndex) {
        //     $scope.items.splice(fromIndex, 1);
        //     $scope.items.splice(toIndex, 0, item);
        // };
        //
        // $scope.onItemDelete = function (item) {
        //     $scope.items.splice($scope.items.indexOf(item), 1);
        // };
        // // Triggered on a button click, or some other target
        // $scope.showPopup = function () {
        //     $scope.data = {};
        //
        //     // 自定义弹窗
        //     var myPopup = $ionicPopup.show({
        //         template: '<input type="password" ng-model="data.wifi">',
        //         title: 'Enter Wi-Fi Password',
        //         subTitle: 'Please use normal things',
        //         scope: $scope,
        //         buttons: [
        //             {text: 'Cancel'},
        //             {
        //                 text: '<b>Save</b>',
        //                 type: 'button-balanced',
        //                 onTap: function (e) {
        //                     if (!$scope.data.wifi) {
        //                         // 不允许用户关闭，除非输入 wifi 密码
        //                         e.preventDefault();
        //                     } else {
        //                         return $scope.data.wifi;
        //                     }
        //                 }
        //             }
        //         ]
        //     });
        //     myPopup.then(function (res) {
        //         console.log('Tapped!', res);
        //     });
        //     $timeout(function () {
        //         myPopup.close(); // 3秒后关闭弹窗
        //     }, 3000);
        // };
        // //  confirm 对话框
        // $scope.showConfirm = function (obj) {
        //     var confirmPopup = $ionicPopup.confirm({
        //         title: '删除记录',
        //         template: '您确定要删除'+obj.id+'吗?'
        //     });
        //     confirmPopup.then(function (res) {
        //         if (res) {
        //             $scope.onItemDelete(obj);
        //             console.log('You are sure');
        //         } else {
        //             console.log('You are not sure');
        //         }
        //     });
        // };

    }]);