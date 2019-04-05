const { src, dest, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const gulpStylelint = require('gulp-stylelint')
const rename = require('gulp-rename')

function buildCSS () {
  return src('src/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ],
      fix: true
    }))
    .pipe(postcss())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./dist'))
}

exports.default = parallel(buildCSS)
