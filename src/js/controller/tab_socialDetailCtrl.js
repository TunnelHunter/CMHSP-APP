app.controller('tabSocialDetailCtrl', ['$scope', '$state', '$stateParams', '$http', 'ajax_service', '$ionicLoading', '$ionicPopup', '$timeout','loading_service', function ($scope, $state, $stateParams, $http, ajax_service, $ionicLoading, $ionicPopup, $timeout,loading_service) {
    $scope.item = {};

    $scope.item = angular.fromJson($stateParams.item);

    console.log($scope.item);

    loading_service.show_loading();

    $scope.favorite_ok = false;

    /*
      社区动态收藏
     */
    $scope.fn_socialFavoriteAdd = function () {
        loading_service.show_loading();
        $scope.favorite_ok = !$scope.favorite_ok;
        var var_favorite_add = {
            "userId": 0,
            "userName": "",
            "socialId": 0,
        };

        // var_favorite_add.userId = window.localStorage.getItem("userId");
        // var_favorite_add.userName = window.localStorage.getItem("userName");
        // var_favorite_add.socialId = $scope.item.socialId;

        var_favorite_add.userId = 1;
        var_favorite_add.userName = "小薛";
        var_favorite_add.socialId = 1;

        $http({
            method: "post",
            url: ajax_service.add_socialFavorite(),
            //url:"http://localhost:8080/ti/1",
            data: JSON.stringify(var_favorite_add),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (response) {
                console.log(response.data);

            })
            .error(function (response) {
                console.log("收藏成功");

            });
    };


    $scope.comment_data = '';


    /*
      发布社区动态评论
      方法里用$scope要小心，可能会影响方法外的此变量
     */
    $scope.fn_socialCommentAdd = function () {
        loading_service.show_loading();
        var var_command_add = {
            "userId": 0,
            "userName": "",
            "userImg": "",
            "socialId": 0,
            "commentData": "",
            "commentTime": ""
        };
        // var_command_add.userId = window.localStorage.getItem("userId");
        // var_command_add.userName = window.localStorage.getItem("userName");
        // var_command_add.userImg = window.localStorage.getItem("userImg");
        // var_command_add.socialId = $scope.item.socialId;
        // var_command_add.commentData = $scope.comment_data;
        // var_command_add.commentTime = loading_service.get_time();

        var_command_add.userId = 1;
        var_command_add.userName = "小薛";
        var_command_add.userImg = "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png";
        var_command_add.socialId = 1;
        var_command_add.commentData = $scope.comment_data;
        var_command_add.commentTime = loading_service.get_time();


        console.log("添加成功");


        $scope.item.comments.unshift(var_command_add);
        // console.log($scope.item);
        $scope.comment_data = '';

        $http({
            method: "post",
            url: ajax_service.add_socialComment(),
            //url:"http://localhost:8080/ti/1",
            data: JSON.stringify(var_command_add),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (response) {
                console.log(response.data);

            })
            .error(function (response) {
                console.log(response.data);

            });
    };

    /*
       弹框式 用户在弹出框内输入评论
     */
    $scope.showPopup = function () {
        $scope.data = {};

        $ionicPopup.show({
            template: '<textarea ng-model="data.commentData" placeholder=" 写评论 . . .">',
            title: '发布评论',
            // subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                {text: '取消'},
                {
                    text: '<b>评论</b>',
                    type: 'button-stable',
                    onTap: function (e) {
                        if (!$scope.data.commentData) {
                            // 不允许用户关闭，除非输入评论
                            e.preventDefault();
                        } else {
                            var aa = $scope.data.commentData;
                            $scope.fn_socialCommentAdd(aa);
                        }
                    }
                }
            ]
        });

    };


}]);
