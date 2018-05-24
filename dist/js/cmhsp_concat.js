var app = angular.module('myApp', ['ionic']);
// 这个地方的config不能少哦, 不然安卓平台的tabs会跑到顶部的
app.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //路由
    $urlRouterProvider.otherwise("/tabs/test");
    $stateProvider
        .state('slides', {
            url: "/slides",
            // prefetchTemplate:"",//按需加载html文件 对项目请求进行优化
            views: {
                'main': {
                    templateUrl: "html/hello_slides.html"
                }
            }

        })
        .state('tabs', {
            url: "/tabs",
            views: {
                'main': {
                    abstract: true,
                    templateUrl: "html/tabs.html",
                    controller: 'tabsCtrl'
                }
            }
        })
        .state('tabs.test', {
            url: "/test",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test.html",
                    controller: 'tabTestCtrl'
                }
            }
        })
        .state('tabs.startAnswer', {
            url: "/startAnswer",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test_startAnswer.html",
                    controller: 'tabTestStartAnswerCtrl'
                    // controller: 'tabTestCtrl'
                }
            }
        })
        .state('tabs.historyRecords', {
            url: "/historyRecords",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test_historyRecords.html",
                    controller: 'tabTestHistoryRecordsCtrl'
                }
            }
        })
        .state('tabs.social', {
            url: "/social",
            views: {
                'social-tab': {
                    templateUrl: "html/tab_social.html",
                    controller: 'tabSocialCtrl'
                }
            }
        })
        .state('tabs.radio', {
            url: "/radio",
            views: {
                'radio-tab': {
                    templateUrl: "html/tab_radio.html",
                    controller: 'tabRadioCtrl'
                }
            }
        })
        .state('tabs.reading', {
            url: "/reading",
            views: {
                'reading-tab': {
                    templateUrl: "html/tab_reading.html"
                }
            }
        })
        .state('tabs.user', {
            url: "/user",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user.html",
                    controller: 'tabUserCtrl'
                }
            }
        })
        .state('tabs.userDataAnalysis', {
            url: "/userDataAnalysis",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_dataAnalysis.html",
                    controller: 'tabUserDataAnalysisCtrl'
                }
            }
        })
        .state('tabs.userMessages', {
            url: "/userMessages",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_messages.html",
                    controller: 'tabUserMessagesCtrl'
                }
            }
        })
        .state('tabs.userInformationSettings', {
            url: "/userInformationSettings",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_information_settings.html",
                    controller: 'tabUserInformationSettingsCtrl'
                }
            }
        })
        .state('tabs.userInformationSettingsSetHeadPicture', {
            url: "/setHeadPicture",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_information_settings_set_head_picture.html",
                    controller: 'setHeadPictureCtrl'
                }
            }
        })
        .state('tabs.facts', {
            url: "/facts",
            views: {
                'home-tab': {
                    templateUrl: "html/facts.html"
                }
            }
        })
        .state('tabs.facts2', {
            url: "/facts2",

            views: {
                'home-tab': {
                    prefetchTemplate:false, //按需加载
                    templateUrl: "html/facts2.html"
                }
            }
        });
}]);
app.controller('tabsCtrl',['$scope',function ($scope) {
    $scope.show_question_windows = false;
}]);
app.controller('helloSlidersCtrl',['$scope',' $ionicSlideBoxDelegate',function ($scope, $ionicSlideBoxDelegate) {
    $scope.show_question_windows = false;
    $scope.slides = [
        {
            title: "Welcome to the Docs!",
            description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
            image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-1.png"
        },
        {
            title: "What is Ionic?",
            description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
            image: "assets/img/ica-slidebox-img-2.png"
        },
        {
            title: "What is Ionic Cloud?",
            description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
            image: "assets/img/ica-slidebox-img-3.png"
        }
    ];

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };

}]);
app.controller('tabRadioCtrl',['$scope',function ($scope) {
    $scope.show_play_box0 = false;
    $scope.fn_change_show_play_box0 = function () {
        $scope.show_play_box1 = false;
        $scope.show_play_box2 = false;
        $scope.show_play_box3 = false;
        $scope.show_play_box0=!$scope.show_play_box0;
    };

    $scope.show_play_box1 = false;
    $scope.fn_change_show_play_box1 = function () {
        $scope.show_play_box0 = false;
        $scope.show_play_box2 = false;
        $scope.show_play_box3 = false;
        $scope.show_play_box1 =!$scope.show_play_box1;
    };

    $scope.show_play_box2 = false;
    $scope.fn_change_show_play_box2 = function () {
        $scope.show_play_box0 = false;
        $scope.show_play_box1 = false;
        $scope.show_play_box3 = false;
        $scope.show_play_box2 =!$scope.show_play_box2;
    };

    $scope.show_play_box3 = false;
    $scope.fn_change_show_play_box3 = function () {
        $scope.show_play_box0 = false;
        $scope.show_play_box1 = false;
        $scope.show_play_box2 = false;
        $scope.show_play_box3 =!$scope.show_play_box3;
    };

    $scope.show_start_button = true;


}]);
app.controller('tabReadingCtrl',['$scope',function ($scope) {
    $scope.show_question_windows = false;
}]);
app.controller('tabSocialCtrl',['$scope','$http',function ($scope,$http) {
    $scope.doRefresh = function() {
        $http({
            method: "get",
            //url: ajax_service.get_questions(),
            url:"http://localhost:8080/ti/1",
            //data: JSON.stringify(get_questions_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .success(function(response) {
                $scope.items = response;
            })
            .finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });

    };
}]);



