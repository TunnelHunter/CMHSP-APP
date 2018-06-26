app.controller('tabTestExaminationsBankCtrl', ['$scope', '$rootScope', '$state','ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state,ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();

        //默认选中
        $scope.default_examination = $rootScope.examination_default.examinationName;

        $scope.examinationChange = function (examination) {
            loading_service.show_loading();
            $rootScope.examination_default = examination;
            setTimeout(function () {
                $state.go('tabs.test');
            },200);
            console.log($rootScope.examination_default);
        };
    }]);