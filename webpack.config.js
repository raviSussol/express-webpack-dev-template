import path from 'path';
import webpack, { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { CommonsChunkPlugin } = webpack.optimize;

const env = process.env.NODE_ENV || 'developement';
const isProd = process.env.NODE_ENV === 'production';

// getEntrySources gets sources for webpack entry paths, by environment
function getEntrySources(sources) {
  if (!isProd) {
    sources.push(`webpack-dev-server/client?http://localhost:${process.env.WEBPACK_SERVER_PORT || '8080'}`);
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    sources.push('webpack/hot/only-dev-server');
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
  }
  return sources;
}

module.exports = {
  entry: getEntrySources([
    'react-hot-loader/patch', // activate HMR for React - needs to be 1st
    path.join(__dirname, 'src/js/index.js'), // our app entry
  ]),
  module: {
    rules: [
      {
        // babel transpile
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|eot|ttf|json|xml)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash:5]',
          },
        },
      },
    ],
  },
  output: {
    chunkFilename: '[name].js',
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'commons',
      // the commons chunk name
      filename: 'commons.js',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      template: './index.html',
      env: env,
    }),
    new HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  stats: {
    warnings: false,
  },
  devServer: {
    hot: true, // enable HMR on the server
    port: process.env.WEBPACK_SERVER_PORT || 8080,
    // https://webpack.js.org/configuration/dev-server/#devserver-proxy
    proxy: {
      '/placeholder': {
        // i.e.  MSUPPLY_SERVER_URL=http://192.168.3.174:8080/customer yarn start
        target: process.env.MSUPPLY_SERVER_URL || 'http://localhost:2048',
        // rewrite path not to pass /api
        pathRewrite: { '^/placeholder': '' },
      },
    },
  },
  devtool: isProd ? 'cheap-module-source-map' : 'eval',
};
