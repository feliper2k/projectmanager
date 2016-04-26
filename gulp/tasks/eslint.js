'use strict';

import config from '../config';
import gulp   from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('eslint', () => {
  return gulp.src([config.scripts.src, '!app/js/templates.js', config.scripts.test, config.scripts.gulp])
    .pipe(eslint({
        rules: {
            'no-unused-vars': 'off'
        }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
