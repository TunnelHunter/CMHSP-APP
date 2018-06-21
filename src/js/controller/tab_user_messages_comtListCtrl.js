app.controller('tabUserMessagesComtListCtrl', ['$scope', '$ionicLoading', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $ionicLoading, ajax_service, $http, $timeout, loading_service) {
        loading_service.show_loading();
        $scope.comt_messages = [];

        var messages = [
            {
                "userId": "1",
                "userName": "小张",
                "comData": "你好帅",
                "comTime": "2018-5-16" ,
                "comImage": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png"
            },
            {
                "userId": "1",
                "userName": "小李",
                "comData": "你在哪里？",
                "comTime": "2018-5-16" ,
                "comImage": "http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png"
            },
            {
                "userId": "1",
                "userName": "小黄",
                "comData": "666",
                "comTime": "2018-5-16" ,
                "comImage": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png"
            },
            {
                "userId": "1",
                "userName": "小机",
                "comData": "货真价实的键盘侠！",
                "comTime": "2018-5-16" ,
                "comImage": "http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png"
            },
            {
                "userId": "1",
                "userName": "小乐",
                "comData": "我起飞了！",
                "comTime": "2018-5-16" ,
                "comImage": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png"
            }
        ];



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
                .error(function (response) {
                    $scope.comt_messages = messages
                })
        };
        $scope.fn_get_comtMessage();

        //点击 <返回 清空我的评论小标
        $scope.fn_clear_MessagesNum = function () {

            var userId = window.localStorage.getItem("userId");

            $http({
                method: "post",
                url: ajax_service.clear_userNews(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({userId: userId, messageType: 1}),
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