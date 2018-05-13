app.controller('tabTestStartAnswerCtrl', ['$scope', '$ionicSlideBoxDelegate', '$ionicLoading', 'ajax_service', '$http', '$timeout', '$rootScope',
    function ($scope, $ionicSlideBoxDelegate, $ionicLoading, ajax_service, $http, $timeout, $rootScope) {
        // $scope.questions = {
        //     "questionsMessage":
        //         [
        //             {
        //                 questionName: "首先，可不可以告诉小乐你的性别呢？",
        //                 questionOptions: [
        //                     {
        //                         optionName: "A、美女"
        //                     },
        //                     {
        //                         optionName: "B、帅哥"
        //                     }
        //                 ]
        //             },
        //             {
        //                 questionName: "人生难免起起落落，快乐悲伤都是我们生活的调味剂，亲爱的最近是否有点闷闷不乐，情绪低沉呢？",
        //                 questionOptions: [
        //                     {
        //                         optionName: "A、没有呀"
        //                     },
        //                     {
        //                         optionName: "B、有时候是会有些不开心"
        //                     },
        //                     {
        //                         optionName: "C、我总会感觉伤心呢，但是又无法摆脱"
        //                     },
        //                     {
        //                         optionName: "D、我感到悲伤极了，甚至不能控制我自己了"
        //                     }
        //                 ]
        //             },
        //             {
        //                 questionName: "思考自己的未来是每个人都会做的事呢，亲爱的对自己的未来是怎样看的呢？",
        //                 questionOptions: [
        //                     {
        //                         optionName: "A、我对未来很有信心"
        //                     },
        //                     {
        //                         optionName: "B、我对未来的信心不是很足"
        //                     },
        //                     {
        //                         optionName: "C、唉,我觉得我的未来没什么可期待的"
        //                     },
        //                     {
        //                         optionName: "D、我觉得我的未来已经完全没希望了,不会比现在好到哪里去的"
        //                     }
        //                 ]
        //             },
        //             {
        //                 questionName: "每个人都不是全能的，所谓“胜败乃兵家常事”，亲爱的是怎样看待失败的呢？",
        //                 questionOptions: [
        //                     {
        //                         optionName: "A、我不会有失败的感觉呀，没关系的"
        //                     },
        //                     {
        //                         optionName: "B、我觉得我的失败比别人的失败要多呢"
        //                     },
        //                     {
        //                         optionName: "C、回首过去，我看到的都是失败啊"
        //                     },
        //                     {
        //                         optionName: "D、我觉得自己总是失败，一点出息都没有"
        //                     }
        //                 ]
        //             },
        //             {
        //                 questionName: "生活就是一件接着一件大大小小的事，亲爱的对过去的事有没有不满意的呢？",
        //                 questionOptions: [
        //                     {
        //                         optionName: "A、没有什么不满意"
        //                     },
        //                     {
        //                         optionName: "B、不是很满意，有些事会有点耿耿于怀"
        //                     },
        //                     {
        //                         optionName: "C、都觉得不满意"
        //                     },
        //                     {
        //                         optionName: "D、一切事物我都已经厌倦了"
        //                     }
        //                 ]
        //             },
        //             {
        //                 questionName: "“人之初，性本善”，每个人的内心都住着一个天使哦~亲爱的你觉得呢？",
        //                 questionOptions: [
        //                     {
        //                         optionName: "A、我觉得很对呢，我就是一个小天使~"
        //                     },
        //                     {
        //                         optionName: "B、我不是个坏人，但我有时候会觉得自己有罪"
        //                     },
        //                     {
        //                         optionName: "C、我经常会觉得自己很坏，我觉得自己有罪"
        //                     },
        //                     {
        //                         optionName: "D、我总是觉得自己有罪，我是个坏人"
        //                     }
        //                 ]
        //             }
        //         ],
        //     "questionsConclusion":
        //         [
        //
        //         ]
        // };
        //创建加载动作
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });


        // 定时关闭加载动作
        $timeout(function () {
            $ionicLoading.hide();
            // $scope.fn_get_questions_data();
        }, 500);


        // $ionicSlideBoxDelegate.enableSlide(false);
        $scope.nextSlide = function () {
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.enableSlide(false);
        };


        //获取题信息
        var get_questions_data = {
            "pagenum": "2000",
            "page": '1',
            "sort_column": "factory_name",
            "sort_type": 0,
            "keywords": ''
        };
        // $scope.questions = {};
        // $scope.fn_get_questions_data = function () {
        //     $http({
        //         method: "get",
        //         //url: ajax_service.get_questions(),
        //         url:"http://localhost:8080/ti/1",
        //         //data: JSON.stringify(get_questions_data),
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     })
        //         .success(function (response) {
        //
        //             $scope.questions = response;
        //             console.log($scope.questions);
        //
        //         })
        //         .error(function (response) {
        //             //$rootScope.fn_common_showAlertTxt($rootScope.var_common_notAllowString, 1);
        //
        //         });
        // };
        // // setTimeout(function () {
        // //     $scope.fn_get_questions_data();
        // // },1000);
        // $scope.fn_get_questions_data();


        //返回用户测试结果信息
        $scope.user_test_results = {
            "device_number": '',
            "modbus_id": '',
            "modbus_type": '',
            "data": '',
            "open_address": '',
            "open_channel": ''
        };

        $scope.fn_user_test_results = function () {
            //赋值
            $scope.user_test_results.device_number = $scope.plcChannelAdd.device_number;


            //判断 满足条件才能测试
            if ($scope.user_test_results.device_number === '') {
                $rootScope.fn_common_showAlertTxt('请输入PLC设备地址！', 1);
                return;
            }
            if (isNaN($scope.user_test_results.device_number)) {
                $rootScope.fn_common_showAlertTxt('PLC设备地址只能输入数字！', 1);
                return;
            }
            if ($scope.user_test_results.data != 0 && $scope.user_test_results.data != 1) {
                $rootScope.fn_common_showAlertTxt('下发数据只能输入 0 或 1！', 1);
                return;
            }

            $http({
                method: "post",
                url: ajax_service.write_plcChannel(),
                data: JSON.stringify($scope.user_test_results),
                cache: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (response) {
                    $rootScope.fn_common_WaitingDivShow(false);
                    if (response.error_code == 0) {
                        $rootScope.fn_common_showAlertTxt('下发数据测试成功！', 1);
                    } else {
                        $rootScope.fn_common_showAlertTxt(response.data, 1);

                    }

                })
                .error(function (response) {
                    $rootScope.fn_common_WaitingDivShow(false);
                    $rootScope.fn_common_showAlertTxt($rootScope.var_common_notAllowString, 1);

                });

        }


    }]);