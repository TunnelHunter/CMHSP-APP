app.controller('tabReadingCtrl', ['$scope', '$state','$ionicSlideBoxDelegate',  'ajax_service', '$http', '$timeout', '$rootScope',
    function ($scope,$state, $ionicSlideBoxDelegate, ajax_service, $http, $timeout, $rootScope,loading_service) {

        /**
         * 进入页面就启动轮播图
         */
        $scope.$on('$ionicView.enter', function () {
            $ionicSlideBoxDelegate.start();

        });
        /**
         *MOCK数据
         */
        $scope.arr_read_firstPage = {
            slide: [{
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 0,
                "readImage": "src/imgs/read_loading/essay.png",
                "readContext": ""
            }],
            book: [{
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 1,
                "readImage": "src/imgs/read_loading/book.png",
                "readContext": ""
            }, {
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 1,
                "readImage": "src/imgs/read_loading/book.png",
                "readContext": ""
            }, {
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 1,
                "readImage": "src/imgs/read_loading/book.png",
                "readContext": ""
            }, ],
            essay: [{
                "readTitle": "",
                "readId": "",
                "readAuthor": "",
                "readType": 0,
                "readImage": "src/imgs/read_loading/essay.png",
                "readContext": ""
            }]
        };

        /**
         * 获取首屏信息
         */
        $scope.fn_read_firstPage = function () {
            $http({
                method: "get",
                url: ajax_service.get_readFirstPage(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $scope.arr_read_firstPage = response.data;
                        //第一句是在获取数据之后先让<ion-slide-box>更新一下，第二句是设置循环播放为true。
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.loop(true);

                    }else {
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
        $scope.fn_read_firstPage();


        /**
         * 传递每个阅读信息 给readDetail页面进行展示
         */
        $scope.fn_readDetail = function (read) {
            console.log(read);
            console.log(angular.toJson(read));
            $state.go('tabs.readingDetail', {'read': angular.toJson(read),'fromPage':'reading'})
        };


    }]);