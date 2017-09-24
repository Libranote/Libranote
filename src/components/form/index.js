import { Component } from 'preact'
import style from './style'

export default class Form extends Component {
  inputs = []

  componentWillMount () {
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.inputs.find(i => i.id === target.name).input.attributes.value = value
    this.setState({
      [target.name]: value
    })
  }

  addInput (label, id, input) {
    input.attributes = input.attributes || []
    input.attributes.onChange = this.handleInputChange
    input.attributes.name = id
    input.attributes.value = this.state[id]
    this.inputs.push({ label, id, input })
    this.forceUpdate()
  }

  render ({ children }, { ready }) {
    return ready
      ? <main class={[ style.form, this.props.class ].join(' ')}>
        {this.title}
        {children}
        <form>
          {this.inputs.map(i =>
            <div class={style.formItem}>
              <label for={i.id}>{i.label}</label>
              {i.input}
            </div>
          )}
          {this.submitButton || <input type='submit' value={this.submitMessage} onClick={this.submit.bind(this)} />}
        </form>
      </main>
      : <p>Loading...</p>
  }
}
