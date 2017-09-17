import Form from '../../components/form'
import { route } from 'preact-router'
import { apiUrl } from '../../utils'
import store from '../../store'

export default class NewTest extends Form {
  state = {
    title: '',
    subject: 0,
    outOf: 20,
    coefficient: 1
  }

  async componentWillMount () {
    super.componentWillMount()
    this.setState(await store.query({
      subjects: x => true,
      teachers: t => t.id === this.props.teacherId
    }))

    this.setState({ subject: this.state.teacher.subjectsId[0] })

    this.title = <h1>New test</h1>
    this.submitMessage = 'Create'

    this.addInput('Title', 'title', <input />)
    this.addInput('Subject', 'subject', <select>
      {this.state.teacher.subjectsId.map((subjectId, i) =>
        <option value={subjectId}>
          {this.state.subjects.find(s => s.id === subjectId).name}
        </option>
      )}
    </select>)

    this.addInput('Out of', 'outOf', <input type='number' min='0'/>)
    this.addInput('Coefficient', 'coefficient', <input type='number' step='any' min='0'/>)

    this.setState({ ready: true })
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
}
