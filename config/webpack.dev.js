var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var Dotenv = require('dotenv-webpack');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new Dotenv({
      path: helpers.root('.env')
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    noInfo: true,
    port: 8001
  }
});