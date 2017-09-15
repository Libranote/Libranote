import { Component } from 'preact'
import { Router, route } from 'preact-router'

import { fetchDataFor } from '../utils.js'
import Header from './header'
import getRoutes from './route-utils'
import store from '../store'
import style from './global-style'
import LoginForm from '../routes/login/form'
import Redirect from './redirect'

export default class App extends Component {
  componentWillMount () {
    document.title = 'Libranote'
  }

  handleRoute (e) {
    this.currentUrl = e.url
    if (!this.user && this.currentUrl !== '/login') {
      route('/login')
    } else if (this.user && this.currentUrl === '/logout') {
      this.user = null
      this.loginMessage = <p>Succesfully logged out</p>
      route('/login')
    }
  }

  loggedIn (user) {
    this.user = user
    fetchDataFor(this.user.type, this.user.id).then(res => {
      store.set(res)
      store.readyFor(this.user.type, this.user.id)
      this.forceUpdate()
      route('/') // show the correct homepage
    })
  }

  render () {
    const routes = this.user ? getRoutes(this.user.type, this.user.id) : <Redirect path='/' to='/login' />
    const res = <div id="app" class={style.app}>
      <Header loggedInAs={this.user ? this.user.type : 'logged-out'} />
      <Router onChange={this.handleRoute.bind(this)}>
        <LoginForm path='/login' onLogin={this.loggedIn.bind(this)}>
          {this.loginMessage}
        </LoginForm>
        {routes}
      </Router>
    </div>
    this.loginMessage = null
    return res
  }
}
