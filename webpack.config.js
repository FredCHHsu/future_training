module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/public/`,
    publicPath: '/public/',
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
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
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
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};
