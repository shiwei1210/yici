// 获取 gulp
var gulp = require('gulp')

//==========  js  ==========================================
//
//// 获取 uglify 模块（用于压缩 JS）
//var uglify = require('gulp-uglify')
//
//// 压缩 js 文件
//// 在命令行使用 gulp script 启动此任务
//gulp.task('script', function() {
//    // 1. 找到文件
//    gulp.src('js/*.js')
//    // 2. 压缩文件
//        .pipe(uglify())
//    // 3. 另存压缩后的文件
//        .pipe(gulp.dest('dist/js'))
//})
//
////==============  css  ==========================================
//// 获取 minify-css 模块（用于压缩 CSS）
//var minifyCSS = require('gulp-minify-css')
//
//// 压缩 css 文件
//// 在命令行使用 gulp css 启动此任务
////gulp.task('css', function () {
////    // 1. 找到文件
////    gulp.src('css/*.css')
////    // 2. 压缩文件
////        .pipe(minifyCSS())
////    // 3. 另存为压缩文件
////        .pipe(gulp.dest('dist/css'))
////})

//==============  less  ==========================================
// 获取 gulp-less 模块
//var less = require('gulp-less')
//
//// 编译less
//// 在命令行输入 gulp less 启动此任务
//gulp.task('less', function () {
//    // 1. 找到 less 文件
//    //gulp.src('css/less/**.less')
//    gulp.src('css/less/allcss.less')
//    // 2. 编译为css
//        .pipe(less())
//    // 3. 另存文件
//        .pipe(gulp.dest('./css'))
//});

//================= browser-sync ==========================

// 获取 实时更新网页 模块
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
   var files = [
      '*.html',
      'css/*.css',
      'images/*.{jpg,png,gif}',
      'js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
    
//    var reload = browserSync.reload;
  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
//  gulp.watch(files,reload);
});







// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {      
    
    // 监听文件修改，当文件被修改则执行 script 任务
//    gulp.watch('js/*.js', ['script'])
//    
//    // 监听文件修改，当文件被修改则执行 css 任务
//    gulp.watch('css/*.css', ['css'])
    
    // 监听文件修改，当文件被修改则执行 less 任务
   // gulp.watch('css/less/**.less', ['less'])
    
})


// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['browser-sync','auto'])