app.controller('tabSocialDetailCtrl', ['$scope', '$state', '$stateParams', '$http', 'ajax_service', '$ionicLoading', '$ionicPopup', function ($scope, $state, $stateParams, $http, ajax_service, $ionicLoading, $ionicPopup) {
    $scope.item = {};

    $scope.item = angular.fromJson($stateParams.item);

    console.log($scope.item);
    //获取当前时间
    var get_time = function () {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var week = now.getDay();            //星期

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if (month < 10) {
            clock += "0";
        }

        clock += month + "-";

        if (day < 10) {
            clock += "0";
        }

        clock += day + " ";

        switch (week) {
            case 0:
                clock += "Sun";
                break;
            case 1:
                clock += "Mon";
                break;
            case 2:
                clock += "Tues";
                break;
            case 3:
                clock += "Wed";
                break;
            case 4:
                clock += "Thur";
                break;
            case 5:
                clock += "Fri";
                break;
            case 6:
                clock += "Sat";
                break;
            default:
                break;
        }

        clock += " ";


        if (hh < 10) {
            clock += "0";
        }

        clock += hh + ":";
        if (mm < 10) {
            clock += '0';
        }
        clock += mm;
        console.log(clock);

        return clock;
    };

    $scope.var_command_add = {
        "userId": 0,
        "userName": "",
        "userImg": "",
        "socialId": 0,
        "commentData": "",
        "commentTime": ""
    };


    $scope.comment_data = '';


    $scope.fn_socialCommentAdd = function (comment) {

        // $scope.var_command_add.userId = parseInt(window.localStorage.getItem(userId));
        // $scope.var_command_add.userName = window.localStorage.getItem(userName);
        // $scope.var_command_add.userImg = window.localStorage.getItem(userImg);
        // $scope.var_command_add.socialId = $scope.item.socialId;
        // $scope.var_command_add.commentData = comment;
        // $scope.var_command_add.commentTime = get_time();

        $scope.var_command_add.userId = 1;
        $scope.var_command_add.userName = "小薛";
        $scope.var_command_add.userImg = "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png";
        $scope.var_command_add.socialId = 1;
        $scope.var_command_add.commentData = $scope.comment_data;
        $scope.var_command_add.commentTime = get_time();


        console.log("添加成功");


        $scope.item.comments.unshift($scope.var_command_add);
        console.log($scope.item);
        $scope.comment_data = ''

        // $http({
        //     method: "post",
        //     url: ajax_service.add_socialComment(),
        //     //url:"http://localhost:8080/ti/1",
        //     data: JSON.stringify($scope.var_command_add),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .success(function (response) {
        //         console.log(response.data);
        //
        //     })
        //     .error(function (response) {
        //         // console.log(response.data);
        //         console.log("添加成功");
        //         $scope.item.comments.push($scope.var_command_add);
        //
        //     });
    };


    $scope.showPopup = function () {
        $scope.data = {};
        // 自定义弹窗
        // var myPopup = $ionicPopup.show({
        //     template: '<textarea ng-model="data.commentData" placeholder=" 写评论 . . .">',
        //     title: '发布评论',
        //     // subTitle: 'Please use normal things',
        //     scope: $scope,
        //     buttons: [
        //         {text: '取消'},
        //         {
        //             text: '<b>评论</b>',
        //             type: 'button-stable',
        //             onTap: function (e) {
        //                 if (!$scope.data.commentData) {
        //                     // 不允许用户关闭，除非输入评论
        //                     e.preventDefault();
        //                 } else {
        //                     return $scope.data.commentData;
        //                 }
        //             }
        //         }
        //     ]
        // });
        // myPopup.then(function (res) {
        //     console.log('Tapped!', res);
        //     var aaa = res;
        //     $scope.fn_socialCommentAdd();
        //
        // });

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
