/* global __dirname */
import path from 'path';
// const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

module.exports = {
  entry: path.join(__dirname, '../src/js/index.js'), // our app entry
  // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md#react-15-compatibility
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react-addons-test-utils': 'react-dom',
  },
  module: {
    rules: [{
      // babel transpile
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      // file
      test: /\.(jpe?g|png|gif|ttf|woff|woff2|eot)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      }],
    }, {
      // index file
      test: /index\.html$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'index.[ext]',
        },
      }],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '',
  },
  stats: {
    warnings: false,
  },
  mode: env,
  // devServer: {
  //   port: process.env.WEBPACK_SERVER_PORT || 8080,
  //   contentBase: path.join(__dirname, 'build'),
  //   publicPath: '', // match the output `publicPath`
  // },
  devtool: isProd ? 'cheap-module-source-map' : 'eval',
};
