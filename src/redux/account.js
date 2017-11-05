import { createActions, handleActions } from 'redux-actions'
import { tokenHeader } from '../utils'
import camel from 'camelcase-keys'

const { addAccount, removeAccount, fetchAccountsSuccess, fetchAccountsError } = createActions({
  ADD_ACCOUNT: acct => acct,

  REMOVE_ACCOUNT: id => id,

  FETCH_ACCOUNTS_SUCCESS: accounts => ({ accounts }),

  FETCH_ACCOUNTS_ERROR: error => ({ error })
})

function fetchAccounts () {
  return dispatch => {
    fetch('/api/v1/account/')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Error while fetching accounts: ${res.status} - ${res.statusText}`)
      }).then(res => {
        dispatch(fetchAccountsSuccess(res))
      }).catch(err => {
        dispatch(fetchAccountsError(err.message))
      })
  }
}

const fetchMe = () => dispatch => {
  fetch('/api/v1/account/me/', tokenHeader())
    .then(res => res.json())
    .then(res => {
      dispatch(addAccount(res))
    }).catch(err => dispatch(fetchAccountsError(err.message)))
}

const reducer = handleActions({
  [fetchAccounts]: (state, action) => ({
    ...state,
    fetching: true
  }),

  [fetchAccountsSuccess]: (state, { payload: { accounts } }) => ({
    ...state,
    fetching: false,
    data: [
      ...state.data.filter(c => !accounts.some(x => x.id === c.id)),
      ...accounts.map(x => camel(x, { deep: true }))
    ]
  }),

  [fetchAccountsError]: (state, { payload: { error } }) => ({
    ...state,
    error,
    fetching: false
  }),

  [addAccount]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      camel(action.payload, { deep: true })
    ]
  }),

  [removeAccount]: (state, { payload: { username } }) => state.filter(x => x.username !== username)
}, {
  error: null,
  fetching: false,
  data: []
})

export default reducer
export { addAccount, removeAccount, fetchAccountsSuccess, fetchAccountsError, fetchMe, fetchAccounts }
