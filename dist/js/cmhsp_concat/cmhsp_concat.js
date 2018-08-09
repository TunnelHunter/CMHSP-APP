var app = angular.module('myApp', ['ionic', 'ionic-toast']);

app.config(['$ionicConfigProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
    function ($ionicConfigProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

        //这个地方的config不能少, 否则安卓平台的tabs会跑到顶部的
        $ionicConfigProvider.tabs.position('bottom'); // other values: top



        var httpInterceptor = ['$q', '$window', '$location', '$injector',function($q, $window, $location, $injector) {

            return {
                request: function (config) {
                    // console.log(config);
                    if(config.headers.hasOwnProperty("addToken")){
                        delete config.headers["addToken"];
                        if (localStorage.getItem('token')) {
                            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
                        }
                    }

                    return config || $q.when(config);
                },
                response: function (response) {
                    // if (response.status == 21000) {
                    //     // console.log('do something...');
                    // }
                    return response || $q.when(response);
                },
                requestError: function (config) {
                    // ......
                    return $q.reject(config);
                },
                responseError: function (response) {
                    // ......
                    return $q.reject(response);
                }

            };
        }];

        // var interceptor = ['$q', '$window', '$location', '$injector', function($q, $window, $location, $injector) {
        //
        //     return {
        //         request: function (config) {
        //             config.headers = config.headers || {};
        //             if ($window.sessionStorage.token) {
        //                 config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        //             }
        //             return config;
        //         },
        //
        //         requestError: function(rejection) {
        //             return $q.reject(rejection);
        //         },
        //
        //         response: function (response) {
        //             return response || $q.when(response);
        //         },
        //
        //         // Revoke client authentication if 401 is received
        //
        //         responseError: function(rejection) {
        //             console.log(rejection);
        //             // Dynamically get the service since they can't be injected into config
        //             var AuthenticationService = $injector.get('AuthenticationService');
        //
        //             if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isLogged)) {
        //                 delete $window.sessionStorage.token;
        //                 AuthenticationService.isLogged = false;
        //                 $location.path("/login");
        //             }
        //
        //             return $q.reject(rejection);
        //         }
        //     };
        // }];

        //注册http请求拦截器
        $httpProvider.interceptors.push(httpInterceptor);

        //路由配置
        $urlRouterProvider.otherwise("/tabs/test");
        $stateProvider
            // .state('slides', {
            //     url: "/slides",
            //     // prefetchTemplate:"",//按需加载html文件 对项目请求进行优化
            //     views: {
            //         'main': {
            //             templateUrl: "html/hello_slides_modal.html"
            //         }
            //     }
            //
            // })
            .state('tabs', {
                url: "/tabs",
                views: {
                    'main': {
                        abstract: true,
                        templateUrl: "dist/html/tabs.html",
                        controller: 'tabsCtrl'
                    }
                }
            })
            .state('tabs.test', {
                url: "/test",
                views: {
                    'test-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_test.html",
                        controller: 'tabTestCtrl'
                    }
                }
            })
            .state('tabs.examinationsBank', {
                url: "/examinationsBank",
                views: {
                    'test-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_test_examinationsBank.html",
                        controller: 'tabTestExaminationsBankCtrl'
                    }
                }
            })
            .state('tabs.startAnswer', {
                url: "/startAnswer",
                views: {
                    'test-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_test_startAnswer.html",
                        controller: 'tabTestStartAnswerCtrl'
                        // controller: 'tabTestCtrl'
                    }
                }
            })
            .state('tabs.social', {
                url: "/social",
                views: {
                    'social-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_social.html",
                        controller: 'tabSocialCtrl'
                    }
                }
            })
            .state('tabs.socialDetail', {
                url: "/socialDetail",
                params: {'item': null},//设置为对象，用于接受对象型数据
                views: {
                    'social-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_socialDetail.html",
                        controller: 'tabSocialDetailCtrl'
                    }
                }
            })
            .state('tabs.music', {
                url: "/music",
                views: {
                    'music-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_music.html",
                        controller: 'tabMusicCtrl'
                    }
                }
            })
            .state('tabs.musicPlayer', {
                url: "/musicPlayer",
                params: {'musicType': null},
                views: {
                    'music-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_musicPlayer.html",
                        controller: 'tabMusicPlayerCtrl'
                    }
                }
            })
            .state('tabs.reading', {
                url: "/reading",
                views: {
                    'reading-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_reading.html",
                        controller: 'tabReadingCtrl'
                    }
                }
            })
            .state('tabs.readingList', {
                url: "/readingList/",
                params: {'readType': ''},
                views: {
                    'reading-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_readingList.html",
                        controller: 'tabReadingListCtrl'
                    }
                }
            })
            .state('tabs.readingDetail', {
                url: "/readingDetail",
                params: {'read': null, 'fromPage': '', 'readType': ''},
                views: {
                    'reading-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_readingDetail.html",
                        controller: 'tabReadingDetailCtrl'
                    }
                }
            })
            .state('tabs.user', {
                url: "/user",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user.html",
                        controller: 'tabUserCtrl'
                    }
                }
            })
            .state('tabs.userMessages', {
                url: "/userMessages",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_messages.html",
                        controller: 'tabUserMessagesCtrl'
                    }
                }
            })
            .state('tabs.systemMessages', {
                url: "/systemMessages",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_messages_sysList.html",
                        controller: 'tabUserMessagesSysListCtrl'
                    }
                }
            })
            .state('tabs.commentMessages', {
                url: "/commentMessages",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_messages_comtList.html",
                        controller: 'tabUserMessagesComtListCtrl'
                    }
                }
            })
            .state('tabs.userInformationSettings', {
                url: "/userInformationSettings",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_information_settings.html",
                        controller: 'tabUserInformationSettingsCtrl'
                    }
                }
            })
            .state('tabs.userInformationSettingsSetHeadPicture', {
                url: "/setHeadPicture",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_information_settings_set_head_picture.html",
                        controller: 'setHeadPictureCtrl'
                    }
                }
            })
            .state('tabs.userTestHistoryRecords', {
                url: "/userTestHistoryRecords",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_testHistoryRecords.html",
                        controller: 'tabUserTestHistoryRecordsCtrl'
                    }
                }
            })
            .state('tabs.userDataAnalysis', {
                url: "/userDataAnalysis",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_dataAnalysis.html",
                        controller: 'tabUserDataAnalysisCtrl'
                    }
                }
            })
            .state('tabs.userFavorite', {
                url: "/userFavorite",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_favorite.html",
                        controller: 'tabUserFavoriteCtrl'
                    }
                }
            })
            .state('tabs.appAbout', {
                url: "/appAbout",
                views: {
                    'user-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/tab_user_appAbout.html"
                    }
                }
            })
            .state('tabs.facts', {
                url: "/facts",
                views: {
                    'home-tab': {
                        prefetchTemplate: false,
                        templateUrl: "dist/html/facts.html"
                    }
                }
            })
            .state('tabs.facts2', {
                url: "/facts2",
                views: {
                    'home-tab': {
                        prefetchTemplate: false, //按需加载，表示不提前加载模板
                        templateUrl: "dist/html/facts2.html"
                    }
                }
            });

    }]);

//统一接口注册
app.service('ajax_service', function () {

    var ROOT = 'http://39.104.125.71:8080/psychology-0.0.1-SNAPSHOT';
    var ROOT_HTTP = ROOT + '/CMHSP'; //服务器地址
    // var ROOT = '../../../../CMHSP';
    // var ROOT_HTTP = '../../../../CMHSP'; //项目合并时用到

    var absoluteurl = ROOT_HTTP + '/';
    this.absoluteurl = function () {
        return absoluteurl;
    };

    /*
    测试Tab
     */
    //获取全部测试题
    var get_examinationsList = ROOT_HTTP + '/examinationsList';
    this.get_examinationsList = function () {
        return get_examinationsList;
    };
    //返回测试结果信息
    var return_examinationsResults = ROOT_HTTP + '/examinationsResults';
    this.return_examinationsResults = function () {
        return return_examinationsResults;
    };


    /*
    社区Tab
     */
    //顶部下拉刷新
    var get_socialFreshDown = ROOT_HTTP + '/socialFreshDown';
    this.get_socialFreshDown = function () {
        return get_socialFreshDown;
    };
    //底部上拉刷新
    var get_socialFreshUp = ROOT_HTTP + '/socialFreshUp';
    this.get_socialFreshUp = function () {
        return get_socialFreshUp;
    };
    //获取特定动态的评论
    var get_socialComments = ROOT_HTTP + '/showComments';
    this.get_socialComments = function () {
        return get_socialComments;
    };
    //发布社区动态
    var add_social = ROOT_HTTP + '/socialAdd';
    this.add_social = function () {
        return add_social;
    };
    //发布动态评论
    var add_socialComment = ROOT_HTTP + '/socialCommentAdd';
    this.add_socialComment = function () {
        return add_socialComment;
    };
    //动态收藏
    var add_socialFavorite = ROOT_HTTP + '/socialFavorite';
    this.add_socialFavorite = function () {
        return add_socialFavorite;
    };


    /*
    音乐Tab
     */
    //获取当前场景全部歌曲
    var get_musicSceneList = ROOT_HTTP + '/musicSceneList';
    this.get_musicSceneList = function () {
        return get_musicSceneList;
    };
    //歌曲收藏
    var add_musicFavorite = ROOT_HTTP + '/musicFavorite';
    this.add_musicFavorite = function () {
        return add_musicFavorite;
    };


    /*
    阅读Tab
     */
    //加载阅读Tab页面首屏展示信息
    var get_readFirstPage = ROOT_HTTP + '/readFirstPage';
    this.get_readFirstPage = function () {
        return get_readFirstPage;
    };
    //阅读搜索
    var read_search = ROOT_HTTP + '/readSearch';
    this.read_search = function () {
        return read_search;
    };
    //获取详细信息接口（书/文章）
    var get_readDetil = ROOT_HTTP + '/readDetil';
    this.get_readDetil = function () {
        return get_readDetil;
    };
    //获取列表接口（书/文章 点击更多...）
    var get_readList = ROOT_HTTP + '/readList';
    this.get_readList = function () {
        return get_readList;
    };
    //阅读收藏
    var add_readFavorite = ROOT_HTTP + '/readFavour';
    this.add_readFavorite = function () {
        return add_readFavorite;
    };


    /*
    用户Tab
     */

    //注册
    var register = ROOT + '/user/register';
    this.register = function () {
        return register;
    };
    //登录
    var login = ROOT + '/user/login';
    this.login = function () {
        return login;
    };

    /*我的消息*/
    //获取有无最新我的消息
    var get_userNotice = ROOT_HTTP + '/userNotice';
    this.get_userNotice = function () {
        return get_userNotice;
    };
    //获取系统消息
    var get_userSysMessage = ROOT_HTTP + '/userGetsysMessage';
    this.get_userSysMessage = function () {
        return get_userSysMessage;
    };
    //获取我的评论
    var get_userComments = ROOT_HTTP + '/userGetComments';
    this.get_userComments = function () {
        return get_userComments;
    };
    //返回清空提醒小标
    var clear_userNews = ROOT_HTTP + '/userClearNews';
    this.clear_userNews = function () {
        return clear_userNews;
    };

    /*设置*/
    //修改用户信息
    var update_userMessages = ROOT_HTTP + '/userUpdate';
    this.update_userMessages = function () {
        return update_userMessages;
    };
    //退出登录
    var logout = ROOT + '/user/logout';
    this.logout = function () {
        return logout;
    };

    /*测试记录*/
    //修改用户信息
    var get_userTestRecords = ROOT_HTTP + '/userHisRecords';
    this.get_userTestRecords = function () {
        return get_userTestRecords;
    };

    /*个人分析*/
    //修改用户信息
    var get_userAnalysis = ROOT_HTTP + '/userAnalysis';
    this.get_userAnalysis = function () {
        return get_userAnalysis;
    };

    /*收藏*/
    //获取全部已收藏数据信息
    var get_userFavorite = ROOT_HTTP + '/userFavorite';
    this.get_userFavorite = function () {
        return get_userFavorite;
    };


});
app.run(['$rootScope', '$timeout', '$ionicModal', '$http', '$state', '$ionicViewSwitcher', 'ajax_service', 'loading_service', 'ionicToast',
    function ($rootScope, $timeout, $ionicModal, $http, $state, $ionicViewSwitcher, ajax_service, loading_service, ionicToast) {

        /**
         在$rootScope下创建
         examinations_list 用以存放题库信息
         examination_default 用以存放默认试题信息
         */
        $rootScope.examinations_list = [];
        $rootScope.examination_default = {};

        //登录模态窗口中绑定
        $rootScope.login_account = {
            "userName": "",
            "userPassword": ""
        };

        //注册模态窗口中绑定
        $rootScope.register_account = {
            "userName": "",
            "userPassword": "",
            "userPassword_again": ""
        };

        /**
         判断用户是否登陆，通过判断localStorage内是否有token字段来判断
         */
        $rootScope.judge_login = function () {
            return localStorage.hasOwnProperty('token');
        };


        /**
         判断用户是否第一次打开，通过判断localStorage内是否有firstLoading字段来判断
         */
        $rootScope.judge_firstLoading = function () {
            if (!localStorage.hasOwnProperty('firstLoading')) {
                setTimeout(function () {
                    $rootScope.openHelloSlidesModal();
                }, 700);
            }
        };

        /**
         toast提示窗口
         */
        $rootScope.fn_show_toast = function (type, message) {
            <!-- ionicToast.show(type, message, position, stick(是否显示关闭按钮), time); -->
            if (type == 0) {
                ionicToast.show(false, message, 'bottom', false, 2000);//下假
            } else if (type == 1) {
                ionicToast.show(true, message, 'top', false, 2000);//上真
            } else if (type == 2) {
                ionicToast.show(true, message, 'bottom', false, 2000);//下真
            } else {
                ionicToast.show(false, message, 'top', false, 2000);//上假
            }
        };

        /**
         登录方法
         */
        $rootScope.fn_login = function (name, password, time) {
            loading_service.show_loading();
            $http({
                method: "post",
                url: ajax_service.login(),
                data: JSON.stringify({username: name, password: password, logintime: time}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("userName", response.data.userName);
                        localStorage.setItem("userImage", response.data.userImage);
                        localStorage.setItem("userRegion", response.data.userRegion);
                        localStorage.setItem("userSign", response.data.userSign);
                        $rootScope.closeLoginModal();
                    }
                })
                .error(function () {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "用户名或密码错误");
                    }, 500);
                })
        };

        /**
         注册方法
         */
        $rootScope.fn_register = function (name, password) {
            loading_service.show_loading();
            $http({
                method: "post",
                url: ajax_service.register(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({username: name, password: password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        setTimeout(function () {
                            $rootScope.login_account.userName = name;
                            $rootScope.login_account.userPassword = password;
                        }, 300);
                        setTimeout(function () {
                            $rootScope.login();
                        }, 1000);
                        $rootScope.closeRegisterModal();
                    }
                })
                .error(function () {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "注册失败");
                    }, 500);
                })
        };


        /**
         登录模态窗口 以及操作模态窗口方法
         */
        $ionicModal.fromTemplateUrl('html/user_login_modal.html', {
            scope: $rootScope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $rootScope.login_modal = modal;
        });

        $rootScope.login = function () {
            if ($rootScope.login_account.userName == "") {
                $rootScope.fn_show_toast(0, "用户名不能为空");
                return;
            }
            if ($rootScope.login_account.userPassword == "") {
                $rootScope.fn_show_toast(0, "密码不能为空");
                return;
            }
            if ($rootScope.login_account.userName.match(/^[a-zA-Z0-9]+$/) == null || $rootScope.login_account.userPassword.match(/^[a-zA-Z0-9]+$/) == null) {
                $rootScope.fn_show_toast(0, "用户名或密码格式错误");
                return;
            }
            $rootScope.fn_login($rootScope.login_account.userName, $rootScope.login_account.userPassword, loading_service.get_time());
        };

        $rootScope.openLoginModal = function () {
            $rootScope.login_modal.show();
        };
        $rootScope.closeLoginModal = function () {
            $rootScope.login_modal.hide();
            setTimeout(function () {
                $rootScope.login_account.userName = "";
                $rootScope.login_account.userPassword = "";
            }, 100)
        };


        /**
         注册模态窗口 以及操作模态窗口方法
         */
        $ionicModal.fromTemplateUrl('html/user_register_modal.html', {
            scope: $rootScope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $rootScope.register_modal = modal;
        });

        $rootScope.register = function () {
            if ($rootScope.register_account.userName == "") {
                $rootScope.fn_show_toast(0, "用户名不能为空");
                return;
            }
            if ($rootScope.register_account.userPassword == "") {
                $rootScope.fn_show_toast(0, "密码不能为空");
                return;
            }
            if ($rootScope.register_account.userPassword_again == "") {
                $rootScope.fn_show_toast(0, "确认密码不能为空");
                return;
            }
            if ($rootScope.register_account.userPassword != $rootScope.register_account.userPassword_again) {
                $rootScope.fn_show_toast(0, "两次输入密码不一致");
                return;
            }
            if ($rootScope.register_account.userName.match(/^[a-zA-Z0-9]+$/) == null
                || $rootScope.register_account.userPassword.match(/^[a-zA-Z0-9]+$/) == null
                || $rootScope.register_account.userPassword_again.match(/^[a-zA-Z0-9]+$/) == null) {
                $rootScope.fn_show_toast(0, "用户名或密码格式错误");
                return;
            }
            $rootScope.fn_register($rootScope.register_account.userName, $rootScope.register_account.userPassword);
        };

        $rootScope.openRegisterModal = function () {
            $rootScope.register_modal.show();
        };
        $rootScope.closeRegisterModal = function () {
            $rootScope.register_modal.hide();
            setTimeout(function () {
                $rootScope.register_account.userName = "";
                $rootScope.register_account.userPassword = "";
                $rootScope.register_account.userPassword_again = "";
            }, 100)
        };


        /**
         引导页窗口 以及操作模态窗口方法
         */
        $ionicModal.fromTemplateUrl('html/hello_slides_modal.html', {
            scope: $rootScope,
            animation: 'slide-in-left'
        }).then(function (modal) {
            $rootScope.helloSlides_modal = modal;
        });
        $rootScope.openHelloSlidesModal = function () {
            $rootScope.helloSlides_modal.show();
        };
        $rootScope.closeHelloSlidesModal = function () {
            $rootScope.helloSlides_modal.hide();
            localStorage.setItem("firstLoading", "true");
        };


        /**
         * tab子页面隐藏tab栏
         * 页面跳转事件拦截 $stateChangeStart | $stateChangeSuccess | $stateChangeError
         */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (toState.url == "/test"
                || toState.url == "/social"
                || toState.url == "/music"
                || toState.url == "/reading"
                || toState.url == "/user"
                || toState.url == "/musicPlayer") { // 这两个页面不隐藏Tabs
                $rootScope.hideTabs = false;
            } else { // 其他页面隐藏Tabs
                $rootScope.hideTabs = true;
            }
        });


        function filter() {

            // 获取输入框的内容inputContent
            var inputContent = input.value;

            // 多个敏感词，这里直接以数组的形式展示出来
            var arrMg = ["fuck", "tmd", "他妈的"];

            // 显示的内容--showContent
            var showContent = inputContent;

            // 正则表达式
            // \d 匹配数字

            for (var i = 0; i < arrMg.length; i++) {

                // 创建一个正则表达式
                var r = new RegExp(arrMg[i], "ig");

                showContent = showContent.replace(r, "*");
            }
            // 显示的内容--showInput
            showInput.value = showContent;
        }

        function filtion() {
            var inputContent = input.value;

            // 多个敏感词
            var arrMg = ["fuck", "tmd", "他妈的"];

            var showContent = inputContent;

            for (var i = 0; i < arrMg.length; i++) {

                // replace 只会替换第一个，后面如果还有相同的内容，就不会替换了
                showContent = showContent.replace(arrMg[i], "*");
            }

            showInput.value = showContent;
        }

    }]);

