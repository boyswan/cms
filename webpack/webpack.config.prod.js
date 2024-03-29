var webpack = require('webpack');
var path = require('path')
var WebpackConfig = require('webpack-config').Config
var base = path.join(__dirname, '..', 'webpack/webpack.config.base.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new WebpackConfig().extend(base).merge({
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]____[hash:base64:4]')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    //   filename: 'vendor.bundle.js'
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ],
})
