import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchCoursesSuccess, fetchCoursesError } = createActions({
  FETCH_COURSES_SUCCESS: courses => ({ courses }),

  FETCH_COURSES_ERROR: error => ({ error })
})

function fetchCourses () {
  return dispatch => {
    fetch('/api/v1/course/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching courses: ${res.status} - ${res.statusText}`)
      }).then(res => {
        dispatch(fetchCoursesSuccess(res.map(c => {
          c.class = c.klass
          return c
        })))
      }).catch(err => {
        dispatch(fetchCoursesError(err.message))
      })
  }
}

const reducer = handleActions({
  [fetchCourses]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchCoursesSuccess]: (state, { payload: { courses } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data,
      ...courses.map(x => camel(x, { deep: true }))
    ]
  }),

  [fetchCoursesError]: (state, { payload: { error } }) => ({
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
export { fetchCourses, fetchCoursesSuccess, fetchCoursesError }
