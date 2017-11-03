import { createActions, handleActions } from 'redux-actions'
import { tokenHeader } from '../utils'

const { addAccount, removeAccount } = createActions({
  ADD_ACCOUNT: acct => acct,

  REMOVE_ACCOUNT: id => id
})

const fetchMe = () => dispatch => {
  fetch('/api/v1/account/me/', tokenHeader())
    .then(res => res.json())
    .then(res => {
      dispatch(addAccount(res))
    })
}

const reducer = handleActions({
  [addAccount]: (state, action) => [
    ...state,
    action.payload
  ],

  [removeAccount]: (state, { payload: { username } }) => state.filter(x => x.username !== username)
}, [])

export default reducer
export { addAccount, removeAccount, fetchMe }
