import { combineReducers } from 'redux'
import login from './login'
import accounts from './account'

export default combineReducers({
  login,
  accounts
})
