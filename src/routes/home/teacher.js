import BaseHome from './base'
import Timetable from '../../components/timetable'
import TestList from '../tests/list'
import Button from '../../components/button'
import { connect } from 'preact-redux'
import { ready } from '../../utils'
import { fetchMarks } from '../../redux/marks'
import { fetchStudents } from '../../redux/students'
import { fetchTests } from '../../redux/tests'
import { fetchSubjects } from '../../redux/subjects'
import { fetchClasses } from '../../redux/classes'
import { fetchCourses } from '../../redux/courses'
import { teacherTimetable } from './utils'

class TeacherHome extends BaseHome {
  componentWillMount () {
    this.props.fetchData()

    this.addSection('This week', 'week', this.week)
    this.addSection('Your tests', 'tests', this.tests)
  }

  componentWillReceiveProps (props) {
    this.setState({
      ready: props.ready,
      heading: `Welcome, ${props.teacher.gender}. ${props.teacher.lastName}.`
    })
  }

  week ({ timetable }) {
    return <Timetable schedule={timetable} showTeacher={false} />
  }

  tests ({ tests, subjects }) {
    return <div>
      <Button href='/tests/new'>New test</Button>
      <TestList tests={tests} subjects={subjects}/>
    </div>
  }
}

function getAverageMark (test, allMarks) {
  const marks = allMarks.filter(m => m.test === test.id)
  const total = marks.reduce((sum, elt) => sum + elt.mark, 0)
  const count = marks.length
  test.averageMark = marks.length ? `${total / count}/${test.outOf}` : 'No marks yet'
}

function mapStateToProps (state) {
  const teacher = state.accounts.data.find(x => x.username === state.login.connectedUser)
  if (!teacher) {
    return { ready: false }
  }

  const timetableReady = ready(state.courses) && ready(state.subjects) && ready(state.classes)
  return {
    teacher,
    subjects: state.subjects.data || [],
    ready: ready(state.students) && ready(state.subjects) && ready(state.tests) && ready(state.classes) &&
      ready(state.marks) && ready(state.courses),
    tests: state.tests.data
      ? state.tests.data.map(t => {
        t.averageMark = getAverageMark(t, state.marks.data || [])
        return t
      })
      : [],
    timetable: timetableReady ? teacherTimetable(state.courses.data, teacher, 'A', state.subjects.data, state.classes.data) : []
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchStudents())
      dispatch(fetchSubjects())
      dispatch(fetchTests())
      dispatch(fetchClasses())
      dispatch(fetchMarks())
      dispatch(fetchCourses())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHome)
