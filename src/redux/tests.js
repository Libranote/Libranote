import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchTestsSuccess, fetchTestsError } = createActions({
  FETCH_TESTS_SUCCESS: tests => ({ tests }),

  FETCH_TESTS_ERROR: error => ({ error })
})

function fetchTests () {
  return dispatch => {
    fetch('/api/v1/test/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching tests: ${res.status} - ${res.statusText}`)
      }).then(res => {
        dispatch(fetchTestsSuccess(res))
      }).catch(err => {
        dispatch(fetchTestsError(err.message))
      })
  }
}

const reducer = handleActions({
  [fetchTests]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchTestsSuccess]: (state, { payload: { tests } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data.filter(c => !tests.some(x => x.id === c.id)),
      ...tests.map(x => camel(x, { deep: true }))
    ]
  }),

  [fetchTestsError]: (state, { payload: { error } }) => ({
    ...state,
    error,
    fetching: false
  })
}, {
  error: null,
  fetching: false,
  data: []
})

export default reducer
export { fetchTests, fetchTestsSuccess, fetchTestsError }