app.service('loading_service', [  '$ionicLoading', '$timeout', function ( $ionicLoading, $timeout) {


    this.show_loading = function () {
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
        }, 800);

    };


    //获取当前时间
     this.get_time = function () {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var week = now.getDay();            //星期

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if (month < 10) {
            clock += "0";
        }

        clock += month + "-";

        if (day < 10) {
            clock += "0";
        }

        clock += day + " ";

        // switch (week) {
        //     case 0:
        //         clock += "Sun";
        //         break;
        //     case 1:
        //         clock += "Mon";
        //         break;
        //     case 2:
        //         clock += "Tues";
        //         break;
        //     case 3:
        //         clock += "Wed";
        //         break;
        //     case 4:
        //         clock += "Thur";
        //         break;
        //     case 5:
        //         clock += "Fri";
        //         break;
        //     case 6:
        //         clock += "Sat";
        //         break;
        //     default:
        //         break;
        // }
        //
        // clock += " ";


        if (hh < 10) {
            clock += "0";
        }

        clock += hh + ":";
        if (mm < 10) {
            clock += '0';
        }
        clock += mm;
        console.log(clock);

        return clock;
    };






}]);

app.service('particle_service', [function () {
    this.CanvasParticle = (function () {
        function getElementByTag(name) {
            return document.getElementsByTagName(name);
        }

        function getELementById(id) {
            return document.getElementById(id);
        }

        // 根据传入的config初始化画布
        function canvasInit(canvasConfig) {
            canvasConfig = canvasConfig || {};
            // var html = getElementByTag("html")[0];
            // 获取body作为背景
            // var body = getElementByTag("body")[0];

            // 获取特定div作为背景
            // mydiv是你想要将其作为背景的div的ID
            var body = document.getElementById("mydiv");
            var canvasObj = document.createElement("canvas");

            var canvas = {
                element: canvasObj,
                points: [],
                // 默认配置
                config: {
                    vx: canvasConfig.vx || 4,
                    vy: canvasConfig.vy || 4,
                    height: canvasConfig.height || 2,
                    width: canvasConfig.width || 2,
                    count: canvasConfig.count || 100,
                    color: canvasConfig.color || "121, 162, 185",
                    stroke: canvasConfig.stroke || "130,255,255",
                    dist: canvasConfig.dist || 6000,
                    e_dist: canvasConfig.e_dist || 20000,
                    max_conn: 10
                }
            };

            // 获取context
            if (canvas.element.getContext("2d")) {
                canvas.context = canvas.element.getContext("2d");
            } else {
                return null;
            }

            body.style.padding = "0";
            body.style.margin = "0";
            // body.replaceChild(canvas.element, canvasDiv);
            body.appendChild(canvas.element);

            canvas.element.style = "position: fixed; top: 0; left: 0; z-index: -1;";
            canvasSize(canvas.element);
            window.onresize = function () {
                canvasSize(canvas.element);
            };
            body.onmousemove = function (e) {
                var event = e || window.event;
                canvas.mouse = {
                    x: event.clientX,
                    y: event.clientY
                }
            };
            document.onmouseleave = function () {
                canvas.mouse = undefined;
            };
            setInterval(function () {
                drawPoint(canvas);
            }, 40);
        }

        // 设置canvas大小
        function canvasSize(canvas) {
            // 获取窗口的宽高
            // canvas.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
            // canvas.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight;

            // 获取特定div的宽高
            var width = document.getElementById("mydiv").style.width;
            var height = document.getElementById("mydiv").style.height;
            width = parseInt(width);
            height = parseInt(height);
            canvas.width = width || window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
            canvas.height = height || window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight;
        }

        // 画点
        function drawPoint(canvas) {
            var context = canvas.context,
                point,
                dist;
            context.clearRect(0, 0, canvas.element.width, canvas.element.height);
            context.beginPath();
            context.fillStyle = "rgb(" + canvas.config.color + ")";
            for (var i = 0, len = canvas.config.count; i < len; i++) {
                if (canvas.points.length != canvas.config.count) {
                    // 初始化所有点
                    point = {
                        x: Math.floor(Math.random() * canvas.element.width),
                        y: Math.floor(Math.random() * canvas.element.height),
                        vx: canvas.config.vx / 2 - Math.random() * canvas.config.vx,
                        vy: canvas.config.vy / 2 - Math.random() * canvas.config.vy
                    }
                } else {
                    // 处理球的速度和位置，并且做边界处理
                    point = borderPoint(canvas.points[i], canvas);
                }
                context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height);

                canvas.points[i] = point;
            }
            drawLine(context, canvas, canvas.mouse);
            context.closePath();
        }

        // 边界处理
        function borderPoint(point, canvas) {
            var p = point;
            if (point.x <= 0 || point.x >= canvas.element.width) {
                p.vx = -p.vx;
                p.x += p.vx;
            } else if (point.y <= 0 || point.y >= canvas.element.height) {
                p.vy = -p.vy;
                p.y += p.vy;
            } else {
                p = {
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vx: p.vx,
                    vy: p.vy
                }
            }
            return p;
        }

        // 画线
        function drawLine(context, canvas, mouse) {
            context = context || canvas.context;
            for (var i = 0, len = canvas.config.count; i < len; i++) {
                // 初始化最大连接数
                canvas.points[i].max_conn = 0;
                // point to point
                for (var j = 0; j < len; j++) {
                    if (i != j) {
                        dist = Math.round(canvas.points[i].x - canvas.points[j].x) * Math.round(canvas.points[i].x - canvas.points[j].x) +
                            Math.round(canvas.points[i].y - canvas.points[j].y) * Math.round(canvas.points[i].y - canvas.points[j].y);
                        // 两点距离小于吸附距离，而且小于最大连接数，则画线
                        if (dist <= canvas.config.dist && canvas.points[i].max_conn < canvas.config.max_conn) {
                            canvas.points[i].max_conn++;
                            // 距离越远，线条越细，而且越透明
                            context.lineWidth = 0.5 - dist / canvas.config.dist;
                            context.strokeStyle = "rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.dist) + ")";
                            context.beginPath();
                            context.moveTo(canvas.points[i].x, canvas.points[i].y);
                            context.lineTo(canvas.points[j].x, canvas.points[j].y);
                            context.stroke();

                        }
                    }
                }
                // 如果鼠标进入画布
                // point to mouse
                if (mouse) {
                    dist = Math.round(canvas.points[i].x - mouse.x) * Math.round(canvas.points[i].x - mouse.x) +
                        Math.round(canvas.points[i].y - mouse.y) * Math.round(canvas.points[i].y - mouse.y);
                    // 遇到鼠标吸附距离时加速，直接改变point的x，y值达到加速效果
                    if (dist > canvas.config.dist && dist <= canvas.config.e_dist) {
                        canvas.points[i].x = canvas.points[i].x + (mouse.x - canvas.points[i].x) / 20;
                        canvas.points[i].y = canvas.points[i].y + (mouse.y - canvas.points[i].y) / 20;
                    }
                    if (dist <= canvas.config.e_dist) {
                        context.lineWidth = 1;
                        context.strokeStyle = "rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.e_dist) + ")";
                        context.beginPath();
                        context.moveTo(canvas.points[i].x, canvas.points[i].y);
                        context.lineTo(mouse.x, mouse.y);
                        context.stroke();
                    }
                }
            }
        }

        return canvasInit;
    })();
}]);

// !function (t, n) {
//     var o = t.createElement("style");
//     if (t.getElementsByTagName("head")[0].appendChild(o), o.styleSheet) o.styleSheet.disabled || (o.styleSheet.cssText = n);
//     else try {
//         o.innerHTML = n
//     } catch (i) {
//         o.innerText = n
//     }
// }(document, "\n.ionic_toast {\n  z-index: 9999;\n}\n\n.toast_section {\n  color: #FFF;\n  cursor: default;\n  font-size: 1.1em;\n  display: none;\n  border-radius: 5px;\n  opacity: 1;\n  padding: 10px 30px 10px 10px;\n  margin: 10px;\n  position: fixed;\n  left: 0;\n  right: 0;\n  text-align: center;\n  z-index: 9999;\n  font-weight: bold;\n background-color: rgba(239, 76, 76, 0.75);\n}\n\n.ionic_toast_top {\n  top: 10px;\n}\n\n.ionic_toast_middle {\n  top: 40%;\n}\n\n.ionic_toast_bottom {\n  bottom: 10px;\n}\n\n.ionic_toast_close {\n  border-radius: 2px;\n  color: #CCCCCC;\n  cursor: pointer;\n  display: none;\n  position: absolute;\n  right: 4px;\n  top: 4px;\n  width: 20px;\n  height: 20px;\n}\n\n.toast_close_icon {\n  position: relative;\n  top: 1px;\n}\n\n.ionic_toast_sticky .ionic_toast_close {\n  display: block;\n}\n\n.ionic_toast_close:active {\n\n}");
angular.module("ionic-toast", ["ionic-toast.provider"]);
angular.module("ionic-toast.provider", []).provider("ionicToast",
    function () {
        var t = {
            position: "top",
            showClose: !1,
            theme: "dark",
            timeOut: 4e3
        };
        this.configure = function (n) {
            angular.extend(t, n)
        };
        this.$get = ["$compile", "$document", "$interval", "$rootScope", "$templateCache", "$timeout",
            function (n, o, i, e, s, a) {
                var c = {},
                    l = e.$new(),
                    p = t.timeOut,
                    d = {
                        toastClass: "",
                        toastMessage: "",
                        toastStyle: {
                            display: "none",
                            opacity: 0
                        }
                    },
                    r = {
                        top: "ionic_toast_top",
                        middle: "ionic_toast_middle",
                        bottom: "ionic_toast_bottom"
                    },
                    u = n(s.get("ionic-toast/templates/ionic-toast.html"))(l);
                l.ionicToast = d;
                o.find("body").append(u);
                var _ = function (t, n, o) {
                    l.ionicToast.toastStyle = {
                        display: t,
                        opacity: n
                    };
                    l.ionicToast.toastStyle.opacity = n;
                    o()
                };
                return l.hideToast = function () {
                    _("none", 0,
                        function () {
                        })
                },
                    c.show = function (q, n, o, i, e) {
                        n && (o = o || t.position, e = e || t.timeOut, e > 1e4 && (e = 1e4), angular.extend(l.ionicToast, {
                            toastClass: r[o] + " " + (i ? "ionic_toast_sticky" : "") + " " + (q ? "toast_background_correct" :"toast_background_error"),
                            toastMessage: n
                        }), _("block", 1,
                            function () {
                                i || (p = a(function () {
                                        l.hideToast()
                                    },
                                    e))
                            }))
                    },
                    c.hide = function () {
                        l.hideToast()
                    },
                    c
            }]
    });
