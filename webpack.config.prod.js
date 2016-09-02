/* global __dirname */
var webpack = require('webpack');

module.exports = {
    entry: [
        './demo/src/entry.jsx'
    ],
    output: {
        path: __dirname + '/demo/prod/',
        publicPath: 'http://localhost:8080/',
        filename: 'demo.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react'],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.less$/,
            loader: 'style!css-loader!autoprefixer!less-loader'
        }, {
            test: /\.(css)$/,
            loader: 'style!css-loader!autoprefixer'
        }, {
            test: /\.(png|jpg|jpeg|svg)$/,
            loader: 'file'
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
