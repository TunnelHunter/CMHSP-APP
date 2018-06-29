app.controller('tabMusicPlayerCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'ajax_service', '$ionicLoading', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state, $stateParams, $http, ajax_service, $ionicLoading, $timeout, loading_service) {
        $scope.musicType = {};
        $scope.musicType = angular.fromJson($stateParams.musicType);

        loading_service.show_loading();
        console.log($stateParams);
        console.log($scope.musicType);
        $scope.myAuto = document.getElementById('musicPlayer');

        /**
         *获取当前场景音乐列表
         */
        $scope.music_url = "";
        $scope.musicList = [];
        $scope.music_name = '';
        $scope.music_auther = '';
        $scope.fn_get_sceneMusicList = function () {
            var id = $scope.musicType.musicsceneId;
            var name = $scope.musicType.musicsceneName;
            $http({
                method: "post",
                url: ajax_service.get_musicSceneList(),
                data: JSON.stringify({
                    musicsceneId: id,
                    musicsceneName: name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        $scope.musicList = response.data;
                        $('audio').attr('src', $scope.musicList[0].songContext);
                        $scope.music_name = $scope.musicList[0].songName;
                        $scope.music_auther = $scope.musicList[0].songAuthor;
                        // $scope.music_url = $scope.musicList[0].songContext;
                        console.log($scope.music_url);
                    } else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function () {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                })


        };
        $scope.fn_get_sceneMusicList();

        /**
         *操作音乐方法: 播放、暂停、上一首、下一首、收藏
         */
        $scope.music_selected = {
            "background": "#0000002e !important"

        };
        $scope.music_not_selected = {
            "background": "#0000 !important"

        };


        /**
         *音乐播放、暂停
         */
        $scope.music_control = false;
        $scope.fn_music_control = function (value) {
            if (value == 0) {
                $scope.music_control = true;
                $scope.myAuto.play();
            } else if (1) {
                $scope.music_control = false;
                $scope.myAuto.pause();
            } else if (value == true) {
                $scope.music_control = false;
            } else if (value == false) {
                $scope.music_control = true;
            }
        };
        $scope.fn_music_control(0);

        /**
         * 下一首、上一首
         */
        $scope.fn_change_music_url = function (url) {
            // $scope.myAuto.setAttribute('src', url);
            $('audio').attr('src', url);
        };

        /**
         * 切歌 自动切歌
         */
        $scope.music_index = 0;
        $scope.myAuto.addEventListener('ended', function () {
            $scope.fn_change_music($scope.music_index, 'next');
            console.log($scope.music_index);
        }, false);
        $scope.fn_change_music = function (index, direction) {
            // $scope.fn_music_control(1);
            console.log("index: " + index);
            console.log("direction: " + direction);
            if (direction == '') {
                $scope.yes_favorite = false;
                $scope.music_index = index;
                $('audio').attr('src', $scope.musicList[index].songContext);
                $scope.music_name = $scope.musicList[index].songName;
                $scope.music_auther = $scope.musicList[index].songAuthor;
                $scope.fn_music_control(0);
                console.log("src: " + $scope.musicList[index].songContext);
            } else {
                if (direction === "next") {
                    if (index + 1 < $scope.musicList.length) {
                        $scope.yes_favorite = false;
                        $scope.fn_change_music_url($scope.musicList[index + 1].songContext);
                        $scope.music_name = $scope.musicList[index + 1].songName;
                        $scope.music_auther = $scope.musicList[index + 1].songAuthor;
                        $scope.music_index++;
                        $scope.fn_music_control(0);
                    } else {

                        $scope.fn_change_music_url($scope.musicList[$scope.musicList.length-1].songContext);
                        $scope.music_name = $scope.musicList[$scope.musicList.length-1].songName;
                        $scope.music_auther = $scope.musicList[$scope.musicList.length-1].songAuthor;
                        $scope.fn_music_control(0);

                    }
                } else if (direction === "previous") {
                    if (index - 1 > 0) {
                        $scope.yes_favorite = false;
                        $scope.fn_change_music_url($scope.musicList[index - 1].songContext);
                        $scope.music_name = $scope.musicList[index - 1].songName;
                        $scope.music_auther = $scope.musicList[index - 1].songAuthor;
                        $scope.music_index--;
                        $scope.fn_music_control(0);
                    } else {

                        $scope.fn_change_music_url($scope.musicList[0].songContext);
                        $scope.music_name = $scope.musicList[0].songName;
                        $scope.music_auther = $scope.musicList[0].songAuthor;
                        $scope.fn_music_control(0);
                    }
                }
            }
        };

        /**
         * 收藏歌曲
         */
        $scope.yes_favorite = false;
        $scope.fn_musicFavorite = function () {
            if ($rootScope.judge_login()) {
                loading_service.show_loading();
                var userId = localStorage.getItem('userId');
                var userName = localStorage.getItem('userName');
                var songId = $scope.musicList[$scope.music_index].songId;
                $http({
                    method: "post",
                    url: ajax_service.add_musicFavorite(),
                    data: JSON.stringify({
                        userId: userId,
                        userName: userName,
                        songId:songId
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.yes_favorite = true;
                            setTimeout(function () {
                                $rootScope.fn_show_toast(1, "收藏成功");
                            }, 500);
                        } else if(response.error_code == 1){
                            $scope.yes_favorite = true;
                            setTimeout(function () {
                                $rootScope.fn_show_toast(0, "此歌曲已收藏");
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(0, "网络错误");
                            }, 500);
                        }

                    })
                    .error(function () {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    })
            } else {
                $rootScope.openLoginModal();
            }

        };


//     //播放控制
//     var myAudio = $("audio")[0];
//     var lyricArr = [];
// // 播放/暂停控制
//     $(".btn1").click(function(){
//         if (myAudio.paused) {
//             play()
//         } else {
//             pause()
//         }
//     });
// // 频道切换
//     $(".btn2").click(function(){
//         getChannel();
//     });
// // 播放下一曲音乐
//     $(".btn3").click(function(){
//         getmusic();
//
//     });
//     function play(){
//         myAudio.play();
//         $('.btn1').removeClass('m-play').addClass('m-pause');
//     }
//     function pause(){
//         myAudio.pause();
//         $('.btn1').removeClass('m-pause').addClass('m-play');
//     }
// //获取频道信息
//     function getChannel(){
//         $.ajax({
//             url: 'http://api.jirengu.com/fm/getChannels.php',
//             dataType: 'json',
//             Method: 'get',
//             success: function(response){
//                 var channels = response.channels;
//                 var num = Math.floor(Math.random()*channels.length);
//                 var channelname = channels[num].name;
//                 var channelId = channels[num].channel_id;
//                 $('.record').text(channelname);
//                 $('.record').attr('title',channelname);
//                 $('.record').attr('data-id',channelId);
//                 getmusic();
//             }
//         })
//     }
// // 通过ajax获取歌曲
//     function getmusic(){
//         $.ajax({
//             url: 'http://api.jirengu.com/fm/getSong.php',
//             dataType: 'json',
//             Method: 'get',
//             data:{
//                 'channel': $('.record').attr('data-id')
//             },
//             success: function (ret) {
//                 var resource = ret.song[0],
//                     url = resource.url,
//                     bgPic = resource.picture,
//                     sid = resource.sid,//
//                     ssid = resource.ssid,//
//                     title = resource.title,
//                     author = resource.artist;
//                 $('audio').attr('src',url);
//                 $('audio').attr('sid',sid);
//                 $('audio').attr('ssid',ssid);
//                 $('.musicname').text(title);
//                 $('.musicname').attr('title',title)
//                 $('.musicer').text(author);
//                 $('.musicer').attr('title',author)
//                 $(".background").css({
//                     'background':'url('+bgPic+')',
//                     'background-repeat': 'no-repeat',
//                     'background-position': 'center',
//                     'background-size': 'cover',
//                 });
//                 play();//播放
//                 getlyric();//获取歌词
//             }
//         })
//     };
// //获取歌词
//     function getlyric(){
//         var Sid = $('audio').attr('sid');
//         var Ssid = $('audio').attr('ssid');
//         $.post('http://api.jirengu.com/fm/getLyric.php', {ssid: Ssid, sid: Sid})
//             .done(function (lyr){
//                 console.log(lyr);
//                 var lyr = JSON.parse(lyr);;
//                 console.log(lyr);
//                 if (!!lyr.lyric) {
//                     $('.music-lyric .lyric').empty();//清空歌词信息
//                     var line = lyr.lyric.split('\n');//歌词为以排数为界的数组
//                     var timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;//时间的正则
//                     var result = [];
//                     if(line != ""){
//                         for(var i in line){//遍历歌词数组
//                             var time = line[i].match(timeReg);//每组匹配时间 得到时间数组
//                             if(!time)continue;//如果没有 就跳过继续
//                             var value = line[i].replace(timeReg,"");// 纯歌词
//                             for(j in time){//遍历时间数组
//                                 var t = time[j].slice(1, -1).split(':');//分析时间  时间的格式是[00:00.00] 分钟和毫秒是t[0],t[1]
//                                 //把结果做成数组 result[0]是当前时间，result[1]是纯歌词
//                                 var timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]); //计算出一个curTime s为单位
//                                 result.push([timeArr, value]);
//                             }
//                         }
//                     }
//                     //时间排序
//                     result.sort(function (a, b) {
//                         return a[0] - b[0];
//                     });
//                     lyricArr = result;//存到lyricArr里面
//                     renderLyric();//渲染歌词
//                 }
//             }).fail(function(){
//             $('.music-lyric .lyric').html("<li>本歌曲展示没有歌词</li>");
//         })
//     }
//     function renderLyric(){
//         var lyrLi = "";
//         lyricArr.shift();
//         for (var i = 0; i < lyricArr.length; i++) {
//             lyrLi += "<li data-time='"+lyricArr[i][0]+"'>"+lyricArr[i][1]+"</li>";
//         }
//         $('.music-lyric .lyric').append(lyrLi);
//         setInterval(showLyric,100);//怎么展示歌词
//     }
//     function showLyric(){
//         var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
//         for(var i=0;i< lyricArr.length;i++){//遍历歌词下所有的li
//             var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
//             var nexT = $(".lyric li").eq(i+1).attr("data-time");
//             var curTime = myAudio.currentTime;
//             if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
//                 $(".lyric li").removeClass("active");
//                 $(".lyric li").eq(i).addClass("active");
//                 $('.music-lyric .lyric').css('top', -liH*(i-2));
//             }
//         }
//
//     }
// //进度条控制
//     setInterval(present,500)	//每0.5秒计算进度条长度
//     $(".basebar").mousedown(function(ev){  //拖拽进度条控制进度
//         var posX = ev.clientX;
//         var targetLeft = $(this).offset().left;
//         var percentage = (posX - targetLeft)/400*100;
//         myAudio.currentTime = myAudio.duration * percentage/100;
//     });
//     function present(){
//         var length = myAudio.currentTime/myAudio.duration*100;
//         $('.progressbar').width(length+'%');//设置进度条长度
//         //自动下一曲
//         if(myAudio.currentTime == myAudio.duration){
//             getmusic()
//         }
//     }
// //icon
//     $('.m-star').on('click',function(){
//         $(this).toggleClass('stared')
//     })
//     $('.m-heart').on('click',function(){
//         $(this).toggleClass('loved')
//     })
//     $('.m-xunhuan').on('click',function(){
//         $(this).toggleClass('recycleed').toggleClass('colored')
//         if ($(this).hasClass('recycleed')) {
//             $('audio').attr('loop','loop');
//         }
//         if($(this).hasClass('colored')){
//             $('audio').removeAttr('loop','no-loop');
//         }
//     })
//     $('.m-lyric').on('click',function(){
//         $(this).toggleClass('lyriced');
//         if ($(this).hasClass('lyriced')) {
//             $('.background .music-lyric').css({'display':'block'})
//         }else{
//             $('.background .music-lyric').css({'display':'none'})
//         }
//     })
//     $(document).ready(getChannel())
//
// JavaScript Document
//     var currentIndex = 0;
//     var mlist = ["http://qzone.haoduoge.com/music2/Meghan Trainor - All About That Bass.mp3","http://sc1.111ttt.com/2014/1/11/11/4111319506.mp3","http://qzone.haoduoge.com/music2/2014-12-13/1418401256.mp3","http://qzone.haoduoge.com/music2/2014-10-03/1412280314.mp3","http://qzone.haoduoge.com/music2/2014-11-29/1417258107.mp3"];
//     var audio = document.getElementById('audio');
//     var progress = document.getElementById('progress');
//     var playpause = document.getElementById("play-pause");
//     var volume = document.getElementById("volume");
//
//     audio.controls = false;
//
//     audio.addEventListener('timeupdate', function() {
//         updateProgress();
//     }, false);
//
//     function togglePlayPause() {
//         if (audio.paused || audio.ended) {
//             playpause.title = "暂停";
//             playpause.className = "begin";
//             audio.play();
//         } else {
//             playpause.title = "播放";
//             playpause.className = "stop";
//             audio.pause();
//         }
//     }
//
//     function setVolume() {
//         audio.volume = volume.value;
//     }
//
//     function updateProgress() {
//         var percent = Math.floor((100 / audio.duration) * audio.currentTime);
//         progress.value = percent;
//         var canvas = document.getElementById('progress');
//         var context = canvas.getContext('2d');
//         var centerX = canvas.width / 2;
//         var centerY = canvas.height / 2;
//         var radius = 100;
//         var circ = Math.PI * 2;
//         var quart = Math.PI / 2;
//         var cpercent = percent / 100; /* current percent */
//         context.beginPath();
//         context.arc(centerX, centerY, radius, 0, ((circ) * cpercent), false);
//         context.lineWidth = 5;
//         context.strokeStyle = '#38ffb8';
//         context.stroke();
//         if (audio.ended) resetPlayer();
//     }
//
//     function resetPlayer() {
//         audio.currentTime = 0; context.clearRect(0,0,canvas.width,canvas.height);
//         playpause.title = "Play";
//     }
//
// //function sel(){
// //	mlist.src = mlist[currentIndex];
// //	audio.play();
// //	}
//
//     window.onload=function(){
//         slt();
// //	num();
//     }
//
//     function slt(){
//         var tBn=document.getElementsByClassName("lt");
//         var div=document.getElementsByTagName("div");
//
//         var i;
//         for(i=0;i<tBn.length;i++){
//             tBn[i].index=i;//为每个按钮都建立索引
//             tBn[i].onclick=function(){//为每个按钮注册单击事件
//                 for(i=0;i<tBn.length;i++){
//                     tBn[i].setAttribute("class","lt");//js中凡是出现class的地方都用className代替
//                 }
//                 this.setAttribute("class","lt act");//this代表当前发生事件的元素
//                 currentIndex = (this.getAttribute("index"));
//                 audio.src = mlist[currentIndex];
//                 audio.play();
// //			sel();
//             };
//         }
//     };



    }]);