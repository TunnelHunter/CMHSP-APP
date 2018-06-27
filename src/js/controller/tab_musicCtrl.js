app.controller('tabMusicCtrl', ['$scope', '$rootScope', '$state','$ionicViewSwitcher', '$http', 'ajax_service', '$stateParams', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state,$ionicViewSwitcher, $http, ajax_service, $stateParams,  $timeout, loading_service) {


        $scope.arr_musicType = [
            {
                "musicsceneId": "1",
                "musicsceneImage": "imgs/music_background/music1.jpg",
                "background": "imgs/music_background/musicType1.jpg",
                "musicsceneText1": "NEW AGE 电子合成器音乐",
                "musicsceneText2": "烘托氛围 治愈心灵",
                "musicsceneName": "治愈"
            },
            {
                "musicsceneId": "2",
                "musicsceneImage": "imgs/music_background/music2.jpg",
                "background": "imgs/music_background/musicType2.jpg",
                "musicsceneText1": "悦耳节奏带感歌曲精选",
                "musicsceneText2": "日常抖腿必备歌单",
                "musicsceneName": "兴奋"
            },
            {
                "musicsceneId": "3",
                "musicsceneImage": "imgs/music_background/music3.jpg",
                "background": "imgs/music_background/musicType3.jpg",
                "musicsceneText1": "触发心灵的一刹那",
                "musicsceneText2": "总有一首可以触动你的心房",
                "musicsceneName": "感动"
            },
            {
                "musicsceneId": "4",
                "musicsceneImage": "imgs/music_background/music4.jpg",
                "background": "imgs/music_background/musicType4.jpg",
                "musicsceneText1": "享受美妙的音乐",
                "musicsceneText2": "伴随你入睡 调整你的心情",
                "musicsceneName": "安静"
            },
            {
                "musicsceneId": "5",
                "musicsceneImage": "imgs/music_background/music5.jpg",
                "background": "imgs/music_background/musicType5.jpg",
                "musicsceneText1": "有时候快乐很简单",
                "musicsceneText2": "一丝微笑 永远不失孩子气",
                "musicsceneName": "快乐"
            }

        ];

        $scope.fn_toMusicPlayer = function (type) {
            console.log(type);
            console.log(angular.toJson(type));
            $state.go('tabs.musicPlayer', {'musicType': angular.toJson(type)});
            $ionicViewSwitcher.nextDirection("forward");
        };

    }]);