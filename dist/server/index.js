'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cms = require('./cms');

var _cms2 = _interopRequireDefault(_cms);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('../webpack/webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __DEV__ = process.env.NODE_ENV !== 'production';
var PORT = __DEV__ ? 3000 : 80;
var PUBLIC_PATH = '' + process.cwd();

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

if (__DEV__) {
	(function () {
		var compiler = (0, _webpack2.default)(_webpackConfig2.default);
		var middleware = (0, _webpackDevMiddleware2.default)(compiler, {
			publicPath: _webpackConfig2.default.output.publicPath,
			contentBase: 'cms',
			stats: {
				hot: true,
				inline: true,
				colors: true,
				hash: false,
				timings: true,
				chunks: false,
				chunkModules: false,
				modules: false
			}
		});

		app.use(middleware);
		app.use((0, _webpackHotMiddleware2.default)(compiler));
		app.use('*', function (req, res) {
			// res.header('Content-Type', 'text/html');
			// fs.createReadStream(path.resolve(`${PUBLIC_PATH}/cms/index.html`)).pipe(res);
			res.write(middleware.fileSystem.readFileSync(_path2.default.join(__dirname, '..', 'cms/index.html')));
			res.end();
		});
		// app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }))
	})();
} else {
	app.get('*', function (req, res) {
		res.header('Content-Type', 'text/html');
		_fs2.default.createReadStream(_path2.default.resolve(PUBLIC_PATH + '/cms/index.html')).pipe(res);
	});
}

app.use('/public', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.route('/api/cmsContent').post(function (req, res) {
	return (0, _utils.setJSON)((0, _stringify2.default)(req.body), function (data) {
		return res.send({ data: data });
	});
}).get(function (req, res, next) {
	return (0, _utils.getJSON)(function (data) {
		return res.send({ data: data });
	});
});

// app.route('/api/post')
// 	.post((req, res) => )

// app.get('/admin', (req, res) => {
//   res.header('Content-Type', 'text/html');
//   console.log('server hit')
//   fs.createReadStream(path.resolve(`${PUBLIC_PATH}/cms/index.html`)).pipe(res);
// })


app.listen(PORT, function () {
	return console.log('listening on port ' + PORT);
});