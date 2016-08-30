import axios from 'axios'
import store from './store'
import { addIndex, map, compose } from 'ramda'

export const clamp = (n, x, y) => x < y ? (n < x ? x : n > y ? y : n) : (n < y ? y : n > x ? x : n)
export const fetch = (url, data) => axios.get(url, data).then(res => res).catch(err => console.log(err))
export const post = (url, data) => axios.post(url, data).then(res => res).catch(err => console.log(err))
export const _put = (url, data) => axios.put(url, data).then(res => res).catch(err => console.log(err))

export const toUpper = str => str.toUpperCase()
export const toUnderscore = str => str.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`)
export const toCapital = str => str.toUpperCase()
export const actionFormat = compose(toCapital, toUnderscore)

export const mapIndex = addIndex(map)
export const noUndefined = x => x !== undefined