angular.module("ionic-toast").run(["$templateCache",
    function (t) {
        var n = '<div class="ionic_toast"><div class="toast_section" ng-class="ionicToast.toastClass" ng-style="ionicToast.toastStyle" ng-click="hideToast()"><span class="ionic_toast_close"><i class="ion-android-close toast_close_icon"></i></span><span ng-bind-html="ionicToast.toastMessage"></span></div></div>';
        t.put("ionic-toast/templates/ionic-toast.html", n)
    }]);
app.controller('tabUserTestHistoryRecordsCtrl', ['$scope', '$rootScope','$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope,$ionicLoading, $ionicPopup, ajax_service, $http, $timeout, loading_service) {

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


        /**
         * 获取该用户的测试记录
         */

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.fn_get_historyRecords();

        });


        $scope.fn_get_historyRecords = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");
                $http({
                    method: "post",
                    url: ajax_service.get_userTestRecords(),
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true

                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.arr_test_historyRecords = response.data;

                        }

                    })
                    .error(function (response) {

                    })
            } else {
                return
            }
        };

        /**
         *点击测试列表 弹框显示测试记录详细信息
         */
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
app.controller('tabUserDataAnalysisCtrl', ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, $ionicLoading, $ionicPopup, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();

        $scope.show_dataAnalysis = false;

        /**
         从localstorage 中取出 用户Id、名字、头像
         */

        //此对象在页面显示 用户信息
        $scope.user_information = {
            'userImage': 'imgs/default_userImage.png',
            'userName': '',
            'userId': ''
        };
        //存储用户测试分析信息
        $scope.arr_userAnalysis = {};
        if (localStorage.hasOwnProperty('userId')) {
            $scope.show_dataAnalysis = true;
            $scope.user_information.userId = localStorage.getItem('userId');

            if (localStorage.hasOwnProperty('userName')) {
                $scope.user_information.userName = localStorage.getItem('userName');
            }
            if (localStorage.hasOwnProperty('userImage')) {
                $scope.user_information.userImage = localStorage.getItem('userImage');
            }

        } else {
            $scope.show_dataAnalysis = true;
        }

        //mock数据
        var analysis_data = {
            //testDayTime 主要用于展示所有测试的 hh:mm 与日期无关 要截取后5个字符
            "testDayTime": ['2018-3-13 23:20', '2018-4-18 00:20', '2018-4-23 13:20', '2018-4-30 3:20', '2018-5-1 4:20', '2018-6-25 22:20', '2018-7-18 11:20',
                '2018-4-13 23:20', '2018-2-18 00:20', '2018-5-23 13:20', '2018-7-30 3:20', '2018-8-1 4:20', '2018-9-25 22:20', '2018-10-18 11:20',
                '2018-2-13 23:20', '2018-3-18 00:20', '2018-4-23 13:20', '2018-5-30 3:20', '2018-6-1 4:20', '2018-7-25 22:20', '2018-8-18 11:20'],
            "testScore": [
                {
                    "examName": "抑郁症测试题(一)",
                    "score": ['12', '11', '23', '34', '23', '45', '55'],
                    "testTime": ['2018-3-13 23:20', '2018-4-18 00:20', '2018-4-23 13:20', '2018-4-30 3:20', '2018-5-1 4:20', '2018-6-25 22:20', '2018-7-18 11:20']

                },
                {
                    "examName": "焦虑症测试题(一)",
                    "score": ['1', '2', '22', '13', '23', '14', '35'],
                    "testTime": ['2018-4-13 23:20', '2018-2-18 00:20', '2018-5-23 13:20', '2018-7-30 3:20', '2018-8-1 4:20', '2018-9-25 22:20', '2018-10-18 11:20']

                },
                {
                    "examName": "焦虑症测试题(二)",
                    "score": ['23', '14', '17', '18', '24', '26', '28'],
                    "testTime": ['2018-2-13 23:20', '2018-3-18 00:20', '2018-4-23 13:20', '2018-5-30 3:20', '2018-6-1 4:20', '2018-7-25 22:20', '2018-8-18 11:20']

                }
            ],
            "typeAnaly": [
                {
                    "typeName": "抑郁症类型试题",
                    "count": "7"
                },
                {
                    "typeName": "焦虑症类型试题",
                    "count": "14"
                }
            ]
        };

        //获取用户测试分析信息
        $scope.fn_get_userAnalysis = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");

                $http({
                    method: "post",
                    url: ajax_service.get_userAnalysis(),
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.arr_userAnalysis = response.data;

                        }

                    })
                    .error(function (response) {

                    })
            } else {
                return;
            }
        };
        $scope.fn_get_userAnalysis();

        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('echarts_test1'));
        var myChart2 = echarts.init(document.getElementById('echarts_test2'));
        var myChart3 = echarts.init(document.getElementById('echarts_test3'));

        var default_option = {
            title: {
                left: 'center',
                text: '数据加载中...'
            },
            tooltip: {},
            legend: {
                data: ['']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '分数',
                type: 'bar',
                data: []
            }]
        };

        // 使用刚指定的配置项和数据显示图表。

        myChart1.setOption(default_option);
        myChart2.setOption(default_option);
        myChart3.setOption(default_option);

        $timeout(function () {

            console.log(2222);
            // 指定图表的配置项和数据
            option1 = {
                title: {
                    left: 'center',
                    text: $scope.arr_userAnalysis.testScore[0].examName
                },
                tooltip: {},
                legend: {
                    data: ['']
                },
                xAxis: {
                    data: $scope.arr_userAnalysis.testScore[0].testTime
                },
                yAxis: {},
                series: [{
                    name: '分数',
                    type: 'bar',
                    data: $scope.arr_userAnalysis.testScore[0].score
                }]
            };

            // 使用刚指定的配置项和数据显示图表。

            myChart1.setOption(option1);


            // 指定图表的配置项和数据
            var option2 = {
                title: {
                    left: 'center',
                    text: $scope.arr_userAnalysis.testScore[1].examName
                },
                tooltip: {},
                legend: {
                    data: ['']
                },
                xAxis: {
                    data: $scope.arr_userAnalysis.testScore[1].testTime
                },
                yAxis: {},
                series: [{
                    name: '分数',
                    type: 'line',
                    data: $scope.arr_userAnalysis.testScore[1].score
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option2);

            // 指定图表的配置项和数据
            var option3 = {

                title: {
                    left: 'center',
                    text: $scope.arr_userAnalysis.testScore[2].examName
                },
                tooltip: {},
                legend: {
                    data: ['']
                },
                xAxis: {
                    data: $scope.arr_userAnalysis.testScore[2].testTime
                },
                yAxis: {},
                series: [{
                    name: '分数',
                    type: 'bar',
                    data: $scope.arr_userAnalysis.testScore[2].score
                }]

                // tooltip: {
                //     trigger: 'item',
                //     formatter: "{a} <br/>{b}: {c} ({d}%)"
                // },
                // legend: {
                //     orient: 'vertical',
                //     x: 'left',
                //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                // },
                // series: [
                //     {
                //         name: '访问来源',
                //         type: 'pie',
                //         radius: ['50%', '70%'],
                //         avoidLabelOverlap: false,
                //         label: {
                //             normal: {
                //                 show: false,
                //                 position: 'center'
                //             },
                //             emphasis: {
                //                 show: true,
                //                 textStyle: {
                //                     fontSize: '30',
                //                     fontWeight: 'bold'
                //                 }
                //             }
                //         },
                //         labelLine: {
                //             normal: {
                //                 show: false
                //             }
                //         },
                //         data: [
                //             {value: 335, name: '直接访问'},
                //             {value: 310, name: '邮件营销'},
                //             {value: 234, name: '联盟广告'},
                //             {value: 135, name: '视频广告'},
                //             {value: 1548, name: '搜索引擎'}
                //         ]
                //     }
                // ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart3.setOption(option3);


            // Schema:
            // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
            var dataBJ = [
                [55, 9, 56, 0.46, 18, 6, 1],
                [25, 11, 21, 0.65, 34, 9, 2],
                [56, 7, 63, 0.3, 14, 5, 3],
                [33, 7, 29, 0.33, 16, 6, 4],
                [42, 24, 44, 0.76, 40, 16, 5],
                [82, 58, 90, 1.77, 68, 33, 6],
                [74, 49, 77, 1.46, 48, 27, 7],
                [78, 55, 80, 1.29, 59, 29, 8],
                [267, 216, 280, 4.8, 108, 64, 9],
                [185, 127, 216, 2.52, 61, 27, 10],
                [39, 19, 38, 0.57, 31, 15, 11],
                [41, 11, 40, 0.43, 21, 7, 12],
                [64, 38, 74, 1.04, 46, 22, 13],
                [108, 79, 120, 1.7, 75, 41, 14],
                [108, 63, 116, 1.48, 44, 26, 15],
                [33, 6, 29, 0.34, 13, 5, 16],
                [94, 66, 110, 1.54, 62, 31, 17],
                [186, 142, 192, 3.88, 93, 79, 18],
                [57, 31, 54, 0.96, 32, 14, 19],
                [22, 8, 17, 0.48, 23, 10, 20],
                [39, 15, 36, 0.61, 29, 13, 21],
                [94, 69, 114, 2.08, 73, 39, 22],
                [99, 73, 110, 2.43, 76, 48, 23],
                [31, 12, 30, 0.5, 32, 16, 24],
                [42, 27, 43, 1, 53, 22, 25],
                [154, 117, 157, 3.05, 92, 58, 26],
                [234, 185, 230, 4.09, 123, 69, 27],
                [160, 120, 186, 2.77, 91, 50, 28],
                [134, 96, 165, 2.76, 83, 41, 29],
                [52, 24, 60, 1.03, 50, 21, 30],
                [46, 5, 49, 0.28, 10, 6, 31]
            ];

            var dataGZ = [
                [26, 37, 27, 1.163, 27, 13, 1],
                [85, 62, 71, 1.195, 60, 8, 2],
                [78, 38, 74, 1.363, 37, 7, 3],
                [21, 21, 36, 0.634, 40, 9, 4],
                [41, 42, 46, 0.915, 81, 13, 5],
                [56, 52, 69, 1.067, 92, 16, 6],
                [64, 30, 28, 0.924, 51, 2, 7],
                [55, 48, 74, 1.236, 75, 26, 8],
                [76, 85, 113, 1.237, 114, 27, 9],
                [91, 81, 104, 1.041, 56, 40, 10],
                [84, 39, 60, 0.964, 25, 11, 11],
                [64, 51, 101, 0.862, 58, 23, 12],
                [70, 69, 120, 1.198, 65, 36, 13],
                [77, 105, 178, 2.549, 64, 16, 14],
                [109, 68, 87, 0.996, 74, 29, 15],
                [73, 68, 97, 0.905, 51, 34, 16],
                [54, 27, 47, 0.592, 53, 12, 17],
                [51, 61, 97, 0.811, 65, 19, 18],
                [91, 71, 121, 1.374, 43, 18, 19],
                [73, 102, 182, 2.787, 44, 19, 20],
                [73, 50, 76, 0.717, 31, 20, 21],
                [84, 94, 140, 2.238, 68, 18, 22],
                [93, 77, 104, 1.165, 53, 7, 23],
                [99, 130, 227, 3.97, 55, 15, 24],
                [146, 84, 139, 1.094, 40, 17, 25],
                [113, 108, 137, 1.481, 48, 15, 26],
                [81, 48, 62, 1.619, 26, 3, 27],
                [56, 48, 68, 1.336, 37, 9, 28],
                [82, 92, 174, 3.29, 0, 13, 29],
                [106, 116, 188, 3.628, 101, 16, 30],
                [118, 50, 0, 1.383, 76, 11, 31]
            ];

            var dataSH = [
                [91, 45, 125, 0.82, 34, 23, 1],
                [65, 27, 78, 0.86, 45, 29, 2],
                [83, 60, 84, 1.09, 73, 27, 3],
                [109, 81, 121, 1.28, 68, 51, 4],
                [106, 77, 114, 1.07, 55, 51, 5],
                [109, 81, 121, 1.28, 68, 51, 6],
                [106, 77, 114, 1.07, 55, 51, 7],
                [89, 65, 78, 0.86, 51, 26, 8],
                [53, 33, 47, 0.64, 50, 17, 9],
                [80, 55, 80, 1.01, 75, 24, 10],
                [117, 81, 124, 1.03, 45, 24, 11],
                [99, 71, 142, 1.1, 62, 42, 12],
                [95, 69, 130, 1.28, 74, 50, 13],
                [116, 87, 131, 1.47, 84, 40, 14],
                [108, 80, 121, 1.3, 85, 37, 15],
                [134, 83, 167, 1.16, 57, 43, 16],
                [79, 43, 107, 1.05, 59, 37, 17],
                [71, 46, 89, 0.86, 64, 25, 18],
                [97, 71, 113, 1.17, 88, 31, 19],
                [84, 57, 91, 0.85, 55, 31, 20],
                [87, 63, 101, 0.9, 56, 41, 21],
                [104, 77, 119, 1.09, 73, 48, 22],
                [87, 62, 100, 1, 72, 28, 23],
                [168, 128, 172, 1.49, 97, 56, 24],
                [65, 45, 51, 0.74, 39, 17, 25],
                [39, 24, 38, 0.61, 47, 17, 26],
                [39, 24, 39, 0.59, 50, 19, 27],
                [93, 68, 96, 1.05, 79, 29, 28],
                [188, 143, 197, 1.66, 99, 51, 29],
                [174, 131, 174, 1.55, 108, 50, 30],
                [187, 143, 201, 1.39, 89, 53, 31]
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

        }, 500);

    }]);
app.controller('tabUserFavoriteCtrl', ['$scope','$rootScope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope,$ionicLoading, $ionicPopup, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();
        $scope.arr_userFavorites = [];

        var arr_favorites = [
            {
                "type": "0",
                "image": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg",
                "title": "UI/UX设计",
                "context": "介绍UI/UX工具"
            },
            {
                "type": "2",
                "image": "imgs/乌合之众.jpg",
                "title": "乌合之众",
                "context": "古斯塔夫·勒庞"
            },
            {
                "type": "1",
                "image": "imgs/music_logo2.jpg",
                "title": "美丽如你",
                "context": "盘尼西林"
            },
            {
                "type": "0",
                "image": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg",
                "title": "PowerMockup",
                "context": "介绍原型设计工具"
            },
            {
                "type": "2",
                "image": "imgs/文章4.jpg",
                "title": "心理健康的保健方法",
                "context": "杨波"
            },
            {
                "type": "1",
                "image": "imgs/music_logo2.jpg",
                "title": "时间之间",
                "context": "后海大鲨鱼"
            }
        ];


        /**
         *获取该用户的测试记录
         */
        $scope.fn_get_userFavorites = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");

                $http({
                    method: "post",
                    url: ajax_service.get_userFavorite(),
                    //url:"http://localhost:8080/ti/1",
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.arr_userFavorites = response.data;

                        }

                    })
                    .error(function (response) {

                    })
            }else {
                return;
            }
        };

        $scope.fn_get_userFavorites();


    }]);
