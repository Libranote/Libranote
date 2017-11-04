import { Component } from 'preact'
import { Router, route } from 'preact-router'
import { connect } from 'preact-redux'

import Sidebar from './sidebar/index.js'
import Header from './header'
import getRoutes from './route-utils'
import LoginForm from '../routes/login/form'
import Redirect from './redirect'
import { logout, loginSuccess } from '../redux/login'
import { fetchMe } from '../redux/account'

class App extends Component {
  componentWillMount () {
    document.title = 'Libranote'
  }

  handleRoute (e) {
    if (this.props.user && e.url === '/logout') {
      this.props.dispatch(logout())
    } else if (this.props.user && e.url === '/login') {
      route('/')
    }
  }

  render () {
    console.log(this.props)
    if (this.props.error) {
      return <p>Error: {this.props.error}</p>
    }

    if (this.props.user) {
      return this.renderLoggedIn()
    } else {
      const token = window.localStorage.getItem('token')
      const user = window.localStorage.getItem('username')
      if (token && user) {
        this.props.dispatch(loginSuccess(token, user))
        this.props.dispatch(fetchMe())
      } else {
        return this.renderLoginPage()
      }
    }
  }

  renderLoggedIn () {
    const routes = getRoutes(this.props.user)
    return <div id="app">
      <Sidebar routes={routes}/>
      <div>
        <Header user={this.props.user} />
        <Router onChange={this.handleRoute.bind(this)}>
          <LoginForm path='/login' />
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
    return <Router onChange={this.handleRoute.bind(this)}>
      <LoginForm path='/login' />
      <Redirect default to='/login' />
    </Router>
  }
}

const mapStateToProps = state => {
  return {
    user: state.accounts.data.find(x => x.username === state.login.connectedUser),
    error: state.accounts.error
  }
}

export default connect(
  mapStateToProps
)(App)
