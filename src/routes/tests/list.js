import Button from '../../components/button'
import Table from '../../components/table'

export default class TestList extends Table {
  async componentWillMount () {
    this.setState({
      collection: this.props.tests,
      columns: [ 'Title', 'Subject', 'Coefficient', 'Average mark', 'Details' ],
      ready: true
    })
  }

  renderLine (test, _, { subjects }) {
    return <tr>
      <td>{test.title}</td>
      <td>{subjects.find(s => s.id === test.subject).name}</td>
      <td>{test.coefficient}</td>
      <td>{test.averageMark}</td>
      <td>
        <Button href={`/tests/${test.id}`} transparent noBg>Details</Button>
      </td>
    </tr>
  }

  fallback () {
    return <Button href='/tests/new'>Create your first test</Button>
  }
}
