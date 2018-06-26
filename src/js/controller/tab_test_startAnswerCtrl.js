app.controller('tabTestStartAnswerCtrl', ['$scope', '$ionicSlideBoxDelegate', 'loading_service', 'ajax_service', '$http', '$timeout', '$rootScope',
    function ($scope, $ionicSlideBoxDelegate, loading_service, ajax_service, $http, $timeout, $rootScope) {


        // loading_service.show_loading();

        //只要进入页面就禁止slide手动滑动
        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicSlideBoxDelegate.enableSlide(false);
        });

        //点击选项自动滑动页面进入下一题
        $scope.nextSlide = function (num) {

            if (num == 0) {
                $ionicSlideBoxDelegate.next();
            } else {
                loading_service.show_loading();
                setTimeout(function () {
                    $ionicSlideBoxDelegate.next();
                }, 500);
            }
        };


        $scope.total_score = 0;

        //计算分数 - 每次点击选项按钮，累加选项分数
        $scope.fn_calculate_score = function (option_score) {
            $scope.total_score = $scope.total_score + option_score;
            console.log($scope.total_score);
        };
        $scope.show_view_results = false;

        var questionsConclusion = [];
        var examinationName = "";
        var examinationId = 0;

        questionsConclusion = $rootScope.examination_default.questionsConclusion;
        examinationName = $rootScope.examination_default.examinationName;
        examinationId = $rootScope.examination_default.examinationId;

        $scope.last_results = {};
        $scope.last_conclusionId = 0;
        $scope.last_summary = '';

        //根据计算分数 查看测评结果
        $scope.fn_view_results = function (sum_score) {
            // $scope.show_view_results = true;
            for (var i = 0, len = questionsConclusion.length; i < len; i++) {
                if (sum_score <= questionsConclusion[i].scoreRange) {
                    $scope.last_results = questionsConclusion[i];
                    $scope.last_conclusionId = questionsConclusion[i].conclusionId;
                    $scope.last_summary = questionsConclusion[i].summary;
                    console.log($scope.last_results);
                    console.log($scope.last_conclusionId);
                    return;
                }
            }
        };

        //返回用户测试结果信息
        $scope.user_test_results = {
            "userId": 0,
            "userName": "",
            "examinationId": 0,
            "examinationName": '',
            "examinationScore": 0,
            "summary": '',
            "examinationConclusionId": 0
        };

        $scope.fn_return_user_test_results = function () {
            $scope.fn_view_results($scope.total_score);
            if($scope.last_summary == ""){
                return;
            }
            //赋值
            $scope.user_test_results.userId = parseInt(localStorage.getItem('userId'));
            $scope.user_test_results.userName = localStorage.getItem('userName');
            $scope.user_test_results.examinationId = examinationId;
            $scope.user_test_results.examinationName = examinationName;
            $scope.user_test_results.examinationScore = $scope.total_score;
            $scope.user_test_results.summary = $scope.last_summary;
            $scope.user_test_results.examinationConclusionId = $scope.last_conclusionId;

            $http({
                method: "post",
                url: ajax_service.return_examinationsResults(),
                data: JSON.stringify($scope.user_test_results),
                cache: true,
                headers: {
                    'Content-Type': 'application/json',
                    'addToken': true
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.nextSlide(1);
                    } else {
                        $rootScope.fn_show_toast("查看测试结果失败")

                    }

                })
                .error(function (response) {
                    $rootScope.fn_show_toast("网络错误")
                });

        }


    }]);