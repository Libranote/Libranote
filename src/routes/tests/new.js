import { Component } from 'preact'
import { route } from 'preact-router'
import { apiUrl } from '../../utils'
import store from '../../store'

export default class NewTest extends Component {
  state = {
    title: '',
    subject: 0,
    outOf: 20,
    coefficient: 1
  }

  async componentWillMount () {
    this.setState(await store.query({
      subjects: x => true,
      teachers: t => t.id === this.props.teacherId
    }))

    this.handleInputChange = this.handleInputChange.bind(this)
    this.setState({ ready: true, subject: this.state.teacher.subjectsId[0] })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  submit (evt) {
    const newTest = {
      title: this.state.title,
      teacherId: this.props.teacherId,
      subjectId: Number.parseInt(this.state.subject),
      coefficient: this.state.coefficient,
      outOf: this.state.outOf
    }

    fetch(apiUrl('tests'), {
      method: 'POST',
      body: JSON.stringify(newTest),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          store.query({ tests: x => true }).then(data => {
            store.set({ tests: data.tests.concat([ json ]) })
            route(`/tests/${json.id}`)
          })
        })
      }
    })
    evt.preventDefault()
  }

  render (_, { teacher, subjects, ready }) {
    return ready
      ? <main>
        <h1>New test</h1>
        <form>
          <label>Title
            <input name='title' onChange={this.handleInputChange} value={this.state.title} />
          </label>

          <label>Subject
            <select name='subject' value={this.state.subject} onChange={this.handleInputChange}>
              {teacher.subjectsId.map((subjectId, i) =>
                <option value={subjectId}>
                  {subjects.find(s => s.id === subjectId).name}
                </option>
              )}
            </select>
          </label>

          <label>Out of
            <input name='outOf' onChange={this.handleInputChange} value={this.state.outOf} type='number'/>
          </label>

          <label>Coefficient
            <input name='coefficient' onChange={this.handleInputChange} value={this.state.coefficient} type='number' />
          </label>

          <input type='submit' onClick={this.submit.bind(this)} value='Create' />
        </form>
      </main>
      : <p>Loading...</p>
  }
}
