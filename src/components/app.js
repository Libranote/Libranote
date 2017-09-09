import { Component } from 'preact'
import { Router } from 'preact-router'

import Header from './header'
import { getHomePage } from '../routes/home/utils'
import Profile from '../routes/profile'

export default class App extends Component {
  /** Gets fired when the route changes.
  * @param {Object} event "change" event from [preact-router](http://git.io/preact-router)
  * @param {string} event.url The newly routed URL
  */
  handleRoute (e) {
    this.currentUrl = e.url
  }

  render () {
    document.title = 'Libranote'
    console.log(getHomePage)
    const homepage = getHomePage('teacher', 0)
    console.log(homepage)
    return <div id="app">
      <Header />
      <Router onChange={this.handleRoute.bind(this)}>
        {homepage}
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
      </Router>
    </div>
  }
}
