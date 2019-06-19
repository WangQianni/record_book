const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports= {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(sass|scss)$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(jpg|png|gif|webp|ttf|svg|eot|woff|mp3)$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve('src/views/')
        },
        extensions: ['.js', '.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 9000,
        hot: true,
        open: true
    },
    mode: 'development'
}