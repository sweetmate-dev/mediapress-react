const base = require('./webpack.base')

module.exports = function(){
  let config = base()
  config.devtool = 'source-map'
  config.module.rules.push({
    test: /\.s.ss$/,
    use: [
      'style-loader',
      {loader: 'css-loader', options: {sourceMap: true}},
      //'postcss-loader',
      {loader: 'sass-loader', options: {sourceMap: true}}
    ]})
  config.devServer = {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        secure: false,
        pathRewrite: { '^/api': '/api' }
      }
    },
    hot: true,
    historyApiFallback: true,
    overlay: true,
    index: 'index.dev.html'
  }
  return config
}
