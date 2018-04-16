var app = angular.module('myApp', ['ionic']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //路由
    $urlRouterProvider.otherwise("/tab/test");
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "html/tabs.html"
        })
        .state('tabs.test', {
            url: "/test",
            views: {
                'test-tab': {
                    templateUrl: "html/tab_test.html",
                    controller: 'tebTestCtrl'
                }
            }
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
});