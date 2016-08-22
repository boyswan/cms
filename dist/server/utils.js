'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setJSON = exports.getJSON = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCATION = __dirname + '/data.json';

var getJSON = exports.getJSON = function getJSON(fn) {
  return fn(JSON.parse(_fs2.default.readFileSync(LOCATION, 'utf8')));
};

var setJSON = exports.setJSON = function setJSON(data, fn) {
  _fs2.default.writeFile(LOCATION, data, function (err) {
    if (err) console.log(err);
    fn(JSON.parse(data));
  });
};