var webpack = require('webpack');
var path = require('path')
var WebpackConfig = require('webpack-config').Config
var base = path.join(__dirname, '..', 'webpack/webpack.config.base.js')

module.exports = new WebpackConfig().extend(base).merge({
  debug: true,
  devtool: 'eval',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]____[hash:base64:4]'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
})
