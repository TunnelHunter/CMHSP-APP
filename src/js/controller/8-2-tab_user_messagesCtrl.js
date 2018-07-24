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