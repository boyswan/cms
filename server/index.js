import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cms from './cms'

const app = express()

const PUBLIC_PATH = `${process.cwd()}/dist`;
console.log('hello there?')
console.log(PUBLIC_PATH)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



cms(app)

app.get('/admin', (req, res) => {
  res.header('Content-Type', 'text/html');
  console.log('server hit')
  fs.createReadStream(path.resolve(`${PUBLIC_PATH}/cms/index.html`)).pipe(res);
})

app.get('/*', (req, res) => {
  res.header('Content-Type', 'text/html');
  fs.createReadStream(path.resolve(`${PUBLIC_PATH}/client/index.html`)).pipe(res);
})

//
// app.post('/admin', [ session, (req, res) => {
//   if (req.body.username === PCL_USERNAME && req.body.password === PCL_PASSWORD) {
//     req.session.isLoggedIn = true;
//     res.setHeader('Set-Cookie', `isLoggedIn=true; path=${cookie.path}`);
//     res.json({
//       status: 200,
//       result: {
//         success: true
//       },
//       errors: []
//     });
//   } else {
//     res.json({
//       status: 401,
//       result: '',
//       errors: [
//         {
//           statusCode: 401,
//           message: 'Invalid user credentials'
//         }
//       ]
//     });
//   }
// } ]);
//
// app.post('/logout', [ session, (req, res) => {
//   res.session = null;
//   res.setHeader('Set-Cookie', `isLoggedIn=true; path=${cookie.path}; expires=${new Date(0).toUTCString()}`);
//   res.json({
//     status: 200,
//     result: {
//       success: true
//     },
//     errors: []
//   });
// } ]);


app.listen(3000, () => console.log('listening on port 3000'))
