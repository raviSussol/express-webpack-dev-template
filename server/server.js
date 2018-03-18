import express from 'express';
import path from 'path';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddlware from 'webpack-hot-middleware';
import config from '../bundler/transpiler';

const PORT = 3000;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  // contentBase: config.output.contentBase,
}));
app.use(webpackHotMiddlware(compiler));
// app.get('/', (req, res) => res.send('Hi there!'));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.html'));
// });
app.use(express.static(path.join(__dirname, '../src/index.html')));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);// eslint-disable-line no-console
});
