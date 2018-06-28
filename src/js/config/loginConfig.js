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
                },700);
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
                    'Content-Type': 'json'
                    // 'token': localStorage.getItem("token")
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


    }]);
