const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const resolve = require('path').resolve;
const fs = require('fs');

const app = express();

const router = new express.Router();
const appRouter = new express.Router();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(router);
app.use(appRouter);

let number = 0;
let todos = [
  {text: 'Eat Breakfast', id: 197, done: false, show: true},
  {text: 'Eat candys', id: 198, done: false, show: true},
  {text: 'Get ready for presentation', id: 199, done: false, show: true},
];
router.use((req, res, next) => {
  console.log(number++, req.url);
  next();
});

router.get('/api/todos', (req, res) => {
  res.json({todos})
});

router.post('/api/todos', (req, res) => {
  todos.push(req.body.todo);
  res.json({saved: true});
});

if (process.env.NODE_ENV !== 'production') {
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const config = require('./webpack.config.babel')('development');
  const webpack = require('webpack');
  const compiler = webpack(config);

  compiler.apply(new DashboardPlugin(Dashboard.setData));

  app.use(require('webpack-dev-middleware')(compiler, compiler.devServer));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use('/login', function (req, res, next) {
    var filename = path.join(compiler.outputPath, 'login.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });

  app.use('**/**', function (req, res, next) {
    var filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  console.log('PRODUCTION');
  app.use('/', express.static(resolve(__dirname, '../', 'dist')));
}

app.listen(port);
console.log(`Running on port ${port}`);

module.exports = app;
