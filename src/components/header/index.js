import { Component } from 'preact'
import { getDisplayName } from '../../utils'
import style from './style'

export default class Header extends Component {
  menuClick () {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render ({ loggedInAs, user }, { showMenu }) {
    return <header class={style.header}>
      <input placeholder='Search for tests, homeworks, or something else' />
      <div class={style.user} onClick={this.menuClick.bind(this)}>
        <div>
          <h3>{getDisplayName(user.type, user.data)}</h3>
          <p>Première S</p>
        </div>
        <img class={style.avatar} alt='' src='' />
        {showMenu
          ? <ul class={style.dropdown}>
            <li>Log Out</li>
            <li>Settings</li>
          </ul>
          : null}
      </div>
    </header>
  }
}
