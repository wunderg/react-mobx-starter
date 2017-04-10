const {resolve} = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd, ifDev} = getIfUtils(env);
  const config = {
    context: resolve('src'),
    entry: {
      app: removeEmpty([
        ifNotProd('react-hot-loader/patch'),
        ifNotProd('webpack/hot/dev-server'),
        ifNotProd('webpack-hot-middleware/client?http://localhost:8080/__webpack_hmr'),
        './index.js'
      ]),
        vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'babel-polyfill', 'material-ui'],
    },
    output: {
      filename: ifDev('[name].chunk.js', '[name].[hash].chunk.js'),
      path: resolve(__dirname, '.', 'dist'),
      pathinfo: ifNotProd(),
      publicPath: '/'
    },
    devtool: ifNotProd('source-map', 'eval'),
    module: {
      loaders: [
       {
          test: /\.js$/,
          loaders: removeEmpty(['babel-loader']),
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
         loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader'})
        },
        {
          test: /\.scss$/,
         loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader'})
        },
      ],
    },
    plugins: removeEmpty([
      new ManifestPlugin(),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest'], minChunks: Infinity}),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        inject: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
      ifNotProd(new webpack.NoErrorsPlugin()),
      ifNotProd(new webpack.HotModuleReplacementPlugin()),
      ifNotProd(new webpack.NamedModulesPlugin()),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.UglifyJsPlugin()),
    ]),
    resolve: {
    // add alias for application code directory
    alias:{
    },
    extensions: [ '.jsx', '.js' ]
  },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      quiet: true,
      publicPath: resolve('/')
    }
  }

  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }

  return config;
}
