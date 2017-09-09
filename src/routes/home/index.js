import { Component } from 'preact'
import style from './style'
import { apiUrl } from '../../utils'
import Timetable from '../../components/timetable'

export default class Home extends Component {
  state = {
    hiddenComponents: {}
  }

  async componentWillMount () {
    const results = await Promise.all([
      fetch(apiUrl('students', { id: this.props.studentId })),
      fetch(apiUrl('teachers')),
      fetch(apiUrl('subjects'))
    ])
    const toJson = results.map(res => res.json())
    const data = await Promise.all(toJson)
    this.setState({ student: data[0][0], teachers: data[1], subjects: data[2] })

    const classes = await (await fetch(apiUrl('classes', { id: this.state.student.class }))).json()
    const tests = await (await fetch(apiUrl('tests', { 'students_like': '0' }))).json()
    this.setState({ class: classes[0], tests, ready: true })
  }

  render (_, state) {
    return state.ready ? this.renderHome(state) : <h1 class={style.background}>Loading…</h1>
  }

  renderHome ({ student, teachers, subjects, tests, hiddenComponents }) {
    console.log(subjects)
    return <div class={style.home}>
      <h1>Welcome, {student.firstname} {student.name}</h1>
      <div>
        <h2>
          This week
          {this.toggleButton('week')}
        </h2>
        {hiddenComponents['week'] ? null : <Timetable student={student} class={this.state.class} teachers={teachers} subjects={subjects}/>}
      </div>
      <div>
        <h2>
          Last marks
          {this.toggleButton('marks')}
        </h2>
        {hiddenComponents['marks']
          ? null
          : <table class={style.marks}>
            <thead>
              <td>Subject</td>
              <td>Mark</td>
              <td>Coefficient</td>
              <td>Comment</td>
            </thead>
            <tbody>
              {tests.map(t =>
                <tr>
                  <td>{subjects.find(s => s.id === t.subject).name}</td>
                  <td>{t.mark}/{t.outOf}</td>
                  <td>{t.coefficient}</td>
                  <td>{t.comment}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    </div>
  }

  toggleButton (forWhat) {
    return <button class={style.toggleButton} onClick={this.toggle.bind(this, [ forWhat ])}>Show {this.state.hiddenComponents[forWhat] ? 'more' : 'less'}</button>
  }

  toggle (what) {
    const hidden = this.state.hiddenComponents
    if (hidden[what] == null) {
      hidden[what] = false
    }
    hidden[what] = !hidden[what]
    this.setState({ hiddenComponents: hidden })
  }
}
