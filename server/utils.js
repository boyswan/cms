import fs from 'fs'
import Joi from 'joi'
const LOCATION = `${__dirname}/data.json`
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

export const getJSON = fn => fn(JSON.parse(fs.readFileSync(LOCATION, 'utf8')))

export const setJSON = (data, fn) => {
  // const validate = validateJSON(data, schema, (err, value) => {
  //   console.log(err, value)
  // })
  fs.writeFile(LOCATION, data, err => {
    if(err) console.log(err)
    fn(JSON.parse(data))
  })
}
