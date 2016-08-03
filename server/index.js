import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cms from './cms'
import webpack from 'webpack'
import config from '../webpack/webpack.config.dev'
import { setJSON, getJSON } from './utils'

const _DEV_ = process.env.NODE_ENV !== 'production'
const PORT = _DEV_ ? 3000 : 80
const PUBLIC_PATH = `${process.cwd()}`;

const app = express()
const compiler = webpack(config)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (_DEV_) app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }))

app.route('/api/cmsContent')
	.post((req, res) => setJSON(JSON.stringify(req.body), data => res.send({ data })))

app.route('/api/cmsContent')
	.get((req, res, next) => getJSON(data => res.send({ data })))

// app.get('/admin', (req, res) => {
//   res.header('Content-Type', 'text/html');
//   console.log('server hit')
//   fs.createReadStream(path.resolve(`${PUBLIC_PATH}/cms/index.html`)).pipe(res);
// })

app.use('*', (req, res) => {
  res.header('Content-Type', 'text/html');
  fs.createReadStream(path.resolve(`${PUBLIC_PATH}/cms/index.html`)).pipe(res);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
