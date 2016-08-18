var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// where all the files are
var src = {
    scss: 'app/style/sass/*.scss',
    css: 'app/style/css',
    html: 'app/views/*.html',
    js: 'app/js/**/*.js'
};

var bowerSrc = {
    angular: 'app/bower_components/angular/angular.js',
    "angular-ui-router": 'app/bower_components/angular-ui-router/release/angular-ui-router.js'
};

// Static Server + watching scss/html files
gulp.task('serve', function () {
    // start browserSync
    browserSync({
        server: {
            baseDir: "./app",
            index: "index.html"
        },
        // used port
        port: 8000,
        // browsers you want to open the project with
        browser: "Google Chrome Canary"
    });
});

// Compile sass into CSS
gulp.task('sass', function () {
    gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('watch', function () {
    gulp.watch(src.scss, ['sass']);
    gulp.watch([
        src.html, src.js, bowerSrc.angular, bowerSrc["angular-ui-router"]]).on('change', reload);
});

gulp.task('default', ['sass', 'serve'], function () {
    gulp.start('watch');
});


// Testing related scripts
var protractor = require("gulp-protractor").protractor;
var spawn = require('child_process').spawn;


gulp.task('run-protractor', ['default'], function () {
    function runProtractorConfig() {
        gulp.src('tests/e2e/**/*Spec.js')
            .pipe(protractor({
                configFile: 'tests/e2e/protractor-conf.js'
            }))
            .on('error', function (e) {
                throw e;
            });
    }

    spawn('webdriver-manager', ['start'], {
        stdio: 'inherit'
    }).once('close', runProtractorConfig);
});
