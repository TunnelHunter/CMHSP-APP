app.controller('tabUserDataAnalysisCtrl', ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'ajax_service', '$http', '$timeout', 'loading_service',
    function ($scope, $rootScope, $ionicLoading, $ionicPopup, ajax_service, $http, $timeout, loading_service) {

        loading_service.show_loading();

        $scope.show_dataAnalysis = false;

        /**
         从localstorage 中取出 用户Id、名字、头像
         */

        //此对象在页面显示 用户信息
        $scope.user_information = {
            'userImage': 'imgs/default_userImage.png',
            'userName': '',
            'userId': ''
        };
        //存储用户测试分析信息
        $scope.arr_userAnalysis = {};
        if (localStorage.hasOwnProperty('userId')) {
            $scope.show_dataAnalysis = true;
            $scope.user_information.userId = localStorage.getItem('userId');

            if (localStorage.hasOwnProperty('userName')) {
                $scope.user_information.userName = localStorage.getItem('userName');
            }
            if (localStorage.hasOwnProperty('userImage')) {
                $scope.user_information.userImage = localStorage.getItem('userImage');
            }

        } else {
            $scope.show_dataAnalysis = true;
        }

        //mock数据
        var analysis_data = {
            //testDayTime 主要用于展示所有测试的 hh:mm 与日期无关 要截取后5个字符
            "testDayTime": ['2018-3-13 23:20', '2018-4-18 00:20', '2018-4-23 13:20', '2018-4-30 3:20', '2018-5-1 4:20', '2018-6-25 22:20', '2018-7-18 11:20',
                '2018-4-13 23:20', '2018-2-18 00:20', '2018-5-23 13:20', '2018-7-30 3:20', '2018-8-1 4:20', '2018-9-25 22:20', '2018-10-18 11:20',
                '2018-2-13 23:20', '2018-3-18 00:20', '2018-4-23 13:20', '2018-5-30 3:20', '2018-6-1 4:20', '2018-7-25 22:20', '2018-8-18 11:20'],
            "testScore": [
                {
                    "examName": "抑郁症测试题(一)",
                    "score": ['12', '11', '23', '34', '23', '45', '55'],
                    "testTime": ['2018-3-13 23:20', '2018-4-18 00:20', '2018-4-23 13:20', '2018-4-30 3:20', '2018-5-1 4:20', '2018-6-25 22:20', '2018-7-18 11:20']

                },
                {
                    "examName": "焦虑症测试题(一)",
                    "score": ['1', '2', '22', '13', '23', '14', '35'],
                    "testTime": ['2018-4-13 23:20', '2018-2-18 00:20', '2018-5-23 13:20', '2018-7-30 3:20', '2018-8-1 4:20', '2018-9-25 22:20', '2018-10-18 11:20']

                },
                {
                    "examName": "焦虑症测试题(二)",
                    "score": ['23', '14', '17', '18', '24', '26', '28'],
                    "testTime": ['2018-2-13 23:20', '2018-3-18 00:20', '2018-4-23 13:20', '2018-5-30 3:20', '2018-6-1 4:20', '2018-7-25 22:20', '2018-8-18 11:20']

                }
            ],
            "typeAnaly": [
                {
                    "typeName": "抑郁症类型试题",
                    "count": "7"
                },
                {
                    "typeName": "焦虑症类型试题",
                    "count": "14"
                }
            ]
        };

        //获取用户测试分析信息
        $scope.fn_get_userAnalysis = function () {
            if ($rootScope.judge_login()) {
                var userId = window.localStorage.getItem("userId");

                $http({
                    method: "post",
                    url: ajax_service.get_userAnalysis(),
                    data: JSON.stringify({userId: userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'addToken': true
                    }
                })
                    .success(function (response) {
                        if (response.error_code == 0) {
                            $scope.arr_userAnalysis = response.data;

                        }

                    })
                    .error(function (response) {

                    })
            } else {
                return;
            }
        };
        $scope.fn_get_userAnalysis();

        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('echarts_test1'));
        var myChart2 = echarts.init(document.getElementById('echarts_test2'));
        var myChart3 = echarts.init(document.getElementById('echarts_test3'));

        var default_option = {
            title: {
                left: 'center',
                text: '数据加载中...'
            },
            tooltip: {},
            legend: {
                data: ['']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '分数',
                type: 'bar',
                data: []
            }]
        };

        // 使用刚指定的配置项和数据显示图表。

        myChart1.setOption(default_option);
        myChart2.setOption(default_option);
        myChart3.setOption(default_option);

        $timeout(function () {

            console.log(2222);
            // 指定图表的配置项和数据
            option1 = {
                title: {
                    left: 'center',
                    text: $scope.arr_userAnalysis.testScore[0].examName
                },
                tooltip: {},
                legend: {
                    data: ['']
                },
                xAxis: {
                    data: $scope.arr_userAnalysis.testScore[0].testTime
                },
                yAxis: {},
                series: [{
                    name: '分数',
                    type: 'bar',
                    data: $scope.arr_userAnalysis.testScore[0].score
                }]
            };

            // 使用刚指定的配置项和数据显示图表。

            myChart1.setOption(option1);


            // 指定图表的配置项和数据
            var option2 = {
                title: {
                    left: 'center',
                    text: $scope.arr_userAnalysis.testScore[1].examName
                },
                tooltip: {},
                legend: {
                    data: ['']
                },
                xAxis: {
                    data: $scope.arr_userAnalysis.testScore[1].testTime
                },
                yAxis: {},
                series: [{
                    name: '分数',
                    type: 'line',
                    data: $scope.arr_userAnalysis.testScore[1].score
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option2);

            // 指定图表的配置项和数据
            var option3 = {

                title: {
                    left: 'center',
                    text: $scope.arr_userAnalysis.testScore[2].examName
                },
                tooltip: {},
                legend: {
                    data: ['']
                },
                xAxis: {
                    data: $scope.arr_userAnalysis.testScore[2].testTime
                },
                yAxis: {},
                series: [{
                    name: '分数',
                    type: 'bar',
                    data: $scope.arr_userAnalysis.testScore[2].score
                }]

                // tooltip: {
                //     trigger: 'item',
                //     formatter: "{a} <br/>{b}: {c} ({d}%)"
                // },
                // legend: {
                //     orient: 'vertical',
                //     x: 'left',
                //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                // },
                // series: [
                //     {
                //         name: '访问来源',
                //         type: 'pie',
                //         radius: ['50%', '70%'],
                //         avoidLabelOverlap: false,
                //         label: {
                //             normal: {
                //                 show: false,
                //                 position: 'center'
                //             },
                //             emphasis: {
                //                 show: true,
                //                 textStyle: {
                //                     fontSize: '30',
                //                     fontWeight: 'bold'
                //                 }
                //             }
                //         },
                //         labelLine: {
                //             normal: {
                //                 show: false
                //             }
                //         },
                //         data: [
                //             {value: 335, name: '直接访问'},
                //             {value: 310, name: '邮件营销'},
                //             {value: 234, name: '联盟广告'},
                //             {value: 135, name: '视频广告'},
                //             {value: 1548, name: '搜索引擎'}
                //         ]
                //     }
                // ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart3.setOption(option3);


            // Schema:
            // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
            var dataBJ = [
                [55, 9, 56, 0.46, 18, 6, 1],
                [25, 11, 21, 0.65, 34, 9, 2],
                [56, 7, 63, 0.3, 14, 5, 3],
                [33, 7, 29, 0.33, 16, 6, 4],
                [42, 24, 44, 0.76, 40, 16, 5],
                [82, 58, 90, 1.77, 68, 33, 6],
                [74, 49, 77, 1.46, 48, 27, 7],
                [78, 55, 80, 1.29, 59, 29, 8],
                [267, 216, 280, 4.8, 108, 64, 9],
                [185, 127, 216, 2.52, 61, 27, 10],
                [39, 19, 38, 0.57, 31, 15, 11],
                [41, 11, 40, 0.43, 21, 7, 12],
                [64, 38, 74, 1.04, 46, 22, 13],
                [108, 79, 120, 1.7, 75, 41, 14],
                [108, 63, 116, 1.48, 44, 26, 15],
                [33, 6, 29, 0.34, 13, 5, 16],
                [94, 66, 110, 1.54, 62, 31, 17],
                [186, 142, 192, 3.88, 93, 79, 18],
                [57, 31, 54, 0.96, 32, 14, 19],
                [22, 8, 17, 0.48, 23, 10, 20],
                [39, 15, 36, 0.61, 29, 13, 21],
                [94, 69, 114, 2.08, 73, 39, 22],
                [99, 73, 110, 2.43, 76, 48, 23],
                [31, 12, 30, 0.5, 32, 16, 24],
                [42, 27, 43, 1, 53, 22, 25],
                [154, 117, 157, 3.05, 92, 58, 26],
                [234, 185, 230, 4.09, 123, 69, 27],
                [160, 120, 186, 2.77, 91, 50, 28],
                [134, 96, 165, 2.76, 83, 41, 29],
                [52, 24, 60, 1.03, 50, 21, 30],
                [46, 5, 49, 0.28, 10, 6, 31]
            ];

            var dataGZ = [
                [26, 37, 27, 1.163, 27, 13, 1],
                [85, 62, 71, 1.195, 60, 8, 2],
                [78, 38, 74, 1.363, 37, 7, 3],
                [21, 21, 36, 0.634, 40, 9, 4],
                [41, 42, 46, 0.915, 81, 13, 5],
                [56, 52, 69, 1.067, 92, 16, 6],
                [64, 30, 28, 0.924, 51, 2, 7],
                [55, 48, 74, 1.236, 75, 26, 8],
                [76, 85, 113, 1.237, 114, 27, 9],
                [91, 81, 104, 1.041, 56, 40, 10],
                [84, 39, 60, 0.964, 25, 11, 11],
                [64, 51, 101, 0.862, 58, 23, 12],
                [70, 69, 120, 1.198, 65, 36, 13],
                [77, 105, 178, 2.549, 64, 16, 14],
                [109, 68, 87, 0.996, 74, 29, 15],
                [73, 68, 97, 0.905, 51, 34, 16],
                [54, 27, 47, 0.592, 53, 12, 17],
                [51, 61, 97, 0.811, 65, 19, 18],
                [91, 71, 121, 1.374, 43, 18, 19],
                [73, 102, 182, 2.787, 44, 19, 20],
                [73, 50, 76, 0.717, 31, 20, 21],
                [84, 94, 140, 2.238, 68, 18, 22],
                [93, 77, 104, 1.165, 53, 7, 23],
                [99, 130, 227, 3.97, 55, 15, 24],
                [146, 84, 139, 1.094, 40, 17, 25],
                [113, 108, 137, 1.481, 48, 15, 26],
                [81, 48, 62, 1.619, 26, 3, 27],
                [56, 48, 68, 1.336, 37, 9, 28],
                [82, 92, 174, 3.29, 0, 13, 29],
                [106, 116, 188, 3.628, 101, 16, 30],
                [118, 50, 0, 1.383, 76, 11, 31]
            ];

            var dataSH = [
                [91, 45, 125, 0.82, 34, 23, 1],
                [65, 27, 78, 0.86, 45, 29, 2],
                [83, 60, 84, 1.09, 73, 27, 3],
                [109, 81, 121, 1.28, 68, 51, 4],
                [106, 77, 114, 1.07, 55, 51, 5],
                [109, 81, 121, 1.28, 68, 51, 6],
                [106, 77, 114, 1.07, 55, 51, 7],
                [89, 65, 78, 0.86, 51, 26, 8],
                [53, 33, 47, 0.64, 50, 17, 9],
                [80, 55, 80, 1.01, 75, 24, 10],
                [117, 81, 124, 1.03, 45, 24, 11],
                [99, 71, 142, 1.1, 62, 42, 12],
                [95, 69, 130, 1.28, 74, 50, 13],
                [116, 87, 131, 1.47, 84, 40, 14],
                [108, 80, 121, 1.3, 85, 37, 15],
                [134, 83, 167, 1.16, 57, 43, 16],
                [79, 43, 107, 1.05, 59, 37, 17],
                [71, 46, 89, 0.86, 64, 25, 18],
                [97, 71, 113, 1.17, 88, 31, 19],
                [84, 57, 91, 0.85, 55, 31, 20],
                [87, 63, 101, 0.9, 56, 41, 21],
                [104, 77, 119, 1.09, 73, 48, 22],
                [87, 62, 100, 1, 72, 28, 23],
                [168, 128, 172, 1.49, 97, 56, 24],
                [65, 45, 51, 0.74, 39, 17, 25],
                [39, 24, 38, 0.61, 47, 17, 26],
                [39, 24, 39, 0.59, 50, 19, 27],
                [93, 68, 96, 1.05, 79, 29, 28],
                [188, 143, 197, 1.66, 99, 51, 29],
                [174, 131, 174, 1.55, 108, 50, 30],
                [187, 143, 201, 1.39, 89, 53, 31]
            ];

            var lineStyle = {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            };


            // 基于准备好的dom，初始化echarts实例
            var myChart4 = echarts.init(document.getElementById('echarts_test4'));

            // 指定图表的配置项和数据
            var option4 = {
                backgroundColor: '#161627',
                title: {
                    text: '',
                    left: 'center',
                    textStyle: {
                        color: '#eee'
                    }
                },
                legend: {
                    bottom: 5,
                    data: ['北京', '上海', '广州'],
                    itemGap: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    selectedMode: 'single'
                },
                // visualMap: {
                //     show: true,
                //     min: 0,
                //     max: 20,
                //     dimension: 6,
                //     inRange: {
                //         colorLightness: [0.5, 0.8]
                //     }
                // },
                radar: {
                    indicator: [
                        {name: 'AQI', max: 300},
                        {name: 'PM2.5', max: 250},
                        {name: 'PM10', max: 300},
                        {name: 'CO', max: 5},
                        {name: 'NO2', max: 200},
                        {name: 'SO2', max: 100}
                    ],
                    shape: 'circle',
                    splitNumber: 5,
                    name: {
                        textStyle: {
                            color: 'rgb(238, 197, 102)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: [
                                'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                                'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                            ].reverse()
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(238, 197, 102, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        name: '北京',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataBJ,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#F9713C'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        }
                    },
                    {
                        name: '上海',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataSH,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#B3E4A1'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.05
                            }
                        }
                    },
                    {
                        name: '广州',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataGZ,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: 'rgb(238, 197, 102)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.05
                            }
                        }
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart4.setOption(option4);


// Generate data
            var category = [];
            var dottedBase = +new Date();
            var lineData = [];
            var barData = [];

            for (var i = 0; i < 20; i++) {
                var date = new Date(dottedBase += 3600 * 24 * 1000);
                category.push([
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                ].join('-'));
                var b = Math.random() * 200;
                var d = Math.random() * 200;
                barData.push(b)
                lineData.push(d + b);
            }

            // 基于准备好的dom，初始化echarts实例
            var myChart5 = echarts.init(document.getElementById('echarts_test5'));

            // 指定图表的配置项和数据
            var option5 = {
                backgroundColor: '#0f375f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['line', 'bar'],
                    textStyle: {
                        color: '#ccc'
                    }
                },
                xAxis: {
                    data: category,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                yAxis: {
                    splitLine: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                series: [{
                    name: 'line',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 15,
                    data: lineData
                }, {
                    name: 'bar',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#14c8d4'},
                                    {offset: 1, color: '#43eec6'}
                                ]
                            )
                        }
                    },
                    data: barData
                }, {
                    name: 'line',
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                    {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                    {offset: 1, color: 'rgba(20,200,212,0)'}
                                ]
                            )
                        }
                    },
                    z: -12,
                    data: lineData
                }, {
                    name: 'dotted',
                    type: 'pictorialBar',
                    symbol: 'rect',
                    itemStyle: {
                        normal: {
                            color: '#0f375f'
                        }
                    },
                    symbolRepeat: true,
                    symbolSize: [12, 4],
                    symbolMargin: 1,
                    z: -10,
                    data: lineData
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart5.setOption(option5);


            // 基于准备好的dom，初始化echarts实例
            var myChart6 = echarts.init(document.getElementById('echarts_test6'));

            // 指定图表的配置项和数据
            var option6 = {
                series: [{
                    type: 'liquidFill',
                    data: [0.6, {
                        value: 0.5,
                        direction: 'left'
                    }, 0.4, {
                        value: 0.3,
                        direction: 'left'
                    }],
                    radius: '70%',
                    outline: {
                        show: false
                    }
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart6.setOption(option6);

        }, 500);

    }]);