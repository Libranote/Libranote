import { connect } from 'preact-redux'
import BaseHome from './base'
import Timetable from '../../components/timetable'
import MarkList from '../marks/list'
import { ready } from '../../utils'
import { fetchMarks } from '../../redux/marks'
import { fetchStudents } from '../../redux/students'
import { fetchTests } from '../../redux/tests'
import { fetchSubjects } from '../../redux/subjects'

class StudentHome extends BaseHome {
  async componentWillMount () {
    this.props.fetchData()
    /* for (const day of this.state.class.timetable) {
      for (const c of day.courses) {
        c.teacher = this.state.teachers.find(t => t.id === c.teacherId)
        c.subject = this.state.subjects.find(t => t.id === c.subjectId)
        c.class = this.state.class
      }
    } */

    // this.addSection('This week', 'week', this.week)
    this.addSection('Last marks', 'marks', this.marks)
  }

  componentWillReceiveProps (props) {
    this.setState({
      ready: props.ready,
      heading: `Welcome, ${props.student.firstName}`
    })
    this.sections.find(s => s.id === 'marks').error = props.marksError
  }

  week () {
    return <Timetable showTeacher={true} schedule={this.props.class.timetable} />
  }

  marks ({ tests, marks, subjects }) {
    return <MarkList marks={marks} tests={tests} subjects={subjects} for='student'/>
  }
}

function mapStateToProps (state) {
  const student = state.students.data.find(x => x.username === state.login.connectedUser)
  if (!student) {
    return { ready: false }
  }
  const res = {
    student,
    marks: state.marks.data ? state.marks.data.filter(m => m.student === student.id) : [],
    marksError: state.marks.error,
    class: {},
    tests: state.tests.data ? state.tests.data : [],
    subjects: state.subjects.data ? state.subjects.data : [],
    ready: ready(state.marks) && ready(state.students) && ready(state.tests) && ready(state.subjects)
  }
  console.log(res)
  return res
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchMarks())
      dispatch(fetchStudents())
      dispatch(fetchTests())
      dispatch(fetchSubjects())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentHome)
