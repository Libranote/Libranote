import { Component } from 'preact'
import style from './style'

export default class Badge extends Component {
  props = {
    color: 'red'
  }

  render ({ color, transparent, children }) {
    return <span class={[ style.badge, style[color], transparent ? style.transparent : '' ].join(' ')} {...this.props}>{children}</span>
  }
}
