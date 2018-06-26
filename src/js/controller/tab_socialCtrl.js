app.controller('tabSocialCtrl', ['$scope', '$rootScope', '$state', '$http', 'ajax_service', '$stateParams', '$ionicModal', '$timeout', 'loading_service',
    function ($scope, $rootScope, $state, $http, ajax_service, $stateParams, $ionicModal, $timeout, loading_service) {
        // $scope.items = [
        //     {
        //         "socialId": "1",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01cfc15b17cbaba801212d57deb7ca.jpg",
        //         "textData": "UXPin 可能是目前对于设计团队来说最理想的快速原型工具，尤其是当产品的 UX 设计和研发高度依赖快速反馈循环机制的时候。UXPin 可以让设计团队在向开发交付原型之前，充分地进行设计、共享和测试。 \n \n 开发人员所需要的数据，实际上在每个项目设计完成之时，就会自动生成。所以，在将设计交付给开发人员之前，甚至可以使用检测工具，验证一下产品的部署是否和设计元素相互匹配。 \n \n" +
        //         "UXPin 还提供一个完整的设计系统解决方案，帮助你保持整个产品的 UI 元素的一致性。而每个产品的 UI 组件都可以使用一段代码记录下来，因此可以更加轻松快速的扩展产品的功能。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "5",
        //                 "userName": "小妹",
        //                 "userImg": "http://www.runoob.com/try/demo_source/winston.jpg",
        //                 "commentData": "嘻嘻嘻，好喜欢你哟!"
        //             },
        //             {
        //                 "userId": "6",
        //                 "userName": "小机",
        //                 "userImg": "http://www.runoob.com/try/demo_source/tully.jpg",
        //                 "commentData": "美的一逼！！！"
        //             },
        //             {
        //                 "userId": "7",
        //                 "userName": "小里",
        //                 "userImg": "http://www.runoob.com/try/demo_source/slimer.jpg",
        //                 "commentData": "ojbk！！！"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg",
        //         "textData": "有许多 UX 设计师会使用 PowerPoint 来构建交互式原型，有了 PowerMockup 之后，你再也不需要寻找其他的工具来辅助你的工作了，它就可以帮你创建高效可共享的交互式原型。\n" +
        //         "\n" +
        //         "在构建原型的时候，只需要从 PowerMockup 不断增长的资源库找到对应的形状或者设计元素，拖拽到 PowerPoint 当中，然后进行设计即可。为了实现互动，你所需要调用的也无非是 PowerPoint 当中的幻灯片和动画功能，很简单。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg",
        //         "textData": "UI/UX 设计当然不仅仅是线框图和视觉稿，它是动态的，系统化的，而这也是 Creately 这款工具的价值所在。这款图标工具适合生成工作流程，支持不同的图表类型，包括流程图、思维导图、UML 图标、线框图等。它所提供的图表功能和协同工作的功能，可以帮助设计师完成一半以上的工作。\n" +
        //         "\n" +
        //         "使用 Creately 来创建图表，可以轻松创建出足够漂亮的图表，其中配备的1000多个专业的设计图表模板，可以快速地完成各式各样的 UX 设计项目。",
        //         "comments": []
        //
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/0140465b17cbaba801212d5774dcb3.jpg",
        //         "textData": "现如今，视觉稿（Mockup）和原型（Prototype）是网页和 APP 设计过程中最常用的方法。两种方式都很有效，不过也都可能会在时间和花销上对整个项目产生压力，影响团队和项目的整体推进，尤其是在时间和精力都非常有限而项目又非常复杂的情况下。\n" +
        //         "\n" +
        //         "Mason 提供了一个更好的解决方案，它让你无需设计线框图、原型和视觉稿，而直接拿现成的组件来编辑和设计，并且确保最终输出的产品既具备功能，也是像素完美的，最后通过 Mason 的平台进行部署，甚至你都不需要有代码编写的经验。\n" +
        //         "\n" +
        //         "Mason 的设计方法看起来很激进，但是实际上非常的易用。无论是调整还是维护，Mason 都能确保控件和元素都很容易处理。在 Mason 中修改、发布，然后就能正常使用。无需亲手编写代码，诸如注册、登录等各种常见的功能都能够正常输出使用。\n" +
        //         "\n" +
        //         "这款工具并不会限制你将网站投放到特定的平台或者托管环境下，你可以在你最熟悉的服务器或者服务商那边部署。这可以大幅度节省管理费和时间，并且你会发现团队协作更加高效了。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "5",
        //                 "userName": "小妹",
        //                 "userImg": "http://www.runoob.com/try/demo_source/winston.jpg",
        //                 "commentData": "嘻嘻嘻，好喜欢你哟!"
        //             },
        //             {
        //                 "userId": "6",
        //                 "userName": "小机",
        //                 "userImg": "http://www.runoob.com/try/demo_source/tully.jpg",
        //                 "commentData": "美的一逼！！！"
        //             },
        //             {
        //                 "userId": "7",
        //                 "userName": "小里",
        //                 "userImg": "http://www.runoob.com/try/demo_source/slimer.jpg",
        //                 "commentData": "ojbk！！！"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/011bb95b17cba8a801202e60e2d131.jpg",
        //         "textData": "设计师讲述故事最有效的办法之一，是将故事中的节点连在一起，将用户历程线性地呈现出来。这样的方式会让访客更好的理解他们所看到的内容，同时能够更加专注于细节的呈现，并且构建有效的反馈机制。\n" +
        //         "\n" +
        //         "作为世界上第一个为设计师量身定制的用户流程图工具，Overflow 可以帮助设计师更好地讲述故事。它为设计师提供了一种全新的方式来更好的呈现作品，讲述故事，以交互式的流程同用户进行沟通，吸引用户的注意力。\n" +
        //         "\n" +
        //         "Overflow 是一款跨平台的工具，可以与目前最流行的设计工具无缝地集成起来，允许设计师在同一个平台上完成设计、展示、共享和打印他们的用户流程。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             }
        //         ]
        //     }
        // ];
        // $scope.items_test = [
        //     {
        //         "socialId": "1",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01cfc15b17cbaba801212d57deb7ca.jpg",
        //         "textData": "UXPin 可能是目前对于设计团队来说最理想的快速原型工具，尤其是当产品的 UX 设计和研发高度依赖快速反馈循环机制的时候。UXPin 可以让设计团队在向开发交付原型之前，充分地进行设计、共享和测试。 \n \n 开发人员所需要的数据，实际上在每个项目设计完成之时，就会自动生成。所以，在将设计交付给开发人员之前，甚至可以使用检测工具，验证一下产品的部署是否和设计元素相互匹配。 \n \n" +
        //         "UXPin 还提供一个完整的设计系统解决方案，帮助你保持整个产品的 UI 元素的一致性。而每个产品的 UI 组件都可以使用一段代码记录下来，因此可以更加轻松快速的扩展产品的功能。",
        //         "comments": [
        //             {
        //                 "userId": "2",
        //                 "userName": "小白",
        //                 "userImg": "http://www.runoob.com/try/demo_source/venkman.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             },
        //             {
        //                 "userId": "3",
        //                 "userName": "小希",
        //                 "userImg": "http://www.runoob.com/try/demo_source/spengler.jpg",
        //                 "commentData": "这个真的特别好用！我说真的！"
        //             },
        //             {
        //                 "userId": "4",
        //                 "userName": "小哈",
        //                 "userImg": "http://www.runoob.com/try/demo_source/stantz.jpg",
        //                 "commentData": "我觉得说的很对，赞同!"
        //             }
        //         ]
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/01a2645b17cbaca801212d578832ed.jpg",
        //         "textData": "有许多 UX 设计师会使用 PowerPoint 来构建交互式原型，有了 PowerMockup 之后，你再也不需要寻找其他的工具来辅助你的工作了，它就可以帮你创建高效可共享的交互式原型。\n" +
        //         "\n" +
        //         "在构建原型的时候，只需要从 PowerMockup 不断增长的资源库找到对应的形状或者设计元素，拖拽到 PowerPoint 当中，然后进行设计即可。为了实现互动，你所需要调用的也无非是 PowerPoint 当中的幻灯片和动画功能，很简单。",
        //         "comments": []
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/010c3d5b17cba9a801202e60fa15a6.jpg",
        //         "textData": "UI/UX 设计当然不仅仅是线框图和视觉稿，它是动态的，系统化的，而这也是 Creately 这款工具的价值所在。这款图标工具适合生成工作流程，支持不同的图表类型，包括流程图、思维导图、UML 图标、线框图等。它所提供的图表功能和协同工作的功能，可以帮助设计师完成一半以上的工作。\n" +
        //         "\n" +
        //         "使用 Creately 来创建图表，可以轻松创建出足够漂亮的图表，其中配备的1000多个专业的设计图表模板，可以快速地完成各式各样的 UX 设计项目。",
        //         "comments": []
        //
        //     },
        //     {
        //         "socialId": "2",
        //         "userId": "1",
        //         "userName": "小薛",
        //         "userImg": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        //         "socialAddtime": "2018-5-29",
        //         "imgData": "https://img.zcool.cn/community/0140465b17cbaba801212d5774dcb3.jpg",
        //         "textData": "现如今，视觉稿（Mockup）和原型（Prototype）是网页和 APP 设计过程中最常用的方法。两种方式都很有效，不过也都可能会在时间和花销上对整个项目产生压力，影响团队和项目的整体推进，尤其是在时间和精力都非常有限而项目又非常复杂的情况下。\n" +
        //         "\n" +
        //         "Mason 提供了一个更好的解决方案，它让你无需设计线框图、原型和视觉稿，而直接拿现成的组件来编辑和设计，并且确保最终输出的产品既具备功能，也是像素完美的，最后通过 Mason 的平台进行部署，甚至你都不需要有代码编写的经验。\n" +
        //         "\n" +
        //         "Mason 的设计方法看起来很激进，但是实际上非常的易用。无论是调整还是维护，Mason 都能确保控件和元素都很容易处理。在 Mason 中修改、发布，然后就能正常使用。无需亲手编写代码，诸如注册、登录等各种常见的功能都能够正常输出使用。\n" +
        //         "\n" +
        //         "这款工具并不会限制你将网站投放到特定的平台或者托管环境下，你可以在你最熟悉的服务器或者服务商那边部署。这可以大幅度节省管理费和时间，并且你会发现团队协作更加高效了。",
        //         "comments": []
        //     }
        // ];

        $scope.items = [];
        $scope.currentPage = 1;//定义下拉加载分页的初始值

        $scope.$on('$ionicView.loaded', function () {
            $scope.doRefreshDown();
        });
        $scope.noMorePage = false;
        /*
        下拉刷新
         */
        $scope.doRefreshDown = function () {
            // $scope.currentPage = 1;
            // $scope.noMorePage = false;
            $http({
                method: "get",
                url: ajax_service.get_socialFreshDown(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.error_code == 0) {
                        var newItems = response.data;
                        if ($scope.items.length == 0) {
                            for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                                $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                            }
                        } else {
                            var a = $scope.items[0].socialId;
                            var b = newItems[0].socialId;
                            if (a === b) {
                                setTimeout(function () {
                                    $rootScope.fn_show_toast(1, "暂无最新动态");
                                }, 500);
                                return;
                            } else {
                                $scope.items = [];
                                for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                                    $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                                }
                                setTimeout(function () {
                                    $rootScope.fn_show_toast(1, "最新动态加载完成");
                                }, 500);
                            }
                        }

                    }else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }


                })
                .error(function (response) {
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });

        };

        /*
        上拉加载
         */
        var get_last_item = function () {
            var last_item = $scope.items[$scope.items.length - 1];
            return last_item.socialId;
        };
        $scope.doFreshUp = function () {
            // $scope.currentPage += 1;//每当滚动到底部，页码累计加1
            $http({
                method: "post",
                url: ajax_service.get_socialFreshUp(),
                // data: JSON.stringify({socialId:$scope.items[$scope.items.length - 1].socialId}),
                data: JSON.stringify({socialId:get_last_item()}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if(response.error_code == 0){
                        var newItems = response.data;

                        if (newItems.length < 5) {//当json的数量小于5（已经确定了一页为5条数据），说明页面到底了
                            $scope.noMorePage = true;//禁止滚动触发时间
                        }
                        for (var i = 0; i < newItems.length; i++) {//newItems.length，当前json的数量
                            $scope.items.push(newItems[i]);//一个一个取出来，推送到原来的items里
                        }
                    }else {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误");
                        }, 500);
                    }

                })
                .error(function () {
                    $scope.noMorePage = true;
                    setTimeout(function () {
                        $rootScope.fn_show_toast(0, "网络错误");
                    }, 500);
                })
                .finally(function () {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });


        };

        /*
        向socialDetail页面传值
         */
        $scope.fn_socialDetail = function (item) {
            // console.log(item);
            // console.log(angular.toJson(item));
            $state.go('tabs.socialDetail', {'item': angular.toJson(item)})
        };


        $scope.new_social = {
            "imageData": "",
            "textData": ""
        };

        //发布动态 模态窗口
        $ionicModal.fromTemplateUrl('html/tab_social_add_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.social_add_modal = modal;
        });
        $scope.fn_social_add = function () {
            if($rootScope.judge_login()){
                loading_service.show_loading();
                var new_social = {
                    "userId": 0,
                    "userName": "",
                    "imageData": "",
                    "textData": "",
                    "socialAddTime": "",
                };

                new_social.userId = window.localStorage.getItem("userId");
                new_social.userName = window.localStorage.getItem("userName");
                new_social.imageData = "https://img.zcool.cn/community/018cdc5b192e73a8012034f72fd3de.jpeg";
                new_social.textData = $scope.new_social.textData;
                new_social.socialAddTime = loading_service.get_time();


                $http({
                    method: "post",
                    url: ajax_service.add_social(),
                    data: JSON.stringify(new_social),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if(response.error_code == 0){
                            var aa = {
                                "userId": "",
                                "userName": "",
                                "userImg": "",
                                "socialAddTime": "",
                                "imageData": "https://img.zcool.cn/community/018cdc5b192e73a8012034f72fd3de.jpeg",
                                "textData": "",
                                "comments": []
                            };

                            aa.userId = new_social.userId;
                            aa.userName = new_social.userName;
                            aa.imageData = new_social.imageData;
                            aa.textData = new_social.textData;
                            aa.socialAddTime = new_social.socialAddTime;
                            setTimeout(function () {
                                $scope.items.unshift(aa);
                            }, 500);
                            setTimeout(function () {
                                $scope.close_social_add_modal();
                            }, 1000);
                        }else {
                            setTimeout(function () {
                                $rootScope.fn_show_toast(0, "网络错误，发布动态失败");
                            },500);
                        }

                    })
                    .error(function (response) {
                        setTimeout(function () {
                            $rootScope.fn_show_toast(0, "网络错误，发布动态失败");
                        },500);

                    });

            }else {
                $rootScope.openLoginModal();
            }

        };

        //打开发布动态模态窗口，如果用户已登陆则显示发布页面，没登陆则弹出登陆界面
        $scope.open_social_add_modal = function () {

            if($rootScope.judge_login()){
                $scope.social_add_modal.show();
            }else {
                $rootScope.openLoginModal();
            }

        };
        $scope.close_social_add_modal = function () {
            $scope.new_social.textData = '';
            $scope.social_add_modal.hide();
        };
    }]);
