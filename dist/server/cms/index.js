'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCATION = __dirname + '/data.json';

var getJSON = function getJSON(fn) {
  return fn(JSON.parse(_fs2.default.readFileSync(LOCATION, 'utf8')));
};

var setJSON = function setJSON(data, fn) {
  _fs2.default.writeFile(LOCATION, data, function (err) {
    if (err) console.log(err);
    fn(JSON.parse(data));
  });
};

exports.default = function (app) {

  app.route('/api/cmsContent').post(function (req, res) {
    setJSON((0, _stringify2.default)(req.body, null, "\t"), function (data) {
      return res.send({ data: data });
    });
  });

  app.route('/api/cmsContent').get(function (req, res, next) {
    getJSON(function (data) {
      return res.send({ data: data });
    });
  });
};