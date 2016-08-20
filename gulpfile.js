const gulp = require('gulp');
const mocha = require('gulp-mocha');
 
gulp.task('default', () => 
    gulp.src('./test/*.js')
        .pipe(mocha())
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        })
);