/* global __dirname */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './demo/entry.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: 'http://localhost:8080/',
        filename: 'demo.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer!less-loader')
        }, {
            test: /\.(css)$/,
            loader: ExtractTextPlugin.extract('style', 'css-loader!autoprefixer')
        }, {
            test: /\.(png|jpg|jpeg|svg)$/,
            loader: 'file'
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("demo.css")
    ]
};
