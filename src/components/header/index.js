import { Component } from 'preact'
import { Link } from 'preact-router'
import { getDisplayName } from '../../utils'
import style from './style'

export default class Header extends Component {
  menuClick () {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render ({ loggedInAs, user }, { showMenu }) {
    return <header class={style.header}>
      <input placeholder='Search for tests, homeworks, or something else' />
      <div class={style.menu} onClick={this.menuClick.bind(this)}>
        <div class={style.user}>
          <div class={style.info}>
            <h3>{getDisplayName(user.type, user.data)}</h3>
            <p>Première S</p>
          </div>
          <img class={style.avatar} alt='' src='' />
        </div>
        {showMenu
          ? <ul class={style.dropdown}>
            <li><Link href='/logout'>Log Out</Link></li>
            <li><Link href='/settings'>Settings</Link></li>
          </ul>
          : null}
      </div>
    </header>
  }
}
