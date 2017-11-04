import { connect } from 'preact-redux'
import BaseHome from './base'
import Timetable from '../../components/timetable'
import MarkList from '../marks/list'
import { ready } from '../../utils'
import { fetchMarks } from '../../redux/marks'
import { fetchStudents } from '../../redux/students'
import { fetchTests } from '../../redux/tests'
import { fetchSubjects } from '../../redux/subjects'
import { fetchClasses } from '../../redux/classes'
import { fetchAccounts } from '../../redux/account'
import { fetchCourses } from '../../redux/courses'
import { timetable } from './utils'

class StudentHome extends BaseHome {
  async componentWillMount () {
    this.props.fetchData()

    this.addSection('This week', 'week', this.week)
    this.addSection('Last marks', 'marks', this.marks)
  }

  componentWillReceiveProps (props) {
    this.setState({
      ready: props.ready,
      heading: `Welcome, ${props.student.firstName}.`
    })
    this.sections.find(s => s.id === 'marks').error = props.marksError
  }

  week ({ timetable }) {
    return <Timetable showTeacher={true} schedule={timetable} />
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

  const timetableReady = state.courses.data && state.subjects.data && state.classes.data

  const res = {
    student,
    marks: state.marks.data ? state.marks.data.filter(m => m.student === student.id) : [],
    marksError: state.marks.error || state.tests.error || state.subjects.error,
    timetableError: state.classes.error || state.courses.error,
    timetable: timetableReady ? timetable(state.courses.data, student, 'A', state.subjects.data, state.classes.data) : [],
    class: state.classes.data ? state.classes.data : [],
    tests: state.tests.data ? state.tests.data : [],
    subjects: state.subjects.data ? state.subjects.data : [],
    ready: ready(state.marks) && ready(state.students) && ready(state.tests) && ready(state.subjects) && ready(state.classes) && ready(state.accounts)
  }
  return res
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchMarks())
      dispatch(fetchStudents())
      dispatch(fetchTests())
      dispatch(fetchSubjects())
      dispatch(fetchClasses())
      dispatch(fetchCourses())
      dispatch(fetchAccounts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentHome)
