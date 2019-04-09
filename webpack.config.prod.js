/* global __dirname */
const webpack = require('webpack');

module.exports = {
  entry: ['./demo/src/entry.tsx'],
  output: {
    path: __dirname + '/site',
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
};
