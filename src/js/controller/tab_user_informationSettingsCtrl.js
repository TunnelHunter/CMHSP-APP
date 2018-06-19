app.controller('tabUserInformationSettingsCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', 'ajax_service','loading_service',
    function ($scope, $rootScope, $ionicModal, $http, ajax_service,loading_service) {

        /*
         从localstorage 中取出 用户头像、名字、性别、地区、个性签名 如果有就取值
         没有就使用 $scope.user_information 中的默认信息
        */

        localStorage.clear();

        //此对象在设置页面显示
        $scope.user_information = {
            'userImage': 'imgs/default_userImage.png',
            'userName': '点击设置',
            'userSex': '点击设置',
            'userRegion': '点击设置',
            'userSign': '点击设置'
        };

        //此对象中参数与 各个模态窗口中的输入框 进行绑定
        $scope.arr_userInformation = {
            'arr_userImage':'',
            'arr_userName':'',
            'arr_userSex':'',
            'arr_userRegion':'',
            'arr_userSign':''
        };


        if (localStorage.hasOwnProperty('userImage')) {
            $scope.user_information.userImage = localStorage.getItem('userImage');
        } else if (localStorage.hasOwnProperty('userName')) {
            $scope.user_information.userName = localStorage.getItem('userName');
        } else if (localStorage.hasOwnProperty('userSex')) {
            $scope.user_information.userSex = localStorage.getItem('userSex');
        } else if (localStorage.hasOwnProperty('userRegion')) {
            $scope.user_information.userRegion = localStorage.getItem('userRegion');
        } else if (localStorage.hasOwnProperty('userSign')) {
            $scope.user_information.userSign = localStorage.getItem('userSign');
        }


        /*
          更新用户信息 方法
          参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
          index : 根据输入的数值来判断传入的参数是什么
          userImage : 头像
          userName : 名字
          userSex : 性别
          userRegion : 地域
          userSign : 个性签名
         */
        $scope.fn_set_userInformation = function (index,userImage, userName, userSex, userRegion, userSign) {
            loading_service.show_loading();
            $http({
                method: "post",
                url: ajax_service.update_userMessages(),
                // url:"http://localhost:8080/ti/1",
                data: JSON.stringify({
                    Image: userImage,
                    userName: userName,
                    Sex: userSex,
                    Region: userRegion,
                    Sign: userSign
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        console.log("修改成功");

                        if(index == 0){
                            $scope.user_information.userImage = userImage;
                            localStorage.setItem('userImage',userImage);
                        }else if(index == 1){
                            $scope.user_information.userName = userName;
                            localStorage.setItem('userName',userName);
                        }else if(index == 2){
                            $scope.user_information.userSex = userSex;
                            localStorage.setItem('userSex',userSex);
                        }else if(index == 3){
                            $scope.user_information.userRegion = userRegion;
                            localStorage.setItem('userRegion',userRegion);
                        }else if(index == 4){
                            $scope.user_information.userSign = userSign;
                            localStorage.setItem('userSign',userSign);
                        }

                    }else {
                        console.log("修改失败")
                    }

                })
                .error(function (response) {
                    console.log("修改失败");
                    console.log("userImage:"+ userImage);
                    console.log("userName:"+ userName);
                    console.log("userSex:"+ userSex);
                    console.log("userRegion:"+ userRegion);
                    console.log("userSign:"+ userSign);
                    if(index == 0){
                        $scope.user_information.userImage = userImage;
                        localStorage.setItem('userImage',userImage);
                    }else if(index == 1){
                        $scope.user_information.userName = userName;
                        localStorage.setItem('userName',userName);
                    }else if(index == 2){
                        $scope.user_information.userSex = userSex;
                        localStorage.setItem('userSex',userSex);
                    }else if(index == 3){
                        $scope.user_information.userRegion = userRegion;
                        localStorage.setItem('userRegion',userRegion);
                    }else if(index == 4){
                        $scope.user_information.userSign = userSign;
                        localStorage.setItem('userSign',userSign);
                    }
                });
        };


        /*
        姓名设置 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setName_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_name_modal = modal;
        });

        //在模态窗口tab_user_information_settings_setName_modal.html 中绑定点击事件
        $scope.fn_set_name = function () {
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            $scope.fn_set_userInformation(1,'',$scope.arr_userInformation.arr_userName,'','','');
            $scope.close_set_name_modal();
        };

        $scope.open_set_name_modal = function () {
            $scope.set_name_modal.show();
        };
        //隐藏模态窗口时执行清空动作
        $scope.close_set_name_modal = function () {
            $scope.set_name_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userName = '';
            },1000)
        };



        /*
        性别设置 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setGender_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_gender_modal = modal;
        });

        $scope.fn_set_gender = function () {
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名

            var sex_number = -1;
            if($scope.arr_userInformation.arr_userSex){

            }

            $scope.fn_set_userInformation(2,'','',$scope.arr_userInformation.arr_userSex,'','');
            $scope.close_set_gender_modal();
        };

        $scope.open_set_gender_modal = function () {
            $scope.set_gender_modal.show();
        };
        $scope.close_set_gender_modal = function () {
            $scope.set_gender_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userSex = '';
            },1000)
        };

        // $scope.clientSideList = [
        //     {text: "Backbone", value: "bb"},
        //     {text: "Angular", value: "ng"},
        //     {text: "Ember", value: "em"},
        //     {text: "Knockout", value: "ko"}
        // ];
        //
        // $scope.serverSideList = [
        //     {text: "Go", value: "go"},
        //     {text: "Python", value: "py"},
        //     {text: "Ruby", value: "rb"},
        //     {text: "Java", value: "jv"}
        // ];
        //
        // $scope.data = {
        //     clientSide: 'ng'
        // };
        // $scope.serverSideChange = function (item) {
        //     console.log("Selected Serverside, text:", item.text, "value:", item.value);
        // };






        //地区设置 模态窗口
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setRegion_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_region_modal = modal;
        });

        $scope.createContact = function (u) {
            $scope.contacts.push({name: u.firstName + ' ' + u.lastName});
            $scope.set_region_modal.hide();
        };

        $scope.open_set_region_modal = function () {
            $scope.set_region_modal.show();
        };
        $scope.close_set_region_modal = function () {
            $scope.set_region_modal.hide();
        };
        //Cleanup the set_name_modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.set_region_modal.remove();
        });
        // Execute action on hide set_name_modal
        $scope.$on('set_region_modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove set_name_modal
        $scope.$on('set_region_modal.removed', function () {
            // Execute action
        });


        //个性签名设置 模态窗口
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setSignature_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_signature_modal = modal;
        });

        $scope.createContact = function (u) {
            $scope.contacts.push({name: u.firstName + ' ' + u.lastName});
            $scope.set_signature_modal.hide();
        };

        $scope.open_set_signature_modal = function () {
            $scope.set_signature_modal.show();
        };
        $scope.close_set_signature_modal = function () {
            $scope.set_signature_modal.hide();
        };
        //Cleanup the set_name_modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.set_signature_modal.remove();
        });
        // Execute action on hide set_name_modal
        $scope.$on('set_signature_modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove set_name_modal
        $scope.$on('set_signature_modal.removed', function () {
            // Execute action
        });


    }]);