import { connect } from 'preact-redux'
import MarkList from '../marks/list'
import Button from '../../components/button'

const Test = ({ id, tests, marks, students, classes }) => {
  const testId = Number.parseInt(id)
  const test = tests.find(t => t.id === testId)
  return test
    ? <main>
      <h1>{test.title}</h1>
      <p>Coefficient : {test.coefficient}</p>
      <h2>Results</h2>
      <MarkList for='teacher' marks={marks.filter(m => m.test === testId)} tests={[ test ]} students={students} classes={classes} testId={testId}/>
      <Button href={`/marks/new/${test.id}`}>Add a mark</Button>
    </main>
    : <p>Loading…</p>
}

const matchStateToProps = state => {
  return {
    tests: state.tests.data,
    marks: state.marks.data,
    students: state.students.data,
    classes: state.classes.data
  }
}

export default connect(matchStateToProps)(Test)
