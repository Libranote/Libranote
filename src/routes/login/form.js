import Form from '../../components/form'
import { apiPost, apiUrl, tokenHeader } from '../../utils'
import style from './style'

// It's normal, that there is no password field, this is only to allow us to switch users quickly
export default class LoginForm extends Form {
  state = {
    password: '',
    username: ''
  }

  submit (evt) {
    if (this.state.username !== '' && this.state.password !== '') {
      apiPost('token-auth/', this.state).then(res => {
        if (res.error) {
          this.props.children.push(<p class='errorMessage'>{res.error}</p>)
        } else if (this.props.onLogin) {
          window.localStorage.setItem('token', res.token)
          fetch(apiUrl('account/me/'), tokenHeader())
            .then(r => r.json())
            .then(user => {
              this.props.onLogin(user)
            }).catch(console.error)
        }
      })
    } else {
      this.props.children.push(<p class='errorMessage'>Please enter user name and password</p>)
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

    this.addInput('User name', 'username', <input />)
    this.addInput('Password', 'password', <input type='password' />)
    this.setState({ ready: true })
  }
}
