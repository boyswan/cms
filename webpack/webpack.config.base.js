var webpack = require('webpack');
var path = require('path')
var WebpackConfig = require('webpack-config').Config
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'

module.exports = new WebpackConfig().merge({
  context: path.join(__dirname, '..'),
  entry: {
    cms: ['./cms/app.js', hotMiddlewareScript],
  },
  resolve: {
    root: path.join(__dirname, '..'),
    extensions: ['', '.js'],
    alias: {
      cms: path.resolve('./cms'),
      public: path.resolve('./public')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'ReactDOM': 'react-dom',
      'React': 'react'
    })
  ],
  module: {
    loaders: [
      { test: /\.html$/, loader: 'file', query: { name: '[name].[ext]' } },
      { test: /\.js$|\.jsx$/, loader: 'babel', exclude: /node_modules/ },
    ]
  }
})
