module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + "/dist",
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [
      ".js",
      ".json",
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          "babel-loader"
        ],
      },
      {
        test: /\.json$/,
        loaders: [
          "json",
        ],
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
