import Form from '../../components/form'
import { route } from 'preact-router'
import { connect } from 'preact-redux'
import { saveTest } from '../../redux/tests'

class NewTest extends Form {
  state = {
    title: '',
    subject: 0,
    outOf: 20,
    coefficient: 1
  }

  async componentWillMount () {
    super.componentWillMount()

    this.setState({
      subject: this.props.subjects.find(s => s.teachers.includes(this.props.teacher.id))
    })

    this.title = <h1>New test</h1>
    this.submitMessage = 'Create'

    this.addInput('Title', 'title', <input />)
    this.addInput('Subject', 'subject', <select>
      {this.props.subjects.filter(s => s.teachers.includes(this.props.teacher.id)).map(s =>
        <option value={s.id}>
          {s.name}
        </option>
      )}
    </select>)

    this.addInput('Out of', 'outOf', <input type='number' min='0'/>)
    this.addInput('Coefficient', 'coefficient', <input type='number' step='any' min='0'/>)

    this.setState({ ready: true })
  }

  componentWillReceiveProps (props) {
    if (props.lastSavedId && this.state.saving) {
      route(`/tests/${props.lastSavedId}`)
      this.setState({
        saving: false
      })
    }
  }

  submit (evt) {
    const newTest = {
      title: this.state.title,
      subject: Number.parseInt(this.state.subject),
      coefficient: this.state.coefficient,
      'out_of': this.state.outOf
    }

    this.props.saveTest(newTest)
    this.setState({
      saving: true
    })

    evt.preventDefault()
  }
}

const mapStateToProps = state => {
  return {
    subjects: state.subjects.data,
    teacher: state.accounts.data.find(t => t.username === state.login.connectedUser),
    lastSavedId: state.tests.lastSavedId
  }
}

const mapDispatchToProps = dispatch => ({
  saveTest: test => dispatch(saveTest(test))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTest)
