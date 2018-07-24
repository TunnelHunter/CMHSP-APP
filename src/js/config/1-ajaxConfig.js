//统一接口注册
app.service('ajax_service', function () {

    var ROOT = 'http://localhost:8080';
    var ROOT_HTTP = ROOT + '/CMHSP'; //服务器地址
    // var ROOT = '../../../../CMHSP';
    // var ROOT_HTTP = '../../../../CMHSP'; //项目合并时用到

    var absoluteurl = ROOT_HTTP + '/';
    this.absoluteurl = function () {
        return absoluteurl;
    };

    /*
    测试Tab
     */
    //获取全部测试题
    var get_examinationsList = ROOT_HTTP + '/examinationsList';
    this.get_examinationsList = function () {
        return get_examinationsList;
    };
    //返回测试结果信息
    var return_examinationsResults = ROOT_HTTP + '/examinationsResults';
    this.return_examinationsResults = function () {
        return return_examinationsResults;
    };


    /*
    社区Tab
     */
    //顶部下拉刷新
    var get_socialFreshDown = ROOT_HTTP + '/socialFreshDown';
    this.get_socialFreshDown = function () {
        return get_socialFreshDown;
    };
    //底部上拉刷新
    var get_socialFreshUp = ROOT_HTTP + '/socialFreshUp';
    this.get_socialFreshUp = function () {
        return get_socialFreshUp;
    };
    //获取特定动态的评论
    var get_socialComments = ROOT_HTTP + '/showComments';
    this.get_socialComments = function () {
        return get_socialComments;
    };
    //发布社区动态
    var add_social = ROOT_HTTP + '/socialAdd';
    this.add_social = function () {
        return add_social;
    };
    //发布动态评论
    var add_socialComment = ROOT_HTTP + '/socialCommentAdd';
    this.add_socialComment = function () {
        return add_socialComment;
    };
    //动态收藏
    var add_socialFavorite = ROOT_HTTP + '/socialFavorite';
    this.add_socialFavorite = function () {
        return add_socialFavorite;
    };


    /*
    音乐Tab
     */
    //获取当前场景全部歌曲
    var get_musicSceneList = ROOT_HTTP + '/musicSceneList';
    this.get_musicSceneList = function () {
        return get_musicSceneList;
    };
    //歌曲收藏
    var add_musicFavorite = ROOT_HTTP + '/musicFavorite';
    this.add_musicFavorite = function () {
        return add_musicFavorite;
    };


    /*
    阅读Tab
     */
    //加载阅读Tab页面首屏展示信息
    var get_readFirstPage = ROOT_HTTP + '/readFirstPage';
    this.get_readFirstPage = function () {
        return get_readFirstPage;
    };
    //阅读搜索
    var read_search = ROOT_HTTP + '/readSearch';
    this.read_search = function () {
        return read_search;
    };
    //获取详细信息接口（书/文章）
    var get_readDetil = ROOT_HTTP + '/readDetil';
    this.get_readDetil = function () {
        return get_readDetil;
    };
    //获取列表接口（书/文章 点击更多...）
    var get_readList = ROOT_HTTP + '/readList';
    this.get_readList = function () {
        return get_readList;
    };
    //阅读收藏
    var add_readFavorite = ROOT_HTTP + '/readFavour';
    this.add_readFavorite = function () {
        return add_readFavorite;
    };


    /*
    用户Tab
     */

    //注册
    var register = ROOT + '/user/register';
    this.register = function () {
        return register;
    };
    //登录
    var login = ROOT + '/user/login';
    this.login = function () {
        return login;
    };

    /*我的消息*/
    //获取有无最新我的消息
    var get_userNotice = ROOT_HTTP + '/userNotice';
    this.get_userNotice = function () {
        return get_userNotice;
    };
    //获取系统消息
    var get_userSysMessage = ROOT_HTTP + '/userGetsysMessage';
    this.get_userSysMessage = function () {
        return get_userSysMessage;
    };
    //获取我的评论
    var get_userComments = ROOT_HTTP + '/userGetComments';
    this.get_userComments = function () {
        return get_userComments;
    };
    //返回清空提醒小标
    var clear_userNews = ROOT_HTTP + '/userClearNews';
    this.clear_userNews = function () {
        return clear_userNews;
    };

    /*设置*/
    //修改用户信息
    var update_userMessages = ROOT_HTTP + '/userUpdate';
    this.update_userMessages = function () {
        return update_userMessages;
    };
    //退出登录
    var logout = ROOT + '/user/logout';
    this.logout = function () {
        return logout;
    };

    /*测试记录*/
    //修改用户信息
    var get_userTestRecords = ROOT_HTTP + '/userHisRecords';
    this.get_userTestRecords = function () {
        return get_userTestRecords;
    };

    /*个人分析*/
    //修改用户信息
    var get_userAnalysis = ROOT_HTTP + '/userAnalysis';
    this.get_userAnalysis = function () {
        return get_userAnalysis;
    };

    /*收藏*/
    //获取全部已收藏数据信息
    var get_userFavorite = ROOT_HTTP + '/userFavorite';
    this.get_userFavorite = function () {
        return get_userFavorite;
    };


});