import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchSubjectsSuccess, fetchSubjectsError } = createActions({
  FETCH_SUBJECTS_SUCCESS: subjects => ({ subjects }),

  FETCH_SUBJECTS_ERROR: error => ({ error })
})

function fetchSubjects () {
  return dispatch => {
    fetch('/api/v1/subject/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching subjects: ${res.status} - ${res.statusText}`)
      }).then(res => {
        dispatch(fetchSubjectsSuccess(res))
      }).catch(err => {
        dispatch(fetchSubjectsError(err.message))
      })
  }
}

const reducer = handleActions({
  [fetchSubjects]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchSubjectsSuccess]: (state, { payload: { subjects } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data,
      ...subjects.map(x => camel(x, { deep: true }))
    ]
  }),

  [fetchSubjectsError]: (state, { payload: { error } }) => ({
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
export { fetchSubjects, fetchSubjectsSuccess, fetchSubjectsError }
