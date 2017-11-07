import Table from '../../components/table'
import Button from '../../components/button'
import { route } from 'preact-router'

export default class MarkList extends Table {
  async componentWillMount () {
    this.setState({
      columns: this.props.for === 'teacher'
        ? [ 'Student', 'Class', 'Mark', 'Comment' ]
        : [ 'Subject', 'Mark', 'Coefficient', 'Comment' ],
      collection: this.props.marks,
      tests: this.props.tests,
      classes: this.props.classes,
      students: this.props.students
    })

    this.setState({ ready: true })
  }

  renderLine (m, state, props) {
    if (this.props.for === 'teacher') {
      return this.renderTeacher(m, state, props)
    } else {
      return this.renderStudent(m, state, props)
    }
  }

  renderTeacher (m, { classes, students, tests }) {
    const test = tests.find(t => t.id === m.test)

    const stud = students.find(s => s.id === m.student)
    const cls = classes.find(c => c.id === stud.class)
    return <tr>
      <td>
        {`${stud.firstName} ${stud.lastName}`}
      </td>
      <td>
        {cls.name}
      </td>
      <td>
        {m.mark}/{test.outOf}
      </td>
      <td>
        {m.comment}
      </td>
    </tr>
  }

  renderStudent (m, _, { tests, subjects }) {
    const test = tests.find(t => t.id === m.test)

    return <tr>
      <td>{subjects.find(s => s.id === test.subject).name}</td>
      <td>{m.mark}/{test.outOf}</td>
      <td>{test.coefficient}</td>
      <td>{m.comment}</td>
    </tr>
  }

  fallback () {
    return this.props.for === 'teacher'
      ? <div>
        <p>No one have been marked on this test yet.</p>
        <Button onCLick={this.newMark.bind(this)}>Add the first mark</Button>
      </div>
      : <p>You don't have any mark</p>
  }

  newMark () {
    route(`marks/new/${this.props.testId}`)
  }
}
