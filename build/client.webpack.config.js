import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

const useSourceMap = process.env.SOURCE_MAP && process.env.SOURCE_MAP !== 'false';

export default ({
  path,
  appRootDir,
  webpack,
  ifDev,
  ifProd,
  ifAnalyze,
  isDev,
  isProd,
  isAnalyze,
  isVerbose,
  mainConfig,
  styleConfig,
}) => {
  return {
    ...mainConfig({ isClient: true }),
    name: 'client',
    target: 'web',
    devtool: ifDev('cheap-module-source-map', 'source-map'),
    performance: {
      hints: isProd ? 'warning' : false,
      assetFilter: assetFilename => !/\.map|server.js$/.test(assetFilename),
    },
    entry: {
      client: [
        ...ifDev(
          ['react-error-overlay', 'react-hot-loader/patch', 'webpack-hot-middleware/client?name=client&reload=true'],
          [],
        ),
        path.resolve(appRootDir.get(), './src/client.js'),
      ],
    },
    output: {
      ...mainConfig({ isClient: true }).output,
      path: path.resolve(appRootDir.get(), './public/static/'),
      filename: ifDev('[name].js', '[name].[chunkhash].js'),
      chunkFilename: ifDev('chunk.[name].js', 'chunk.[name].[chunkhash].js'),
      crossOriginLoading: 'anonymous',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        ...mainConfig({ isClient: true }).module.rules,
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: styleConfig({ isClient: true }).slice(1),
            allChunks: true,
            disable: isDev,
          }),
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            disable: isDev,
            use: styleConfig({ isClient: true }).slice(1),
          }),
        },
      ],
    },
    optimization: {
      minimize: isProd,
      runtimeChunk: {
        name: 'terpusat',
      },
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'initial',
            minSize: 1,
          },
        },
      },
    },
    plugins: [
      ...mainConfig({ isClient: true }).plugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': ifDev('"development"', '"production"'),
        'process.env.BROWSER': true,
        __DEV__: isDev,
        __PROD__: isProd,
        __CLIENT__: true,
        __SERVER__: false,
        __DISABLE_SSR__: isAnalyze,
        __DEVELOPMENT__: isDev,
        __DEVTOOLS__: isVerbose,
      }),
      ...ifDev([new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()], []),
      ...ifProd(
        [
          new SWPrecacheWebpackPlugin({
            minify: true,
            cacheId: 'terpusat-sw-cache-v1',
            filename: 'terpusat-worker.js',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            mergeStaticsConfig: true,
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/(cdn|jscdn|pulsa|connect|api)\.(branch|zarget|appier|facebook|sociaplus)\.io\//,
                handler: 'cacheFirst',
              },
            ],
            staticFileGlobsIgnorePatterns: [
              /chunk.*.*.js$/,
              /\.(png|jpg|svg|gif|woff|woff2)$/,
              /\.map$/,
              /assets\.json$/,
              /terpusat-worker\.js$/,
              /manifest\.json$/,
              /\.gz$/,
            ],
          }),
        ],
        [],
      ),
      new AssetsPlugin({
        filename: 'assets.json',
        path: path.resolve(appRootDir.get(), './public'),
      }),
      // Webpack Bundle Analyzer
      // https://github.com/th0r/webpack-bundle-analyzer
      ...ifAnalyze([new BundleAnalyzerPlugin()], []),
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    // https://webpack.github.io/docs/configuration.html#node
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
};
