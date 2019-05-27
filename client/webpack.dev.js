const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        proxy: {
            "/api/**": {
                target: "http://[::1]:8000",
            }
        }
    },
});