import fs from 'fs'
const LOCATION = `${__dirname}/data.json`

export const getJSON = fn => fn(JSON.parse(fs.readFileSync(LOCATION, 'utf8')))

export const setJSON = (data, fn) => {
  fs.writeFile(LOCATION, data, err => {
    if(err) console.log(err)
    fn(JSON.parse(data))
  })
}
