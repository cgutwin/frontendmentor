const { src, dest, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const gulpStylelint = require('gulp-stylelint')
const rename = require('gulp-rename')
const htmlReplace = require('gulp-html-replace')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')

function assets () {
  return src('src/*/assets/*')
    .pipe(dest('./dist'))
}

function lib () {
  return src('src/*/lib/*')
    .pipe(dest('./dist'))
}

function images () {
  return src(['src/*/assets/*.jpg', 'src/*/assets/*.png', 'src/*/assets/*.svg'])
    .pipe(imagemin())
    .pipe(dest('./dist'))
}

function indexHtml () {
  return src('src/*/index.html')
    .pipe(htmlReplace({
      'css': 'style.min.css',
      'js': {
        'src': './assets/favicon-32x32.png',
        'tpl': '<link rel="icon" type="image/png" href="%s">'
      }
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      maxLineLength: 120,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }))
    .pipe(dest('./dist'))
}

function css () {
  return src(['src/**/*.css', '!src/**/lib/*.css'])
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

exports.css = css
exports.indexHtml = indexHtml
exports.assets = assets
exports.lib = lib
exports.default = parallel(assets, css, images, indexHtml, lib)
