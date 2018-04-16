//引入gulp
var gulp=require('gulp');
//引入路径模块
var path=require('path');
//引入less模块
var less=require('gulp-less');
//引入sass模块
var sass=require('gulp-sass');
//引入压缩css模块
var cleanCss=require('gulp-clean-css');
//引入压缩js模块
var uglify=require('gulp-uglify');
//引入重命名模块
var rename=require('gulp-rename');
//引入串行任务管理模块
var sequence=require('run-sequence');
//引入资源地图模块
var sourceMaps=require('gulp-sourcemaps');
//引入热刷新
var liveReload=require('gulp-livereload');
//引入删除模块
var del=require("del");
//编译sass
gulp.task('sassTask',function(){
    gulp.src("./src/sass/*.scss")
		.pipe(sourceMaps.init()) //资源地图初始化
        .pipe(sass().on('error', sass.logError)) //调用插件方法编译sass
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(liveReload())  //调用热刷新方法

})
//编译less
gulp.task('lessTask',function(){
    gulp.src("./src/less/*.less")
        .pipe(sourceMaps.init()) //资源地图初始化
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        //写入资源地图
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest("./dist/css/")) //输出文件
        .pipe(liveReload())  //调用热刷新方法
})
//自定义观察者任务
gulp.task('watch',function(){
    //开启监听
    liveReload.listen();
    gulp.watch('./src/**/*',['lessTask','sassTask']); //观察者，less变化就执行编译、压缩、刷新
})


//压缩CSS任务
gulp.task('cleanCss',function(){
    gulp.src('./dist/css/*.css')
        .pipe(cleanCss())  //压缩css
        .pipe(gulp.dest('./dist/css/'))

})
//删除文件
gulp.task('delFile',function(){
   del('./temp').then(function(){
       console.log("垃圾文件清除成功！！！！");
   })

})
//串行任务
gulp.task("task2",function () {
    sequence("cleanCss","delFile");
});

