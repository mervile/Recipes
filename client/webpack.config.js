const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        //new CleanWebpackPlugin(['dist']),
        /*new HtmlWebpackPlugin({
            title: 'Hot Module Replacement'
        }),*/
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: {loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }},
                exclude: /node_modules/
              }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
};