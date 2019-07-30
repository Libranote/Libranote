import Form from '../../components/form'
import { route } from 'preact-router'
import { connect } from 'preact-redux'
import { saveMark } from '../../redux/marks'
import { getDisplayName } from '../../utils'

class NewMark extends Form {
  state = {
    student: 0,
    mark: 0,
    comment: ''
  }

  componentWillMount () {
    super.componentWillMount()

    this.setState({
      student: this.props.student
    })

    this.title = <h1>Mark a student</h1>

    this.addInput('Student', 'student', <select>
      {this.props.students.map(s =>
        <option value={s.id}>
          {getDisplayName(s)}
        </option>
      )})}
    </select>)

    this.addInput('Mark', 'mark', <input type='number' min='0' max={this.props.test.outOf}/>)
    this.addInput('Comment', 'comment', <input />)

    this.setState({ ready: true })
  }

  componentWillUpdate () {
    this.setState({
      nextStudent: this.props.students.find(s => s.id === (this.state.student + 1))
    })
    this.submitMessage = this.state.nextStudent ? 'Save and mark next student' : 'Save'
  }

  submit (evt) {
    const newMark = {
      comment: this.state.comment,
      test: Number.parseInt(this.props.test.id),
      student: Number.parseInt(this.state.student),
      mark: Number.parseInt(this.state.mark)
    }
    this.props.saveMark(newMark)

    if (this.state.nextStudent) {
      route(`/marks/new/${this.props.testId}/${this.state.nextStudent.id}`)
    } else {
      route(`/tests/${this.props.testId}`)
    }
    evt.preventDefault()
  }
}

const mapStateToProps = state => {
  const oneId = state.app.queryIds.length === 1
  const testId = oneId ? state.app.queryIds[0] : state.app.queryIds[1]
  const studentId = oneId ? 0 : state.app.queryIds[0]
  const student = state.students.data.find(s => s.id === studentId)
  return {
    students: state.students.data,
    subjects: state.subjects.data,
    test: state.tests.data.find(t => t.id === testId),
    student: student ? student.id : 0
  }
}

const mapDispatchToProps = dispatch => ({
  saveMark: mark => dispatch(saveMark(mark))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMark)
