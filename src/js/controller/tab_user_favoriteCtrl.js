app.controller('tabUserFavoriteCtrl', ['$scope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $ionicLoading, $ionicPopup, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();
        $scope.arr_userFavorites = [];

        var arr_favorites = [
            {
                "type": "0",
                "image": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg",
                "title": "UI/UX设计",
                "context": "介绍UI/UX工具"
            },
            {
                "type": "2",
                "image": "imgs/乌合之众.jpg",
                "title": "乌合之众",
                "context": "古斯塔夫·勒庞"
            },
            {
                "type": "1",
                "image": "imgs/music_logo2.jpg",
                "title": "美丽如你",
                "context": "盘尼西林"
            },
            {
                "type": "0",
                "image": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg",
                "title": "PowerMockup",
                "context": "介绍原型设计工具"
            },
            {
                "type": "2",
                "image": "imgs/文章4.jpg",
                "title": "心理健康的保健方法",
                "context": "杨波"
            },
            {
                "type": "1",
                "image": "imgs/music_logo2.jpg",
                "title": "时间之间",
                "context": "后海大鲨鱼"
            }
        ];


        /*
        获取该用户的测试记录
         */
        $scope.fn_get_userFavorites = function () {

            var userId = window.localStorage.getItem("userId");

            $http({
                method: "post",
                url: ajax_service.get_userFavorite(),
                //url:"http://localhost:8080/ti/1",
                data: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.arr_userFavorites = response.data;

                    }

                })
                .error(function (response) {
                    $scope.arr_userFavorites = arr_favorites;

                })
        };

        $scope.fn_get_userFavorites();


    }]);