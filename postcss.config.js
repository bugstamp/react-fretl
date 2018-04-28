module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-nested'),
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 10',
      ],
      flexbox: 'no-2009',
    }),
  ],
};
