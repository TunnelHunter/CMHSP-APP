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