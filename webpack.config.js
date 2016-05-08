const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    PUBLIC: path.join(__dirname, 'public'),
    LIB: path.join(__dirname, 'lib'),
    BUILD: path.join(__dirname, 'build'),
    NODE_MODULES: path.join(__dirname, 'node_modules'),
};

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        PATHS.PUBLIC,
    ],
    output: {
        path: PATHS.BUILD,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.styl$/,
                loaders: ['style', 'css?modules', 'stylus'],
                include: PATHS.PUBLIC,
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: [PATHS.PUBLIC, PATHS.LIB],
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            filename: 'index.html',
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
