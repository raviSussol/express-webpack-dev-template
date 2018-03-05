import express from 'express';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack';
// import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddlware from 'webpack-hot-middleware';
import config from '../webpack.config';

const PORT = 3000;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware, (compiler, config.devServer));
app.use(webpackHotMiddlware, (compiler, config.devServer));
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);// eslint-disable-line no-console
});
