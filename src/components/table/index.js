import { Component } from 'preact'
import style from './style'

export default class Table extends Component {
  state = {
    _collection: [],
    columns: []
  }

  render () {
    return this.state.ready && this.state.collection && this.state.columns
      ? this.state.collection.length === 0 && typeof this.fallback === 'function'
        ? this.fallback()
        : <table class={style.table}>
          <thead>
            {this.state.columns.map(c => <td>{c}</td>)}
          </thead>
          <tbody>
            {this.state.collection.map(x => this.renderLine(x, this.state))}
          </tbody>
        </table>
      : <p>Loading...</p>
  }

  renderLine () {
    throw new Error('Tables should implement renderLine')
  }
}
