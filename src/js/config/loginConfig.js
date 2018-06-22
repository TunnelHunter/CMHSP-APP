app.run(['$rootScope', '$timeout', '$ionicModal', '$http', 'ajax_service', 'loading_service',
    function ($rootScope, $timeout, $ionicModal, $http, ajax_service, loading_service) {

        /*
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

        /*
        登录方法
         */
        $rootScope.fn_login = function (name, password, time) {
            loading_service.show_loading();
            $http({
                method: "post",
                url: ajax_service.login(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({username: name, password: password, logintime: time}),
                headers: {
                    'Content-Type': 'json'
                    // 'Token': localStorage.getItem("token")
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        localStorage.setItem("Token", response.data.token);
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("userName", response.data.userName);
                        localStorage.setItem("userImage", response.data.Image);
                        localStorage.setItem("userRegion", response.data.Region);
                        localStorage.setItem("userSign", response.data.Sign);
                    }
                })
                .error(function () {

                })
        };

        /*
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
                    // 'Token': localStorage.getItem("token")
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
                        }, 1000)
                    }
                })
                .error(function () {
                    setTimeout(function () {
                        $rootScope.login_account.userName = name;
                        $rootScope.login_account.userPassword = password;
                    }, 300);
                    setTimeout(function () {
                        $rootScope.login();
                    }, 1000)
                })
        };


        /*
        登录模态窗口 以及操作模态窗口方法
         */
        $ionicModal.fromTemplateUrl('html/user_login_modal.html', {
            scope: $rootScope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $rootScope.login_modal = modal;
        });

        $rootScope.login = function () {
            if ($rootScope.login_account.userName == "" || $rootScope.login_account.userPassword == "") {
                return;
            }
            if ($rootScope.login_account.userName.match(/^[a-zA-Z0-9]+$/) == null || $rootScope.login_account.userPassword.match(/^[a-zA-Z0-9]+$/) == null) {
                return;
            }
            $rootScope.fn_login($rootScope.login_account.userName, $rootScope.login_account.userPassword, loading_service.get_time());
            $rootScope.closeLoginModal();
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


        /*
        注册模态窗口 以及操作模态窗口方法
         */
        $ionicModal.fromTemplateUrl('html/user_register_modal.html', {
            scope: $rootScope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $rootScope.register_modal = modal;
        });

        $rootScope.register = function () {
            if ($rootScope.register_account.userName == ""
                || $rootScope.register_account.userPassword == ""
                || $rootScope.register_account.userPassword_again == "") {
                return;
            }
            if ($rootScope.register_account.userPassword != $rootScope.register_account.userPassword_again) {
                return;
            }
            if ($rootScope.register_account.userName.match(/^[a-zA-Z0-9]+$/) == null
                || $rootScope.register_account.userPassword.match(/^[a-zA-Z0-9]+$/) == null
                || $rootScope.register_account.userPassword_again.match(/^[a-zA-Z0-9]+$/) == null) {
                return;
            }
            $rootScope.fn_register($rootScope.register_account.userName, $rootScope.register_account.userPassword);
            $rootScope.closeRegisterModal();
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


    }]);
