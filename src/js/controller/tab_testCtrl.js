app.controller('tabTestCtrl', ['$scope', '$rootScope','$state', '$ionicViewSwitcher','$http', 'ajax_service', 'particle_service',
    function ($scope, $rootScope,$state, $ionicViewSwitcher,$http, ajax_service, particle_service) {

        /*
        $ionicView.loaded   视图已经被加载了，这个事件只发生一次，视图被创建并且被添加到DOM中，当视图跳出后并被缓存的话，再次访问这个视图这个事件将不会被激活
        $ionicView.enter 　　进入视图并被激活。这事件被激活来判断这个视图是第一个加载还是被缓存了的
        $ionicView.leave　　离开这个视图并且不是活动页面。调用这个事件判断应该被缓存还是摧毁
        $ionicView.beforeEnter 　　视图是即将进入并成为活动视图
        $ionicView.beforeLeave　　视图将被关闭并且不是活动页面
        $ionicView.afterEnter　　进入视图并是当前的活动页面
        $ionicView.afterLeave　　已经离开视图，并成为非激活页面
        $ionicView.unloaded　　视图的Controller已经被摧毁并且他的页面元素也从Dom中移除
         */

        $scope.$on('$ionicView.loaded', function () {
            $rootScope.judge_firstLoading();
            $scope.fn_show_particle();
            $scope.fn_get_examinations_list();
        });
        /*
        绘制粒子背景
         */
        //配置
        $scope.fn_show_particle = function () {
            //配置
            var config = {
                vx: 5,	//小球x轴速度,正为右，负为左
                vy: 5,	//小球y轴速度
                height: 1,	//小球高宽，其实为正方形，所以不宜太大
                width: 1,
                count: 80,		//点个数
                color: "255, 255, 255", 	//点颜色
                stroke: "130,255,255", 		//线条颜色
                dist: 5500, 	//点吸附距离
                e_dist: 0, 	//鼠标吸附加速距离
                max_conn: 5 	//点到点最大连接数
            };

            //调用
            particle_service.CanvasParticle(config);
        };

        //获取测试题库
        $scope.fn_get_examinations_list = function () {
            $http({
                method: "GET",
                url: ajax_service.get_examinationsList(),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + $scope.login_token
                }
            })
                .success(function (response) {

                    if (response.error_code == 0) {
                        $rootScope.examinations_list = response.data;
                        $rootScope.examination_default = $rootScope.examinations_list[0];
                        console.log($rootScope.examinations_list);
                        console.log($rootScope.examination_default);
                    }

                })
                .error(function (response) {

                });
        };


        /*
        事件绑定开始测试按钮，先判断用户是否登陆，若登陆则跳转到答题页面，否则弹出用户登陆模态窗口
         */
        $scope.fn_start_answer = function () {
            console.log($rootScope.judge_login());
          if($rootScope.judge_login()){
              $state.go('tabs.startAnswer');
              $ionicViewSwitcher.nextDirection("forward");
          }else {
              $rootScope.openLoginModal();
          }
        };




        // $rootScope.examinations_list = [
        //     {
        //         "examinationId": "1",
        //         "examinationName": "抑郁症测试题",
        //         "questionNumber": "21",
        //         "questionsMessage": [{
        //             "questionId": "1",
        //             "questionName": "人生难免起起落落，快乐悲伤都是生活的调味剂。亲爱的最近是否有点闷闷不乐，情绪低沉呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.有些不开心",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.总会伤心",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.悲伤至极",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "2",
        //             "questionName": "思考自己的未来是每个人都会做的事，亲爱的对自己的未来是怎样看的呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.充满信心",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.信心不足",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.没想法",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.不如现在",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "3",
        //             "questionName": "每个人都不是全能的，所谓“胜败乃兵家常事”，亲爱的是怎样看待失败的呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没关系的",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.我的失败比别人要多",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.回首过去，都是失败",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.总是失败，没有出息",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "4",
        //             "questionName": "生活就是一件接着一件大大小小的事，亲爱的对过去的事有没有不满意的呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.非常满意",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.有些事不满意",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.都不满意",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.对待事物已经厌倦",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "5",
        //             "questionName": "人之初，性本善”，每个人的内心都住着一个天使哦~亲爱的你觉得呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没错，我就是小天使",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.偶尔有罪恶感",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.经常觉得自己很坏，有罪恶感",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.一直觉得自己有罪，而且是个坏人",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "6",
        //             "questionName": "“人非圣贤，孰能无过”，做错了事情后，亲爱的会怎样看呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.事情过去了就OK了",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.有些事感到内疚",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.很多事感到自责",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.所有事都是我的错",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "7",
        //             "questionName": "每个人都是不完美的，但绝对独一无二哦~亲爱的觉得自己怎么样呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.从没对自己失望",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.有时会有点失望",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.对自己很失望了",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.痛恨现在的自己",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "8",
        //             "questionName": "错误和失败是人生中必要的经历，人各有不同，不断超越自己才是最大的胜利~亲爱的你呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.从不认为自己比别人差",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.对自己不满意觉得很多人都比自己强",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.责怪自己，觉得别人行，自己不行",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.所有的事儿都是我不好，是我的错",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "9",
        //             "questionName": "生命很美好，有很多人都在偷偷爱你哦~亲爱的你觉得呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.我爱我自己，也爱这个世界",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.活着没价值，想过自杀但没去做",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.活着很痛苦，我想要去自杀",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.每天都很痛苦，有机会会去自杀",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "10",
        //             "questionName": "适当的哭能帮助人释放压力，缓解心情，但哭多了可不好哦~亲爱的你是怎样的呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.不爱哭泣",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.比过去变得爱哭了",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.我很爱哭的",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.以前爱哭，现在哭不出来了",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "11",
        //             "questionName": "遇事不要着急哦，冷静下来，我们会想到办法的~亲爱的最近怎么样呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.最近遇事很冷静",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.最近变得烦躁",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.一直都很焦躁不安",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.最近超级烦躁，容易发火",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "12",
        //             "questionName": "我们的事业、家庭、爱好、朋友让我们的生活变得多姿多彩，亲爱的最近觉得呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.对生活从满希望，热爱生活",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.最近对某些事失去兴趣了",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.对其他人和事没有多大兴趣了",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.对其他人和事完全没兴趣",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "13",
        //             "questionName": "人生中我们需要做各种各样的决定，亲爱的在做决定时是否会犹豫不决呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.我从来都可以自己决定事情的~",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.和过去相比，我做决定经常会慢一些，推迟了",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.和过去相比，我经常很难做出决定了",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.我总是犹豫不决，无法做出任何决定",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "14",
        //             "questionName": "人的年岁会日渐增长，但我们可以保持一颗年轻的心呀~亲爱的你呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.我一直很年轻很有活力",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.担心自己会变老",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.感觉青春已逝，日渐衰老",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.很累，没有活力",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "15",
        //             "questionName": "清晰专注的头脑是做好事情的保证呢，亲爱的最近怎么样呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.头脑清晰，工作专注",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.做某些事情开始时比较难专注",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.必须强迫自己才能开始",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.最近什么事儿也干不好",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "16",
        //             "questionName": "好的睡眠是做一切事情的前提，亲爱的最近睡眠怎么样呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.最近睡眠很好",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.最近不如从前",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.比以前早醒，不易再入睡",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.比以前早醒很多，很难再入睡",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "17",
        //             "questionName": "做事情有动力才能坚持做好不泄气呢，亲爱的最近是怎样的呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.一直动力十足",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.最近容易感到疲倦",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.做任何事一直都很疲倦",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.非常疲惫，不想做任何事",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "18",
        //             "questionName": "有好心情才能有好食欲，当然暴饮暴食是不好的哦，亲爱的最近食欲怎么样呀？",
        //             "questionOptions": [{
        //                 "optionName": "A.食欲一直都很好",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.不如之前了",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.最近食欲很差",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.最近没有食欲",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "19",
        //             "questionName": "体重在标准范围内才最健康哦~亲爱的最近体重情况怎么样呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.体重没有变化",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.减轻了2公斤",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.减轻了5公斤",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.减轻了7公斤",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "20",
        //             "questionName": "俗话说“身体是革命的本钱”，亲爱的是否担心自己的身体健康呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.身体很健康，从不担心",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.有些担心，如胃痛、便秘等",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.挺担心自己的身体",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.特别担心自己的身体",
        //                 "optionValue": 3
        //             }]
        //         }, {
        //             "questionId": "21",
        //             "questionName": "性不可耻，它是美好的，亲爱的最近对性的兴趣怎么样呢？？",
        //             "questionOptions": [{
        //                 "optionName": "A.和之前一样变化不大",
        //                 "optionValue": 0
        //             }, {
        //                 "optionName": "B.最近不如之前",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "C.最近对性没兴趣",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.对性完全没兴趣",
        //                 "optionValue": 3
        //             }]
        //         }],
        //         "questionsConclusion": [{
        //             "conclusionId": "1",
        //             "scoreRange": 5,
        //             "summary": "没有抑郁症",
        //             "queConclusion": "你的状态很不错。你的情绪已经很好了。这是正常范围，大多数总分这么低的人都会感到快乐满足。你现在的心理状况非常的好，请继续保持你的良好心态，想提醒你的是如果累了就休息休息。也可以总结影响自己心情的因素有哪些？"
        //         }, {
        //             "conclusionId": "2",
        //             "scoreRange": 14,
        //             "summary": "偶尔有抑郁情绪",
        //             "queConclusion": "你的情绪状态基本正常。你仍处于正常范围，不过很可能会有一点不快。你的情绪有待提高，如果愿意的话可以提升一点点。我们所有人都会被日常生活中的问题所困扰，改变心态很可能会使你的心情大为改观。值得注意的是，偶尔的抑郁情绪可以帮你回归理性与反省，给生活一个休止符，这对我们思考生活的意义很有益处。累的时候休息，想哭的时候大声哭，都是不错的宣泄方法。可以多和家人朋友聊天减少你的抑郁情绪。"
        //         }, {
        //             "conclusionId": "3",
        //             "scoreRange": 29,
        //             "summary": "有轻度抑郁",
        //             "queConclusion": "你可能有些心情低落。按照你的分数，你至少在测试时有轻微的抑郁，但还不足以拉响警报。毫无疑问，你肯定想解决这个问题，也许这时尝试一下自我治疗就可以顺利康复。可经常和知心好友坦诚交流，这对心情的恢复大有好处。不过，这样的状态若维持过久，你可能需要考虑专业治疗。心理医生或抗抑郁药物也许会帮助你顺利康复。 根据经验，一些总分处于轻微范围的抑郁患者实际上是最难治疗的。这些患者往往几年、甚至大半生都无法摆脱轻微抑郁。现在，我们把轻微的慢性抑郁症称为“心境恶劣障碍症（dysthymic disorder）”。尽管这个词听起来专业而复杂，它的意思其实再简单不过了。它的全部意思就是：“这个人几乎总是阴郁得可怕，满脑子消极的念头。”你很可能认识这样的人，或许你自己就陷入了这样的悲观情绪。"
        //         }, {
        //             "conclusionId": "4",
        //             "scoreRange": 43,
        //             "summary": "有中度抑郁",
        //             "queConclusion": "你最近的心情明显很低落。这个分数的你，表示你有可能陷入中度抑郁中。不过，请不要被“中度”这个词所蒙蔽，得分在这个范围内足以说明你的痛苦已非常深重。我们大多数人只会暂时情绪低落，一般很快就能摆脱。如果你这个状态超过两个星期，请务必考虑专业治疗。"
        //         }, {
        //             "conclusionId": "5",
        //             "scoreRange": 54,
        //             "summary": "有较严重抑郁",
        //             "queConclusion": "你抑郁的程度比较严重。依照你的结果，你的抑郁情况已非常严重。在这个程度，痛苦已让人无法承受。情绪特别低落、思维迟缓、动作或行为减少。应借助专业心理治疗来进行治疗。"
        //         }, {
        //             "conclusionId": "6",
        //             "scoreRange": 63,
        //             "summary": "有严重抑郁",
        //             "queConclusion": "你的抑郁程度已非常严重。按照你的测试结果，情况不是特别好。你的情绪容易狂躁不安，这很可能会非常危险，因为人在绝望无助的时候往往会有自杀的冲动。如有条件，请去寻求专业帮助。"
        //         }]
        //     },
        //     {
        //         "examinationId": "2",
        //         "examinationName": "焦虑症测试题(一)",
        //         "questionNumber": "20",
        //         "questionsMessage": [{
        //             "questionId": "1",
        //             "questionName": "身处社会，社交活动在所难免。亲爱的最近是否完全失去对社交活动的兴趣，觉得它们似乎太耗精力？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "2",
        //             "questionName": "生活要劳逸结合，亲爱的是否对空闲时间自己该做什么，一点也没有底呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "3",
        //             "questionName": "做事情要循序渐进，量力而行。亲爱的最近是否经常去做一些难以完成的事情？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "4",
        //             "questionName": "计划能让生活井井有条，亲爱的最近是否因为要做的事太多，感到不知所措和失控？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "5",
        //             "questionName": "一天的忙碌后需要适当的休息和放松，亲爱的是否觉得一天当中很少有自己的时间？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "6",
        //             "questionName": "来自亲人的认同感能带给我们很多力量，亲爱的最近是否感到不被家人赏识？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "7",
        //             "questionName": "控制情绪是每个人都应该修习的课程，亲爱的最近是否时常有一种莫名其妙的不满和气愤？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "8",
        //             "questionName": "做好自己就好，不必太在意别人的看法。亲爱的最近是否经常在寻求别人的恭维和夸奖？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "9",
        //             "questionName": "身体很重要哦，亲爱的最近是否有紧张或焦虑使自己不思茶饭？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "10",
        //             "questionName": "还是要注意身体哦，亲爱的最近是否要靠吸烟或喝咖啡来支持自己？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "11",
        //             "questionName": "吃甜食确实会让人觉得开心呢，亲爱的最近是否想用巧克力和其他糖类来应付焦虑？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "12",
        //             "questionName": "精神状态会间接影响身体状态呢，亲爱的最近是否有恶心、腹痛或腹泻的症状？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "13",
        //             "questionName": "失眠会影响人的精神状态和身体健康哦，亲爱的最近是否经常失眠呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "14",
        //             "questionName": "好的睡眠质量能让人精神百倍，亲爱的最近是否有睡了整整一夜，但是仍然感到没有休息好？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "15",
        //             "questionName": "亲爱的最近是否有过在晚上，不想睡觉的时候睡着了？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "16",
        //             "questionName": "午间小憩能让人在下午保持良好的精神状态，亲爱的最近是否需要长时间的午睡？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "17",
        //             "questionName": "幽默感既能轻松自己也能愉悦他人，亲爱的最近是否失去了幽默感？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "18",
        //             "questionName": "遇事不要着急哦，平和冷静会有更好的结果呢，亲爱的最近是否情绪急躁易怒？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "19",
        //             "questionName": "要相信自己哦，亲爱的最近是否对未来感觉很悲观呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }, {
        //             "questionId": "20",
        //             "questionName": "要相信自己哦，亲爱的最近是否对未来感觉很悲观呢？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.几乎没有",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.有时",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.经常",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "E.总是",
        //                 "optionValue": 5
        //             }]
        //         }],
        //         "questionsConclusion": [{
        //             "conclusionId": "1",
        //             "scoreRange": 40,
        //             "summary": "没有焦虑",
        //             "queConclusion": "你的状态很好，没有焦虑或者只有偶尔的焦虑情绪波动，继续保持良好的状态吧！"
        //         }, {
        //             "conclusionId": "2",
        //             "scoreRange": 60,
        //             "summary": "轻微焦虑",
        //             "queConclusion": "你存在轻微的焦虑倾向，或许某些特定的事件引起了你的焦虑感觉，这不构成对你正常生活的影响，只要事情得到解决，焦虑就可以缓解或消失。"
        //         }, {
        //             "conclusionId": "3",
        //             "scoreRange": 80,
        //             "summary": "中等焦虑",
        //             "queConclusion": "你的焦虑倾向到了中等水平，或许是生活、工作或学业压力所致，应该设法放松自己，尽快调节。"
        //         }, {
        //             "conclusionId": "4",
        //             "scoreRange": 100,
        //             "summary": "极大的焦虑",
        //             "queConclusion": "你的焦虑水平比较高，且这种状态持续了一段时间，对你的正常生活或工作产生了不良的影响。建议：在忙碌中停一停，想想是什么事情导致了现在的状态，然后像办法调整；也可以暂时换一个环境，进行一次小旅行，或许开阔了视野也会开阔心胸；寻找社会支持，比如心理咨询或亲友家人。"
        //         }]
        //     },
        //     {
        //         "examinationId": "3",
        //         "examinationName": "焦虑症测试题(二)",
        //         "questionNumber": "20",
        //         "questionsMessage": [{
        //             "questionId": "1",
        //             "questionName": "适当放松心情，一切都是最好的安排~亲爱的最近是否比平时容易紧张和着急？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "2",
        //             "questionName": "内心坚定则心安，亲爱的最近是否无缘无故地感到害怕？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "3",
        //             "questionName": "心静则事平，亲爱的最近是否容易心里烦乱或觉得惊恐？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "4",
        //             "questionName": "要学会排解情绪哦，亲爱的最近是否觉得自己可能将要发疯？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "5",
        //             "questionName": "精神状况有时会反映在身体上，亲爱的最近是否手脚发抖打颤？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "6",
        //             "questionName": "亲爱的最近是否觉得自己一切都很好，也不会发生什么不幸？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 1
        //             }]
        //         }, {
        //             "questionId": "7",
        //             "questionName": "注意身体哦，亲爱的最近是否因为头痛、颈痛和背痛而苦恼？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "8",
        //             "questionName": "累了就休息一下，亲爱的最近是否感觉容易虚弱和疲乏？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "9",
        //             "questionName": "亲爱的最近是否觉得心平气和，并且容易安静坐着？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 1
        //             }]
        //         }, {
        //             "questionId": "10",
        //             "questionName": "精神状况有时会反映在身体上，亲爱的最近是否莫名觉得心跳得快？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "11",
        //             "questionName": "亲爱的最近是否因为一阵阵头晕而苦恼？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "12",
        //             "questionName": "心情放松了，身体才会更健康。亲爱的最近是否有晕倒发作，或觉得要晕倒似的？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "13",
        //             "questionName": "亲爱的最近是否觉得呼气吸气都与往常一样容易（呼吸系统疾病排除）？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 1
        //             }]
        //         }, {
        //             "questionId": "14",
        //             "questionName": "亲爱的最近是否有手脚麻木和刺痛？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "15",
        //             "questionName": "身体是革命的本钱，亲爱的最近是否因胃痛和消化不良而苦恼？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "16",
        //             "questionName": "亲爱的最近是否常常要小便？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "17",
        //             "questionName": "亲爱的最近的手是否常常是干燥温暖的？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 1
        //             }]
        //         }, {
        //             "questionId": "18",
        //             "questionName": "亲爱的最近是否脸红发热？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }, {
        //             "questionId": "19",
        //             "questionName": "好的睡眠能让人精神百倍，亲爱的最近是否容易入睡并且一夜睡得很好？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 4
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 1
        //             }]
        //         }, {
        //             "questionId": "20",
        //             "questionName": "亲爱的最近是否会做恶梦？",
        //             "questionOptions": [{
        //                 "optionName": "A.没有或很少时间",
        //                 "optionValue": 1
        //             }, {
        //                 "optionName": "B.小部分时间",
        //                 "optionValue": 2
        //             }, {
        //                 "optionName": "C.相当多的时间",
        //                 "optionValue": 3
        //             }, {
        //                 "optionName": "D.绝大部分或全部时间",
        //                 "optionValue": 4
        //             }]
        //         }],
        //         "questionsConclusion": [{
        //             "conclusionId": "1",
        //             "scoreRange": 40,
        //             "summary": "你的焦虑还在睡大觉。",
        //             "queConclusion": "你的结果低于国内常模分数，你在过去的七天，焦虑水平正常，可以说你基本上是淡定地过好每一天呢。"
        //         }, {
        //             "conclusionId": "2",
        //             "scoreRange": 55,
        //             "summary": "你焦虑的温度稍高。",
        //             "queConclusion": "你的结果稍高于国内常模分数，属于轻度焦虑。你在过去的七天，很少时候显出急躁紧张、心悸或者胃疼。人群中大约有百分之33.3%的人与你同在。"
        //         }, {
        //             "conclusionId": "3",
        //             "scoreRange": 70,
        //             "summary": "你的焦虑有点发烧。",
        //             "queConclusion": "你的结果高于常模分数，跑得稍微有些远，属于中度焦虑。在过去的七天，可能有一半的时间里你都感到处处都有些不对而烦躁，觉得头疼胃紧，气短，有时还难以入睡。也许还会莫名感到肌肉酸痛。人群中大约有16.6%的人与你同在。你也许最近冲刺得太厉害，让你的身心都有些疲惫了。"
        //         }, {
        //             "conclusionId": "4",
        //             "scoreRange": 80,
        //             "summary": "你的焦虑爆表了！",
        //             "queConclusion": "你的结果远高于常模分数，跑得有点远了，属于重度焦虑。在过去的七天，压力像块巨石压得你透不过气，你可能被各种焦躁的情绪环绕，让你感到胸闷气短，浑身酸痛，即使不运动也浑身冒汗。你可能有些拉肚子，而且难以入睡。有一种想咆哮但哮不出来的惆怅。首先你需要想想近期是不是有什么事情严重影响了你的情绪，如果你已经确定没有，且这样的情况已经至少持续了一个月，那么你可能需要寻求专业帮助来缓解你的焦虑。"
        //         }]
        //     }
        // ];
        // $rootScope.examination_default = $rootScope.examinations_list[0];

    }]);