import Url from 'cms/helpers/url'
import Actions from 'cms/actions'
import { takeEvery } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import { fetch, post, _put, assign, mergeId } from 'cms/helpers/utils'
import store from 'cms/helpers/store'

function* hydrate() {
	try {
		const { data: { data } } = yield call(fetch, Url.cmsContent)
		yield put({ type: 'CMS_CONTENT', data })
	} catch (errors) {
		yield console.log(errors)
	}
}

function* api(method, payload) {
	try {
		const cmsData = yield select(({ api }) => api.cmsData)
		const { data: { data } } = yield call(method, Url.cmsContent, cmsData)
		yield put({ type: 'CMS_CONTENT', data })
	} catch (errors) {
		yield console.log({ type: 'CMS_CONTENT', message: errors.data })
	}
}

export default function* root() {
  yield [

		fork(function* () {
			yield* takeEvery('HYDRATE', () => hydrate())
		}),

  	fork(function* () {
      yield* takeEvery('SAVE_DATA', () => api(post) )
    }),

		fork(function* () {
			yield* takeEvery('ADD_POST', ({ data }) => api(post, data))
		}),

  ]
}
