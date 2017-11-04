import { combineReducers } from 'redux'
import login from './login'
import accounts from './account'
import marks from './marks'
import students from './students'
import tests from './tests'
import subjects from './subjects'
import classes from './classes'
import courses from './courses'

export default combineReducers({
  login,
  accounts,
  marks,
  students,
  tests,
  subjects,
  classes,
  courses
})
