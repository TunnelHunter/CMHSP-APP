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
        $scope.arr_read_firstPage = {};
        $scope.arr_read_firstPage = {
            "slide": [
                {
                    "readType":0,
                    "readId": "1",
                    "readTitle": "软件实训1",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/0140465b17cbaba801212d5774dcb3.jpg"
                },
                {
                    "readType":0,
                    "readId": "2",
                    "readTitle": "软件实训2",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg"
                },
                {
                    "readType":0,
                    "readId": "3",
                    "readTitle": "软件实训3",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg"
                },
                {
                    "readType":0,
                    "readId": "4",
                    "readTitle": "软件实训4",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/01cfc15b17cbaba801212d57deb7ca.jpg"
                },
                {
                    "readType":0,
                    "readId": "5",
                    "readTitle": "软件实训5",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/011bb95b17cba8a801202e60e2d131.jpg"
                }

            ],
            "book": [
                {
                    "readType":1,
                    "readId": "6",
                    "readTitle": "乌合之众",
                    "readAuthor": "古斯塔夫·勒庞",
                    "readImage": "imgs/乌合之众.jpg"
                },
                {
                    "readType":1,
                    "readId": "8",
                    "readTitle": "性格心理学",
                    "readAuthor": "邹宏明",
                    "readImage": "imgs/性格心理学.jpg"
                },
                {
                    "readType":1,
                    "readId": "9",
                    "readTitle": "社会性动物",
                    "readAuthor": "艾略特·阿伦森",
                    "readImage": "imgs/社会性动物.jpg"
                },
                {
                    "readType":1,
                    "readId": "10",
                    "readTitle": "自控力",
                    "readAuthor": "凯利·麦格尼格尔",
                    "readImage": "imgs/自控力.jpg"
                },
                {
                    "readType":1,
                    "readId": "11",
                    "readTitle": "行为心理学",
                    "readAuthor": " 约翰·华生 ",
                    "readImage": "imgs/行为心理学.jpg"
                },
                {
                    "readType":1,
                    "readId": "7",
                    "readTitle": "心理学与生活",
                    "readAuthor": "理查德·格里格 和 菲利普·津巴多",
                    "readImage": "imgs/心理学与生活.jpg"
                }


            ],
            "essay": [
                {
                    "readType":0,
                    "readId": "5",
                    "readTitle": "《你不知道的抑郁症》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章3.jpg"
                },
                {
                    "readType":0,
                    "readId": "6",
                    "readTitle": "《心理健康的保健方法》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章4.jpg"
                },
                {
                    "readType":0,
                    "readId": "7",
                    "readTitle": "《不用怕！这些方法教你避免抑郁症》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章5.jpg"
                },
                {
                    "readType":0,
                    "readId": "3",
                    "readTitle": "《心理疾病真的不用怕，我们来帮你!》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章1.jpg"
                },
                {
                    "readType":0,
                    "readId": "4",
                    "readTitle": "《心理咨询的正确方式》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章2.jpg"
                }

            ]


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