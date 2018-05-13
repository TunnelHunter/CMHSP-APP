app.controller('tabTestCtrl',['$scope','$rootScope','$http',function ($scope,$rootScope,$http) {
    $rootScope.questions = {};
    $scope.fn_get_questions_data = function () {
        $http({
            method: "get",
            //url: ajax_service.get_questions(),
            url:"http://localhost:8080/ti/1",
            //data: JSON.stringify(get_questions_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .success(function (response) {

                $rootScope.questions = response;
                console.log($rootScope.questions);

            })
            .error(function (response) {
                //$rootScope.fn_common_showAlertTxt($rootScope.var_common_notAllowString, 1);

            });
    };
    $scope.fn_get_questions_data();



}]);