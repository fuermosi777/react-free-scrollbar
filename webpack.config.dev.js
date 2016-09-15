/* global __dirname */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './demo/src/entry.jsx'
    ],
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'demo.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.less$/,
            loader: 'style!css-loader!less-loader'
        }, {
            test: /\.(css)$/,
            loader: 'style!css-loader'
        }, {
            test: /\.(png|jpg|jpeg|svg)$/,
            loader: 'file'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
