import { createActions, handleActions } from 'redux-actions'
import camel from 'camelcase-keys'

const { fetchClassesSuccess, fetchClassesError } = createActions({
  FETCH_CLASSES_SUCCESS: classes => ({ classes }),

  FETCH_CLASSES_ERROR: error => ({ error })
})

function fetchClasses () {
  return dispatch => {
    fetch('/api/v1/class/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching classes: ${res.status} - ${res.statusText}`)
      }).then(res => {
        dispatch(fetchClassesSuccess(res))
      }).catch(err => {
        dispatch(fetchClassesError(err.message))
      })
  }
}

const reducer = handleActions({
  [fetchClasses]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchClassesSuccess]: (state, { payload: { classes } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data,
      ...classes.map(x => camel(x, { deep: true }))
    ]
  }),

  [fetchClassesError]: (state, { payload: { error } }) => ({
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
export { fetchClasses, fetchClassesSuccess, fetchClassesError }
