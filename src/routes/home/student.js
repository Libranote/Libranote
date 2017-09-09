import BaseHome from './base'
import style from './style'
import { apiUrl, fetchAll, flatten } from '../../utils'
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

    const [ classes, marks ] = await fetchAll([
      apiUrl('classes', { id: this.state.student.class }),
      apiUrl('marks', { 'students_like': '0' })
    ])
    this.setState({ class: classes[0], marks })

    for (const day of this.state.class.timetable) {
      for (const c of day.courses) {
        c.teacher = this.state.teachers.find(t => t.id === c.teacher)
        c.subject = this.state.subjects.find(t => t.id === c.subject)
        c.class = this.state.class
      }
    }

    this.setState({
      tests: flatten(await fetchAll(
        marks.filter((mark, i) => marks.findIndex(m => m.test === mark.test) >= 0)
          .map(m => apiUrl('tests', { id: m.test }))
      ))
    })

    this.addSection('This week', 'week', this.week)
    this.addSection('Last marks', 'marks', this.marks)

    this.setState({ ready: true, heading: `Welcome, ${this.state.student.firstname} ${this.state.student.name}` })
  }

  week () {
    return <Timetable schedule={this.state.class.timetable} />
  }

  marks (_, { subjects, tests, marks }) {
    return <table class={style.marks}>
      <thead>
        <td>Subject</td>
        <td>Mark</td>
        <td>Coefficient</td>
        <td>Comment</td>
      </thead>
      <tbody>
        {marks.map(m => {
          const test = tests.find(t => t.id === m.test)

          return <tr>
            <td>{subjects.find(s => s.id === test.subject).name}</td>
            <td>{m.mark}/{m.outOf}</td>
            <td>{test.coefficient}</td>
            <td>{m.comment}</td>
          </tr>
        })}
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
