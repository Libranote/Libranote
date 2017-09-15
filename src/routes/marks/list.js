import Table from '../../components/table'
import Button from '../../components/button'
import store from '../../store'

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

    this.setState(await store.query({
      subjects: x => true
    }))

    this.setState({ ready: true })
  }

  renderLine (m, state) {
    if (this.props.for === 'teacher') {
      return this.renderTeacher(m, state)
    } else {
      return this.renderStudent(m, state)
    }
  }

  renderTeacher (m, { classes, students, tests }) {
    const test = tests[0]

    const studs = m.studentsId.map(s => students.find(student => student.id === s))
    const cls = studs.filter((s, i) => studs.findIndex(stud => stud.class === s.class) === i)
      .map(s => classes.find(c => c.id === s.classId))

    return <tr>
      <td>
        {studs.map(s => `${s.firstname} ${s.name}`).join(', ')}
      </td>
      <td>
        {cls.map(c => c.name).join(', ')}
      </td>
      <td>
        {m.mark}/{test.outOf}
      </td>
      <td>
        {m.comment}
      </td>
    </tr>
  }

  renderStudent (m, { tests, subjects }) {
    const test = tests.find(t => t.id === m.testId)

    return <tr>
      <td>{subjects.find(s => s.id === test.subjectId).name}</td>
      <td>{m.mark}/{test.outOf}</td>
      <td>{test.coefficient}</td>
      <td>{m.comment}</td>
    </tr>
  }

  fallback () {
    return this.props.for === 'teacher'
      ? <div>
        <p>No one have been marked on this test yet.</p>
        <Button onCLick={this.newMark}>Add the first mark</Button>
      </div>
      : <p>You don't have any mark</p>
  }

  newMark () {
    throw new Error('Not implemented yet')
  }
}
