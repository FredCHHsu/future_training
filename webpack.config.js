const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = isProduction ?
[
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
] : [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  }),
];

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/public/js`,
    publicPath: '/js', // relative to contentBase
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        configFile: './.eslintrc',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  eslint: {
    failOnError: false,
    failOnWarning: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
  },
};
