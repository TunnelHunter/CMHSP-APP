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