const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production' || process.argv.indexOf('-p') !== -1;

const plugins = isProduction ?
[
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  }),
] : [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        failOnError: false,
        failOnWarning: false,
      },
    },
  }),
];

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/public/js`,
    publicPath: '/js', // relative to contentBase
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        query: {
          configFile: './.eslintrc',
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.csv$/, loader: 'dsv-loader' },
    ],
  },
  plugins,
  devtool: !isProduction ? 'cheap-module-eval-source-map' : false,
  devServer: !isProduction ? {
    historyApiFallback: true,
    contentBase: './public',
  } : {},
};

