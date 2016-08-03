import fs from 'fs'
import routes from './routes'

const LOCATION = `${__dirname}/data.json`

const getJSON = fn => fn(JSON.parse(fs.readFileSync(LOCATION, 'utf8')))

const setJSON = (data, fn) => {
  fs.writeFile(LOCATION, data, err => {
    if(err) console.log(err)
    fn(JSON.parse(data))
  })
}

export default app => {

  app.route('/api/cmsContent')
  	.post((req, res) => {
      setJSON(JSON.stringify(req.body, null, "\t"), data => res.send({ data }))
  	})

  app.route('/api/cmsContent')
    .get((req, res, next) => {
      getJSON(data => res.send({ data }))
    })

}
