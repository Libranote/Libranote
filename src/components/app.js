import { Component } from 'preact'
import { Router } from 'preact-router'

import { fetchDataFor } from '../utils.js'
import Header from './header'
import { getHomePage } from '../routes/home/utils'
import Test from '../routes/tests'
import store from '../store'
import style from './global-style'

export default class App extends Component {
  user = { type: 'student', id: 0 }

  async componentWillMount () {
    store.set(await fetchDataFor(this.user.type, this.user.id))
    store.readyFor(this.user.type, this.user.id)
  }

  /** Gets fired when the route changes.
  * @param {Object} event "change" event from [preact-router](http://git.io/preact-router)
  * @param {string} event.url The newly routed URL
  */
  handleRoute (e) {
    this.currentUrl = e.url
  }

  render () {
    document.title = 'Libranote'
    const homepage = getHomePage(this.user.type, this.user.id)
    return <div id="app" class={style.app}>
      <Header />
      <Router onChange={this.handleRoute.bind(this)}>
        {homepage}
        <Test path='tests/:id' />
      </Router>
    </div>
  }
}
