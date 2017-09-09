import { Component } from 'preact'
import style from './style'
import { apiUrl } from '../../utils'
import Timetable from '../../components/timetable'

export default class Home extends Component {
  state = {}

  async componentWillMount () {
    const results = await Promise.all([
      fetch(apiUrl('students', { id: this.props.studentId })),
      fetch(apiUrl('teachers')),
      fetch(apiUrl('subjects'))
    ])
    const toJson = results.map(res => res.json())
    const data = await Promise.all(toJson)
    this.setState({ student: data[0][0], teachers: data[1], subjects: data[2] })

    const classesRes = await (await fetch(apiUrl('classes', { id: this.state.student.class }))).json()
    this.setState({ class: classesRes[0], ready: true })
  }

  render (_, state) {
    return state.ready ? this.renderHome(state) : <h1 class={style.background}>Loading…</h1>
  }

  renderHome ({ student, teachers, subjects }) {
    return <div class={style.home}>
      <h1>Welcome, {student.firstname} {student.name}</h1>
      <div>
        <h2>This week</h2>
        <Timetable student={student} class={this.state.class} teachers={teachers} subjects={subjects}/>
      </div>
    </div>
  }
}
