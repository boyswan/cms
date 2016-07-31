var webpack = require('webpack');
var path = require('path')
var WebpackConfig = require('webpack-config').Config

module.exports = new WebpackConfig().merge({
  context: path.join(__dirname, '..'),
  entry: {
    'client/client.bundle.js': './client/app.js',
    'cms/cms.bundle.js': './cms/app.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modules: [
      path.resolve('.'),
      path.resolve('./dist'),
      'node_modules'
    ]
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
