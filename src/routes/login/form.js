import { Component } from 'preact'
import { apiUrl } from '../../utils'
import style from './style'

// It's normal, that there is no password field, this is only to allow us to switch users quickly
export default class LoginForm extends Component {
  refs = {}

  tryLogin (evt) {
    const table = this.refs.type.value
    const name = this.refs.name.value
    fetch(apiUrl(`${table}s`, { name }))
      .then(r => r.json())
      .then(res => {
        if (this.props.onLogin) {
          this.props.onLogin({ id: res[0].id, type: table })
        }
      })

    evt.preventDefault()
  }

  ref (name, elt) {
    this.refs[name] = elt
  }

  render ({ children }) {
    return <main>
      <h1>Login to Libranote</h1>
      {children}
      <form onSubmit={this.tryLogin.bind(this)} class={style.form}>
        <label>I'm a
          <select ref={this.ref.bind(this, 'type')}>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
          </select>
        </label>

        <label>Family name
          <input ref={this.ref.bind(this, 'name')}></input>
        </label>
        <button type='submit'>Login</button>
      </form>
    </main>
  }
}
