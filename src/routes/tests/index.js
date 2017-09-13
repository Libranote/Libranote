import { Component } from 'preact'
import store from '../../store'
import MarkList from '../marks/list'

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
        <MarkList for='teacher' marks={marks} tests={[ test ]} students={students} classes={classes} />
      </main>
      : <p>Loading...</p>
  }
}
