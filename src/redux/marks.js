import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchMarksSuccess, fetchMarksError } = createActions({
  FETCH_MARKS_SUCCESS: marks => ({ marks }),

  FETCH_MARKS_ERROR: error => ({ error })
})

function fetchMarks () {
  return dispatch => {
    fetch('/api/v1/mark/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching marks: ${res.status} - ${res.statusText}`)
      }).then(res => {
        dispatch(fetchMarksSuccess(res))
      }).catch(err => {
        dispatch(fetchMarksError(err.message))
      })
  }
}

const reducer = handleActions({
  [fetchMarks]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchMarksSuccess]: (state, { payload: { marks } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data,
      ...marks.map(m => camel(m, { deep: true }))
    ]
  }),

  [fetchMarksError]: (state, { payload: { error } }) => ({
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
export { fetchMarks, fetchMarksSuccess, fetchMarksError }