app.controller('tabsCtrl',['$scope',function ($scope) {
    /**
    因为routerConfig中tabs state 设置为abstract
    所以 在此ctrl中定义的变量或者方法 在tabs 的子状态中都可用
     */
}]);
app.controller('tabTestCtrl', ['$scope', '$rootScope', '$state', '$ionicViewSwitcher', '$http', 'ajax_service', 'particle_service',
    function ($scope, $rootScope, $state, $ionicViewSwitcher, $http, ajax_service, particle_service) {

        /**
         $ionicView.loaded   视图已经被加载了，这个事件只发生一次，视图被创建并且被添加到DOM中，当视图跳出后并被缓存的话，再次访问这个视图这个事件将不会被激活
         $ionicView.enter 　　进入视图并被激活。这事件被激活来判断这个视图是第一个加载还是被缓存了的
         $ionicView.leave　　离开这个视图并且不是活动页面。调用这个事件判断应该被缓存还是摧毁
         $ionicView.beforeEnter 　　视图是即将进入并成为活动视图
         $ionicView.beforeLeave　　视图将被关闭并且不是活动页面
         $ionicView.afterEnter　　进入视图并是当前的活动页面
         $ionicView.afterLeave　　已经离开视图，并成为非激活页面
         $ionicView.unloaded　　视图的Controller已经被摧毁并且他的页面元素也从Dom中移除
         */

        $scope.$on('$ionicView.loaded', function () {
            $rootScope.judge_firstLoading();
            $scope.fn_show_particle();
            $scope.fn_get_examinations_list();
        });

        /**
         绘制粒子背景
         */
        $scope.fn_show_particle = function () {
            var config = {
                vx: 5,	//小球x轴速度,正为右，负为左
                vy: 5,	//小球y轴速度
                height: 1,	//小球高宽，其实为正方形，所以不宜太大
                width: 1,
                count: 80,		//点个数
                color: "255, 255, 255", 	//点颜色
                stroke: "130,255,255", 		//线条颜色
                dist: 5500, 	//点吸附距离
                e_dist: 0, 	//鼠标吸附加速距离
                max_conn: 5 	//点到点最大连接数
            };
            particle_service.CanvasParticle(config);
        };

        /**
         * 获取测试题库
         */
        $scope.fn_get_examinations_list = function () {
            $http({
                method: "GET",
                url: ajax_service.get_examinationsList(),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + $scope.login_token
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $rootScope.examinations_list = response.data;
                        $rootScope.examination_default = $rootScope.examinations_list[0];
                        console.log($rootScope.examinations_list);
                        console.log($rootScope.examination_default);
                    }

                })
                .error(function (response) {

                });
        };


        /**
         事件绑定开始测试按钮，先判断用户是否登陆，若登陆则跳转到答题页面，否则弹出用户登陆模态窗口
         */
        $scope.fn_start_answer = function () {
            console.log($rootScope.judge_login());
            if ($rootScope.judge_login()) {
                $state.go('tabs.startAnswer');
                $ionicViewSwitcher.nextDirection("forward");
            } else {
                $rootScope.openLoginModal();
            }
        };


    }]);
app.controller('tabTestStartAnswerCtrl', ['$scope', '$ionicSlideBoxDelegate', 'loading_service', 'ajax_service', '$http', '$timeout', '$rootScope',
    function ($scope, $ionicSlideBoxDelegate, loading_service, ajax_service, $http, $timeout, $rootScope) {
        /**
         * 只要进入页面就禁止slide手动滑动
         */
        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicSlideBoxDelegate.enableSlide(false);
        });

        /**
         * 点击选项自动滑动页面进入下一题
         * @param num
         */
        $scope.nextSlide = function (num) {

            if (num == 0) {
                $ionicSlideBoxDelegate.next();
            } else {
                loading_service.show_loading();
                setTimeout(function () {
                    $ionicSlideBoxDelegate.next();
                }, 500);
            }
        };


        $scope.total_score = 0;

        /**
         * 计算分数 - 每次点击选项按钮，累加选项分数
         * @param option_score
         */
        $scope.fn_calculate_score = function (option_score) {
            $scope.total_score = $scope.total_score + option_score;
            console.log($scope.total_score);
        };
        $scope.show_view_results = false;

        var questionsConclusion = [];
        var examinationName = "";
        var examinationId = 0;

        questionsConclusion = $rootScope.examination_default.questionsConclusion;
        examinationName = $rootScope.examination_default.examinationName;
        examinationId = $rootScope.examination_default.examinationId;

        $scope.last_results = {};
        $scope.last_conclusionId = 0;
        $scope.last_summary = '';

        /**
         * 根据计算分数 查看测评结果
         * @param sum_score
         */
        $scope.fn_view_results = function (sum_score) {
            // $scope.show_view_results = true;
            for (var i = 0, len = questionsConclusion.length; i < len; i++) {
                if (sum_score <= questionsConclusion[i].scoreRange) {
                    $scope.last_results = questionsConclusion[i];
                    $scope.last_conclusionId = questionsConclusion[i].conclusionId;
                    $scope.last_summary = questionsConclusion[i].summary;
                    console.log($scope.last_results);
                    console.log($scope.last_conclusionId);
                    return;
                }
            }
        };

        /**
         * 返回用户测试结果信息
         */
        $scope.user_test_results = {
            "userId": 0,
            "userName": "",
            "examinationId": 0,
            "testTime": "",
            "examinationName": '',
            "examinationScore": 0,
            "summary": '',
            "examinationConclusionId": 0
        };
        $scope.fn_return_user_test_results = function () {
            $scope.fn_view_results($scope.total_score);
            if ($scope.last_summary == "") {
                return;
            }
            //赋值
            $scope.user_test_results.userId = parseInt(localStorage.getItem('userId'));
            $scope.user_test_results.userName = localStorage.getItem('userName');
            $scope.user_test_results.examinationId = examinationId;
            $scope.user_test_results.testTime = loading_service.get_time();
            $scope.user_test_results.examinationName = examinationName;
            $scope.user_test_results.examinationScore = $scope.total_score;
            $scope.user_test_results.summary = $scope.last_summary;
            $scope.user_test_results.examinationConclusionId = $scope.last_conclusionId;

            $http({
                method: "post",
                url: ajax_service.return_examinationsResults(),
                data: JSON.stringify($scope.user_test_results),
                cache: true,
                headers: {
                    'Content-Type': 'application/json',
                    'addToken': true
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.nextSlide(1);
                    } else {
                        $rootScope.fn_show_toast("查看测试结果失败")

                    }

                })
                .error(function (response) {
                    $rootScope.fn_show_toast("网络错误")
                });

        }


    }]);
app.controller('tabTestExaminationsBankCtrl', ['$scope', '$rootScope', '$state','ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state,ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();

        /**
         * 默认选中
         */
        $scope.default_examination = $rootScope.examination_default.examinationName;

        $scope.examinationChange = function (examination) {
            loading_service.show_loading();
            $rootScope.examination_default = examination;
            setTimeout(function () {
                $state.go('tabs.test');
            },200);
            console.log($rootScope.examination_default);
        };
    }]);
