import { createActions, handleActions } from 'redux-actions'
import { fetchMe } from './account'

const { loginSuccess, loginFailed, logout, addError } = createActions({
  LOGIN_SUCCESS: (token, username) => ({ token, username }),

  LOGIN_FAILED: error => ({ error }),

  LOGOUT: undefined,

  addError: error => ({ error })
})

function loginRequest (username, password) {
  return dispatch => {
    fetch('/api/v1/token-auth/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        dispatch(loginSuccess(res.token, username))
        dispatch(fetchMe())
      }).catch(err => {
        dispatch(loginFailed(err.message))
      })
  }
}

const reducer = handleActions({
  [loginRequest]: (state, action) => ({
    ...state,
    connecting: true,
    info: 'Connecting...',
    error: null
  }),

  [loginSuccess]: (state, { payload: { token, username } }) => {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('username', username)
    return {
      ...state,
      connecting: false,
      token,
      connectedUser: username,
      info: null,
      error: null
    }
  },

  [loginFailed]: (state, { payload: { error } }) => ({
    ...state,
    error: error,
    info: null
  }),

  [logout]: (state, action) => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    return {
      ...state,
      token: '',
      connectedUser: '',
      info: 'Succesfully logged out',
      error: null
    }
  },

  [addError]: (state, { payload: { error } }) => ({
    ...state,
    error,
    info: null
  })
}, {
  connecting: false,
  token: null,
  connectedUser: null,
  info: null,
  error: null
})

export default reducer
export { loginRequest, loginSuccess, loginFailed, logout }
