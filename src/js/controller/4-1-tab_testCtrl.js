app.controller('tabTestCtrl', ['$scope', '$rootScope', '$state', '$ionicViewSwitcher', '$http', 'ajax_service', 'particle_service',
    function ($scope, $rootScope, $state, $ionicViewSwitcher, $http, ajax_service, particle_service) {

        /**
         $ionicView.loaded   视图已经被加载了，这个事件只发生一次，视图被创建并且被添加到DOM中，当视图跳出后并被缓存的话，再次访问这个视图这个事件将不会被激活
         $ionicView.enter 　　进入视图并被激活。这事件被激活来判断这个视图是第一个加载还是被缓存了的
         $ionicView.leave　　离开这个视图并且不是活动页面。调用这个事件判断应该被缓存还是摧毁
         $ionicView.beforeEnter 　　视图是即将进入并成为活动视图
         $ionicView.beforeLeave　　视图将被关闭并且不是活动页面
         $ionicView.afterEnter　　进入视图并是当前的活动页面
         $ionicView.afterLeave　　已经离开视图，并成为非激活页面
         $ionicView.unloaded　　视图的Controller已经被摧毁并且他的页面元素也从Dom中移除
         */

        $scope.$on('$ionicView.loaded', function () {
            $rootScope.judge_firstLoading();
            $scope.fn_show_particle();
            $scope.fn_get_examinations_list();
        });

        /**
         绘制粒子背景
         */
        $scope.fn_show_particle = function () {
            var config = {
                vx: 5,	//小球x轴速度,正为右，负为左
                vy: 5,	//小球y轴速度
                height: 1,	//小球高宽，其实为正方形，所以不宜太大
                width: 1,
                count: 80,		//点个数
                color: "255, 255, 255", 	//点颜色
                stroke: "130,255,255", 		//线条颜色
                dist: 5500, 	//点吸附距离
                e_dist: 0, 	//鼠标吸附加速距离
                max_conn: 5 	//点到点最大连接数
            };
            particle_service.CanvasParticle(config);
        };

        /**
         * 获取测试题库
         */
        $scope.fn_get_examinations_list = function () {
            $http({
                method: "GET",
                url: ajax_service.get_examinationsList(),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + $scope.login_token
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $rootScope.examinations_list = response.data;
                        $rootScope.examination_default = $rootScope.examinations_list[0];
                        console.log($rootScope.examinations_list);
                        console.log($rootScope.examination_default);
                    }

                })
                .error(function (response) {

                });
        };


        /**
         事件绑定开始测试按钮，先判断用户是否登陆，若登陆则跳转到答题页面，否则弹出用户登陆模态窗口
         */
        $scope.fn_start_answer = function () {
            console.log($rootScope.judge_login());
            if ($rootScope.judge_login()) {
                $state.go('tabs.startAnswer');
                $ionicViewSwitcher.nextDirection("forward");
            } else {
                $rootScope.openLoginModal();
            }
        };


    }]);