import Form from '../../components/form'
import { route } from 'preact-router'
import { apiUrl } from '../../utils'
import store from '../../store'

export default class NewMark extends Form {
  state = {
    student: 0,
    mark: 0,
    comment: ''
  }

  async componentWillMount () {
    super.componentWillMount()
    this.setState(await store.query({
      subjects: x => true,
      students: x => true,
      tests: t => t.id === Number.parseInt(this.props.testId)
    }))

    await this.componentWillReceiveProps(this.props)
  }

  async componentWillReceiveProps (props) {
    this.inputs = []
    this.setState({
      student: Number.isNaN(Number.parseInt(props.studentId)) ? this.state.student : Number.parseInt(props.studentId)
    })

    this.title = <h1>Mark a student</h1>
    this.submitMessage = this.state.student !== this.state.students[this.state.students.length - 1].id
      ? 'Save and mark next student'
      : 'Save'

    this.addInput('Student', 'student', <select>
      {this.state.students.map(s =>
        <option value={s.id}>
          {s.name}
        </option>
      )})}
    </select>)

    this.addInput('Mark', 'mark', <input type='number' min='0' max={this.state.test.outOf}/>)
    this.addInput('Comment', 'comment', <input />)

    this.setState({ ready: true })
  }

  submit (evt) {
    const newMark = {
      comment: this.state.comment,
      testId: Number.parseInt(this.props.testId),
      studentsId: [ Number.parseInt(this.state.student) ],
      mark: Number.parseInt(this.state.mark)
    }

    fetch(apiUrl('marks'), {
      method: 'POST',
      body: JSON.stringify(newMark),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          store.query({ marks: x => true }).then(data => {
            store.set({ marks: data.marks.concat([ json ]) })
            const nextStudent = this.state.students[(Number.parseInt(this.state.student) || 0) + 1]
            if (nextStudent) {
              route(`/marks/new/${this.props.testId}/${nextStudent.id}`)
            } else {
              route(`/tests/${this.props.testId}`)
            }
          })
        })
      }
    })
    evt.preventDefault()
  }
}
