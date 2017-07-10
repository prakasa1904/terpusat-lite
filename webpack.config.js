const path = require('path')
const webpack = require('webpack')
const { UglifyJsPlugin } = webpack.optimize
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  favicon: './public/img/favicon.ico',
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: "[name].[hash].css",
    disable: process.env.NODE_ENV === "development"
})
const CopyWebpackPluginConfig = new CopyWebpackPlugin(
  [
    {
      from: 'static', 
      to: 'assets'
    }
  ])
const UglifyJsPluginConfig = new UglifyJsPlugin({
  compress: {
    warnings: false,
    unused: true,
    dead_code: true,
  },
})
const SWPrecacheWebpackPluginConfig = new SWPrecacheWebpackPlugin({
  cacheId: '[name]-cache-v1',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  minify: true,
  navigateFallback: 'index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
})

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ],
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|flow)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.css$/,
        use: ExtractTextPluginConfig.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
                import: false,
                minimize: true,
              }
            },
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '30',
                speed: 1
              }
            }
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    CopyWebpackPluginConfig,
    UglifyJsPluginConfig,
    SWPrecacheWebpackPluginConfig
  ]
}