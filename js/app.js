var app = angular.module('myApp',['ionic']);

app.config(function ($stateProvider, $urlRouterProvider) {
   //路由
   $urlRouterProvider.otherwise('home');
   $stateProvider
       .state('home',{
           url:'/home',
           templateUrl:'html/home.html',
           controller:'homeCtrl'
       })
});