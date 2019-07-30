const webpack = require('webpack')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function () {
  const cwd = process.cwd()
  const production = process.env.NODE_ENV === 'production'
  const source = dir => resolve(cwd, 'lib', dir)

  const dest = resolve(cwd, 'libranote', 'libranote', 'static')

  return {
    entry: source('index.js'),
    output: {
      path: dest,
      publicPath: '/',
      filename: production ? '[name].[chunkhash:5].js' : '[name].js',
      chunkFilename: '[name].chunk.[chunkhash:5].js'
    },
    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loaders: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader: 'elm-webpack-loader?verbose=true&warn=true'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ],

      noParse: /\.elm$/
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
      }),
      new CopyWebpackPlugin([
        { from: 'manifest.json' },
        { from: 'assets', to: 'assets' }
      ])
    ],
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map'
  }
}
