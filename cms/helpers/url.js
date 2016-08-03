// const api = str => '/api' + str
const api = str => 'http://localhost:3000/api' + str

export default {
  cmsContent: api('/cmsContent'),
  saveData: api('/saveData')
}
