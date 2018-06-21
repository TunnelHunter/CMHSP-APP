app.controller('tabUserMessagesSysListCtrl', ['$scope', '$ionicLoading', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $ionicLoading, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();

        $scope.sys_messages = [];

        var messages = [
            {
                "context": "版本更新请查收",
                "time": "2018-4-14"
            },
            {
                "context": "新增抑郁症试题",
                "time": "2018-5-14"
            },
            {
                "context": "新增焦虑症试题",
                "time": "2018-5-14"
            },
            {
                "context": "音乐类型增加",
                "time": "2018-5-14"
            },
            {
                "context": "个人测试数据分析已完成，请查看",
                "time": "2018-6-23"
            },
            {
                "context": "晚上尽量不要熬夜哦",
                "time": "2018-7-14"
            }


        ];





        //获取系统信息 每次进入用户tab页面都要调用该方法
        $scope.fn_get_sysMessage = function () {

            var userId = window.localStorage.getItem("userId");

            $http({
                method: "post",
                url: ajax_service.get_userSysMessage(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.sys_messages = response.data
                    }
                })
                .error(function (response) {
                    $scope.sys_messages = messages
                })
        };
        $scope.fn_get_sysMessage();

        //点击 <返回 清空系统消息小标
        $scope.fn_clear_MessagesNum = function () {

            var userId = window.localStorage.getItem("userId");

            $http({
                method: "post",
                url: ajax_service.clear_userNews(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({userId: userId, messageType: 0}),
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