// angular.module('app.controllers', [])
//
//     .controller('categoryCtrl', ['$scope', '$http', '$stateParams','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
//         function ($scope, $http, $stateParams, $ionicLoading) {
//             var _arguments     = arguments;
//             $scope.lists       = [];
//             var page_no           = 1;
//             var page_size    = 20;
//             var page_total    = 0;
//
//             $scope.can_loadmore = function(){
//                 return page_no<page_total;
//             };
//
//             $scope.$on('$ionicView.loaded', function(event, data) {
//                 page_no     = 1;
//                 get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(res){
//                     page_total = res.pager.total;
//                 });
//             });
//
//             $scope.doRefresh = function(){
//                 page_no     = 1;
//                 get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(){
//                     $scope.$broadcast('scroll.refreshComplete');
//                 });
//             };
//
//             $scope.loadMore = function(){
//                 page_no     += 1;
//                 get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(){
//                     $scope.$broadcast('scroll.infiniteScrollComplete');
//                 });
//             };
//         }])
app.controller('tabTestCtrl',['$scope','$rootScope','$http',function ($scope,$rootScope,$http) {
    $rootScope.questions = {};
    $scope.fn_get_questions_data = function () {
        $http({
            method: "get",
            //url: ajax_service.get_questions(),
            url:"http://localhost:8080/ti/1",
            //data: JSON.stringify(get_questions_data),
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
    $scope.fn_get_questions_data();



}]);
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


        $scope.total_score = 0;

        //计算分数 - 每次点击选项按钮，累加选项分数
        $scope.fn_calculate_score = function (option_score) {
            $scope.total_score = $scope.total_score + option_score;
            console.log($scope.total_score);
        };
        $scope.show_view_results = false;
        var questionsConclusion = [];

        questionsConclusion = $rootScope.questions.questionsConclusion;
        $scope.last_results = {};
        //根据计算分数 查看测评结果
        $scope.fn_view_results = function (sum_score) {
            // $scope.show_view_results = true;
            for(var i = 0 ,len = questionsConclusion.length;i < len;i++){
                if(sum_score <= questionsConclusion[i].scoreRange){
                    $scope.last_results = questionsConclusion[i];
                    console.log($scope.last_results);
                    return;
                }
            }
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
app.controller('tabUserCtrl',['$scope','$ionicModal',function ($scope,$ionicModal) {
    $scope.settingsList = [
        { text: "Wireless", checked: true },
        { text: "GPS", checked: false },
        { text: "Bluetooth", checked: false }
    ];

    $scope.pushNotificationChange = function() {
        console.log('Push Notification Change', $scope.pushNotification.checked);
    };

    $scope.pushNotification = { checked: true };
    $scope.emailNotification = 'Subscribed';

    //模态窗口
    $scope.contacts = [
        { name: 'Gordon Freeman' },
        { name: 'Barney Calhoun' },
        { name: 'Lamarr the Headcrab' }
    ];

    $ionicModal.fromTemplateUrl('html/user_login_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.modal.hide();
    };

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

}]);
app.controller('tabUserDataAnalysisCtrl',['$scope',function ($scope) {
    $scope.show_question_windows = false;

    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('echarts_test1'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {},
        tooltip: {},
        legend: {
            data:['']
        },
        xAxis: {
            data: ["1","2","3","4","5","6","6","6","6","6"]
        },
        yAxis: {},
        series: [{
            name: '分数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 20, 20, 20, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);


    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById('echarts_test2'));

    // 指定图表的配置项和数据
    var option2 = {
        title: {},
        tooltip: {},
        legend: {
            data:['']
        },
        xAxis: {
            data: ["1","2","3","4","5","6","6","6","6","6"]
        },
        yAxis: {},
        series: [{
            name: '分数',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 20, 20, 20, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);


    // 基于准备好的dom，初始化echarts实例
    var myChart3 = echarts.init(document.getElementById('echarts_test3'));

    // 指定图表的配置项和数据
    var option3 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);






    // Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
    var dataBJ = [
        [55,9,56,0.46,18,6,1],
        [25,11,21,0.65,34,9,2],
        [56,7,63,0.3,14,5,3],
        [33,7,29,0.33,16,6,4],
        [42,24,44,0.76,40,16,5],
        [82,58,90,1.77,68,33,6],
        [74,49,77,1.46,48,27,7],
        [78,55,80,1.29,59,29,8],
        [267,216,280,4.8,108,64,9],
        [185,127,216,2.52,61,27,10],
        [39,19,38,0.57,31,15,11],
        [41,11,40,0.43,21,7,12],
        [64,38,74,1.04,46,22,13],
        [108,79,120,1.7,75,41,14],
        [108,63,116,1.48,44,26,15],
        [33,6,29,0.34,13,5,16],
        [94,66,110,1.54,62,31,17],
        [186,142,192,3.88,93,79,18],
        [57,31,54,0.96,32,14,19],
        [22,8,17,0.48,23,10,20],
        [39,15,36,0.61,29,13,21],
        [94,69,114,2.08,73,39,22],
        [99,73,110,2.43,76,48,23],
        [31,12,30,0.5,32,16,24],
        [42,27,43,1,53,22,25],
        [154,117,157,3.05,92,58,26],
        [234,185,230,4.09,123,69,27],
        [160,120,186,2.77,91,50,28],
        [134,96,165,2.76,83,41,29],
        [52,24,60,1.03,50,21,30],
        [46,5,49,0.28,10,6,31]
    ];

    var dataGZ = [
        [26,37,27,1.163,27,13,1],
        [85,62,71,1.195,60,8,2],
        [78,38,74,1.363,37,7,3],
        [21,21,36,0.634,40,9,4],
        [41,42,46,0.915,81,13,5],
        [56,52,69,1.067,92,16,6],
        [64,30,28,0.924,51,2,7],
        [55,48,74,1.236,75,26,8],
        [76,85,113,1.237,114,27,9],
        [91,81,104,1.041,56,40,10],
        [84,39,60,0.964,25,11,11],
        [64,51,101,0.862,58,23,12],
        [70,69,120,1.198,65,36,13],
        [77,105,178,2.549,64,16,14],
        [109,68,87,0.996,74,29,15],
        [73,68,97,0.905,51,34,16],
        [54,27,47,0.592,53,12,17],
        [51,61,97,0.811,65,19,18],
        [91,71,121,1.374,43,18,19],
        [73,102,182,2.787,44,19,20],
        [73,50,76,0.717,31,20,21],
        [84,94,140,2.238,68,18,22],
        [93,77,104,1.165,53,7,23],
        [99,130,227,3.97,55,15,24],
        [146,84,139,1.094,40,17,25],
        [113,108,137,1.481,48,15,26],
        [81,48,62,1.619,26,3,27],
        [56,48,68,1.336,37,9,28],
        [82,92,174,3.29,0,13,29],
        [106,116,188,3.628,101,16,30],
        [118,50,0,1.383,76,11,31]
    ];

    var dataSH = [
        [91,45,125,0.82,34,23,1],
        [65,27,78,0.86,45,29,2],
        [83,60,84,1.09,73,27,3],
        [109,81,121,1.28,68,51,4],
        [106,77,114,1.07,55,51,5],
        [109,81,121,1.28,68,51,6],
        [106,77,114,1.07,55,51,7],
        [89,65,78,0.86,51,26,8],
        [53,33,47,0.64,50,17,9],
        [80,55,80,1.01,75,24,10],
        [117,81,124,1.03,45,24,11],
        [99,71,142,1.1,62,42,12],
        [95,69,130,1.28,74,50,13],
        [116,87,131,1.47,84,40,14],
        [108,80,121,1.3,85,37,15],
        [134,83,167,1.16,57,43,16],
        [79,43,107,1.05,59,37,17],
        [71,46,89,0.86,64,25,18],
        [97,71,113,1.17,88,31,19],
        [84,57,91,0.85,55,31,20],
        [87,63,101,0.9,56,41,21],
        [104,77,119,1.09,73,48,22],
        [87,62,100,1,72,28,23],
        [168,128,172,1.49,97,56,24],
        [65,45,51,0.74,39,17,25],
        [39,24,38,0.61,47,17,26],
        [39,24,39,0.59,50,19,27],
        [93,68,96,1.05,79,29,28],
        [188,143,197,1.66,99,51,29],
        [174,131,174,1.55,108,50,30],
        [187,143,201,1.39,89,53,31]
    ];

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };



    // 基于准备好的dom，初始化echarts实例
    var myChart4 = echarts.init(document.getElementById('echarts_test4'));

    // 指定图表的配置项和数据
    var option4 = {
        backgroundColor: '#161627',
        title: {
            text: '',
            left: 'center',
            textStyle: {
                color: '#eee'
            }
        },
        legend: {
            bottom: 5,
            data: ['北京', '上海', '广州'],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            selectedMode: 'single'
        },
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 20,
        //     dimension: 6,
        //     inRange: {
        //         colorLightness: [0.5, 0.8]
        //     }
        // },
        radar: {
            indicator: [
                {name: 'AQI', max: 300},
                {name: 'PM2.5', max: 250},
                {name: 'PM10', max: 300},
                {name: 'CO', max: 5},
                {name: 'NO2', max: 200},
                {name: 'SO2', max: 100}
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: 'rgb(238, 197, 102)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: '北京',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataBJ,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#F9713C'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name: '上海',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataSH,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#B3E4A1'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.05
                    }
                }
            },
            {
                name: '广州',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataGZ,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: 'rgb(238, 197, 102)'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.05
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart4.setOption(option4);



// Generate data
    var category = [];
    var dottedBase = +new Date();
    var lineData = [];
    var barData = [];

    for (var i = 0; i < 20; i++) {
        var date = new Date(dottedBase += 3600 * 24 * 1000);
        category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-'));
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b)
        lineData.push(d + b);
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart5 = echarts.init(document.getElementById('echarts_test5'));

    // 指定图表的配置项和数据
    var option5 = {
        backgroundColor: '#0f375f',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['line', 'bar'],
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            data: category,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            splitLine: {show: false},
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        series: [{
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
        }, {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#14c8d4'},
                            {offset: 1, color: '#43eec6'}
                        ]
                    )
                }
            },
            data: barData
        }, {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(20,200,212,0.5)'},
                            {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                            {offset: 1, color: 'rgba(20,200,212,0)'}
                        ]
                    )
                }
            },
            z: -12,
            data: lineData
        }, {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
                normal: {
                    color: '#0f375f'
                }
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart5.setOption(option5);



    // 基于准备好的dom，初始化echarts实例
    var myChart6 = echarts.init(document.getElementById('echarts_test6'));

    // 指定图表的配置项和数据
    var option6 = {
        series: [{
            type: 'liquidFill',
            data: [0.6, {
                value: 0.5,
                direction: 'left'
            }, 0.4, {
                value: 0.3,
                direction: 'left'
            }],
            radius: '70%',
            outline: {
                show: false
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart6.setOption(option6);

}]);
app.controller('tabUserInformationSettingsCtrl',['$scope','$ionicModal',function ($scope,$ionicModal) {

    //姓名设置 模态窗口
    $scope.contacts = [
        { name: 'Gordon Freeman' },
        { name: 'Barney Calhoun' },
        { name: 'Lamarr the Headcrab' }
    ];

    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setName_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_name_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_name_modal.hide();
    };

    $scope.open_set_name_modal = function() {
        $scope.set_name_modal.show();
    };
    $scope.close_set_name_modal = function() {
        $scope.set_name_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_name_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_name_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_name_modal.removed', function() {
        // Execute action
    });






    //性别设置 模态窗口
    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setGender_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_gender_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_gender_modal.hide();
    };

    $scope.open_set_gender_modal = function() {
        $scope.set_gender_modal.show();
    };
    $scope.close_set_gender_modal = function() {
        $scope.set_gender_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_gender_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_gender_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_gender_modal.removed', function() {
        // Execute action
    });

    $scope.clientSideList = [
        { text: "Backbone", value: "bb" },
        { text: "Angular", value: "ng" },
        { text: "Ember", value: "em" },
        { text: "Knockout", value: "ko" }
    ];

    $scope.serverSideList = [
        { text: "Go", value: "go" },
        { text: "Python", value: "py" },
        { text: "Ruby", value: "rb" },
        { text: "Java", value: "jv" }
    ];

    $scope.data = {
        clientSide: 'ng'
    };

    $scope.serverSideChange = function(item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
    };





    //地区设置 模态窗口
    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setRegion_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_region_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_region_modal.hide();
    };

    $scope.open_set_region_modal = function() {
        $scope.set_region_modal.show();
    };
    $scope.close_set_region_modal = function() {
        $scope.set_region_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_region_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_region_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_region_modal.removed', function() {
        // Execute action
    });




    //个性签名设置 模态窗口
    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setSignature_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_signature_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_signature_modal.hide();
    };

    $scope.open_set_signature_modal = function() {
        $scope.set_signature_modal.show();
    };
    $scope.close_set_signature_modal = function() {
        $scope.set_signature_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_signature_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_signature_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_signature_modal.removed', function() {
        // Execute action
    });




}]);
app.controller('setHeadPictureCtrl', ['$scope', '$ionicActionSheet', '$timeout', function ($scope, $ionicActionSheet, $timeout) {


    $scope.show_action_sheet = function () {

        $ionicActionSheet.show({
            buttons: [
                {text: '拍 照'},
                {text: '从相册选择'}
            ],
            cssClass: 'color:#53565a;',
            // destructiveText: 'Delete',
            // titleText: 'Modify your album',
            cancelText: '取 消',
            cancelOnStateChange:true,
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                return true;
            },
            destructiveButtonClicked: function (index) {
                return true;
            }
        });


    };
}]);
app.controller('tabUserMessagesCtrl',['$scope','$timeout',function ($scope,$timeout) {
    $scope.show_question_windows = false;

$timeout(function () {
    $scope.user_messages = [
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小张',
            'content':'你好啊！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.webp',
            'name':'小李',
            'content':'你在哪里？'
        },
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小黄',
            'content':'评论666'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.webp',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小乐',
            'content':'我起飞了！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.webp',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.webp',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.webp',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
            'name':'小机',
            'content':'键盘侠！'
        }
    ]

},1000);

}]);
//统一接口注册
app.service('ajax_service', function () {

    var aaaa = 'CMHSP';
    this.set_ = function (args) {
        aaaa = args;
        return this;
    };
    this.get_ = function () {
        return aaaa;
    };

    //ajax 根目录
    var ROOT_HTTP = 'http://192.168.1.39:8090/CMHSP';  //服务器ip
    // var ROOT_HTTP = '../../../../CMHSP'; //上传到 CMHSP 项目里



    //获取题目信息
    var get_questions = ROOT_HTTP + '/sysconfig/questionsdetail';
    this.get_questions = function () {
        return get_questions;
    };


    var imgupload_absoluteurl = ROOT_HTTP + '/';
    this.imgupload_absoluteurl = function () {
        return imgupload_absoluteurl;
    };

    var updateApp = ROOT_HTTP + '/sysconfig/updateApp';
    //// http://192.168.1.232:8200/DIOS/SuperviseSoftware/package.json
    this.updateApp=function(){
        return updateApp;
    };

    var login = ROOT_HTTP + '/login';
    this.login = function () {
        return login;
    };
    //工厂分区 - 矩形图
    var factoryzone = ROOT_HTTP + '/main/factoryzone';
    this.factoryzone = function () {
        return factoryzone;
    };

    //工厂分区配置
    var factoryzonedetail = ROOT_HTTP + '/sysconfig/factoryzonedetail';
    this.factoryzonedetail = function () {
        return factoryzonedetail;
    };
    var addfactoryzone = ROOT_HTTP + '/sysconfig/addfactoryzone';
    this.addfactoryzone = function () {
        return addfactoryzone;
    };
    var updatefactoryzone = ROOT_HTTP + '/sysconfig/updatefactoryzone';
    this.updatefactoryzone = function () {
        return updatefactoryzone;
    };
    var deletefactoryzone = ROOT_HTTP + '/sysconfig/deletefactoryzone';
    this.deletefactoryzone = function () {
        return deletefactoryzone;
    };
    var queryfactoryzone = ROOT_HTTP + '/sysconfig/queryfactoryzone';
    this.queryfactoryzone = function () {
        return queryfactoryzone;
    };

    //获取角色信息
    var ajax_getUser = ROOT_HTTP + '/usermgr/userinfodetail';
    var ajax_addUser = ROOT_HTTP + '/usermgr/adduserinfo';
    var ajax_alterUser = ROOT_HTTP + '/usermgr/updateuserinfo';
    var ajax_delUser = ROOT_HTTP + '/usermgr/deleteuserinfo';
    this.getUser = function () {
        return ajax_getUser;
    };
    this.addUser = function () {
        return ajax_addUser;
    };
    this.alterUser = function () {
        return ajax_alterUser;
    };
    this.delUser = function () {
        return ajax_delUser;
    };


});
