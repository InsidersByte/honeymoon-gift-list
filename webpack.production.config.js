const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PATHS = {
    PUBLIC: path.join(__dirname, 'public'),
    DIST: path.join(__dirname, 'dist'),
    NODE_MODULES: path.join(__dirname, 'node_modules'),
};

const extractCss = new ExtractTextPlugin('vendor-[hash].min.css');
const extractStyl = new ExtractTextPlugin('app-[hash].min.css');

module.exports = {
    entry: {
        app: PATHS.PUBLIC,
        vendor: [
            'react', 'moment', 'react-bootstrap', 'react-dom', 'flux', 'react-router', 'react-toastr', 'superagent',
            'classnames', 'jwt-decode',
        ],
    },
    output: {
        path: PATHS.DIST,
        filename: '[name]-[hash].min.js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: extractCss.extract('style', ['css', 'postcss']),
            },
            {
                test: /\.styl$/,
                loader: extractStyl.extract('style', ['css?modules', 'postcss', 'stylus']),
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: PATHS.PUBLIC,
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
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true,
            },
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        extractCss,
        extractStyl,
    ],
    postcss: () => [autoprefixer],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
