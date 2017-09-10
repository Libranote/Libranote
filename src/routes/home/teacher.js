import { Link } from 'preact-router'
import BaseHome from './base'
import style from './style'
import { apiUrl } from '../../utils'
import Timetable from '../../components/timetable'
import store from '../../store'
import globalStyle from '../../components/global-style'

export default class TeacherHome extends BaseHome {
  state = {
    marksCache: []
  }

  componentWillMount () {
    store.onReadyFor('teacher', this.props.teacherId, this.init.bind(this))
  }

  async init () {
    this.setState(await store.query({
      students: x => true,
      subjects: x => true,
      teachers: t => t.id === this.props.teacherId,
      tests: t => t.teacherId === this.props.teacherId,
      classes: c => c.teachersId.some(t => t === this.props.teacherId)
    }))

    const schedule = []
    for (const cls of this.state.classes) {
      for (const day of cls.timetable) {
        const currentDay = { day: day.day, courses: [] }
        for (const c of day.courses) {
          if (c.teacherId === this.state.teacher.id) {
            c.teacher = this.state.teacher
            c.subject = this.state.subjects.find(t => t.id === c.subjectId)
            c.class = cls
            currentDay.courses.push(c)
          }
        }
        schedule.push(currentDay)
      }
    }

    this.addSection('This week', 'week', this.week)
    this.addSection('Your tests', 'tests', this.tests)

    this.setState({
      ready: true,
      schedule,
      heading: `Welcome, ${this.state.teacher.gender} ${this.state.teacher.name}`
    })
  }

  week (_, { schedule }) {
    return <Timetable schedule={schedule} showTeacher={false} />
  }

  tests (_, { tests, subjects }) {
    console.log(tests)
    return <table class={globalStyle.marks}>
      <thead>
        <td>Title</td>
        <td>Subject</td>
        <td>Coefficient</td>
        <td>Average mark</td>
        <td>Details</td>
      </thead>
      <tbody>
        {tests.map(test => {
          return <tr>
            <td>{test.title}</td>
            <td>{subjects.find(s => s.id === test.subjectId).name}</td>
            <td>{test.coefficient}</td>
            <td>{this.getAverageMark(test)}</td>
            <td>
              <Link class={style.coloredButton} href={`/tests/${test.id}`}>Details</Link>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  }

  getAverageMark (test) {
    if (this.state.marksCache[test.id]) {
      const total = this.state.marksCache[test.id].reduce((sum, elt) => sum + elt.mark, 0)
      const count = this.state.marksCache[test.id].length
      return `${total / count}/${test.outOf}`
    } else {
      fetch(apiUrl('marks', { testId: test.id }))
        .then(res => res.json())
        .then(marks => {
          const marksCache = this.state.marksCache
          marksCache[test.id] = marks
          this.setState({ marksCache })
        })
      return 'Loading'
    }
  }
}
