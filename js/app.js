var app = angular.module('myApp', ['ionic']);
// 这个地方的config不能少哦, 不然安卓平台的tabs会跑到顶部的
app.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //路由
    $urlRouterProvider.otherwise("/slides");
    $stateProvider
        .state('slides', {
            url: "/slides",
            templateUrl: "html/hello_slides.html"

        })
        .state('tabs', {
            url: "/tabs",
            abstract: true,
            templateUrl: "html/tabs.html"
        })
        .state('tabs.test', {
            url: "/test",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test.html"
                }
            },
            controller: 'tabTestCtrl'
        })
        .state('tabs.startAnswer', {
            url: "/startAnswer",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test_startAnswer.html"
                }
            }
        })
        .state('tabs.historyRecords', {
            url: "/historyRecodes",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test_historyRecords.html"

                }
            },

            controller: 'tabTestHistoryRecordsCtrl'
        })
        .state('tabs.social', {
            url: "/social",
            views: {
                'social-tab': {
                    templateUrl: "html/tab_social.html"
                }
            }
        })
        .state('tabs.radio', {
            url: "/radio",
            views: {
                'radio-tab': {
                    templateUrl: "html/tab_radio.html"
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
                    templateUrl: "html/tab_user.html"
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
                    templateUrl: "html/facts2.html"
                }
            }
        });
}]);