app.controller('tabSocialCtrl', ['$scope', '$rootScope', '$state', '$http', 'ajax_service', '$stateParams', '$ionicModal','$timeout', 'loading_service',
    function ($scope, $rootScope, $state, $http, ajax_service, $stateParams, $ionicModal, $timeout, loading_service) {
        // $scope.items = [
        //     {
        //         "socialId": "1",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01cfc15b17cbaba801212d57deb7ca.jpg",
        //         "textData": "UXPin 可能是目前对于设计团队来说最理想的快速原型工具，尤其是当产品的 UX 设计和研发高度依赖快速反馈循环机制的时候。UXPin 可以让设计团队在向开发交付原型之前，充分地进行设计、共享和测试。 \n \n 开发人员所需要的数据，实际上在每个项目设计完成之时，就会自动生成。所以，在将设计交付给开发人员之前，甚至可以使用检测工具，验证一下产品的部署是否和设计元素相互匹配。 \n \n" +
        //         "UXPin 还提供一个完整的设计系统解决方案，帮助你保持整个产品的 UI 元素的一致性。而每个产品的 UI 组件都可以使用一段代码记录下来，因此可以更加轻松快速的扩展产品的功能。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "5",
        //                 "userName": "小妹",
        //                 "userImg": "http://www.runoob.com/try/demo_source/winston.jpg",
        //                 "commentData": "嘻嘻嘻，好喜欢你哟!"
        //             },
        //             {
        //                 "userId": "6",
        //                 "userName": "小机",
        //                 "userImg": "http://www.runoob.com/try/demo_source/tully.jpg",
        //                 "commentData": "美的一逼！！！"
        //             },
        //             {
        //                 "userId": "7",
        //                 "userName": "小里",
        //                 "userImg": "http://www.runoob.com/try/demo_source/slimer.jpg",
        //                 "commentData": "ojbk！！！"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg",
        //         "textData": "有许多 UX 设计师会使用 PowerPoint 来构建交互式原型，有了 PowerMockup 之后，你再也不需要寻找其他的工具来辅助你的工作了，它就可以帮你创建高效可共享的交互式原型。\n" +
        //         "\n" +
        //         "在构建原型的时候，只需要从 PowerMockup 不断增长的资源库找到对应的形状或者设计元素，拖拽到 PowerPoint 当中，然后进行设计即可。为了实现互动，你所需要调用的也无非是 PowerPoint 当中的幻灯片和动画功能，很简单。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg",
        //         "textData": "UI/UX 设计当然不仅仅是线框图和视觉稿，它是动态的，系统化的，而这也是 Creately 这款工具的价值所在。这款图标工具适合生成工作流程，支持不同的图表类型，包括流程图、思维导图、UML 图标、线框图等。它所提供的图表功能和协同工作的功能，可以帮助设计师完成一半以上的工作。\n" +
        //         "\n" +
        //         "使用 Creately 来创建图表，可以轻松创建出足够漂亮的图表，其中配备的1000多个专业的设计图表模板，可以快速地完成各式各样的 UX 设计项目。",
        //         "comments": []
        //
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/0140465b17cbaba801212d5774dcb3.jpg",
        //         "textData": "现如今，视觉稿（Mockup）和原型（Prototype）是网页和 APP 设计过程中最常用的方法。两种方式都很有效，不过也都可能会在时间和花销上对整个项目产生压力，影响团队和项目的整体推进，尤其是在时间和精力都非常有限而项目又非常复杂的情况下。\n" +
        //         "\n" +
        //         "Mason 提供了一个更好的解决方案，它让你无需设计线框图、原型和视觉稿，而直接拿现成的组件来编辑和设计，并且确保最终输出的产品既具备功能，也是像素完美的，最后通过 Mason 的平台进行部署，甚至你都不需要有代码编写的经验。\n" +
        //         "\n" +
        //         "Mason 的设计方法看起来很激进，但是实际上非常的易用。无论是调整还是维护，Mason 都能确保控件和元素都很容易处理。在 Mason 中修改、发布，然后就能正常使用。无需亲手编写代码，诸如注册、登录等各种常见的功能都能够正常输出使用。\n" +
        //         "\n" +
        //         "这款工具并不会限制你将网站投放到特定的平台或者托管环境下，你可以在你最熟悉的服务器或者服务商那边部署。这可以大幅度节省管理费和时间，并且你会发现团队协作更加高效了。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "5",
        //                 "userName": "小妹",
        //                 "userImg": "http://www.runoob.com/try/demo_source/winston.jpg",
        //                 "commentData": "嘻嘻嘻，好喜欢你哟!"
        //             },
        //             {
        //                 "userId": "6",
        //                 "userName": "小机",
        //                 "userImg": "http://www.runoob.com/try/demo_source/tully.jpg",
        //                 "commentData": "美的一逼！！！"
        //             },
        //             {
        //                 "userId": "7",
        //                 "userName": "小里",
        //                 "userImg": "http://www.runoob.com/try/demo_source/slimer.jpg",
        //                 "commentData": "ojbk！！！"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/011bb95b17cba8a801202e60e2d131.jpg",
        //         "textData": "设计师讲述故事最有效的办法之一，是将故事中的节点连在一起，将用户历程线性地呈现出来。这样的方式会让访客更好的理解他们所看到的内容，同时能够更加专注于细节的呈现，并且构建有效的反馈机制。\n" +
        //         "\n" +
        //         "作为世界上第一个为设计师量身定制的用户流程图工具，Overflow 可以帮助设计师更好地讲述故事。它为设计师提供了一种全新的方式来更好的呈现作品，讲述故事，以交互式的流程同用户进行沟通，吸引用户的注意力。\n" +
        //         "\n" +
        //         "Overflow 是一款跨平台的工具，可以与目前最流行的设计工具无缝地集成起来，允许设计师在同一个平台上完成设计、展示、共享和打印他们的用户流程。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             }
        //         ]
        //     }
        // ];
        // $scope.items_test = [
        //     {
        //         "socialId": "1",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01cfc15b17cbaba801212d57deb7ca.jpg",
        //         "textData": "UXPin 可能是目前对于设计团队来说最理想的快速原型工具，尤其是当产品的 UX 设计和研发高度依赖快速反馈循环机制的时候。UXPin 可以让设计团队在向开发交付原型之前，充分地进行设计、共享和测试。 \n \n 开发人员所需要的数据，实际上在每个项目设计完成之时，就会自动生成。所以，在将设计交付给开发人员之前，甚至可以使用检测工具，验证一下产品的部署是否和设计元素相互匹配。 \n \n" +
        //         "UXPin 还提供一个完整的设计系统解决方案，帮助你保持整个产品的 UI 元素的一致性。而每个产品的 UI 组件都可以使用一段代码记录下来，因此可以更加轻松快速的扩展产品的功能。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg",
        //         "textData": "有许多 UX 设计师会使用 PowerPoint 来构建交互式原型，有了 PowerMockup 之后，你再也不需要寻找其他的工具来辅助你的工作了，它就可以帮你创建高效可共享的交互式原型。\n" +
        //         "\n" +
        //         "在构建原型的时候，只需要从 PowerMockup 不断增长的资源库找到对应的形状或者设计元素，拖拽到 PowerPoint 当中，然后进行设计即可。为了实现互动，你所需要调用的也无非是 PowerPoint 当中的幻灯片和动画功能，很简单。",
        //         "comments": []
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg",
        //         "textData": "UI/UX 设计当然不仅仅是线框图和视觉稿，它是动态的，系统化的，而这也是 Creately 这款工具的价值所在。这款图标工具适合生成工作流程，支持不同的图表类型，包括流程图、思维导图、UML 图标、线框图等。它所提供的图表功能和协同工作的功能，可以帮助设计师完成一半以上的工作。\n" +
        //         "\n" +
        //         "使用 Creately 来创建图表，可以轻松创建出足够漂亮的图表，其中配备的1000多个专业的设计图表模板，可以快速地完成各式各样的 UX 设计项目。",
        //         "comments": []
        //
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/0140465b17cbaba801212d5774dcb3.jpg",
        //         "textData": "现如今，视觉稿（Mockup）和原型（Prototype）是网页和 APP 设计过程中最常用的方法。两种方式都很有效，不过也都可能会在时间和花销上对整个项目产生压力，影响团队和项目的整体推进，尤其是在时间和精力都非常有限而项目又非常复杂的情况下。\n" +
        //         "\n" +
        //         "Mason 提供了一个更好的解决方案，它让你无需设计线框图、原型和视觉稿，而直接拿现成的组件来编辑和设计，并且确保最终输出的产品既具备功能，也是像素完美的，最后通过 Mason 的平台进行部署，甚至你都不需要有代码编写的经验。\n" +
        //         "\n" +
        //         "Mason 的设计方法看起来很激进，但是实际上非常的易用。无论是调整还是维护，Mason 都能确保控件和元素都很容易处理。在 Mason 中修改、发布，然后就能正常使用。无需亲手编写代码，诸如注册、登录等各种常见的功能都能够正常输出使用。\n" +
        //         "\n" +
        //         "这款工具并不会限制你将网站投放到特定的平台或者托管环境下，你可以在你最熟悉的服务器或者服务商那边部署。这可以大幅度节省管理费和时间，并且你会发现团队协作更加高效了。",
        //         "comments": []
        //     }
        // ];


        /**
         * @ngdoc method
         * @name orgInfoCtrl#table.dealData
         * @methodOf table.dealData
         * @param {Object} data - Server response.
         * @return {Undefined}
         * @description Handle response from server.
         * */

        $scope.items = [];
        $scope.currentPage = 1;//定义下拉加载分页的初始值

        $scope.$on('$ionicView.loaded', function () {
            $scope.doRefreshDown();
        });
        $scope.noMorePage = false;
        $scope.arr_last_sociaalId = -1;

        /**
        下拉刷新
         */
        $scope.doRefreshDown = function () {
            // $scope.currentPage = 1;
            // $scope.noMorePage = false;
            $http({
                method: "get",
                url: ajax_service.get_socialFreshDown(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        var newItems = response.data;
                        if ($scope.items.length == 0) {
                            $scope.noMorePage = false;
                            for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                                $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                            }
                            $scope.arr_last_sociaalId = $scope.items[$scope.items.length - 1].socialId;
                            console.log('111--'+$scope.arr_last_sociaalId);
                            // setTimeout(function () {
                            //     $rootScope.fn_show_toast(1, "最新动态加载完成");
                            // }, 500);
                        } else {
                            var a = $scope.items[0].socialId;
                            var b = newItems[0].socialId;
                            if (a === b) {
                                setTimeout(function () {
                                    $rootScope.fn_show_toast(1, "暂无最新动态");
                                }, 500);
                                $scope.arr_last_sociaalId = $scope.items[$scope.items.length - 1].socialId;
                                console.log('222--'+$scope.arr_last_sociaalId);
                                return;
                            } else {
                                $scope.noMorePage = false;
                                $scope.items = [];
                                for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                                    $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                                }
                                $scope.arr_last_sociaalId = $scope.items[$scope.items.length - 1].socialId;
                                console.log('333--'+$scope.arr_last_sociaalId);
                                setTimeout(function () {
                                    $rootScope.fn_show_toast(1, "最新动态加载完成");
                                }, 500);
                            }
                        }

                    }else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }


                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                })
                .finally(function () {
                    $scope.arr_last_sociaalId = $scope.items[$scope.items.length - 1].socialId;
                    console.log('444--'+$scope.arr_last_sociaalId);
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

        };

        /**
        上拉加载
         */
        $scope.doFreshUp = function () {
            if($scope.arr_last_sociaalId < 0 ){
                return;
            }
            $http({
                method: "post",
                url: ajax_service.get_socialFreshUp(),
                data: JSON.stringify({socialId:$scope.arr_last_sociaalId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if(response.error_code == 0){
                        var newItems = response.data;

                        if (newItems.length < 5) {//当json的数量小于5（已经确定了一页为5条数据），说明页面到底了
                            $scope.noMorePage = true;//禁止滚动触发时间
                        }
                        for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                            $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                        }
                        console.log($scope.arr_last_sociaalId);
                    }else {
                        $scope.noMorePage = true;//禁止滚动触发时间
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function () {
                    $scope.noMorePage = true;
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                })
                .finally(function () {
                    $scope.arr_last_sociaalId = $scope.items[$scope.items.length - 1].socialId;
                    console.log('555--'+$scope.arr_last_sociaalId);
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });


        };

        /**
        向socialDetail页面传值
         */
        $scope.fn_socialDetail = function (item) {
            // console.log(item);
            // console.log(angular.toJson(item));
            $state.go('tabs.socialDetail', {'item': angular.toJson(item)})
        };


        $scope.new_social = {
            "imageData": "",
            "textData": ""
        };

        /**
         * 发布动态 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_social_add_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.social_add_modal = modal;
        });
        $scope.fn_social_add = function () {
            if($rootScope.judge_login()){
                loading_service.show_loading();
                var new_social = {
                    "userId": 0,
                    "userName": "",
                    "imageData": "",
                    "textData": "",
                    "socialAddTime": "",
                };

                new_social.userId = localStorage.getItem("userId");
                new_social.userName = localStorage.getItem("userName");
                new_social.imageData = "https://img.zcool.cn/community/018cdc5b192e73a8012034f72fd3de.jpeg";
                new_social.textData = $scope.new_social.textData;
                new_social.socialAddTime = loading_service.get_time();


                $http({
                    method: "post",
                    url: ajax_service.add_social(),
                    data: JSON.stringify(new_social),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if(response.error_code == 0){
                            var aa = {
                                "userId": "",
                                "userName": "",
                                "userImg": "",
                                "socialAddTime": "",
                                "imageData": "https://img.zcool.cn/community/018cdc5b192e73a8012034f72fd3de.jpeg",
                                "textData": "",
                                "comments": []
                            };

                            aa.userId = new_social.userId;
                            aa.userName = new_social.userName;
                            aa.imageData = new_social.imageData;
                            aa.textData = new_social.textData;
                            aa.socialAddTime = new_social.socialAddTime;
                            setTimeout(function () {
                                $scope.items.unshift(aa);
                            }, 500);
                            setTimeout(function () {
                                $scope.close_social_add_modal();
                            }, 1000);
                        }else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(0, "网络错误，发布动态失败");
                            },500);
                        }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误，发布动态失败");
                        },500);

                    });

            }else {
                $rootScope.openLoginModal();
            }

        };

        /**
         * 打开发布动态模态窗口，如果用户已登陆则显示发布页面，没登陆则弹出登陆界面
         */
        $scope.open_social_add_modal = function () {

            if($rootScope.judge_login()){
                $scope.social_add_modal.show();
            }else {
                $rootScope.openLoginModal();
            }

        };
        $scope.close_social_add_modal = function () {
            $scope.new_social.textData = '';
            $scope.social_add_modal.hide();
        };
    }]);

app.controller('tabSocialDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'ajax_service', '$ionicLoading', '$ionicPopup', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state, $stateParams, $http, ajax_service, $ionicLoading, $ionicPopup, $timeout, loading_service) {
        /**
         * 获取页面传来的参数，定义作用域变量
         */
        loading_service.show_loading();
        $scope.ctrlScope = $scope;
        $scope.item = {};
        $scope.item = angular.fromJson($stateParams.item);
        $scope.favorite_ok = false;
        $scope.arr_socialComments = [];
        $scope.comment_data = '';

        /**
         根据socialId获取该动态的评论 （在进入socialDetail页面时调用）
         */
        $scope.fn_get_socialComments = function () {

            var var_socialId = $scope.item.socialId;

            $http({
                method: "post",
                url: ajax_service.get_socialComments(),
                data: JSON.stringify({socialId: var_socialId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.arr_socialComments = response.data.reverse();
                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "获取动态评论失败");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(3, "获取动态评论失败");
                    }, 500);
                });

        };

        $scope.fn_get_socialComments();


        /**
         社区动态收藏
         */
        $scope.fn_socialFavoriteAdd = function () {
            if ($rootScope.judge_login()) {
                loading_service.show_loading();
                var var_favorite_add = {
                    "userId": 0,
                    "userName": "",
                    "socialId": 0
                };

                var_favorite_add.userId = window.localStorage.getItem("userId");
                var_favorite_add.userName = window.localStorage.getItem("userName");
                var_favorite_add.socialId = $scope.item.socialId;

                $http({
                    method: "post",
                    url: ajax_service.add_socialFavorite(),
                    data: JSON.stringify(var_favorite_add),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.favorite_ok = !$scope.favorite_ok;
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "收藏动态成功");
                            }, 500);
                        } else if (response.error_code == 1) {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "动态已收藏");
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(3, "收藏动态失败");
                            }, 500);
                        }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "收藏动态失败");
                        }, 500);
                    });
            } else {
                $rootScope.openLoginModal();
            }
        };


        /**
         发布社区动态评论
         方法里用$scope要小心，可能会影响方法外的此变量
         */
        $scope.fn_socialCommentAdd = function () {
            if ($rootScope.judge_login()) {
                if ($scope.comment_data === "") {
                    $rootScope.fn_show_toast(4, "评论不可以为空哦");
                    return;
                }
                if ($scope.comment_data.length > 20) {
                    $rootScope.fn_show_toast(4, "评论最多20个字哦");
                    $scope.comment_data = '';
                    return;
                }
                loading_service.show_loading();
                var var_command_add = {
                    "userId": 0,
                    "userName": "",
                    "userImage": "",
                    "socialId": 0,
                    "commentData": "",
                    "commentTime": ""
                };
                var arr_comment = {
                    "cuserName": "",
                    "cuserImg": "",
                    "commentData": ""
                };
                var_command_add.userId = window.localStorage.getItem("userId");
                var_command_add.userName = window.localStorage.getItem("userName");
                var_command_add.userImage = window.localStorage.getItem("userImage");
                var_command_add.socialId = $scope.item.socialId;
                var_command_add.commentData = $scope.comment_data;
                var_command_add.commentTime = loading_service.get_time();
                $scope.comment_data = '';

                arr_comment.cuserName = var_command_add.userName;
                arr_comment.cuserImg = var_command_add.userImage;
                arr_comment.commentData = var_command_add.commentData;

                $http({
                    method: "post",
                    url: ajax_service.add_socialComment(),
                    data: JSON.stringify(var_command_add),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.arr_socialComments.unshift(arr_comment);
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "评论成功");
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(3, "网络错误，评论失败");
                            }, 500);
                        }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "网络错误，评论失败");
                        }, 500);

                    });
            } else {
                $rootScope.openLoginModal();
            }
        };


        /**
         * 弹框式 用户在弹出框内输入评论
         */
        $scope.showPopup = function () {
            $scope.data = {};

            $ionicPopup.show({
                template: '<textarea ng-model="data.commentData" placeholder=" 写评论 . . .">',
                title: '发布评论',
                // subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>评论</b>',
                        type: 'button-stable',
                        onTap: function (e) {
                            if (!$scope.data.commentData) {
                                // 不允许用户关闭，除非输入评论
                                e.preventDefault();
                            } else {
                                var aa = $scope.data.commentData;
                                $scope.fn_socialCommentAdd(aa);
                            }
                        }
                    }
                ]
            });

        };


    }]);

app.controller('tabMusicCtrl', ['$scope', '$rootScope', '$state','$ionicViewSwitcher', '$http', 'ajax_service', '$stateParams', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state,$ionicViewSwitcher, $http, ajax_service, $stateParams,  $timeout, loading_service) {


        $scope.arr_musicType = [
            {
                "musicsceneId": "1",
                "musicsceneImage": "src/imgs/music_background/music1.jpg",
                "background": "src/imgs/music_background/musicType1.jpg",
                "musicsceneText1": "NEW AGE 电子合成器音乐",
                "musicsceneText2": "烘托氛围 治愈心灵",
                "musicsceneName": "治愈"
            },
            {
                "musicsceneId": "2",
                "musicsceneImage": "src/imgs/music_background/music2.jpg",
                "background": "src/imgs/music_background/musicType2.jpg",
                "musicsceneText1": "悦耳节奏带感歌曲精选",
                "musicsceneText2": "日常抖腿必备歌单",
                "musicsceneName": "兴奋"
            },
            {
                "musicsceneId": "3",
                "musicsceneImage": "src/imgs/music_background/music3.jpg",
                "background": "src/imgs/music_background/musicType3.jpg",
                "musicsceneText1": "触发心灵的一刹那",
                "musicsceneText2": "总有一首可以触动你的心房",
                "musicsceneName": "感动"
            },
            {
                "musicsceneId": "4",
                "musicsceneImage": "src/imgs/music_background/music4.jpg",
                "background": "src/imgs/music_background/musicType4.jpg",
                "musicsceneText1": "享受美妙的音乐",
                "musicsceneText2": "伴随你入睡 调整你的心情",
                "musicsceneName": "安静"
            },
            {
                "musicsceneId": "5",
                "musicsceneImage": "src/imgs/music_background/music5.jpg",
                "background": "src/imgs/music_background/musicType5.jpg",
                "musicsceneText1": "有时候快乐很简单",
                "musicsceneText2": "一丝微笑 永远不失孩子气",
                "musicsceneName": "快乐"
            }

        ];

        $scope.fn_toMusicPlayer = function (type) {
            console.log(type);
            console.log(angular.toJson(type));
            $state.go('tabs.musicPlayer', {'musicType': angular.toJson(type)});
            $ionicViewSwitcher.nextDirection("forward");
        };

    }]);
