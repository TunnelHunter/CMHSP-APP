/**
 * 导入工具包 require('node_modules里对应模块')
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-clean-css'),//css压缩  目前此插件已被废弃，改用gulp-clean-css插件
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),//js压缩
    watchPath = require('gulp-watch-path'),
    htmlmin = require('gulp-htmlmin'),//html压缩
    combiner = require('stream-combiner2'),      //合并
    sourcemaps = require('gulp-sourcemaps'),     //生成sourcemap文件便于压缩后查看与调试
    autoprefixer = require('gulp-autoprefixer'), //根据设置浏览器版本自动处理浏览器前缀
    sass = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),
    smushit = require('gulp-smushit'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    cache = require('gulp-cache'),
    babel = require("gulp-babel");

var SRC_DIR = './src/**/*.js';
var DIST_DIR = './dist/';


/**
 * 错误输出信息
 * @param err
 */
var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};

/**
 * 把less文件转换为css文件，并监控指定路径下的less文件，一变化就调用lessToCss任务
 */
gulp.task('lessToCss', function () {
    gulp.src('src/less/index.less')
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'));

    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    // gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
    //     .pipe(less())
    //     .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
    //     .pipe(gulp.dest('src/css'));
});
gulp.task('watchLessToCss', function () {
    gulp.watch('src/less/*.less', ['lessToCss']);
});


/**
 * autoprefixer css 根据设置浏览器版本自动处理浏览器前缀
 */
gulp.task('autoFx', function () {
    gulp.src('src/css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});


/**
 * js文件合并，js文件压缩，监控指定目录下的js文件，一变化就执行压缩方法
 */
gulp.task('ConcatJs', function () {
    return gulp.src(['src/js/config/*.js', 'src/js/controller/*.js'])
        .pipe(concat('cmhsp_concat.js'))
        .pipe(gulp.dest('dist/js/cmhsp_concat'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/cmhsp_concat'))
        .pipe(notify({message: 'ConcatJs task ok'}));
});
gulp.watch(['src/js/config/*.js', 'src/js/controller/*.js'], ['ConcatJs']);


/**
 * 压缩css文件
 */
// gulp.task('cssMin', function () {
//     gulp.src('src/css/*.css')
//         .pipe(cssmin({
//             advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
//             compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
//             keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
//             keepSpecialComments: '*'
//             //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
//         }))
//         .pipe(gulp.dest('dist/css'));
// });

gulp.task('cssMin', function () {
    return gulp.src(['src/css/index.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message: 'cssMin task ok'}));
});
gulp.watch(['src/css/*.css'], ['cssMin']);


/**
 * 图片压缩 gulp-imagemin 方式一
 */
gulp.task('imageMin', function () {
    gulp.src(['src/imgs/*.{png,jpg,gif,ico}',
        'src/imgs/hello_slides/*.{png,jpg,gif,ico}',
        'src/imgs/music_background/*.{png,jpg,gif,ico}',
        'src/imgs/music_player/*.{png,jpg,gif,ico}',
        'imgs/essay/*.{png,jpg,gif,ico}',
        'imgs/*.{png,jpg,gif,ico}'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'));


    // gulp.src(['src/imgs/*.{png,jpg,gif,ico}',
    //     'src/imgs/hello_slides/*.{png,jpg,gif,ico}',
    //     'src/imgs/music_background/*.{png,jpg,gif,ico}',
    //     'src/imgs/music_player/*.{png,jpg,gif,ico}',
    //     'imgs/essay/*.{png,jpg,gif,ico}',
    //     'imgs/*.{png,jpg,gif,ico}'])
    //     .pipe(imagemin({
    //         optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    //         progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    //         interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
    //         multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    //     }))
    //     .pipe(gulp.dest('dist/img'));
    //
    //
    // gulp.src('src/img/*.{png,jpg,gif,ico}')
    //     .pipe(cache(imagemin({
    //         progressive: true,
    //         svgoPlugins: [{removeViewBox: false}]//不要移除svg的viewbox属性
    //         // use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    //     })))
    //     .pipe(gulp.dest('dist/img'));
});
// gulp.watch(['src/imgs/*.{png,jpg,gif,ico}',
//     'src/imgs/hello_slides/*.{png,jpg,gif,ico}',
//     'src/imgs/music_background/*.{png,jpg,gif,ico}',
//     'src/imgs/music_player/*.{png,jpg,gif,ico}',
//     'imgs/essay/*.{png,jpg,gif,ico}',
//     'imgs/*.{png,jpg,gif,ico}'], ['imageMin']);

/**
 * 图片压缩 gulp-smushit 方式二 只能压缩jpg,png  压缩比例高
 */
gulp.task('smushit', function () {
    return gulp.src(['src/imgs/**/*.{jpg,png}','imgs/**/*.{jpg,png}'])
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('dist/imgs'));
});


/**
 * html文件压缩
 */
gulp.task('htmlMin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(['html/*.html'])
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});


/**
 * 执行默认任务 gulp
 */
gulp.task('default', ['lessToCss', 'ConcatJs', 'cssMin','htmlMin','watchLessToCss']);
