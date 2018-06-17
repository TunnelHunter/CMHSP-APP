app.controller('tabReadingDetailCtrl', ['$scope', '$ionicLoading', 'ajax_service', '$http', '$timeout', '$rootScope', '$state','$stateParams',
    function ($scope, $ionicLoading, ajax_service, $http, $timeout, $rootScope, $state,$stateParams) {

        $scope.read = {};

        $scope.read = angular.fromJson($stateParams.read);

        // console.log($scope.read);


        console.log($stateParams);
        $scope.arr_fromPage = $stateParams.fromPage;

        $scope.arr_readType = $stateParams.readType;

        //
        $scope.fn_go_back = function () {

            if ($scope.arr_fromPage == 'reading') {
                $state.go('tabs.reading');
            } else if ($scope.arr_fromPage == 'readingList') {
                $state.go('tabs.readingList', {'readType': $scope.arr_readType});
            }


        };

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.readId = angular.fromJson($stateParams.read).readId;
            $scope.fn_get_readList($scope.readId);

        });

        $scope.readContext = '';
        $scope.arr_0 = '抑郁症又称抑郁障碍，以显著而持久的心境低落为主要临床特征，是心境障碍的主要类型。' +
            '临床可见心境低落与其处境不相称，情绪的消沉可以从闷闷不乐到悲痛欲绝，自卑抑郁，甚至悲观厌世，可有自杀企图或行为；甚至发生木僵；部分病例有明显的焦虑和运动性激越；严重者可出现幻觉、妄想等精神病性症状。' +
            '每次发作持续至少2周以上、长者甚或数年，多数病例有反复发作的倾向，每次发作大多数可以缓解，部分可有残留症状或转为慢性。';

        //获取读物详细信息
        $scope.fn_get_readList = function (value) {
            $http({
                method: "post",
                url: ajax_service.get_readDetil(),
                // url:"http://localhost:8080/ti/1",
                data: JSON.stringify({readId: value}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $scope.readContext = response.data.readContext;
                        console.log($scope.readContext);
                    }

                })
                .error(function (response) {
                    //$rootScope.fn_common_showAlertTxt($rootScope.var_common_notAllowString, 1);

                    $scope.readContext = $scope.arr_0;

                });
        };


    }]);