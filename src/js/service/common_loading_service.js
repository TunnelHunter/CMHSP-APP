app.service('loading_service', [  '$ionicLoading', '$ionicPopup', '$timeout', function ( $ionicLoading, $ionicPopup, $timeout) {


    this.show_loading = function () {
        //创建加载动作
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });


        // $scope.show();
        // setTimeout(function () {
        //     $scope.hide();
        // },1000);


        // 定时关闭加载动作
        $timeout(function () {
            $ionicLoading.hide();
            // $scope.fn_get_questions_data();
        }, 500);

    };


    //获取当前时间
     this.get_time = function () {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var week = now.getDay();            //星期

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if (month < 10) {
            clock += "0";
        }

        clock += month + "-";

        if (day < 10) {
            clock += "0";
        }

        clock += day + " ";

        switch (week) {
            case 0:
                clock += "Sun";
                break;
            case 1:
                clock += "Mon";
                break;
            case 2:
                clock += "Tues";
                break;
            case 3:
                clock += "Wed";
                break;
            case 4:
                clock += "Thur";
                break;
            case 5:
                clock += "Fri";
                break;
            case 6:
                clock += "Sat";
                break;
            default:
                break;
        }

        clock += " ";


        if (hh < 10) {
            clock += "0";
        }

        clock += hh + ":";
        if (mm < 10) {
            clock += '0';
        }
        clock += mm;
        console.log(clock);

        return clock;
    };






}]);
