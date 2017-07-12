const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve('./main.ts'),
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    externals: {
        three: 'THREE'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.scss'],
        modules: [
            path.resolve(__dirname, 'app'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: path.resolve('assets'), to: path.resolve('dist/assets')}
        ]),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'app/index.html',
            chunksSortMode: function (a, b) {

                return a.names[0] > b.names[0] ? -1 : 1;
            }
        })
    ]
};