app.controller('tabMusicPlayerCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'ajax_service', '$ionicLoading', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state, $stateParams, $http, ajax_service, $ionicLoading, $timeout, loading_service) {
        $scope.musicType = {};
        $scope.musicType = angular.fromJson($stateParams.musicType);

        loading_service.show_loading();
        console.log($stateParams);
        console.log($scope.musicType);
        $scope.myAuto = document.getElementById('musicPlayer');

        /**
         *获取当前场景音乐列表
         */
        $scope.music_url = "";
        $scope.musicList = [];
        $scope.music_name = '';
        $scope.music_auther = '';
        $scope.fn_get_sceneMusicList = function () {
            var id = $scope.musicType.musicsceneId;
            var name = $scope.musicType.musicsceneName;
            $http({
                method: "post",
                url: ajax_service.get_musicSceneList(),
                data: JSON.stringify({
                    musicsceneId: id,
                    musicsceneName: name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.musicList = response.data;
                        $('audio').attr('src', $scope.musicList[0].songContext);
                        $scope.music_name = $scope.musicList[0].songName;
                        $scope.music_auther = $scope.musicList[0].songAuthor;
                        // $scope.music_url = $scope.musicList[0].songContext;
                        console.log($scope.music_url);
                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function () {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                })


        };
        $scope.fn_get_sceneMusicList();

        /**
         *操作音乐方法: 播放、暂停、上一首、下一首、收藏
         */
        $scope.music_selected = {
            "background": "#0000002e !important"

        };
        $scope.music_not_selected = {
            "background": "#0000 !important"

        };


        /**
         *音乐播放、暂停
         */
        $scope.music_control = false;
        $scope.fn_music_control = function (value) {
            if (value == 0) {
                $scope.music_control = true;
                $scope.myAuto.play();
            } else if (1) {
                $scope.music_control = false;
                $scope.myAuto.pause();
            } else if (value == true) {
                $scope.music_control = false;
            } else if (value == false) {
                $scope.music_control = true;
            }
        };
        $scope.fn_music_control(0);

        /**
         * 下一首、上一首
         */
        $scope.fn_change_music_url = function (url) {
            // $scope.myAuto.setAttribute('src', url);
            $('audio').attr('src', url);
        };

        /**
         * 切歌 自动切歌
         */
        $scope.music_index = 0;
        $scope.myAuto.addEventListener('ended', function () {
            $scope.fn_change_music($scope.music_index, 'next');
            console.log($scope.music_index);
        }, false);
        $scope.fn_change_music = function (index, direction) {
            // $scope.fn_music_control(1);
            console.log("index: " + index);
            console.log("direction: " + direction);
            if (direction == '') {
                $scope.yes_favorite = false;
                $scope.music_index = index;
                $('audio').attr('src', $scope.musicList[index].songContext);
                $scope.music_name = $scope.musicList[index].songName;
                $scope.music_auther = $scope.musicList[index].songAuthor;
                $scope.fn_music_control(0);
                console.log("src: " + $scope.musicList[index].songContext);
            } else {
                if (direction === "next") {
                    if (index + 1 < $scope.musicList.length) {
                        $scope.yes_favorite = false;
                        $scope.fn_change_music_url($scope.musicList[index + 1].songContext);
                        $scope.music_name = $scope.musicList[index + 1].songName;
                        $scope.music_auther = $scope.musicList[index + 1].songAuthor;
                        $scope.music_index++;
                        $scope.fn_music_control(0);
                    } else {

                        $scope.fn_change_music_url($scope.musicList[$scope.musicList.length-1].songContext);
                        $scope.music_name = $scope.musicList[$scope.musicList.length-1].songName;
                        $scope.music_auther = $scope.musicList[$scope.musicList.length-1].songAuthor;
                        $scope.fn_music_control(0);

                    }
                } else if (direction === "previous") {
                    if (index - 1 > 0) {
                        $scope.yes_favorite = false;
                        $scope.fn_change_music_url($scope.musicList[index - 1].songContext);
                        $scope.music_name = $scope.musicList[index - 1].songName;
                        $scope.music_auther = $scope.musicList[index - 1].songAuthor;
                        $scope.music_index--;
                        $scope.fn_music_control(0);
                    } else {

                        $scope.fn_change_music_url($scope.musicList[0].songContext);
                        $scope.music_name = $scope.musicList[0].songName;
                        $scope.music_auther = $scope.musicList[0].songAuthor;
                        $scope.fn_music_control(0);
                    }
                }
            }
        };

        /**
         * 收藏歌曲
         */
        $scope.yes_favorite = false;
        $scope.fn_musicFavorite = function () {
            if ($rootScope.judge_login()) {
                loading_service.show_loading();
                var userId = localStorage.getItem('userId');
                var userName = localStorage.getItem('userName');
                var songId = $scope.musicList[$scope.music_index].songId;
                $http({
                    method: "post",
                    url: ajax_service.add_musicFavorite(),
                    data: JSON.stringify({
                        userId: userId,
                        userName: userName,
                        songId:songId
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.yes_favorite = true;
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "收藏成功");
                            }, 500);
                        } else if(response.error_code == 1){
                            $scope.yes_favorite = true;
                            setTimeout(function () {
                                $rootScope.fn_show_toast(0, "此歌曲已收藏");
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(0, "网络错误");
                            }, 500);
                        }

                    })
                    .error(function () {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    })
            } else {
                $rootScope.openLoginModal();
            }

        };


//     //播放控制
//     var myAudio = $("audio")[0];
//     var lyricArr = [];
// // 播放/暂停控制
//     $(".btn1").click(function(){
//         if (myAudio.paused) {
//             play()
//         } else {
//             pause()
//         }
//     });
// // 频道切换
//     $(".btn2").click(function(){
//         getChannel();
//     });
// // 播放下一曲音乐
//     $(".btn3").click(function(){
//         getmusic();
//
//     });
//     function play(){
//         myAudio.play();
//         $('.btn1').removeClass('m-play').addClass('m-pause');
//     }
//     function pause(){
//         myAudio.pause();
//         $('.btn1').removeClass('m-pause').addClass('m-play');
//     }
// //获取频道信息
//     function getChannel(){
//         $.ajax({
//             url: 'http://api.jirengu.com/fm/getChannels.php',
//             dataType: 'json',
//             Method: 'get',
//             success: function(response){
//                 var channels = response.channels;
//                 var num = Math.floor(Math.random()*channels.length);
//                 var channelname = channels[num].name;
//                 var channelId = channels[num].channel_id;
//                 $('.record').text(channelname);
//                 $('.record').attr('title',channelname);
//                 $('.record').attr('data-id',channelId);
//                 getmusic();
//             }
//         })
//     }
// // 通过ajax获取歌曲
//     function getmusic(){
//         $.ajax({
//             url: 'http://api.jirengu.com/fm/getSong.php',
//             dataType: 'json',
//             Method: 'get',
//             data:{
//                 'channel': $('.record').attr('data-id')
//             },
//             success: function (ret) {
//                 var resource = ret.song[0],
//                     url = resource.url,
//                     bgPic = resource.picture,
//                     sid = resource.sid,//
//                     ssid = resource.ssid,//
//                     title = resource.title,
//                     author = resource.artist;
//                 $('audio').attr('src',url);
//                 $('audio').attr('sid',sid);
//                 $('audio').attr('ssid',ssid);
//                 $('.musicname').text(title);
//                 $('.musicname').attr('title',title)
//                 $('.musicer').text(author);
//                 $('.musicer').attr('title',author)
//                 $(".background").css({
//                     'background':'url('+bgPic+')',
//                     'background-repeat': 'no-repeat',
//                     'background-position': 'center',
//                     'background-size': 'cover',
//                 });
//                 play();//播放
//                 getlyric();//获取歌词
//             }
//         })
//     };
// //获取歌词
//     function getlyric(){
//         var Sid = $('audio').attr('sid');
//         var Ssid = $('audio').attr('ssid');
//         $.post('http://api.jirengu.com/fm/getLyric.php', {ssid: Ssid, sid: Sid})
//             .done(function (lyr){
//                 console.log(lyr);
//                 var lyr = JSON.parse(lyr);;
//                 console.log(lyr);
//                 if (!!lyr.lyric) {
//                     $('.music-lyric .lyric').empty();//清空歌词信息
//                     var line = lyr.lyric.split('\n');//歌词为以排数为界的数组
//                     var timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;//时间的正则
//                     var result = [];
//                     if(line != ""){
//                         for(var i in line){//遍历歌词数组
//                             var time = line[i].match(timeReg);//每组匹配时间 得到时间数组
//                             if(!time)continue;//如果没有 就跳过继续
//                             var value = line[i].replace(timeReg,"");// 纯歌词
//                             for(j in time){//遍历时间数组
//                                 var t = time[j].slice(1, -1).split(':');//分析时间  时间的格式是[00:00.00] 分钟和毫秒是t[0],t[1]
//                                 //把结果做成数组 result[0]是当前时间，result[1]是纯歌词
//                                 var timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]); //计算出一个curTime s为单位
//                                 result.push([timeArr, value]);
//                             }
//                         }
//                     }
//                     //时间排序
//                     result.sort(function (a, b) {
//                         return a[0] - b[0];
//                     });
//                     lyricArr = result;//存到lyricArr里面
//                     renderLyric();//渲染歌词
//                 }
//             }).fail(function(){
//             $('.music-lyric .lyric').html("<li>本歌曲展示没有歌词</li>");
//         })
//     }
//     function renderLyric(){
//         var lyrLi = "";
//         lyricArr.shift();
//         for (var i = 0; i < lyricArr.length; i++) {
//             lyrLi += "<li data-time='"+lyricArr[i][0]+"'>"+lyricArr[i][1]+"</li>";
//         }
//         $('.music-lyric .lyric').append(lyrLi);
//         setInterval(showLyric,100);//怎么展示歌词
//     }
//     function showLyric(){
//         var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
//         for(var i=0;i< lyricArr.length;i++){//遍历歌词下所有的li
//             var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
//             var nexT = $(".lyric li").eq(i+1).attr("data-time");
//             var curTime = myAudio.currentTime;
//             if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
//                 $(".lyric li").removeClass("active");
//                 $(".lyric li").eq(i).addClass("active");
//                 $('.music-lyric .lyric').css('top', -liH*(i-2));
//             }
//         }
//
//     }
// //进度条控制
//     setInterval(present,500)	//每0.5秒计算进度条长度
//     $(".basebar").mousedown(function(ev){  //拖拽进度条控制进度
//         var posX = ev.clientX;
//         var targetLeft = $(this).offset().left;
//         var percentage = (posX - targetLeft)/400*100;
//         myAudio.currentTime = myAudio.duration * percentage/100;
//     });
//     function present(){
//         var length = myAudio.currentTime/myAudio.duration*100;
//         $('.progressbar').width(length+'%');//设置进度条长度
//         //自动下一曲
//         if(myAudio.currentTime == myAudio.duration){
//             getmusic()
//         }
//     }
// //icon
//     $('.m-star').on('click',function(){
//         $(this).toggleClass('stared')
//     })
//     $('.m-heart').on('click',function(){
//         $(this).toggleClass('loved')
//     })
//     $('.m-xunhuan').on('click',function(){
//         $(this).toggleClass('recycleed').toggleClass('colored')
//         if ($(this).hasClass('recycleed')) {
//             $('audio').attr('loop','loop');
//         }
//         if($(this).hasClass('colored')){
//             $('audio').removeAttr('loop','no-loop');
//         }
//     })
//     $('.m-lyric').on('click',function(){
//         $(this).toggleClass('lyriced');
//         if ($(this).hasClass('lyriced')) {
//             $('.background .music-lyric').css({'display':'block'})
//         }else{
//             $('.background .music-lyric').css({'display':'none'})
//         }
//     })
//     $(document).ready(getChannel())
//
// JavaScript Document
//     var currentIndex = 0;
//     var mlist = ["http://qzone.haoduoge.com/music2/Meghan Trainor - All About That Bass.mp3","http://sc1.111ttt.com/2014/1/11/11/4111319506.mp3","http://qzone.haoduoge.com/music2/2014-12-13/1418401256.mp3","http://qzone.haoduoge.com/music2/2014-10-03/1412280314.mp3","http://qzone.haoduoge.com/music2/2014-11-29/1417258107.mp3"];
//     var audio = document.getElementById('audio');
//     var progress = document.getElementById('progress');
//     var playpause = document.getElementById("play-pause");
//     var volume = document.getElementById("volume");
//
//     audio.controls = false;
//
//     audio.addEventListener('timeupdate', function() {
//         updateProgress();
//     }, false);
//
//     function togglePlayPause() {
//         if (audio.paused || audio.ended) {
//             playpause.title = "暂停";
//             playpause.className = "begin";
//             audio.play();
//         } else {
//             playpause.title = "播放";
//             playpause.className = "stop";
//             audio.pause();
//         }
//     }
//
//     function setVolume() {
//         audio.volume = volume.value;
//     }
//
//     function updateProgress() {
//         var percent = Math.floor((100 / audio.duration) * audio.currentTime);
//         progress.value = percent;
//         var canvas = document.getElementById('progress');
//         var context = canvas.getContext('2d');
//         var centerX = canvas.width / 2;
//         var centerY = canvas.height / 2;
//         var radius = 100;
//         var circ = Math.PI * 2;
//         var quart = Math.PI / 2;
//         var cpercent = percent / 100; /* current percent */
//         context.beginPath();
//         context.arc(centerX, centerY, radius, 0, ((circ) * cpercent), false);
//         context.lineWidth = 5;
//         context.strokeStyle = '#38ffb8';
//         context.stroke();
//         if (audio.ended) resetPlayer();
//     }
//
//     function resetPlayer() {
//         audio.currentTime = 0; context.clearRect(0,0,canvas.width,canvas.height);
//         playpause.title = "Play";
//     }
//
// //function sel(){
// //	mlist.src = mlist[currentIndex];
// //	audio.play();
// //	}
//
//     window.onload=function(){
//         slt();
// //	num();
//     }
//
//     function slt(){
//         var tBn=document.getElementsByClassName("lt");
//         var div=document.getElementsByTagName("div");
//
//         var i;
//         for(i=0;i<tBn.length;i++){
//             tBn[i].index=i;//为每个按钮都建立索引
//             tBn[i].onclick=function(){//为每个按钮注册单击事件
//                 for(i=0;i<tBn.length;i++){
//                     tBn[i].setAttribute("class","lt");//js中凡是出现class的地方都用className代替
//                 }
//                 this.setAttribute("class","lt act");//this代表当前发生事件的元素
//                 currentIndex = (this.getAttribute("index"));
//                 audio.src = mlist[currentIndex];
//                 audio.play();
// //			sel();
//             };
//         }
//     };



    }]);
app.controller('tabReadingCtrl', ['$scope', '$state','$ionicSlideBoxDelegate',  'ajax_service', '$http', '$timeout', '$rootScope',
    function ($scope,$state, $ionicSlideBoxDelegate, ajax_service, $http, $timeout, $rootScope,loading_service) {

        /**
         * 进入页面就启动轮播图
         */
        $scope.$on('$ionicView.enter', function () {
            $ionicSlideBoxDelegate.start();

        });
        /**
         *MOCK数据
         */
        $scope.arr_read_firstPage = {
            slide: [{
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 0,
                "readImage": "src/imgs/read_loading/essay.png",
                "readContext": ""
            }],
            book: [{
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 1,
                "readImage": "src/imgs/read_loading/book.png",
                "readContext": ""
            }, {
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 1,
                "readImage": "src/imgs/read_loading/book.png",
                "readContext": ""
            }, {
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 1,
                "readImage": "src/imgs/read_loading/book.png",
                "readContext": ""
            }, ],
            essay: [{
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 0,
                "readImage": "src/imgs/read_loading/essay.png",
                "readContext": ""
            }]
        };

        /**
         * 获取首屏信息
         */
        $scope.fn_read_firstPage = function () {
            $http({
                method: "get",
                url: ajax_service.get_readFirstPage(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $scope.arr_read_firstPage = response.data;
                        //第一句是在获取数据之后先让<ion-slide-box>更新一下，第二句是设置循环播放为true。
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.loop(true);

                    }else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);

                });
        };
        setTimeout(function () {
            $scope.fn_read_firstPage();
        },900);


        /**
         * 传递每个阅读信息 给readDetail页面进行展示
         */
        $scope.fn_readDetail = function (read) {
            console.log(read);
            console.log(angular.toJson(read));
            $state.go('tabs.readingDetail', {'read': angular.toJson(read),'fromPage':'reading'})
        };


    }]);
