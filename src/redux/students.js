import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchStudentsSuccess, fetchStudentsError } = createActions({
  FETCH_STUDENTS_SUCCESS: students => ({ students }),

  FETCH_STUDENTS_ERROR: error => ({ error })
})

function fetchStudents () {
  return dispatch => {
    fetch('/api/v1/student/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching students: ${res.status} - ${res.statusText}`)
      }).then(res => {
        res.class = res.klass
        dispatch(fetchStudentsSuccess(res))
      }).catch(err => {
        dispatch(fetchStudentsError(err.message))
      })
  }
}

const reducer = handleActions({
  [fetchStudents]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchStudentsSuccess]: (state, { payload: { students } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data,
      ...students.map(x => camel(x, { deep: true }))
    ]
  }),

  [fetchStudentsError]: (state, { payload: { error } }) => ({
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
export { fetchStudents, fetchStudentsSuccess, fetchStudentsError }
