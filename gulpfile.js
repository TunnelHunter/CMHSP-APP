//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),//js压缩
    watchPath = require('gulp-watch-path'),
    combiner = require('stream-combiner2'),
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-minify-css'), //css压缩  目前此插件已被废弃，改用gulp-clean-css插件
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    babel = require("gulp-babel");

var SRC_DIR = './src/**/*.js';
var DIST_DIR = './dist/';

//定义一个testLess任务
gulp.task('testLess', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));

    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('src/css'));
});

//当所有less文件发生改变时，调用testLess任务
gulp.task('testWatch', function () {
    gulp.watch('src/**/*.less', ['testLess']);
});


//默认任务
gulp.task('default', ['testLess']);
