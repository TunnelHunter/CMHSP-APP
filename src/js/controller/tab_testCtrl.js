app.controller('tabTestCtrl',['$scope','$rootScope','$http','ajax_service',function ($scope,$rootScope,$http,ajax_service) {
    $rootScope.examinations_list = [];
    $rootScope.examination_default = {};

    $scope.fn_get_examinations_list = function () {
        $http({
            method: "get",
            // url: ajax_service.get_examinationsList(),
            url:"http://192.168.43.214:8080/CMHSP/examinationsList",
            // data: JSON.stringify(get_questions_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .success(function (response) {

                $rootScope.examinations_list = response.data[0];
                $rootScope.examination_default = $rootScope.examinations_list[0];
                console.log($rootScope.examinations_list);
                console.log($rootScope.examination_default);

            })
            .error(function (response) {

            });
    };
    $scope.fn_get_examinations_list();



}]);