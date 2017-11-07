import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchMarksSuccess, fetchMarksError, addMark } = createActions({
  FETCH_MARKS_SUCCESS: marks => ({ marks }),

  FETCH_MARKS_ERROR: error => ({ error }),

  ADD_MARK: mark => ({ mark })
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

function saveMark (mark) {
  return dispatch => {
    fetch('/api/v1/mark/', {
      method: 'POST',
      body: JSON.stringify(mark),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          dispatch(addMark(mark))
        })
      }
    })
  }
}

const reducer = handleActions({
  [addMark]: (state, { payload: { mark } }) => ({
    ...state,
    data: [
      ...state.data,
      mark
    ]
  }),

  [fetchMarks]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchMarksSuccess]: (state, { payload: { marks } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data.filter(c => !marks.some(x => x.id === c.id)),
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
export { fetchMarks, fetchMarksSuccess, fetchMarksError, saveMark }
