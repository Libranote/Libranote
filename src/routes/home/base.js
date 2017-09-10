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
    return state.ready ? this.renderHome() : <h1 class={style.background}>Loading…</h1>
  }

  renderHome () {
    return <main>
      <h1>{this.state.heading}</h1>
      {this.sections.map(section =>
        <div>
          <h2>{section.title} {this.toggleButton(section.id)}</h2>
          <Expander ref={this.expander(section.id)}>
            {section.content(this.props, this.state)}
          </Expander>
        </div>
      )}
    </main>
  }

  expander (what) {
    return (e) => { this.expanders[what] = e }
  }

  toggleButton (expander) {
    return <button class={style.coloredButton} onClick={this.toggle.bind(this, [ expander ])}>
      Show {this.expanders[expander] && this.expanders[expander].isVisible() ? 'less' : 'more'}
    </button>
  }

  toggle (what) {
    if (this.expanders[what]) {
      this.expanders[what].toggle()
      this.forceUpdate()
    }
  }
}
