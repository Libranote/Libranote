import { Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Header extends Component {
  render () {
    return <header class={style.header}>
      <h1>Libranote</h1>
      <nav>
        <Link activeClassName={style.active} href="/">Home</Link>
      </nav>
    </header>
  }
}
