app.controller('tabUserMessagesCtrl',['$scope','$timeout',function ($scope,$timeout) {
    $scope.show_question_windows = false;

$timeout(function () {
    $scope.user_messages = [
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小张',
            'content':'你好啊！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
            'name':'小李',
            'content':'你在哪里？'
        },
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小黄',
            'content':'评论666'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小乐',
            'content':'我起飞了！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png',
            'name':'小机',
            'content':'键盘侠！'
        },
        {
            'img':'http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png',
            'name':'小机',
            'content':'键盘侠！'
        }
    ]

},1000);

}]);