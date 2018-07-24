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