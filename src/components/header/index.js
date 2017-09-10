import { Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Header extends Component {
  links = {
    home: <Link activeClassName={style.active} href="/">Home</Link>,
    logout: <Link activeClassName={style.active} href="/logout">Log Out</Link>,
    login: <Link activeClassName={style.active} href="/login">Log In</Link>,
    tests: <Link activeClassName={style.active} href="/tests">Tests</Link>
  }

  render ({ loggedInAs }) {
    return <header class={style.header}>
      <h1>Libranote</h1>
      <nav>
        {this.getLinksfor(loggedInAs)}
      </nav>
    </header>
  }

  getLinksfor (role) {
    switch (role) {
      case 'student':
        return [ this.links.home, this.links.logout ]
      case 'teacher':
        return [ this.links.home, this.links.tests, this.links.logout ]
      default:
        return [ this.links.login ]
    }
  }
}
