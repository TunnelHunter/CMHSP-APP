app.controller('tabSocialDetailCtrl', ['$scope', '$state','$stateParams', '$http', 'ajax_service', '$ionicLoading', function ($scope, $state,$stateParams, $http, ajax_service, $ionicLoading) {
    $scope.item = {};

    $scope.item = angular.fromJson($stateParams.item);

    console.log($scope.item);

    $scope.doRefreshDown = function () {
        $scope.currentPage = 1;
        $scope.noMorePage = false;
        $http({
            method: "get",
            url: ajax_service.get_socialFreshDown(),
            //url:"http://localhost:8080/ti/1",
            //data: JSON.stringify(get_questions_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .success(function (response) {
                var newItems = response.data;

                for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                    $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                }
                // $scope.items = response;
            })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });

    };


}]);
