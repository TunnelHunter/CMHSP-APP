app.controller('tabUserMessagesComtListCtrl',['$scope','$timeout','$http','ajax_service',function ($scope,$timeout,$http,ajax_service) {
    $scope.show_question_windows = false;

    $timeout(function () {
        $scope.user_messages = [
            {
                'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
                'name':'小张',
                'content':'你好啊！'
            },
            {
                'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
                'name':'小李',
                'content':'你在哪里？'
            },
            {
                'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
                'name':'小黄',
                'content':'评论666'
            },
            {
                'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
                'name':'小乐',
                'content':'我起飞了！'
            },
            {
                'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
                'name':'小机',
                'content':'键盘侠！'
            },
            {
                'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
                'name':'小机',
                'content':'键盘侠！'
            }
        ]

    },1000);


    $scope.comt_messages = [];


    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.fn_get_comtMessage();

    });

    //获取评论信息 每次进入用户tab页面都要调用该方法
    $scope.fn_get_comtMessage = function () {

        var userId = window.localStorage.getItem("userId");

        $http({
            method: "post",
            url: ajax_service.get_userComments(),
            //url:"http://localhost:8080/ti/1",
            data: JSON.stringify({userId: userId}),
            headers: {
                'Content-Type': 'json'
            }
        })
            .success(function (response) {
                if (response.error_code == 0) {
                    $scope.comt_messages = response.data
                }
            })
            .error(function () {

            })
    };

    //点击 <返回 清空我的评论小标
    $scope.fn_clear_MessagesNum = function () {

        var userId = window.localStorage.getItem("userId");

        $http({
            method: "post",
            url: ajax_service.clear_userNews(),
            //url:"http://localhost:8080/ti/1",
            data: JSON.stringify({userId: userId,messageType:1}),
            headers: {
                'Content-Type': 'json'
            }
        })
            .success(function (response) {

            })
            .error(function () {

            })
    };

}]);