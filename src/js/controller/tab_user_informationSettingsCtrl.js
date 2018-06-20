app.controller('tabUserInformationSettingsCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', 'ajax_service', 'loading_service',
    function ($scope, $rootScope, $ionicModal, $http, ajax_service, loading_service) {

        /*
         从localstorage 中取出 用户头像、名字、性别、地区、个性签名 如果有就取值
         没有就使用 $scope.user_information 中的默认信息
        */

        localStorage.clear();

        //此对象在设置页面显示
        $scope.user_information = {
            'userId': '',
            'userImage': 'imgs/default_userImage.png',
            'userName': '点击设置',
            'userSex': '点击设置',
            'userRegion': '点击设置',
            'userSign': '点击设置'
        };

        //此对象中参数与 各个模态窗口中的输入框 进行绑定
        $scope.arr_userInformation = {
            'arr_userImage': '',
            'arr_userName': '',
            'arr_userSex': '',
            'arr_userRegion': {
                'region': '',
                'city': ''
            },
            'arr_userSign': ''
        };

        if (localStorage.hasOwnProperty('userId')) {
            $scope.user_information.userId = localStorage.getItem('userId');

            if (localStorage.hasOwnProperty('userImage')) {
                $scope.user_information.userImage = localStorage.getItem('userImage');
            }
            if (localStorage.hasOwnProperty('userName')) {
                $scope.user_information.userName = localStorage.getItem('userName');
            }
            if (localStorage.hasOwnProperty('userSex')) {
                $scope.user_information.userSex = localStorage.getItem('userSex');
            }
            if (localStorage.hasOwnProperty('userRegion')) {
                $scope.user_information.userRegion = localStorage.getItem('userRegion');
            }
            if (localStorage.hasOwnProperty('userSign')) {
                $scope.user_information.userSign = localStorage.getItem('userSign');
            }
        }


        //在个性签名的字符串中 插入 ...
        function fn_string_insert(str, insert, index) {
            var start = str.substr(0, index);
            var end = str.substr(index, str.length);
            return start + insert + end;
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
        $scope.fn_set_userInformation = function (index, userId, userImage, userName, userSex, userRegion, userSign) {
            if (index == 2) {
                var sex_num = -1;
                if (userSex == '男生') {
                    sex_num = 0;
                } else if (userSex == '女生') {
                    sex_num = 1;
                }
            }
            loading_service.show_loading();
            $http({
                method: "post",
                url: ajax_service.update_userMessages(),
                // url:"http://localhost:8080/ti/1",
                data: JSON.stringify({
                    userId: userId,
                    Image: userImage,
                    userName: userName,
                    Sex: sex_num,
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

                        if (index == 0) {
                            $scope.user_information.userImage = userImage;
                            localStorage.setItem('userImage', userImage);
                        } else if (index == 1) {
                            $scope.user_information.userName = userName;
                            localStorage.setItem('userName', userName);
                        } else if (index == 2) {
                            $scope.user_information.userSex = userSex;
                            localStorage.setItem('userSex', sex_num);
                        } else if (index == 3) {
                            $scope.user_information.userRegion = userRegion;
                            localStorage.setItem('userRegion', userRegion);
                        } else if (index == 4) {
                            $scope.user_information.userSign = fn_string_insert(userSign, '...', 5);
                            localStorage.setItem('userSign', userSign);
                        }

                    } else {
                        console.log("修改失败")
                    }

                })
                .error(function (response) {
                    console.log("修改失败");
                    console.log("userImage:" + userImage);
                    console.log("userName:" + userName);
                    console.log("userSex:" + userSex);
                    console.log("userRegion:" + userRegion);
                    console.log("userSign:" + userSign);
                    if (index == 0) {
                        $scope.user_information.userImage = userImage;
                        localStorage.setItem('userImage', userImage);
                    } else if (index == 1) {
                        $scope.user_information.userName = userName;
                        localStorage.setItem('userName', userName);
                    } else if (index == 2) {
                        $scope.user_information.userSex = userSex;
                        localStorage.setItem('userSex', sex_num);
                    } else if (index == 3) {
                        $scope.user_information.userRegion = userRegion;
                        localStorage.setItem('userRegion', userRegion);
                    } else if (index == 4) {
                        $scope.user_information.userSign = fn_string_insert(userSign, '...', 5);
                        localStorage.setItem('userSign', userSign);
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
            if ($scope.arr_userInformation.arr_userName == '') {
                return
            }
            $scope.fn_set_userInformation(1, $scope.user_information.userId, '', $scope.arr_userInformation.arr_userName, '', '', '');
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
            }, 1000)
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
            if ($scope.arr_userInformation.arr_userSex == '') {
                return
            }
            $scope.fn_set_userInformation(2, $scope.user_information.userId, '', '', $scope.arr_userInformation.arr_userSex, '', '');
            $scope.close_set_gender_modal();
        };

        $scope.open_set_gender_modal = function () {
            $scope.set_gender_modal.show();
        };
        $scope.close_set_gender_modal = function () {
            $scope.set_gender_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userSex = '';
            }, 1000)
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


        /*
        地区设置 模态窗口  与模态窗口进行绑定的数据必须为对象形式 其他形式 失效
         */
        $scope.arr_china = [
            {
                'province': '北京',
                'city': ['北京市']
            },
            {
                'province': '天津',
                'city': ['东莞市', '广州市', '中山市', '深圳市', '惠州市', '江门市', '珠海市', '汕头市', '佛山市', '湛江市', '河源市', '肇庆市', '潮州市', '清远市', '韶关市', '揭阳市', '阳江市', '云浮市', '茂名市', '梅州市', '汕尾市']
            },
            {
                'province': '山东',
                'city': ['济南市', '青岛市', '临沂市', '济宁市', '菏泽市', '烟台市', '泰安市', '淄博市', '潍坊市', '日照市', '威海市', '滨州市', '东营市', '聊城市', '德州市', '莱芜市', '枣庄市']
            },
            {
                'province': '山西',
                'city': ['太原市', '大同市', '运城市', '长治市', '晋城市', '忻州市', '临汾市', '吕梁市', '晋中市', '阳泉市', '朔州市']
            },
            {
                'province': '黑龙江',
                'city': ['齐齐哈尔市', '哈尔滨市', '大庆市', '佳木斯市', '双鸭山市', '牡丹江市', '鸡西市', '黑河市', '绥化市', '鹤岗市', '伊春市', '大兴安岭地区', '七台河市']
            },
            {
                'province': '吉林',
                'city': ['吉林市', '长春市', '白山市', '白城市', '延边州', '松原市', '辽源市', '通化市', '四平市']
            },
            {
                'province': '辽宁',
                'city': ['连市', '沈阳市', '丹东市', '辽阳市', '葫芦岛市', '锦州市', '朝阳市', '营口市', '鞍山市', '抚顺市', '阜新市', '本溪市', '盘锦市', '铁岭市']
            },
            {
                'province': '河南',
                'city': ['郑州市', '南阳市', '新乡市', '安阳市', '洛阳市', '信阳市', '平顶山市', '周口市', '商丘市', '开封市', '焦作市', '驻马店市', '濮阳市', '三门峡市', '漯河市', '许昌市', '鹤壁市', '济源市']
            },
            {
                'province': '河北',
                'city': ['石家庄市', '唐山市', '保定市', '邯郸市', '邢台市', '河北区', '沧州市', '秦皇岛市', '张家口市', '衡水市', '廊坊市', '承德市']
            },
            {
                'province': '浙江',
                'city': ['温州市', '宁波市', '杭州市', '台州市', '嘉兴市', '金华市', '湖州市', '绍兴市', '舟山市', '丽水市', '衢州市']
            },
            {
                'province': '江苏',
                'city': ['苏州市', '徐州市', '盐城市', '无锡市', '南京市', '南通市', '连云港市', '常州市', '扬州市', '镇江市', '淮安市', '泰州市', '宿迁市']
            },
            {
                'province': '上海',
                'city': ['上海市']
            },
            {
                'province': '安徽',
                'city': ['芜湖市', '合肥市', '六安市', '宿州市', '阜阳市', '安庆市', '马鞍山市', '蚌埠市', '淮北市', '淮南市', '宣城市', '黄山市', '铜陵市', '亳州市', '池州市', '巢湖市', '滁州市']
            },
            {
                'province': '江西',
                'city': ['南昌市', '赣州市', '上饶市', '吉安市', '九江市', '新余市', '抚州市', '宜春市', '景德镇市', '萍乡市', '鹰潭市']
            },
            {
                'province': '湖南',
                'city': ['长沙市', '邵阳市', '常德市', '衡阳市', '株洲市', '湘潭市', '永州市', '岳阳市', '怀化市', '郴州市', '娄底市', '益阳市', '张家界市', '湘西州']
            },
            {
                'province': '湖北',
                'city': ['武汉市', '宜昌市', '襄樊市', '荆州市', '恩施州', '孝感市', '黄冈市', '十堰市', '咸宁市', '黄石市', '仙桃市', '随州市', '天门市', '荆门市', '潜江市', '鄂州市', '神农架林区']
            },
            {
                'province': '新疆',
                'city': ['乌鲁木齐市', '伊犁州', '昌吉州', '石河子市', '哈密地区', '阿克苏地区', '巴音郭楞州', '喀什地区', '塔城地区', '克拉玛依市', '和田地区', '阿勒泰州', '吐鲁番地区', '阿拉尔市', '博尔塔拉州', '五家渠市', '克孜勒苏州', '图木舒克市']
            },
            {
                'province': '云南',
                'city': ['昆明市', '红河州', '大理州', '文山州', '德宏州', '曲靖市', '昭通市', '楚雄州', '保山市', '玉溪市', '丽江地区', '临沧地区', '思茅地区', '西双版纳州', '怒江州', '迪庆州']
            },
            {
                'province': '贵州',
                'city': ['贵阳市', '黔东南州', '黔南州', '遵义市', '黔西南州', '毕节地区', '铜仁地区', '安顺市', '六盘水市']
            },
            {
                'province': '福建',
                'city': ['漳州市', '泉州市', '厦门市', '福州市', '莆田市', '宁德市', '三明市', '南平市', '龙岩市']
            },
            {
                'province': '台湾',
                'city': ['台北市', '高雄市', '台中市', '新竹市', '基隆市', '台南市', '嘉义市']
            },
            {
                'province': '宁夏',
                'city': ['银川市', '吴忠市', '中卫市', '石嘴山市', '固原市']
            },
            {
                'province': '西藏',
                'city': ['拉萨市', '山南地区', '林芝地区', '日喀则地区', '阿里地区', '昌都地区', '那曲地区']
            },
            {
                'province': '四川',
                'city': ['成都市', '绵阳市', '广元市', '达州市', '南充市', '德阳市', '广安市', '阿坝州', '巴中市', '遂宁市', '内江市', '凉山州', '攀枝花市', '乐山市', '自贡市', '泸州市', '雅安市', '宜宾市', '资阳市', '眉山市', '甘孜州']
            },
            {
                'province': '重庆',
                'city': ['江北区', '渝北区', '沙坪坝区', '九龙坡区', '万州区', '永川市', '南岸区', '酉阳县', '北碚区', '涪陵区', '秀山县', '巴南区', '渝中区', '石柱县', '忠县', '合川市', '大渡口区', '开县', '长寿区', '荣昌县', '云阳县', '梁平县', '潼南县', '江津市', '彭水县', '璧山县', '綦江县', '大足县', '黔江区', '巫溪县', '巫山县', '垫江县', '丰都县', '武隆县', '万盛区', '铜梁县', '南川市', '奉节县', '双桥区', '城口县']
            },
            {
                'province': '内蒙古',
                'city': ['赤峰市', '包头市', '通辽市', '呼和浩特市', '乌海市', '鄂尔多斯市', '呼伦贝尔市', '兴安盟　 巴彦淖尔盟　 乌兰察布盟　 锡林郭勒盟　 阿拉善盟']
            },
            {
                'province': '广西',
                'city': ['贵港市', '玉林市', '北海市', '南宁市', '柳州市', '桂林市', '梧州市', '钦州市', '来宾市', '河池市', '百色市', '贺州市', '崇左市', '防城港市']
            },
            {
                'province': '海南',
                'city': ['三亚市', '海口市', '琼海市', '文昌市', '东方市', '昌江县', '陵水县', '乐东县', '五指山市', '保亭县', '澄迈县', '万宁市', '儋州市', '临高县', '白沙县', '定安县', '琼中县', '屯昌县']
            },
            {
                'province': '青海',
                'city': ['西宁市', '海西州', '海东地区', '海北州', '果洛州', '玉树州', '黄南藏族自治州']
            },
            {
                'province': '甘肃',
                'city': ['兰州市', '天水市', '庆阳市', '武威市', '酒泉市', '张掖市', '陇南地区', '白银市', '定西地区', '平凉市', '嘉峪关市', '临夏回族自治州', '金昌市', '甘南州']
            },
            {
                'province': '陕西',
                'city': ['西安市', '咸阳市', '宝鸡市', '汉中市', '渭南市', '安康市', '榆林市', '商洛市', '延安市', '铜川市']
            },
            {
                'province': '广东',
                'city': ['东莞市', '广州市', '中山市', '深圳市', '惠州市', '江门市', '珠海市', '汕头市', '佛山市', '湛江市', '河源市', '肇庆市', '潮州市', '清远市', '韶关市', '揭阳市', '阳江市', '云浮市', '茂名市', '梅州市', '汕尾市']
            },
            {
                'province': '香港',
                'city': ['香港']
            },
            {
                'province': '澳门',
                'city': ['澳门']
            }
        ];

        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setRegion_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_region_modal = modal;
        });

        $scope.$watch('$scope.arr_userInformation.arr_userRegion.region', function (newVal, oldVal) {
            if (newVal != oldVal) {
                $scope.arr_userInformation.arr_userRegion.city = $scope.arr_userInformation.arr_userRegion.region.city;
            }
        });

        $scope.fn_set_region = function () {

            var arr_concat_regin = '';

            if ($scope.arr_userInformation.arr_userRegion.region == '' || $scope.arr_userInformation.arr_userRegion.city == '') {
                return
            }

            arr_concat_regin += ($scope.arr_userInformation.arr_userRegion.region.province + ' ' + $scope.arr_userInformation.arr_userRegion.city);

            console.log(arr_concat_regin);
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            $scope.fn_set_userInformation(3, $scope.user_information.userId, '', '', '', arr_concat_regin, '');
            $scope.close_set_region_modal();
        };

        $scope.open_set_region_modal = function () {
            $scope.set_region_modal.show();
        };
        $scope.close_set_region_modal = function () {
            $scope.set_region_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userRegion.region = '';
                $scope.arr_userInformation.arr_userRegion.city = '';
            }, 1000);
        };


        /*
        个性签名设置 模态窗口
         */
        $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setSignature_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.set_signature_modal = modal;
        });

        $scope.fn_set_gender = function () {
            //参数列表: 类型 , 头像 , 名字 , 性别 , 地域 , 个性签名
            if ($scope.arr_userInformation.arr_userSign == '') {
                return
            }
            $scope.fn_set_userInformation(4, $scope.user_information.userId, '', '', '', '', $scope.arr_userInformation.arr_userSign);
            $scope.close_set_signature_modal();
        };

        $scope.open_set_signature_modal = function () {
            $scope.set_signature_modal.show();
        };
        $scope.close_set_signature_modal = function () {
            $scope.set_signature_modal.hide();
            setTimeout(function () {
                $scope.arr_userInformation.arr_userSign = '';
            }, 1000);
        };


    }]);