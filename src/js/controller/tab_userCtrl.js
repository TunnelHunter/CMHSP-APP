app.controller('tabUserCtrl', ['$scope', '$ionicModal', '$http', 'ajax_service',function ($scope, $ionicModal, $http,ajax_service) {

    //进入页面之前就要 调用fn_get_notices方法 来查看是否有最新 我的消息
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.fn_get_notices();

    });

    $scope.show_news = false;

    //获取有无最新消息 每次进入用户tab页面都要调用该方法
    $scope.fn_get_notices = function () {

        var userId = window.localStorage.getItem("userId");

        $http({
            method: "post",
            url: ajax_service.get_userNotice(),
            //url:"http://localhost:8080/ti/1",
            data: JSON.stringify({userId: userId}),
            headers: {
                'Content-Type': 'json'
            }
        })
            .success(function (response) {
                if (response.error_code == 0) {
                    if(response.data.haveNews == 0){
                        $scope.show_news = false;
                    }else {
                        $scope.show_news = true;
                    }
                }
            })
            .error(function () {

            })
    };

}]);