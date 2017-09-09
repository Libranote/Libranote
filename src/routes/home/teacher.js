import BaseHome from './base'
import style from './style'
import { apiUrl, fetchAll } from '../../utils'
import Timetable from '../../components/timetable'

export default class Home extends BaseHome {
  state = {
    marksCache: []
  }

  async componentWillMount () {
    const [ students, teachers, subjects ] = await fetchAll([
      apiUrl('students'),
      apiUrl('teachers', { id: this.props.teacherId }),
      apiUrl('subjects')
    ])
    this.setState({ students: students, teacher: teachers[0], subjects })

    const [ tests, classes ] = await fetchAll([
      apiUrl('tests', { teacher: this.state.teacher.id }),
      apiUrl('classes', { 'teachers_like': this.state.teacher.id })
    ])
    this.setState({ classes, tests })

    const schedule = []
    for (const cls of this.state.classes) {
      for (const day of cls.timetable) {
        const currentDay = { day: day.day, courses: [] }
        for (const c of day.courses) {
          if (c.teacher === this.state.teacher.id) {
            c.teacher = this.state.teacher
            c.subject = this.state.subjects.find(t => t.id === c.subject)
            c.class = cls
            currentDay.courses.push(c)
          }
        }
        schedule.push(currentDay)
      }
    }

    this.addSection('This week', 'week', this.week)
    this.addSection('Your tests', 'tests', this.tests)

    this.setState({ ready: true, schedule, heading: `Welcome, ${this.state.teacher.gender} ${this.state.teacher.name}` })
  }

  week (_, { schedule }) {
    return <Timetable schedule={schedule} showTeacher={false} />
  }

  tests (_, { tests, subjects }) {
    console.log(tests)
    return <table class={style.marks}>
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
            <td>{subjects.find(s => s.id === test.subject).name}</td>
            <td>{test.coefficient}</td>
            <td>{this.getAverageMark(test)}</td>
            <td>
              <button class={style.coloredButton} onClick={this.testDetails.bind(this, [ test ])}>
                Details
              </button>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  }

  testDetails (test) {
    return ''
  }

  getAverageMark (test) {
    if (this.state.marksCache[test.id]) {
      const total = this.state.marksCache[test.id].reduce((sum, elt) => sum + elt.mark, 0)
      const count = this.state.marksCache[test.id].length
      return `${total / count}/${test.outOf}`
    } else {
      fetch(apiUrl('marks', { test: test.id }))
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
