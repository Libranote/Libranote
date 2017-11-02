const webpack = require('webpack')
const { resolve } = require('path')
const { readFileSync } = require('fs')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ReplacePlugin = require('webpack-plugin-replace')
const WebpackChunkHash = require('webpack-chunk-hash')
const requireRelative = require('require-relative')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function readJson (file) {
  if (file in readJson.cache) return readJson.cache[file]
  let ret
  try { ret = JSON.parse(readFileSync(file)) } catch (e) { }
  readJson.cache[file] = ret
  return ret
}
readJson.cache = {}

// attempt to resolve a dependency, giving $CWD/node_modules priority:
function resolveDep (dep, cwd) {
  try { return requireRelative.resolve(dep, cwd || process.cwd()) } catch (e) {}
  try { return require.resolve(dep) } catch (e) {}
  return dep
}

module.exports = function () {
  const cwd = process.cwd()
  const production = process.env.NODE_ENV === 'production'
  const src = resolve(cwd, 'src')
  const source = dir => resolve(src, dir)

  // Apply base-level `env` values
  const dest = resolve(cwd, 'libranote', 'libranote', 'static')
  const pkg = readJson(resolve(cwd, 'package.json')) || {}

  const babelrc = readJson(resolve(cwd, '.babelrc')) || {}
  const browsers = pkg.browserslist || ['> 1%', 'last 2 versions', 'IE >= 9']

  const nodeModules = resolve(cwd, 'node_modules')

  return {
    entry: source('index.js'),
    output: {
      path: dest,
      publicPath: '/',
      filename: production ? '[name].[chunkhash:5].js' : '[name].js',
      chunkFilename: '[name].chunk.[chunkhash:5].js'
    },
    context: src,

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss', '.sass', '.css'],
      alias: {
        'style': source('style'),
        'preact$': resolveDep(production ? 'preact/dist/preact.min.js' : 'preact', cwd),
        // preact-compat aliases for supporting React dependencies:
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-addons-css-transition-group': 'preact-css-transition-group'
      }
    },

    module: {
      loaders: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: babelrc
        },
        { // SASS
          enforce: 'pre',
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: 'proxy-loader',
              options: {
                cwd,
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: [nodeModules]
                }
              }
            }
          ]
        },
        { // User styles
          test: /\.(css|less|s[ac]ss|styl)$/,
          include: [
            source('components'),
            source('routes')
          ],
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]__[hash:base64:5]',
                  importLoaders: 1,
                  sourceMap: production
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: [autoprefixer({ browsers })]
                }
              }
            ]
          })
        },
        { // External / `node_module` styles
          test: /\.(css|less|s[ac]ss|styl)$/,
          exclude: [
            source('components'),
            source('routes')
          ],
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: production
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: [autoprefixer({ browsers })]
                }
              }
            ]
          })
        },
        { // Arbitrary file loaders
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(xml|html|txt|md)$/,
          loader: 'raw-loader'
        },
        {
          test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i,
          loader: production ? 'file-loader' : 'url-loader'
        }
      ]
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
      }),
      // Extract CSS
      new ExtractTextPlugin({
        filename: production ? 'style.[contenthash:5].css' : 'style.css',
        disable: !production,
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: false,
        minChunks: 3
      }),
      new ProgressBarPlugin({
        format: '\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m',
        renderThrottle: 100,
        summary: false,
        clear: true
      }),
      new CopyWebpackPlugin([
        { from: 'manifest.json' },
        { from: 'assets', to: 'assets' }
      ])
    ].concat(production ? [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new WebpackChunkHash(),

      // strip out babel-helper invariant checks
      new ReplacePlugin({
        include: /babel-helper$/,
        patterns: [{
          regex: /throw\s+(new\s+)?(Type|Reference)?Error\s*\(/g,
          value: s => `return;${Array(s.length - 7).join(' ')}(`
        }]
      })
    ] : []),

    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',

    node: {
      console: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false
    }
  }
}
