import Url from 'cms/helpers/url'
import Actions from 'cms/actions'
import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { fetch, post, _put, assign, mergeId } from 'cms/helpers/utils'

function* hydrate() {
	console.log('hit here')
	try {
		const { data } = yield call(fetch, Url.cmsContent)
    yield put({ type: 'CMS_CONTENT', data })
	} catch (errors) {
		yield console.log(errors)
	}
}
//
// function* api(method, type, url, payload) {
// 	try {
// 		const { data: { data, status } } = yield call(method, url, mergeId(payload))
//     yield put({ type, data: [], status: 'PENDING' })
// 		yield put({ type, data, status })
// 	} catch (errors) {
// 		yield console.log({ type, data: [], status: 'FAIL', message: errors.data })
// 	}
// }

export default function* root() {
  yield [

		fork(function* () {
			yield* takeEvery('HYDRATE', ({ uuid }) => hydrate({ uuid }))
		}),
		//
  	// fork(function* () {
    //   yield* takeEvery('GET_ALL', () => api(post, 'ALL_QUESTIONS', Url.allQuestions) )
    // }),
		//
    // fork(function* () {
    //   yield* takeEvery('GET_TOP', () => api(fetch, 'TOP_QUESTIONS', Url.topQuestions))
    // }),
		//
    // fork(function* () {
    //   yield* takeEvery('GET_MY', () => api(post, 'MY_QUESTIONS', Url.myQuestions))
    // }),
		//
    // fork(function* () {
    //   yield* takeEvery('POST_QUESTION', ({ question, expires }) =>
		// 		api(post, null , Url.postQuestion, { question, expires }))
    // }),
		//
  	// fork(function* () {
    //   yield* takeEvery('ANSWER_QUESTION', ({ remaining }) =>
		// 		remaining === 10 ? api(post, 'ALL_QUESTIONS', Url.allQuestions) : false)
    // }),
		//
		// fork(function* () {
    //   yield* takeEvery('ANSWER_QUESTION', ({ _id, vote }) =>
		// 		api(_put, null, Url.answerQuestion, { _id, vote }))
    // }),
		//
		// fork(function* () {
		// 	yield* takeEvery('POST_SEARCH', ({ query }) =>
		// 		api(post, 'TOP_QUESTIONS', Url.searchTop, { query }))
		// }),
		//
		// fork(function* () {
		// 	yield* takeEvery('SET_SEARCH_TEXT', ({ data }) =>
		// 		data.length === 0 ? api(fetch, 'TOP_QUESTIONS', Url.topQuestions) : false)
		// })
  ]
}
