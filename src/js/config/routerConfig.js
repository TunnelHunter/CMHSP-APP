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
        .state('tabs.examinationsBank', {
            url: "/examinationsBank",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test_examinationsBank.html",
                    controller: 'tabTestExaminationsBankCtrl'
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
        .state('tabs.social', {
            url: "/social",
            views: {
                'social-tab': {
                    templateUrl: "html/tab_social.html",
                    controller: 'tabSocialCtrl'
                }
            }
        })
        .state('tabs.socialDetail', {
            url: "/socialDetail",
            params: {'item': null},//设置为对象，用于接受对象型数据
            views: {
                'social-tab': {
                    templateUrl: "html/tab_socialDetail.html",
                    controller: 'tabSocialDetailCtrl'
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
        .state('tabs.musicPlayer', {
            url: "/musicPlayer",
            views: {
                'radio-tab': {
                    templateUrl: "html/tab_music_player.html",
                    controller: 'tabMusicPlayerCtrl'
                }
            }
        })
        .state('tabs.reading', {
            url: "/reading",
            views: {
                'reading-tab': {
                    templateUrl: "html/tab_reading.html",
                    controller: 'tabReadingCtrl'
                }
            }
        })
        .state('tabs.readingList', {
            url: "/readingList/",
            params:{'readType':''},
            views: {
                'reading-tab': {
                    templateUrl: "html/tab_readingList.html",
                    controller: 'tabReadingListCtrl'
                }
            }
        })
        .state('tabs.readingDetail', {
            url: "/readingDetail",
            params:{'read':null,'fromPage':'','readType':''},
            views: {
                'reading-tab': {
                    templateUrl: "html/tab_readingDetail.html",
                    controller: 'tabReadingDetailCtrl'
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
        .state('tabs.userMessages', {
            url: "/userMessages",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_messages.html",
                    controller: 'tabUserMessagesCtrl'
                }
            }
        })
        .state('tabs.systemMessages', {
            url: "/systemMessages",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_messages_sysList.html",
                    controller: 'tabUserMessagesSysListCtrl'
                }
            }
        })
        .state('tabs.commentMessages', {
            url: "/commentMessages",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_messages_comtList.html",
                    controller: 'tabUserMessagesComtListCtrl'
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
        .state('tabs.userTestHistoryRecords', {
            url: "/userTestHistoryRecords",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_testHistoryRecords.html",
                    controller: 'tabUserTestHistoryRecordsCtrl'
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
        .state('tabs.userFavorite', {
            url: "/userFavorite",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_favorite.html",
                    controller: 'tabUserFavoriteCtrl'
                }
            }
        })
        .state('tabs.appAbout', {
            url: "/appAbout",
            views: {
                'user-tab': {
                    templateUrl: "html/tab_user_appAbout.html",
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
                    prefetchTemplate: false, //按需加载
                    templateUrl: "html/facts2.html"
                }
            }
        });
}]);