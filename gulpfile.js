var gulp = require("gulp");
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var merge = require('event-stream').merge;
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var comb = require('gulp-csscomb');
var data = require('gulp-data');



//sassのコンパイル
gulp.task('sass', function(){
    gulp.src('source/sass/**/*.sass')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass())
        .pipe(prefix()) //ベンダープレフィクスを自動付与
        .pipe(comb()) //プロパティのソート
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload());
});




//jadeのコンパイル
gulp.task('jade', function(){
   gulp.src(['source/jade/**/*.jade','!source/jade/component/**/*.jade'],
       { base:'source/jade' }) //ディレクトリ構造を維持
       .pipe(jade({
           pretty: true //インデントを維持
       }))
       .pipe(gulp.dest('public'))
       .pipe(connect.reload());
});




//画像のコピー
gulp.task('images', function(){
   gulp.src('source/images/**/*')
       .pipe(gulp.dest('public/images'))
       .pipe(connect.reload());
});

//JavaScriptファイルのコピー
gulp.task('script', function(){
   gulp.src('source/js/**/*.js')
       .pipe(gulp.dest('public/js'))
       .pipe(connect.reload());
});

//cssファイルのコピー
gulp.task('css', function(){
    gulp.src('source/css/**/*.css')
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload());
});


//ファイルの監視
gulp.task('watch', function(){
    gulp.watch('source/images/**/*', function(event){
        gulp.run('images');
    });
    gulp.watch('source/sass/**/*.sass', function(event) {
        gulp.run('sass');
    });
    gulp.watch('source/jade/**/*.jade', function(event) {
        gulp.run('jade');
    });
    gulp.watch('source/js/**/*.js', function(event) {
        gulp.run('script');
    });
    gulp.watch('source/css/**/*.css', function(event) {
        gulp.run('css');
    });
});

//ローカルサーバー立ち上げ&自動更新
gulp.task('server', function(){
    connect.server({
        root: 'public/',
        livereload: true
    });
});


gulp.task('default', ['sass', 'css', 'jade', 'script', 'images', 'watch', 'server']);