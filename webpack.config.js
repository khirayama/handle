const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
  devtool: 'inline-source-map',
};
