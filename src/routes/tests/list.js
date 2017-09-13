import { Link } from 'preact-router'

import Table from '../../components/table'
import globalStyle from '../../components/global-style'
import store from '../../store'

export default class TestList extends Table {
  async componentWillMount () {
    this.setState(await store.query({
      subjects: x => true
    }))

    this.setState({
      collection: this.props.tests,
      columns: [ 'Title', 'Subject', 'Coefficient', 'Average mark', 'Details' ],
      ready: true
    })
  }

  renderLine (test, { subjects }) {
    return <tr>
      <td>{test.title}</td>
      <td>{subjects.find(s => s.id === test.subjectId).name}</td>
      <td>{test.coefficient}</td>
      <td>{test.averageMark}</td>
      <td>
        <Link class={globalStyle.coloredButton} href={`/tests/${test.id}`}>Details</Link>
      </td>
    </tr>
  }
}
