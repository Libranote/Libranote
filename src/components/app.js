import { Component } from 'preact'
import { Router, route } from 'preact-router'

import { fetchDataFor } from '../utils.js'
import Sidebar from './sidebar/index.js'
import Header from './header'
import getRoutes from './route-utils'
import store from '../store'
import LoginForm from '../routes/login/form'
import Redirect from './redirect'

export default class App extends Component {
  componentWillMount () {
    document.title = 'Libranote'
  }

  handleRoute (e) {
    this.currentUrl = e.url
    if (this.user && this.currentUrl === '/logout') {
      this.user = null
      this.loginMessage = <p>Succesfully logged out</p>
      route('/login')
    }
  }

  loggedIn (user) {
    this.user = user
    fetchDataFor(this.user.type, this.user.id).then(res => {
      this.user.data = res[`${this.user.type}s`][0]
      store.set(res)
      store.readyFor(this.user.type, this.user.id)
      this.forceUpdate()
      route('/') // show the correct homepage
    })
  }

  render () {
    if (this.user) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoginPage()
    }
  }

  renderLoggedIn () {
    const routes = getRoutes(this.user.type, this.user.id)
    return <div id="app">
      <Sidebar routes={routes}/>
      <div>
        <Header user={this.user} />
        <Router onChange={this.handleRoute.bind(this)}>
          <LoginForm path='/login' onLogin={this.loggedIn.bind(this)}>
            {this.loginMessage}
          </LoginForm>
          {routes.map(r => r.component)}
          <main default>
            <h1>Page not found</h1>
            <p>Try to go back to the homepage</p>
          </main>
        </Router>
      </div>
    </div>
  }

  renderLoginPage () {
    return <Router>
      <LoginForm path='/login' onLogin={this.loggedIn.bind(this)}>
        {this.loginMessage}
      </LoginForm>
      <Redirect default to='/login' />
    </Router>
  }
}
