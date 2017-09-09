import BaseHome from './base'
import style from './style'
import { apiUrl, fetchAll } from '../../utils'
import Timetable from '../../components/timetable'

export default class Home extends BaseHome {
  expanders = {}

  async componentWillMount () {
    const [ students, teachers, subjects ] = await fetchAll([
      apiUrl('students', { id: this.props.studentId }),
      apiUrl('teachers'),
      apiUrl('subjects')
    ])
    this.setState({ student: students[0], teachers, subjects })

    const [ classes, tests ] = await fetchAll([
      apiUrl('classes', { id: this.state.student.class }),
      apiUrl('tests', { 'students_like': '0' })
    ])
    this.setState({ class: classes[0], tests })

    this.addSection('This week', 'week', this.week)
    this.addSection('Last marks', 'marks', this.marks)

    this.setState({ ready: true, heading: `Welcome, ${this.state.student.firstname} ${this.state.student.name}` })
  }

  week (_, { student, teachers, subjects }) {
    return <Timetable student={student} class={this.state.class} teachers={teachers} subjects={subjects}/>
  }

  marks (_, { subjects, tests }) {
    return <table class={style.marks}>
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

  expander (what) {
    return (e) => { this.expanders[what] = e }
  }

  toggleButton (expander) {
    return <button class={style.toggleButton} onClick={this.toggle.bind(this, [ expander ])}>
      Show {this.expanders[expander] && this.expanders[expander].isVisible() ? 'more' : 'less'}
    </button>
  }

  toggle (what) {
    if (this.expanders[what]) {
      this.expanders[what].toggle()
    }
  }
}
