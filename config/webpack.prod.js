const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.base')

module.exports = function() {
  let config = base()
  config.stats = 'minimal'
  config.performance = {
    hints: "warning",
    assetFilter: file => true
  }

  // Extract CSS to styles.css
  config.module.rules.push({
    test: /\.s.ss$/,
    use: ExtractTextPlugin.extract({use: ['css-loader', 'postcss-loader', 'sass-loader']})
  })
  config.plugins.push(new ExtractTextPlugin('style.css'))

  // JS Minification
  // config.plugins.push(new webpack.LoaderOptionsPlugin({minimize: true,debug: false}))
  config.optimization = {minimize: true}
  return config
}
