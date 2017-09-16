import BaseHome from './base'
import Timetable from '../../components/timetable'
import MarkList from '../marks/list'
import store from '../../store'

export default class StudentHome extends BaseHome {
  async componentWillMount () {
    this.setState(await store.query({
      students: s => s.id === this.props.studentId,
      teachers: x => true,
      subjects: x => true,
      marks: m => m.studentsId.includes(this.props.studentId)
    }))

    const testIds = this.state.marks.filter((mark, i) =>
      this.state.marks.findIndex(m => m.testId === mark.testId) >= 0
    ).map(m => m.testId)

    this.setState(await store.query({
      classes: c => c.id === this.state.student.classId,
      tests: t => testIds.includes(t.id)
    }))

    for (const day of this.state.class.timetable) {
      for (const c of day.courses) {
        c.teacher = this.state.teachers.find(t => t.id === c.teacherId)
        c.subject = this.state.subjects.find(t => t.id === c.subjectId)
        c.class = this.state.class
      }
    }

    this.addSection('This week', 'week', this.week)
    this.addSection('Last marks', 'marks', this.marks)

    this.setState({
      ready: true,
      heading: `Welcome, ${this.state.student.firstname}`
    })
  }

  week () {
    return <Timetable showTeacher={true} schedule={this.state.class.timetable} />
  }

  marks (_, { tests, marks }) {
    return <MarkList marks={marks} tests={tests} for='student'/>
  }
}
