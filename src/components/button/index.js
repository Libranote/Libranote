import { Component } from 'preact'
import { Link } from 'preact-router'
import style from './style'

export default class Button extends Component {
  render (props) {
    return <Link class={[
      style.button,
      props.transparent ? style.transparent : style.colored,
      props.noBg ? style.noBg : ''
    ].join(' ')} {...props} />
  }
}
