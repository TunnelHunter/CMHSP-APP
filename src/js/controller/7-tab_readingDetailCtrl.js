app.controller('tabReadingDetailCtrl', ['$scope', '$rootScope', '$ionicLoading', 'ajax_service', '$http', '$timeout', '$state', '$stateParams', 'loading_service',
    function ($scope, $rootScope, $ionicLoading, ajax_service, $http, $timeout, $state, $stateParams, loading_service) {

        /**
         *获取跳转之前页面，返回按钮使用
         *获取阅读类型
         */
        $scope.read = {};
        $scope.readContext = '';
        $scope.read = angular.fromJson($stateParams.read);
        $scope.arr_fromPage = $stateParams.fromPage;
        $scope.arr_readType = $stateParams.readType;

        /**
         * 进入readDetail页面调用
         */
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.readId = angular.fromJson($stateParams.read).readId;
            $scope.fn_get_readList($scope.readId);

        });

        /**
         * 返回按钮，根据$scope.arr_fromPage 判断跳转之前页面
         */
        $scope.fn_go_back = function () {
            if ($scope.arr_fromPage == 'reading') {
                $state.go('tabs.reading');
            } else if ($scope.arr_fromPage == 'readingList') {
                $state.go('tabs.readingList', {'readType': $scope.arr_readType});
            }
        };

        /**
         * 获取读物详细信息
         * @param readId
         */
        $scope.fn_get_readList = function (readId) {
            $http({
                method: "post",
                url: ajax_service.get_readDetil(),
                data: JSON.stringify({readId: readId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.readContext = response.data.readContext;
                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                });
        };


        /**
         * 收藏阅读
         */
        $scope.fn_readingFavoriteAdd = function () {
            if ($rootScope.judge_login()) {
                loading_service.show_loading();
                var var_favorite_add = {
                    "userId": 0,
                    "readId": 0
                };
                var_favorite_add.userId = window.localStorage.getItem("userId");
                var_favorite_add.readId = $scope.read.readId;
                $http({
                    method: "post",
                    url: ajax_service.add_readFavorite(),
                    data: JSON.stringify(var_favorite_add),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                       if(response.error_code == 0){
                           setTimeout(function () {
                               $rootScope.fn_show_toast(1, "收藏动态成功");
                           }, 500);
                       } else if(response.error_code == 1){
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
        }


    }]);