import Form from '../../components/form'
import { apiUrl } from '../../utils'
import style from './style'

// It's normal, that there is no password field, this is only to allow us to switch users quickly
export default class LoginForm extends Form {
  state = {
    type: 'teacher',
    name: ''
  }

  submit (evt) {
    if (this.state.name !== '') {
      fetch(apiUrl(`${this.state.type}s`, { name: this.state.name }))
        .then(r => r.json())
        .then(res => {
          if (this.props.onLogin) {
            this.props.onLogin({ id: res[0].id, type: this.state.type })
          }
        })
    } else {
      this.props.children.push(<p class='errorMessage'>Please enter your family name</p>)
      this.forceUpdate()
    }

    evt.preventDefault()
  }

  componentWillMount () {
    this.props.class = style.form
    super.componentWillMount()
    this.title = <div>
      <header class={[ 'logo', style.head ].join(' ')}>
        <span class='libra'>Libra</span>
        <span class='note'>note</span>
      </header>
      <h1 style={{ textAlign: 'center', fontWeight: '300' }}>Login</h1>
    </div>
    this.submitMessage = 'Login'

    this.addInput('I\'m a', 'type',
      <select>
        <option value='teacher'>Teacher</option>
        <option value='student'>Student</option>
      </select>)

    this.addInput('Family name', 'name', <input />)
    this.setState({ ready: true })
  }
}
