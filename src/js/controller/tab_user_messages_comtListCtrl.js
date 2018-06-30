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