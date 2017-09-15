import BaseHome from './base'
import Timetable from '../../components/timetable'
import TestList from '../tests/list'
import Button from '../../components/button'
import store from '../../store'

export default class TeacherHome extends BaseHome {
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

    this.state.tests.forEach(this.getAverageMark.bind(this))

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

  tests (_, { tests }) {
    return <div>
      <Button href='/tests/new'>New test</Button>
      <TestList tests={tests} />
    </div>
  }

  getAverageMark (test) {
    store.query({ marks: m => m.testId === test.id }).then(res => {
      const total = res.marks.reduce((sum, elt) => sum + elt.mark, 0)
      const count = res.marks.length
      test.averageMark = res.marks.length ? `${total / count}/${test.outOf}` : 'No marks yet'
      this.forceUpdate()
    })
    test.averageMark = 'Loading...'
  }
}
