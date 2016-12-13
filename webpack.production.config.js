const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const validate = require('webpack-validator'); // eslint-disable-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ManifestPlugin = require('webpack-manifest-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const CompressionPlugin = require('compression-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies

const PATHS = {
    PUBLIC: path.join(__dirname, 'public'),
    LIB: path.join(__dirname, 'lib'),
    DIST: path.join(__dirname, 'dist'),
    NODE_MODULES: path.join(__dirname, 'node_modules'),
};

const extractCss = new ExtractTextPlugin('vendor-[hash].min.css');
const extractStyl = new ExtractTextPlugin('app-[hash].min.css');

const config = {
    devtool: 'source-map',
    entry: {
        app: PATHS.PUBLIC,
    },
    output: {
        path: PATHS.DIST,
        filename: '[name]-[hash].min.js',
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: [PATHS.PUBLIC, PATHS.LIB],
                query: {
                    presets: ['react', 'es2015', 'stage-1'],
                    plugins: ['transform-decorators-legacy'],
                },
            },
            {
                test: /\.css$/,
                loader: extractCss.extract('style', ['css', 'postcss']),
            },
            {
                test: /\.styl$/,
                loader: extractStyl.extract('style', ['css?modules', 'postcss', 'stylus']),
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
            {
                test: /\/favicon.ico$/,
                include: [PATHS.PUBLIC],
                loader: 'file',
                query: {
                    name: 'favicon.ico?[hash:8]',
                },
            },
            {
                test: /\.html$/,
                loader: 'html',
                query: {
                    attrs: ['link:href'],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false,
            },
            mangle: {
                screw_ie8: true,
            },
            output: {
                comments: false,
                screw_ie8: true,
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        extractCss,
        extractStyl,
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
    ],
    postcss: () => [
        autoprefixer({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};

module.exports = validate(config);
