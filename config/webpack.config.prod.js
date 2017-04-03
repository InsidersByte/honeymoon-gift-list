/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');

const extractCss = new ExtractTextPlugin('static/css/vendor.[chunkhash:8].min.css');
const extractStyl = new ExtractTextPlugin('static/css/app.[chunkhash:8].min.css');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    app: paths.appIndexJs,
  },
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: 'eslint-loader',
        include: [paths.appSrc, paths.appLib],
      },
      {
        test: /\.(js|jsx)$/,
        include: [paths.appSrc, paths.appLib],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.styl$/,
        include: paths.appSrc,
        use: extractStyl.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'postcss-loader', 'stylus-loader'],
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\/favicon.ico$/,
        include: paths.appPublic,
        use: {
          loader: 'file-loader',
          options: {
            name: 'favicon.ico?[hash:8]',
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['link:href'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
    extractCss,
    extractStyl,
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
