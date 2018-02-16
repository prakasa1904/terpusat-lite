import config from 'config';
import path from 'path';
import webpack from 'webpack';

import arrOfPlugins, { ExtractTextPluginConfig } from './default.plugin';
import productionPlugin from './production.plugin';
import developmentPlugin from './development.plugin';

productionPlugin(webpack, arrOfPlugins);
developmentPlugin(webpack, arrOfPlugins);

module.exports = {
  entry: config.isDevel
    ? './public/index.js'.concat('?webpack-hot-middleware/client?path=/__webpack_hmr')
    : './public/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx|flow)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: config.isDevel ? '.babelCache' : false,
        },
      },
    ],
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|flow)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPluginConfig.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                import: false,
                minimize: true,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
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
                speed: 1,
              },
            },
          },
        ],
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: arrOfPlugins,
};
