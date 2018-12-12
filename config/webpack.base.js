const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path')
const dirname = __dirname !== undefined ? __dirname : console.error('Cannot find memes')

/**
 * Base Webpack Config
 *
 * Loaded at the start of every webpack config
 */
module.exports = function() {
  return {
    context: path.resolve(dirname, '../src'),
    entry: './main.ts',
    resolve: {
      modules: [
        'node_modules',
        path.resolve(dirname, '../src'),
      ],
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      path: path.resolve(dirname, '../dist'),
      filename: 'app.js'
    },
    module: {
      rules: [
        { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'},
        { test: /\.png/,
          loader: 'file-loader?name=img/[name].[ext]'},
        { test: /\.(ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'awesome-typescript-loader' }
      ]
    },
    plugins: [
      new FriendlyErrorsPlugin(),
      new CheckerPlugin(),
      new CopyWebpackPlugin([
        { from: '../static', to: 'static', ignore: ['*favicon.png', '*.html'] },
        { from: '../static/favicon.png', to: 'favicon.png'},
        { from: '../static/index.html', to: 'index.html'},
        { from: '../static/index.dev.html', to: 'index.dev.html' },
        { from: '../static/magic.css', to: 'magic.css'},
      ])
    ]
  }
}
