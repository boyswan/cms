import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cms from './cms'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import historyApiFallback   from 'connect-history-api-fallback';
import config from '../webpack/webpack.config.dev'
import { setJSON, getJSON } from './utils'

const __DEV__ = process.env.NODE_ENV !== 'production'
const PORT = __DEV__ ? 3000 : 80
const PUBLIC_PATH = `${process.cwd()}`;

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, '..', 'public')))


app.route('/api/cmsContent')
	.post((req, res) => setJSON(JSON.stringify(req.body), data => res.send({ data })))
	.get((req, res, next) => getJSON(data => res.send({ data })))


if (__DEV__) {
	const compiler = webpack(config)
	const middleware = webpackMiddleware(compiler, {
		noInfo: true, publicPath: config.output.publicPath
	})

	app.use(middleware)
	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}))

	app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '..', 'dist/index.html')));
    res.end();
  })

} else {
	
	app.get('*', (req, res) => {
	  res.header('Content-Type', 'text/html');
	  fs.createReadStream(path.resolve(`${PUBLIC_PATH}/cms/index.html`)).pipe(res);
	})
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
