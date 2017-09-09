import { Component } from 'preact'
import style from './style'
import Expander from '../../components/expander'

export default class BaseHome extends Component {
  expanders = {}
  sections = []

  addSection (title, id, content) {
    this.sections.push({ title, id, content: content.bind(this) })
    this.forceUpdate()
  }

  render (_, state) {
    return state.ready ? this.renderHome(state) : <h1 class={style.background}>Loading…</h1>
  }

  renderHome ({ student, teachers, subjects, tests, hiddenComponents }) {
    return <div class={style.home}>
      <h1>{this.state.heading}</h1>
      {this.sections.map(section =>
        <div>
          <h2>{section.title} {this.toggleButton(section.id)}</h2>
          <Expander ref={this.expander(section.id)}>
            {section.content(this.props, this.state)}
          </Expander>
        </div>
      )}
    </div>
  }

  expander (what) {
    return (e) => { this.expanders[what] = e }
  }

  toggleButton (expander) {
    return <button class={style.toggleButton} onClick={this.toggle.bind(this, [ expander ])}>
      Show {this.expanders[expander] && this.expanders[expander].isVisible() ? 'more' : 'less'}
    </button>
  }

  toggle (what) {
    if (this.expanders[what]) {
      this.expanders[what].toggle()
    }
  }
}
