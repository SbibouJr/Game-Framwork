const path = require('path');

module.exports = {
  entry: './src',
  mode: 'production',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        loaders: [{
          loader: 'url-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src/assets/',
          }
        }],
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'to-string-loader',
          },
          {
            loader: 'css-loader',
          },
        ]
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
