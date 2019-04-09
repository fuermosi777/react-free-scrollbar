/* global __dirname */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./demo/src/entry.tsx'],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 8080,
  },
  output: {
    filename: 'dev.js',
    path: path.resolve(__dirname, 'demo'),
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
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
};
