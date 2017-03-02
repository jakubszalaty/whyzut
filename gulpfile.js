'use strict'

const gulp = require('gulp')
const vulcanize = require('gulp-vulcanize')

gulp.task('vulcanize', function () {
    return gulp.src('www/webelements/main-app/main-app.html')
        .pipe(vulcanize({
            stripComments: true,
            inlineScripts: true,
            inlineCss: true
        }))
        .pipe(gulp.dest(`${__dirname}/www/dist/`))
})

gulp.task('moveAssets', function () {
    return gulp.src([
        'www/bower_components/webcomponentsjs/webcomponents-lite.js',
        'www/bower_components/moment/moment.js',
        'www/bower_components/moment/min/moment-with-locales.js',
        'www/bower_components/moment/locale/pl.js',
        'www/bower_components/jquery/dist/jquery.js',
    ])
        .pipe(gulp.dest(`${__dirname}/www/dist/`))
})

gulp.task('default', ['vulcanize', 'moveAssets'])
