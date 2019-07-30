import { Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Sidebar extends Component {
  render ({ routes }) {
    return <aside class={style.sidebar}>
      <header class='logo'>
        <Link href='/'>
          <span class='libra'>Libra</span>
          <span class='note'>note</span>
        </Link>
      </header>
      <nav>
        {routes.filter(r => r.display).map(r =>
          <Link href={r.url} activeClassName={style.active}>{r.title}</Link>
        )}
      </nav>
    </aside>
  }
}
