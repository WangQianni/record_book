let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports= {
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,  //文件变动后多久发起构建，越大越好
        poll: 1000,  //每秒询问次数，越小越好
    },
    entry: {
        vueList: ['vue', 'vue-router'],
        Mint: 'mint-ui',
        bundle: path.join(__dirname, '../src/main.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, // 第三方的不管
                loader: "babel-loader" 
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|gif|jpg)$/,
                loader: 'url-loader?limit=8000&name=images/[name]-[hash:5].[ext]'
            },
            {
                test: /\.(ttf|svg|eot|woff|wav|mp3)$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        modules: [path.resolve('node_modules')],
        mainFields: ['main'],
        alias: {
            '@': path.resolve('src/views')
        },
        extensions: ['.js', '.vue']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true 
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin('../dist'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            minify: { //压缩html中哪些东西
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
            allChunks: true
        })
    ],
    mode: 'production' 
}