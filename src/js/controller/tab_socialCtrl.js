app.controller('tabSocialCtrl',['$scope','$http',function ($scope,$http) {
    $scope.doRefresh = function() {
        $http({
            method: "get",
            //url: ajax_service.get_questions(),
            url:"http://localhost:8080/ti/1",
            //data: JSON.stringify(get_questions_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .success(function(response) {
                $scope.items = response;
            })
            .finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });

    };
}]);



// angular.module('app.controllers', [])
//
//     .controller('categoryCtrl', ['$scope', '$http', '$stateParams','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
//         function ($scope, $http, $stateParams, $ionicLoading) {
//             var _arguments     = arguments;
//             $scope.lists       = [];
//             var page_no           = 1;
//             var page_size    = 20;
//             var page_total    = 0;
//
//             $scope.can_loadmore = function(){
//                 return page_no<page_total;
//             };
//
//             $scope.$on('$ionicView.loaded', function(event, data) {
//                 page_no     = 1;
//                 get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(res){
//                     page_total = res.pager.total;
//                 });
//             });
//
//             $scope.doRefresh = function(){
//                 page_no     = 1;
//                 get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(){
//                     $scope.$broadcast('scroll.refreshComplete');
//                 });
//             };
//
//             $scope.loadMore = function(){
//                 page_no     += 1;
//                 get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(){
//                     $scope.$broadcast('scroll.infiniteScrollComplete');
//                 });
//             };
//         }])