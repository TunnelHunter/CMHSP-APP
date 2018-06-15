app.controller('tabReadingCtrl', ['$scope', '$ionicSlideBoxDelegate', '$ionicLoading', 'ajax_service', '$http', '$timeout', '$rootScope',
    function ($scope, $ionicSlideBoxDelegate, $ionicLoading, ajax_service, $http, $timeout, $rootScope) {

        /*
        $ionicView.loaded   视图已经被加载了，这个事件只发生一次，视图被创建并且被添加到DOM中，当视图跳出后并被缓存的话，再次访问这个视图这个事件将不会被激活
        $ionicView.enter 　　进入视图并被激活。这事件被激活来判断这个视图是第一个加载还是被缓存了的
        $ionicView.leave　　离开这个视图并且不是活动页面。调用这个事件判断应该被缓存还是摧毁
        $ionicView.beforeEnter 　　视图是即将进入并成为活动视图
        $ionicView.beforeLeave　　视图将被关闭并且不是活动页面
        $ionicView.afterEnter　　进入视图并是当前的活动页面
        $ionicView.afterLeave　　已经离开视图，并成为非激活页面
        $ionicView.unloaded　　视图的Controller已经被摧毁并且他的页面元素也从Dom中移除
         */
        $scope.$on('$ionicView.enter', function () {

            console.log(1111);
            $ionicSlideBoxDelegate.start();

        });
        $scope.slide_index = 0;

        $scope.click_slide_page = function (slide_index) {
            console.log(slide_index);
        };


        //获取首屏信息
        $scope.arr_read_firstPage = {};

        $scope.arr_read_firstPage = {
            "slide": [
                {
                    "readId": "1",
                    "readTitle": "软件实训1",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/0140465b17cbaba801212d5774dcb3.jpg"
                },
                {
                    "readId": "2",
                    "readTitle": "软件实训2",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg"
                },
                {
                    "readId": "3",
                    "readTitle": "软件实训3",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg"
                },
                {
                    "readId": "4",
                    "readTitle": "软件实训4",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/01cfc15b17cbaba801212d57deb7ca.jpg"
                },
                {
                    "readId": "5",
                    "readTitle": "软件实训5",
                    "readAuthor": "杨波",
                    "readImage": "https://img.zcool.cn/community/011bb95b17cba8a801202e60e2d131.jpg"
                }

            ],
            "book": [
                {
                    "readId": "6",
                    "readTitle": "乌合之众",
                    "readAuthor": "古斯塔夫·勒庞",
                    "readImage": "imgs/乌合之众.jpg"
                },
                {
                    "readId": "8",
                    "readTitle": "性格心理学",
                    "readAuthor": "邹宏明",
                    "readImage": "imgs/性格心理学.jpg"
                },
                {
                    "readId": "9",
                    "readTitle": "社会性动物",
                    "readAuthor": "艾略特·阿伦森",
                    "readImage": "imgs/社会性动物.jpg"
                },
                {
                    "readId": "10",
                    "readTitle": "自控力",
                    "readAuthor": "凯利·麦格尼格尔",
                    "readImage": "imgs/自控力.jpg"
                },
                {
                    "readId": "11",
                    "readTitle": "行为心理学",
                    "readAuthor": " 约翰·华生 ",
                    "readImage": "imgs/行为心理学.jpg"
                },
                {
                    "readId": "7",
                    "readTitle": "心理学与生活",
                    "readAuthor": "理查德·格里格 和 菲利普·津巴多",
                    "readImage": "imgs/心理学与生活.jpg"
                }

            ],
            "essay": [
                {
                    "readId": "5",
                    "readTitle": "《你不知道的抑郁症》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章3.jpg"
                },
                {
                    "readId": "6",
                    "readTitle": "《心理健康的保健方法》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章4.jpg"
                },
                {
                    "readId": "7",
                    "readTitle": "《不用怕！这些方法教你避免抑郁症》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章5.jpg"
                },
                {
                    "readId": "3",
                    "readTitle": "《心理疾病真的不用怕，我们来帮你!》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章1.jpg"
                },
                {
                    "readId": "4",
                    "readTitle": "《心理咨询的正确方式》",
                    "readAuthor": "杨波",
                    "readImage": "imgs/文章2.jpg"
                }

            ]


        };


        $scope.fn_read_firstPage = function () {
            $http({
                method: "get",
                url: ajax_service.get_readFirstPage(),
                // url:"http://localhost:8080/ti/1",
                //data: JSON.stringify(get_questions_data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (response) {

                    if (response.error_code == 0)
                        $scope.arr_read_firstPage = response.data;
                    //第一句是在获取数据之后先让<ion-slide-box>更新一下，第二句是设置循环播放为true。
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    console.log($scope.arr_read_firstPage);

                })
                .error(function (response) {
                    //$rootScope.fn_common_showAlertTxt($rootScope.var_common_notAllowString, 1);

                });
        };
        $scope.fn_read_firstPage();
    }]);