import config from 'config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  favicon: './public/img/favicon.ico',
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
});
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  disable: config.isDevel,
});
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: 'static',
    to: 'assets',
  },
]);
const SWPrecacheWebpackPluginConfig = new SWPrecacheWebpackPlugin({
  cacheId: '[name]-cache-v1',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  minify: true,
  navigateFallback: 'index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
});

const arrOfPlugins = [
  HtmlWebpackPluginConfig,
  ExtractTextPluginConfig,
  CopyWebpackPluginConfig,
  SWPrecacheWebpackPluginConfig,
];

export { ExtractTextPluginConfig };
export default arrOfPlugins;
