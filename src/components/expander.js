import { Component } from 'preact'

export default class Expander extends Component {
  state = {
    hidden: false
  }

  render ({ children }, { hidden }) {
    return <div>
      {
        hidden
          ? null
          : children
      }
    </div>
  }

  toggle () {
    this.setState({ hidden: !this.state.hidden })
  }

  isVisible () {
    return !this.state.hidden
  }
}