app.controller('tabReadingDetailCtrl', ['$scope', '$rootScope', '$ionicLoading', 'ajax_service', '$http', '$timeout', '$state', '$stateParams', 'loading_service',
    function ($scope, $rootScope, $ionicLoading, ajax_service, $http, $timeout, $state, $stateParams, loading_service) {

        /**
         *获取跳转之前页面，返回按钮使用
         *获取阅读类型
         */
        $scope.read = {};
        $scope.readContext = '';
        $scope.read = angular.fromJson($stateParams.read);
        $scope.arr_fromPage = $stateParams.fromPage;
        $scope.arr_readType = $stateParams.readType;

        /**
         * 进入readDetail页面调用
         */
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.readId = angular.fromJson($stateParams.read).readId;
            $scope.fn_get_readList($scope.readId);

        });

        /**
         * 返回按钮，根据$scope.arr_fromPage 判断跳转之前页面
         */
        $scope.fn_go_back = function () {
            if ($scope.arr_fromPage == 'reading') {
                $state.go('tabs.reading');
            } else if ($scope.arr_fromPage == 'readingList') {
                $state.go('tabs.readingList', {'readType': $scope.arr_readType});
            }
        };

        /**
         * 获取读物详细信息
         * @param readId
         */
        $scope.fn_get_readList = function (readId) {
            $http({
                method: "post",
                url: ajax_service.get_readDetil(),
                data: JSON.stringify({readId: readId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.readContext = response.data.readContext;
                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                });
        };


        /**
         * 收藏阅读
         */
        $scope.fn_readingFavoriteAdd = function () {
            if ($rootScope.judge_login()) {
                loading_service.show_loading();
                var var_favorite_add = {
                    "userId": 0,
                    "readId": 0
                };
                var_favorite_add.userId = window.localStorage.getItem("userId");
                var_favorite_add.readId = $scope.read.readId;
                $http({
                    method: "post",
                    url: ajax_service.add_readFavorite(),
                    data: JSON.stringify(var_favorite_add),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                       if(response.error_code == 0){
                           setTimeout(function () {
                               $rootScope.fn_show_toast(1, "收藏动态成功");
                           }, 500);
                       } else if(response.error_code == 1){
                           setTimeout(function () {
                               $rootScope.fn_show_toast(1, "动态已收藏");
                           }, 500);
                       } else {
                           setTimeout(function () {
                               $rootScope.fn_show_toast(3, "收藏动态失败");
                           }, 500);
                       }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "收藏动态失败");
                        }, 500);
                    });
            } else {
                $rootScope.openLoginModal();
            }
        }


    }]);
app.controller('tabReadingListCtrl', ['$scope', '$rootScope', '$state', 'ajax_service', '$http', '$timeout', '$stateParams', 'loading_service',
    function ($scope, $rootScope, $state, ajax_service, $http, $timeout, $stateParams, loading_service) {

        $scope.var_search_keyWords = '';
        $scope.arr_readList = [];
        $scope.arr_0 = [
            {
                "readType": 1,
                "readId": "6",
                "readTitle": "乌合之众",
                "readAuthor": "古斯塔夫·勒庞",
                "readImage": "imgs/乌合之众.jpg"
            },
            {
                "readType": 1,
                "readId": "8",
                "readTitle": "性格心理学",
                "readAuthor": "邹宏明",
                "readImage": "imgs/性格心理学.jpg"
            },
            {
                "readType": 1,
                "readId": "9",
                "readTitle": "社会性动物",
                "readAuthor": "艾略特·阿伦森",
                "readImage": "imgs/社会性动物.jpg"
            },
            {
                "readType": 1,
                "readId": "10",
                "readTitle": "自控力",
                "readAuthor": "凯利·麦格尼格尔",
                "readImage": "imgs/自控力.jpg"
            },
            {
                "readType": 1,
                "readId": "11",
                "readTitle": "行为心理学",
                "readAuthor": " 约翰·华生 ",
                "readImage": "imgs/行为心理学.jpg"
            },
            {
                "readType": 1,
                "readId": "7",
                "readTitle": "心理学与生活",
                "readAuthor": "理查德·格里格 和 菲利普·津巴多",
                "readImage": "imgs/心理学与生活.jpg"
            }

        ];
        $scope.arr_1 = [
            {
                "readType": 0,
                "readId": "5",
                "readTitle": "《你不知道的抑郁症》",
                "readAuthor": "杨波",
                "readImage": "imgs/文章3.jpg"
            },
            {
                "readType": 0,
                "readId": "6",
                "readTitle": "《心理健康的保健方法》",
                "readAuthor": "杨波",
                "readImage": "imgs/文章4.jpg"
            },
            {
                "readType": 0,
                "readId": "7",
                "readTitle": "《不用怕！这些方法教你避免抑郁症》",
                "readAuthor": "杨波",
                "readImage": "imgs/文章5.jpg"
            },
            {
                "readType": 0,
                "readId": "3",
                "readTitle": "《心理疾病真的不用怕，我们来帮你!》",
                "readAuthor": "杨波",
                "readImage": "imgs/文章1.jpg"
            },
            {
                "readType": 0,
                "readId": "4",
                "readTitle": "《心理咨询的正确方式》",
                "readAuthor": "杨波",
                "readImage": "imgs/文章2.jpg"
            }

        ];

        /**
         * 进入页面就获取readType参数，并获取列表数据
         */
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.arr_readType = $stateParams.readType;
            $scope.fn_get_readList($scope.arr_readType);

        });

        /**
         * 获取阅读列表 根据readType(0为文章 1为书)来判断获取
         * @param value
         */
        $scope.fn_get_readList = function (value) {
            $http({
                method: "post",
                url: ajax_service.get_readList(),
                data: JSON.stringify({readType: value}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.arr_readList = response.data;

                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                });
        };


        /**
         * 搜索读物
         * @param keywords
         */
        $scope.fn_readSearch = function (keywords) {

            $http({
                method: "post",
                url: ajax_service.read_search(),
                data: JSON.stringify({readType: $stateParams.readType, searchKeyword: keywords}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $scope.arr_readList = response.data;

                    }else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "搜索失败");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                });
        };


        /**
         * 传递每个阅读信息 给readDetail页面进行展示
         * @param read
         * @param readTpye
         */
        $scope.fn_readDetail = function (read, readTpye) {
            console.log(read);
            console.log(angular.toJson(read));
            $state.go('tabs.readingDetail', {
                'read': angular.toJson(read),
                'fromPage': 'readingList',
                'readType': readTpye
            })
        };


    }]);
app.controller('tabUserCtrl', ['$scope', '$rootScope', '$state', '$ionicViewSwitcher', '$ionicModal', '$http', 'ajax_service', 'loading_service',
    function ($scope, $rootScope, $state, $ionicViewSwitcher, $ionicModal, $http, ajax_service, loading_service) {
        /**
         * 默认绑定用户头像，如果用户未登陆，显示默认头像
         * 监控用户是否登陆 如果登陆 就把usertab页面的头像换为用户头像
         */
        $scope.default_user_image = 'imgs/default_userImage.png';
        $scope.default_user_name = '';
        $scope.$watch("judge_login()", function (newVal, oldVal) {
            if (newVal == true) {
                $scope.default_user_image = localStorage.getItem("userImage");
                $scope.default_user_name = localStorage.getItem("userName");
            } else {
                $scope.default_user_image = 'imgs/default_userImage.png';
            }
        });


        /**
         * 进入页面之前就要 调用fn_get_notices方法 来查看是否有最新 我的消息
         */
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.fn_get_notices();
        });


        /**
         * 获取有无最新消息 每次进入用户tab页面都要调用该方法
         * 如果用户为登陆就停止调用该方法
         */
        $scope.show_news = false;
        $scope.fn_get_notices = function () {
            if ($rootScope.judge_login()) {
                var userId = localStorage.getItem("userId");
                $http({
                    method: "post",
                    url: ajax_service.get_userNotice(),
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            if (response.data.haveNews == 0) {
                                $scope.show_news = false;
                            } else {
                                $scope.show_news = true;
                            }
                        }
                    })
                    .error(function () {

                    })
            } else {
                return;
            }
        };


        /**
         * 对用户选项进行跳转 我的消息、设置、测试记录、个人分析、收藏 进行用户登陆检测
         * @param type
         */
        $scope.fn_user_move_page = function (type) {
            if ($rootScope.judge_login()) {
                if (type === 0) {
                    $state.go('tabs.userMessages');
                    $ionicViewSwitcher.nextDirection("forward");
                } else if (type === 1) {
                    $state.go('tabs.userInformationSettings');
                    $ionicViewSwitcher.nextDirection("forward");
                } else if (type === 2) {
                    $state.go('tabs.userTestHistoryRecords');
                    $ionicViewSwitcher.nextDirection("forward");
                } else if (type === 3) {
                    $state.go('tabs.userDataAnalysis');
                    $ionicViewSwitcher.nextDirection("forward");
                } else if (type === 4) {
                    $state.go('tabs.userFavorite');
                    $ionicViewSwitcher.nextDirection("forward");
                }
            } else {
                $rootScope.openLoginModal();
            }
        };


    }]);
app.controller('tabUserMessagesCtrl', ['$scope', '$rootScope','$timeout', '$http', 'ajax_service',
    function ($scope, $rootScope,$timeout, $http, ajax_service) {
    /**
     * 进入页面之前就要 调用fn_get_notices方法 来查看是否有最新 我的消息
     */
    $scope.sysMessagesNum = 0;
    $scope.comtMessagesNum = 0;
    $scope.show_sysMessagesNum = false;
    $scope.show_comtMessagesNum = false;
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.fn_get_notices();

    });


    /**
     * 获取有无最新消息 每次进入用户tab页面都要调用该方法
     */
    $scope.fn_get_notices = function () {
        if ($rootScope.judge_login()) {
            var userId = localStorage.getItem("userId");
            $http({
                method: "post",
                url: ajax_service.get_userNotice(),
                data: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'application/json',
                    'addToken': true
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        if (response.data.haveNews == 0) {
                            $scope.show_sysMessagesNum = false;
                            $scope.show_comtMessagesNum = false;
                        } else {
                            if(response.data.sysNews == 0){
                                $scope.show_sysMessagesNum = false;
                            }else {
                                $scope.show_sysMessagesNum = true;
                                $scope.sysMessagesNum = response.data.sysNews;
                            }
                            if(response.data.comNews == 0){
                                $scope.show_comtMessagesNum = false;
                            }else {
                                $scope.show_comtMessagesNum = true;
                                $scope.comtMessagesNum = response.data.comNews;
                            }
                        }
                    }
                })
                .error(function () {

                })
        } else {
            return;
        }
    }
    ;


}
]);
app.controller('tabUserMessagesSysListCtrl', ['$scope', '$rootScope', '$ionicLoading', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, $ionicLoading, ajax_service, $http, $timeout, loading_service) {
        /**
         * 进入系统消息界面 获取系统信息
         * 每次进入用户tab页面都要调用该方法
         */
        loading_service.show_loading();
        $scope.sys_messages = [];
        $scope.fn_get_sysMessage = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");
                $http({
                    method: "post",
                    url: ajax_service.get_userSysMessage(),
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.sys_messages = response.data
                        }
                    })
                    .error(function (response) {
                    })
            } else {
                return;
            }
        };
        $scope.fn_get_sysMessage();

        /**
         * 点击 <返回 清空系统消息小标
         */
        $scope.fn_clear_MessagesNum = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");
                $http({
                    method: "post",
                    url: ajax_service.clear_userNews(),
                    data: JSON.stringify({userId: userId, messageType: 0}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            console.log("该用户系统消息已读")
                        }
                    })
                    .error(function () {

                    })
            } else {
                return;
            }
        };

    }]);
app.controller('tabUserMessagesComtListCtrl', ['$scope', '$rootScope', '$ionicLoading', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, $ionicLoading, ajax_service, $http, $timeout, loading_service) {
        /**
         * 进入我的评论消息界面 获取评论信息
         * 每次进入用户tab页面都要调用该方法
         */
        loading_service.show_loading();
        $scope.comt_messages = [];
        $scope.fn_get_comtMessage = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");
                $http({
                    method: "post",
                    url: ajax_service.get_userComments(),
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.comt_messages = response.data
                        }
                    })
                    .error(function (response) {
                    })
            } else {
                return;
            }
        };
        $scope.fn_get_comtMessage();

        /**
         * 点击 <返回 清空我的评论小标
         */
        $scope.fn_clear_MessagesNum = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");
                $http({
                    method: "post",
                    url: ajax_service.clear_userNews(),
                    data: JSON.stringify({userId: userId, messageType: 1}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            console.log("该用户评论消息已读")
                        }
                    })
                    .error(function () {

                    })
            } else {
                return;
            }
        };

    }]);
