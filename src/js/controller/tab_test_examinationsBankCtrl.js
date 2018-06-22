app.controller('tabTestExaminationsBankCtrl', ['$scope', '$rootScope', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();

        //默认选中
        $scope.default_examination = $rootScope.examination_default.examinationName;

        $scope.examinationChange = function (examination) {
            loading_service.show_loading();
            $rootScope.examination_default = examination;
            console.log($rootScope.examination_default);
        };
    }]);