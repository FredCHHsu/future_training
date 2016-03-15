module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + "/public/",
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        loaders: ["style", "css", "resolve-url", "sass?sourceMap"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx' ,'.scss']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
