module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 0
    }),
    require('postcss-sorting')({
      "order": [
        "at-rules",
        "custom-properties",
        "rules"
      ],
      "properties-order": "alphabetical"
    }),
    require('cssnano')({
      preset: 'default',
    })
  ]
}
