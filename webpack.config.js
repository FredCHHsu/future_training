const webpack = require('webpack');

module.exports = {
  entry: [
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
          'react-hot',
          'babel?presets[]=es2015,presets[]=react',
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
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
  },
};
