import { Component } from 'preact'
import store from '../../store'
import globalStyle from '../../components/global-style'

export default class Test extends Component {
  async componentWillMount () {
    const id = Number.parseInt(this.props.id)
    this.setState(await store.query({
      tests: t => t.id === id,
      marks: m => m.testId === id,
      students: x => true,
      classes: x => true
    }))
    this.setState({ ready: true })
  }

  render (_, { ready, test, marks, students, classes }) {
    return ready
      ? <main>
        <h1>{test.title}</h1>
        <h2>Results</h2>
        <table class={globalStyle.marks}>
          <thead>
            <td>Student</td>
            <td>Class</td>
            <td>Mark</td>
            <td>Comment</td>
          </thead>
          <tbody>
            {marks.map(m => {
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
            })}
          </tbody>
        </table>
      </main>
      : <p>Loadin...</p>
  }
}
