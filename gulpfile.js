const gulp = require('gulp')
const mocha = require('gulp-mocha')

gulp.task('default', () =>
    gulp.src('./test/**/*.js')
        .pipe(mocha())
        .once('error', () => {
          console.log(arguments[2])
          process.exit(1)
        })
        .once('end', () => {
          process.exit()
        })
)

gulp.task('developing', () => {
  gulp.watch(['test/', 'lib/'], ['default'])
})
