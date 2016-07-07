/**
 * Created by yzsoft on 16/7/4.
 */

const gulp = require('gulp'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    sourceMaps = require('gulp-sourcemaps'),
    cssMin = require('gulp-minify-css'),
    liveReload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    image = require('gulp-image'),
    babel = require('gulp-babel'),
    through = require('through2'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
    named = require('vinyl-named'),
    path = require('path'),
    autoPreFixer = require('gulp-autoprefixer'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare');

function logFileHelpers() {
    return through.obj((file, enc, cb) => {
        console.log(file.babel.usedHelpers);
        cb(null, file);
    });
}
function getConfig(opt) {
    var config = {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: 'jquery',
                "window.jQuery": "jquery",
            })
        ],
        entry: {
            hello: path.resolve(__dirname, 'app/js/hello.js'),
            index: path.resolve(__dirname, 'app/js/entrance/index/index.js'),
            goodlist: path.resolve(__dirname, 'app/js/entrance/sort/goodlist.js')
        },
        output: {
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel?presets[]=es2015,presets[]=stage-0,presets[]=stage-1,presets[]=stage-2,presets[]=stage-3', // 'babel-loader' is also a legal name to reference
                    /*query: {
                     presets: ['es2015']
                     }*/
                }
            ],
            noParse: []
        },
        devtool: 'source-map'
    };
    if (!opt) {
        return config
    }
    for (var i in opt) {
        config[i] = opt[i]
    }
    return config
}

//将.handlebars 文件编译成js方法
gulp.task('handlebars', function () {
    gulp.src(['./app/handlebars/**/*.handlebars', './app/handlebars/**/*.hbs'])
        .pipe(handlebars({
            handlebars:require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Handlebars.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(gulp.dest('build/handlebars/'))
});
//将jade 编译成 html
gulp.task('template', function () {
    var YOUR_LOCALS = {};

    gulp.src(['./app/containers/**/*.jade', 'app/*.jade'])
        .pipe(jade({
            locals: YOUR_LOCALS,
            //不压缩html
            pretty: true
        }))
        .pipe(gulp.dest('./build/'))
});
//将less 编译成 css
gulp.task('lessBundle', function () {
    gulp.src(['./app/static/less/*.less'])
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourceMaps.write())
        .pipe(cssMin({compatibility: 'ie7'}))//兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('build/static/css'))
        .pipe(liveReload())
});
//压缩js
gulp.task('lib', function () {
    gulp.src(['./app/lib/***/**/*'])
        .pipe(gulp.dest('build/lib/'));
});
//webpack 编译
gulp.task('bundle', function () {
    return gulp.src(['./app/static/js/main.js', './app/static/js/entrance/**/*.js'])
        .pipe(named())
        .pipe(gulpWebpack(getConfig({
            watch: true
        })))
        .pipe(gulp.dest('build/js/entrance'))
});

//处理图片
gulp.task('image', function () {
    gulp.src(['./app/static/img/**/*', './app/static/img/*'])
        .pipe(gulp.dest('build/static/img'))
});
//打包css文件
gulp.task('css', function () {
    gulp.src(['./app/static/css/*.css'])
        //.pipe(cssMin({compatibility: 'ie7'}))//兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(autoPreFixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/static/css'))
});
//打包font
gulp.task('font', function () {
    gulp.src('./app/static/css/fonts/*')
        .pipe(gulp.dest('build/static/css/fonts'))
});
//监听less文件实时编译
gulp.task('watchLess', function () {
    liveReload.listen();
    gulp.watch([
        './app/static/less/*.less'
    ], ['lessBundle'])
});
//监听jade文件变化实时编译
gulp.task('watchJade', function () {
    gulp.watch([
        ['./app/containers/**/*.jade', './app/components/**/*.jade', 'app/*.jade']
    ], ['template']);
});
//监听图片变化实时编译
gulp.task('watchImage', function () {
    gulp.watch([
        ['./app/static/img/**/*', './app/static/img/*']
    ], ['image'])
});
//监听lib变化
gulp.task('libWatch', function () {
    gulp.watch(['./app/lib/***/**/*'], ['lib'])
});
//监听css变化并打包
gulp.task('cssWatch', function () {
    gulp.watch(['./app/static/css/*.css'], ['css']);
});
//监听handlebars 变化并打包
gulp.task('handlebarsWatch', function () {
    gulp.watch([
        ['./app/handlebars/**/*.handlebars', './app/handlebars/**/*.hbs']
    ], ['handlebars'])
});
gulp.task('default', [
    'watchLess',
    'lessBundle',
    'watchJade',
    'template',
    'image',
    'watchImage',
    'bundle',
    'lib',
    'libWatch',
    'css',
    'font',
    'cssWatch',
    'handlebars',
    'handlebarsWatch'
    ]);