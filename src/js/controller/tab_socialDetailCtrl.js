app.controller('tabSocialDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'ajax_service', '$ionicLoading', '$ionicPopup', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state, $stateParams, $http, ajax_service, $ionicLoading, $ionicPopup, $timeout, loading_service) {
        /**
         * 获取页面传来的参数，定义作用域变量
         */
        loading_service.show_loading();
        $scope.ctrlScope = $scope;
        $scope.item = {};
        $scope.item = angular.fromJson($stateParams.item);
        $scope.favorite_ok = false;
        $scope.arr_socialComments = [];
        $scope.comment_data = '';

        /**
         根据socialId获取该动态的评论 （在进入socialDetail页面时调用）
         */
        $scope.fn_get_socialComments = function () {

            var var_socialId = $scope.item.socialId;

            $http({
                method: "post",
                url: ajax_service.get_socialComments(),
                data: JSON.stringify({socialId: var_socialId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.arr_socialComments = response.data.reverse();
                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "获取动态评论失败");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(3, "获取动态评论失败");
                    }, 500);
                });

        };

        $scope.fn_get_socialComments();


        /**
         社区动态收藏
         */
        $scope.fn_socialFavoriteAdd = function () {
            if ($rootScope.judge_login()) {
                loading_service.show_loading();
                var var_favorite_add = {
                    "userId": 0,
                    "userName": "",
                    "socialId": 0
                };

                var_favorite_add.userId = window.localStorage.getItem("userId");
                var_favorite_add.userName = window.localStorage.getItem("userName");
                var_favorite_add.socialId = $scope.item.socialId;

                $http({
                    method: "post",
                    url: ajax_service.add_socialFavorite(),
                    data: JSON.stringify(var_favorite_add),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.favorite_ok = !$scope.favorite_ok;
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "收藏动态成功");
                            }, 500);
                        } else if (response.error_code == 1) {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "动态已收藏");
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(3, "收藏动态失败");
                            }, 500);
                        }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "收藏动态失败");
                        }, 500);
                    });
            } else {
                $rootScope.openLoginModal();
            }
        };


        /**
         发布社区动态评论
         方法里用$scope要小心，可能会影响方法外的此变量
         */
        $scope.fn_socialCommentAdd = function () {
            if ($rootScope.judge_login()) {
                if ($scope.comment_data === "") {
                    $rootScope.fn_show_toast(4, "评论不可以为空哦");
                    return;
                }
                if ($scope.comment_data.length > 20) {
                    $rootScope.fn_show_toast(4, "评论最多20个字哦");
                    $scope.comment_data = '';
                    return;
                }
                loading_service.show_loading();
                var var_command_add = {
                    "userId": 0,
                    "userName": "",
                    "userImage": "",
                    "socialId": 0,
                    "commentData": "",
                    "commentTime": ""
                };
                var arr_comment = {
                    "cuserName": "",
                    "cuserImg": "",
                    "commentData": ""
                };
                var_command_add.userId = window.localStorage.getItem("userId");
                var_command_add.userName = window.localStorage.getItem("userName");
                var_command_add.userImage = window.localStorage.getItem("userImage");
                var_command_add.socialId = $scope.item.socialId;
                var_command_add.commentData = $scope.comment_data;
                var_command_add.commentTime = loading_service.get_time();
                $scope.comment_data = '';

                arr_comment.cuserName = var_command_add.userName;
                arr_comment.cuserImg = var_command_add.userImage;
                arr_comment.commentData = var_command_add.commentData;

                $http({
                    method: "post",
                    url: ajax_service.add_socialComment(),
                    data: JSON.stringify(var_command_add),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.arr_socialComments.unshift(arr_comment);
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "评论成功");
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(3, "网络错误，评论失败");
                            }, 500);
                        }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(3, "网络错误，评论失败");
                        }, 500);

                    });
            } else {
                $rootScope.openLoginModal();
            }
        };


        /**
         * 弹框式 用户在弹出框内输入评论
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
