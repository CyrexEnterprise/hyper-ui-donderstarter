// Include gulp & del
var gulp = require('gulp'); 
var del = require('del');

// Include Our Plugins
var jshint = require('gulp-jshint');
var addsrc = require('gulp-add-src');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var tap = require('gulp-tap');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');
var handlebars = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(handlebars);

var dirs = {
    source: 'src',
    release: 'dist',
    components: 'src/components'
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Clean
gulp.task('clean', function (cb) {
    del([dirs.release], cb);
});

// Copy files
gulp.task('copy:html', function() {
    return gulp.src(dirs.source+'/*.html')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:images', function() {
    return gulp.src(dirs.source+'/images/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:scripts', function() {
    return gulp.src([
            /*  
             * Add vendor scripts here
             * 
             * Example:
             * dirs.source+'/vendor/jquery/dist/jquery.min.js', 
             */
        ]).pipe(copy(dirs.release, {prefix: 1}));
});


// Lint Tasks
gulp.task('lint:before', function() {
    return gulp.src(dirs.source+'/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('lint:after', ['minify'], function() {
    return gulp.src([
            dirs.release+'/js/built.min.js',
            dirs.release+'/js/built.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Handlerbars task
gulp.task('handlebars', function(){
    var templateData = {},
        options = {
            partialsDirectory : [dirs.components]
        },
        filename;

    return gulp.src(dirs.source+'/pages/*.hbs')
        .pipe(gulpHandlebars(templateData, options))
        .pipe(rename(function(path){
             filename = path.basename
			 path.extname = ".html"
         }))
        .pipe(gulp.dest(dirs.release+'/pages'));
});

// Concatenate & Minify JS
gulp.task('concat', function() {
    return gulp.src(dirs.source+'/js/*.js')
        .pipe(concat('built.js'))
        .pipe(gulp.dest(dirs.release+'/js'));
});
gulp.task('minify', function() {
    return gulp.src(dirs.release+'/js/built.js')
        .pipe(rename('built.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.release+'/js'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(dirs.source+'/css/main.scss')
        .pipe(sass())
        .on('error', handleError)
        .pipe(gulp.dest(dirs.release+'/css'));
});

function watcher() {

    gulp.watch(dirs.source+'/*.html', ['copy:html', 'handlebars']);
    gulp.watch(dirs.components+'/**/*.hbs', ['handlebars']);
    gulp.watch(dirs.components+'/**/*.html', ['handlebars']);
    gulp.watch(dirs.source+'/pages/*.hbs', ['handlebars']);
    gulp.watch(dirs.source+'/js/*.js', ['lint:before', 'concat']);
    gulp.watch(dirs.source+'/css/*.scss', ['sass']);
}

// Watch
gulp.task('watch', watcher);

// Build and release tasks
gulp.task('release', function(callback){
    runSequence('build', ['minify', 'lint:after'], callback);
}); 
gulp.task('build', function(callback){
    runSequence('clean', ['copy:images', 'handlebars', 'copy:html', 'copy:scripts', 'sass', 'lint:before', 'concat'], callback);
}); 
gulp.task('default', ['build', 'watch']);