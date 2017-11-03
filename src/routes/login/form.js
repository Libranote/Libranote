import { connect } from 'preact-redux'
import Form from '../../components/form'
import style from './style'
import { loginRequest, addError } from '../../redux/login'

class LoginForm extends Form {
  state = {
    password: '',
    username: ''
  }

  submit (evt) {
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.onLoginClick(this.state.username, this.state.password)
    } else {
      this.props.invalidData()
    }

    evt.preventDefault()
  }

  componentWillUpdate () {
    this.props.class = style.form
    this.props.children = [
      this.props.error ? <p class='errorMessage'>{this.props.error}</p> : null,
      this.props.info ? <p class='infoMessage'>{this.props.info}</p> : null
    ]
  }

  componentWillMount () {
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

const mapStateToProps = state => state.login

const mapDispatchToProps = dispatch => ({
  onLoginClick: (username, password) => dispatch(loginRequest(username, password)),
  invalidData: () => dispatch(addError('Please provide your username and password.'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