app.controller('tabUserInformationSettingsCtrl', ['$scope', '$rootScope', '$state', '$ionicViewSwitcher', '$ionicModal', '$http', 'ajax_service', 'loading_service',
    function ($scope, $rootScope, $state, $ionicViewSwitcher, $ionicModal, $http, ajax_service, loading_service) {


        /**
         * 此对象在设置页面显示
         */
        $scope.user_information = {
            'userId': '',
            'userImage': 'imgs/default_userImage.png',
            'userName': '点击设置',
            'userSex': '点击设置',
            'userRegion': '点击设置',
            'userSign': '点击设置'
        };

        /**
         * 此对象中参数与 各个模态窗口中的输入框 进行绑定
         */
        $scope.arr_userInformation = {
            'arr_userImage': '',
            'arr_userName': '',
            'arr_userSex': '',
            'arr_userRegion': {
                'region': '',
                'city': ''
            },
            'arr_userSign': ''
        };

        /**
         从localstorage 中取出 用户头像、名字、性别、地区、个性签名 如果有就取值
         没有就使用 $scope.user_information 中的默认信息
         */
        if ($rootScope.judge_login()) {
            if (localStorage.hasOwnProperty('userId')) {
                $scope.user_information.userId = localStorage.getItem('userId');
            }
            if (localStorage.hasOwnProperty('userImage')) {
                $scope.user_information.userImage = localStorage.getItem('userImage');
            }
            if (localStorage.hasOwnProperty('userName')) {
                $scope.user_information.userName = localStorage.getItem('userName');
            }
            if (localStorage.hasOwnProperty('userSex')) {
                $scope.user_information.userSex = localStorage.getItem('userSex');
            }
            if (localStorage.hasOwnProperty('userRegion')) {
                $scope.user_information.userRegion = localStorage.getItem('userRegion');
            }
            if (localStorage.hasOwnProperty('userSign')) {
                $scope.user_information.userSign = localStorage.getItem('userSign');
            }
        }


        /**
         * 在个性签名的字符串中 插入 ...
         */
        function fn_string_insert(str, insert, index) {
            var start = str.substr(0, index);
            var end = str.substr(index, str.length);
            return start + insert + end;
        }


        /**
         * 更新用户信息 方法
         * 参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
         * index : 根据输入的数值来判断传入的参数是什么
         * userImage : 头像
         * userName : 名字
         * userSex : 性别
         * userRegion : 地域
         * userSign : 个性签名
         */
        $scope.fn_set_userInformation = function (index, userId, userImage, userName, userSex, userRegion, userSign) {
            if ($rootScope.judge_login()) {
                if (index == 2) {
                    var sex_num = 0;
                    if (userSex == '男生') {
                        sex_num = 0;
                    } else if (userSex == '女生') {
                        sex_num = 1;
                    }
                }
                loading_service.show_loading();
                $http({
                    method: "post",
                    url: ajax_service.update_userMessages(),
                    data: JSON.stringify({
                        userId: userId,
                        Image: userImage,
                        userName: userName,
                        Sex: sex_num,
                        Region: userRegion,
                        Sign: userSign
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            console.log("修改成功");

                            if (index == 0) {
                                $scope.user_information.userImage = userImage;
                                localStorage.setItem('userImage', userImage);
                            } else if (index == 1) {
                                $scope.user_information.userName = userName;
                                localStorage.setItem('userName', userName);
                            } else if (index == 2) {
                                $scope.user_information.userSex = userSex;
                                localStorage.setItem('userSex', sex_num);
                            } else if (index == 3) {
                                $scope.user_information.userRegion = userRegion;
                                localStorage.setItem('userRegion', userRegion);
                            } else if (index == 4) {
                                $scope.user_information.userSign = fn_string_insert(userSign, '...', 5);
                                localStorage.setItem('userSign', userSign);
                            }

                        } else {
                            console.log("修改失败")
                        }

                    })
                    .error(function (response) {
                        console.log("修改失败");
                        console.log("userImage:" + userImage);
                        console.log("userName:" + userName);
                        console.log("userSex:" + userSex);
                        console.log("userRegion:" + userRegion);
                        console.log("userSign:" + userSign);
                        if (index == 0) {
                            $scope.user_information.userImage = userImage;
                            localStorage.setItem('userImage', userImage);
                        } else if (index == 1) {
                            $scope.user_information.userName = userName;
                            localStorage.setItem('userName', userName);
                        } else if (index == 2) {
                            $scope.user_information.userSex = userSex;
                            localStorage.setItem('userSex', sex_num);
                        } else if (index == 3) {
                            $scope.user_information.userRegion = userRegion;
                            localStorage.setItem('userRegion', userRegion);
                        } else if (index == 4) {
                            $scope.user_information.userSign = fn_string_insert(userSign, '...', 5);
                            localStorage.setItem('userSign', userSign);
                        }
                    });
            } else {
                return;
            }
        };


        /**
         * 姓名设置 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setName_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_name_modal = modal;
        });

        //在模态窗口tab_user_information_settings_setName_modal.html 中绑定点击事件
        $scope.fn_set_name = function () {
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            if ($scope.arr_userInformation.arr_userName == '') {
                return
            }
            $scope.fn_set_userInformation(1, $scope.user_information.userId, '', $scope.arr_userInformation.arr_userName, '', '', '');
            $scope.close_set_name_modal();
        };

        $scope.open_set_name_modal = function () {
            $scope.set_name_modal.show();
        };
        //隐藏模态窗口时执行清空动作
        $scope.close_set_name_modal = function () {
            $scope.set_name_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userName = '';
            }, 1000)
        };


        /**
         * 性别设置 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setGender_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_gender_modal = modal;
        });

        $scope.fn_set_gender = function () {
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            if ($scope.arr_userInformation.arr_userSex == '') {
                console.log($scope.arr_userInformation.arr_userSex);
                return
            }
            $scope.fn_set_userInformation(2, $scope.user_information.userId, '', '', $scope.arr_userInformation.arr_userSex, '', '');
            $scope.close_set_gender_modal();
        };

        $scope.open_set_gender_modal = function () {
            $scope.set_gender_modal.show();
        };
        $scope.close_set_gender_modal = function () {
            $scope.set_gender_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userSex = '';
            }, 1000)
        };
        // $scope.clientSideList = [
        //     {text: "Backbone", value: "bb"},
        //     {text: "Angular", value: "ng"},
        //     {text: "Ember", value: "em"},
        //     {text: "Knockout", value: "ko"}
        // ];
        //
        // $scope.serverSideList = [
        //     {text: "Go", value: "go"},
        //     {text: "Python", value: "py"},
        //     {text: "Ruby", value: "rb"},
        //     {text: "Java", value: "jv"}
        // ];
        //
        // $scope.data = {
        //     clientSide: 'ng'
        // };
        // $scope.serverSideChange = function (item) {
        //     console.log("Selected Serverside, text:", item.text, "value:", item.value);
        // };


        /**
         * 地区设置 模态窗口  与模态窗口进行绑定的数据必须为对象形式 其他形式 失效
         */
        $scope.arr_china = [
            {
                'province': '北京',
                'city': ['北京市']
            },
            {
                'province': '天津',
                'city': ['东莞市', '广州市', '中山市', '深圳市', '惠州市', '江门市', '珠海市', '汕头市', '佛山市', '湛江市', '河源市', '肇庆市', '潮州市', '清远市', '韶关市', '揭阳市', '阳江市', '云浮市', '茂名市', '梅州市', '汕尾市']
            },
            {
                'province': '山东',
                'city': ['济南市', '青岛市', '临沂市', '济宁市', '菏泽市', '烟台市', '泰安市', '淄博市', '潍坊市', '日照市', '威海市', '滨州市', '东营市', '聊城市', '德州市', '莱芜市', '枣庄市']
            },
            {
                'province': '山西',
                'city': ['太原市', '大同市', '运城市', '长治市', '晋城市', '忻州市', '临汾市', '吕梁市', '晋中市', '阳泉市', '朔州市']
            },
            {
                'province': '黑龙江',
                'city': ['齐齐哈尔市', '哈尔滨市', '大庆市', '佳木斯市', '双鸭山市', '牡丹江市', '鸡西市', '黑河市', '绥化市', '鹤岗市', '伊春市', '大兴安岭地区', '七台河市']
            },
            {
                'province': '吉林',
                'city': ['吉林市', '长春市', '白山市', '白城市', '延边州', '松原市', '辽源市', '通化市', '四平市']
            },
            {
                'province': '辽宁',
                'city': ['连市', '沈阳市', '丹东市', '辽阳市', '葫芦岛市', '锦州市', '朝阳市', '营口市', '鞍山市', '抚顺市', '阜新市', '本溪市', '盘锦市', '铁岭市']
            },
            {
                'province': '河南',
                'city': ['郑州市', '南阳市', '新乡市', '安阳市', '洛阳市', '信阳市', '平顶山市', '周口市', '商丘市', '开封市', '焦作市', '驻马店市', '濮阳市', '三门峡市', '漯河市', '许昌市', '鹤壁市', '济源市']
            },
            {
                'province': '河北',
                'city': ['石家庄市', '唐山市', '保定市', '邯郸市', '邢台市', '河北区', '沧州市', '秦皇岛市', '张家口市', '衡水市', '廊坊市', '承德市']
            },
            {
                'province': '浙江',
                'city': ['温州市', '宁波市', '杭州市', '台州市', '嘉兴市', '金华市', '湖州市', '绍兴市', '舟山市', '丽水市', '衢州市']
            },
            {
                'province': '江苏',
                'city': ['苏州市', '徐州市', '盐城市', '无锡市', '南京市', '南通市', '连云港市', '常州市', '扬州市', '镇江市', '淮安市', '泰州市', '宿迁市']
            },
            {
                'province': '上海',
                'city': ['上海市']
            },
            {
                'province': '安徽',
                'city': ['芜湖市', '合肥市', '六安市', '宿州市', '阜阳市', '安庆市', '马鞍山市', '蚌埠市', '淮北市', '淮南市', '宣城市', '黄山市', '铜陵市', '亳州市', '池州市', '巢湖市', '滁州市']
            },
            {
                'province': '江西',
                'city': ['南昌市', '赣州市', '上饶市', '吉安市', '九江市', '新余市', '抚州市', '宜春市', '景德镇市', '萍乡市', '鹰潭市']
            },
            {
                'province': '湖南',
                'city': ['长沙市', '邵阳市', '常德市', '衡阳市', '株洲市', '湘潭市', '永州市', '岳阳市', '怀化市', '郴州市', '娄底市', '益阳市', '张家界市', '湘西州']
            },
            {
                'province': '湖北',
                'city': ['武汉市', '宜昌市', '襄樊市', '荆州市', '恩施州', '孝感市', '黄冈市', '十堰市', '咸宁市', '黄石市', '仙桃市', '随州市', '天门市', '荆门市', '潜江市', '鄂州市', '神农架林区']
            },
            {
                'province': '新疆',
                'city': ['乌鲁木齐市', '伊犁州', '昌吉州', '石河子市', '哈密地区', '阿克苏地区', '巴音郭楞州', '喀什地区', '塔城地区', '克拉玛依市', '和田地区', '阿勒泰州', '吐鲁番地区', '阿拉尔市', '博尔塔拉州', '五家渠市', '克孜勒苏州', '图木舒克市']
            },
            {
                'province': '云南',
                'city': ['昆明市', '红河州', '大理州', '文山州', '德宏州', '曲靖市', '昭通市', '楚雄州', '保山市', '玉溪市', '丽江地区', '临沧地区', '思茅地区', '西双版纳州', '怒江州', '迪庆州']
            },
            {
                'province': '贵州',
                'city': ['贵阳市', '黔东南州', '黔南州', '遵义市', '黔西南州', '毕节地区', '铜仁地区', '安顺市', '六盘水市']
            },
            {
                'province': '福建',
                'city': ['漳州市', '泉州市', '厦门市', '福州市', '莆田市', '宁德市', '三明市', '南平市', '龙岩市']
            },
            {
                'province': '台湾',
                'city': ['台北市', '高雄市', '台中市', '新竹市', '基隆市', '台南市', '嘉义市']
            },
            {
                'province': '宁夏',
                'city': ['银川市', '吴忠市', '中卫市', '石嘴山市', '固原市']
            },
            {
                'province': '西藏',
                'city': ['拉萨市', '山南地区', '林芝地区', '日喀则地区', '阿里地区', '昌都地区', '那曲地区']
            },
            {
                'province': '四川',
                'city': ['成都市', '绵阳市', '广元市', '达州市', '南充市', '德阳市', '广安市', '阿坝州', '巴中市', '遂宁市', '内江市', '凉山州', '攀枝花市', '乐山市', '自贡市', '泸州市', '雅安市', '宜宾市', '资阳市', '眉山市', '甘孜州']
            },
            {
                'province': '重庆',
                'city': ['江北区', '渝北区', '沙坪坝区', '九龙坡区', '万州区', '永川市', '南岸区', '酉阳县', '北碚区', '涪陵区', '秀山县', '巴南区', '渝中区', '石柱县', '忠县', '合川市', '大渡口区', '开县', '长寿区', '荣昌县', '云阳县', '梁平县', '潼南县', '江津市', '彭水县', '璧山县', '綦江县', '大足县', '黔江区', '巫溪县', '巫山县', '垫江县', '丰都县', '武隆县', '万盛区', '铜梁县', '南川市', '奉节县', '双桥区', '城口县']
            },
            {
                'province': '内蒙古',
                'city': ['赤峰市', '包头市', '通辽市', '呼和浩特市', '乌海市', '鄂尔多斯市', '呼伦贝尔市', '兴安盟　 巴彦淖尔盟　 乌兰察布盟　 锡林郭勒盟　 阿拉善盟']
            },
            {
                'province': '广西',
                'city': ['贵港市', '玉林市', '北海市', '南宁市', '柳州市', '桂林市', '梧州市', '钦州市', '来宾市', '河池市', '百色市', '贺州市', '崇左市', '防城港市']
            },
            {
                'province': '海南',
                'city': ['三亚市', '海口市', '琼海市', '文昌市', '东方市', '昌江县', '陵水县', '乐东县', '五指山市', '保亭县', '澄迈县', '万宁市', '儋州市', '临高县', '白沙县', '定安县', '琼中县', '屯昌县']
            },
            {
                'province': '青海',
                'city': ['西宁市', '海西州', '海东地区', '海北州', '果洛州', '玉树州', '黄南藏族自治州']
            },
            {
                'province': '甘肃',
                'city': ['兰州市', '天水市', '庆阳市', '武威市', '酒泉市', '张掖市', '陇南地区', '白银市', '定西地区', '平凉市', '嘉峪关市', '临夏回族自治州', '金昌市', '甘南州']
            },
            {
                'province': '陕西',
                'city': ['西安市', '咸阳市', '宝鸡市', '汉中市', '渭南市', '安康市', '榆林市', '商洛市', '延安市', '铜川市']
            },
            {
                'province': '广东',
                'city': ['东莞市', '广州市', '中山市', '深圳市', '惠州市', '江门市', '珠海市', '汕头市', '佛山市', '湛江市', '河源市', '肇庆市', '潮州市', '清远市', '韶关市', '揭阳市', '阳江市', '云浮市', '茂名市', '梅州市', '汕尾市']
            },
            {
                'province': '香港',
                'city': ['香港']
            },
            {
                'province': '澳门',
                'city': ['澳门']
            }
        ];

        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setRegion_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_region_modal = modal;
        });

        $scope.$watch('$scope.arr_userInformation.arr_userRegion.region', function (newVal, oldVal) {
            if (newVal != oldVal) {
                $scope.arr_userInformation.arr_userRegion.city = $scope.arr_userInformation.arr_userRegion.region.city;
            }
        });

        $scope.fn_set_region = function () {

            var arr_concat_regin = '';

            if ($scope.arr_userInformation.arr_userRegion.region == '' || $scope.arr_userInformation.arr_userRegion.city == '') {
                return
            }

            arr_concat_regin += ($scope.arr_userInformation.arr_userRegion.region.province + $scope.arr_userInformation.arr_userRegion.city);

            console.log(arr_concat_regin);
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            $scope.fn_set_userInformation(3, $scope.user_information.userId, '', '', '', arr_concat_regin, '');
            $scope.close_set_region_modal();
        };

        $scope.open_set_region_modal = function () {
            $scope.set_region_modal.show();
        };
        $scope.close_set_region_modal = function () {
            $scope.set_region_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userRegion.region = '';
                $scope.arr_userInformation.arr_userRegion.city = '';
            }, 1000);
        };


        /**
         * 个性签名设置 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setSignature_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_signature_modal = modal;
        });

        $scope.fn_set_gender = function () {
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            if ($scope.arr_userInformation.arr_userSign == '') {
                return
            }
            $scope.fn_set_userInformation(4, $scope.user_information.userId, '', '', '', '', $scope.arr_userInformation.arr_userSign);
            $scope.close_set_signature_modal();
        };

        $scope.open_set_signature_modal = function () {
            $scope.set_signature_modal.show();
        };
        $scope.close_set_signature_modal = function () {
            $scope.set_signature_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userSign = '';
            }, 1000);
        };

        /**
         * 用户退出
         */
        $scope.fn_logout = function () {
            loading_service.show_loading();
            var firstLoading = localStorage.getItem("firstLoading");
            localStorage.clear();
            localStorage.setItem("firstLoading", firstLoading);
            $state.go('tabs.user');
            $ionicViewSwitcher.nextDirection("back");

        }


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