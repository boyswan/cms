'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setJSON = exports.getJSON = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCATION = __dirname + '/data.json';
// 
// const schema = Joi.object().keys({
//   info: Joi.string(),
//   pages: Joi.array().items(page)
// })
//
// const page = Joi.object().keys({
//   name: Joi.string().required(),
//   content: Joi.array().items(content)
// });
//
// const content = Joi.object().keys({
//   header: Joi.string().required(),
//   intro: Joi.string().required(),
//   body: Joi.string().required(),
//   posts: Joi.array().items(posts)
// })
//
// const posts = Joi.object().keys({
//   id: Joi.number().required(),
//   title: Joi.string().required(),
//   created: Joi.string().required(),
//   type: Joi.string().required(),
//   desc: Joi.string().optional(),
//   src: Joi.string().optional(),
//   body: Joi.string().optional()
// })
//


// export const validateJSON = ( data, schema ) => {
//   return Joi.validate(data, schema, (err, value) => {
//     console.log(err, value)
//   })
// }

var getJSON = exports.getJSON = function getJSON(fn) {
  return fn(JSON.parse(_fs2.default.readFileSync(LOCATION, 'utf8')));
};

var setJSON = exports.setJSON = function setJSON(data, fn) {
  // const validate = validateJSON(data, schema, (err, value) => {
  //   console.log(err, value)
  // })
  _fs2.default.writeFile(LOCATION, data, function (err) {
    if (err) console.log(err);
    fn(JSON.parse(data));
  });
};