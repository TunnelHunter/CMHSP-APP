app.controller('tabUserCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', 'ajax_service', 'loading_service',
    function ($scope, $rootScope, $ionicModal, $http, ajax_service, loading_service) {
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
                var userId = window.localStorage.getItem("userId");
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
            }else {
                return;
            }
        };

    }]);