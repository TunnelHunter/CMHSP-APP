//统一接口注册
app.service('ajax_service', function () {

    var aaaa = 'CMHSP';
    this.set_ = function (args) {
        aaaa = args;
        return this;
    };
    this.get_ = function () {
        return aaaa;
    };

    //ajax 根目录
    var ROOT_HTTP = 'http://192.168.1.39:8090/CMHSP';  //服务器ip
    // var ROOT_HTTP = '../../../../CMHSP'; //上传到 CMHSP 项目里



    //获取题目信息
    var get_questions = ROOT_HTTP + '/sysconfig/questionsdetail';
    this.get_questions = function () {
        return get_questions;
    };


    var imgupload_absoluteurl = ROOT_HTTP + '/';
    this.imgupload_absoluteurl = function () {
        return imgupload_absoluteurl;
    };

    var updateApp = ROOT_HTTP + '/sysconfig/updateApp';
    //// http://192.168.1.232:8200/DIOS/SuperviseSoftware/package.json
    this.updateApp=function(){
        return updateApp;
    };

    var login = ROOT_HTTP + '/login';
    this.login = function () {
        return login;
    };
    //工厂分区 - 矩形图
    var factoryzone = ROOT_HTTP + '/main/factoryzone';
    this.factoryzone = function () {
        return factoryzone;
    };

    //工厂分区配置
    var factoryzonedetail = ROOT_HTTP + '/sysconfig/factoryzonedetail';
    this.factoryzonedetail = function () {
        return factoryzonedetail;
    };
    var addfactoryzone = ROOT_HTTP + '/sysconfig/addfactoryzone';
    this.addfactoryzone = function () {
        return addfactoryzone;
    };
    var updatefactoryzone = ROOT_HTTP + '/sysconfig/updatefactoryzone';
    this.updatefactoryzone = function () {
        return updatefactoryzone;
    };
    var deletefactoryzone = ROOT_HTTP + '/sysconfig/deletefactoryzone';
    this.deletefactoryzone = function () {
        return deletefactoryzone;
    };
    var queryfactoryzone = ROOT_HTTP + '/sysconfig/queryfactoryzone';
    this.queryfactoryzone = function () {
        return queryfactoryzone;
    };

    //获取角色信息
    var ajax_getUser = ROOT_HTTP + '/usermgr/userinfodetail';
    var ajax_addUser = ROOT_HTTP + '/usermgr/adduserinfo';
    var ajax_alterUser = ROOT_HTTP + '/usermgr/updateuserinfo';
    var ajax_delUser = ROOT_HTTP + '/usermgr/deleteuserinfo';
    this.getUser = function () {
        return ajax_getUser;
    };
    this.addUser = function () {
        return ajax_addUser;
    };
    this.alterUser = function () {
        return ajax_alterUser;
    };
    this.delUser = function () {
        return ajax_delUser;
    };


});
