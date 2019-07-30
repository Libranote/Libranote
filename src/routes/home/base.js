import { Component } from 'preact'
import style from './style'
import Expander from '../../components/expander'
import Badge from '../../components/badge'

export default class BaseHome extends Component {
  expanders = {}
  sections = []

  addSection (title, id, content, error) {
    this.sections.push({ title, id, content: content.bind(this), error })
    this.forceUpdate()
  }

  render (_, state) {
    return state.ready ? this.renderHome() : <h1 class={style.background}>Loading…</h1>
  }

  renderHome () {
    return <main>
      <h1>{this.state.heading}</h1>
      {this.sections.map(section =>
        <div id={section.id}>
          <h2 style={{ cursor: 'pointer' }} onClick={this.toggle.bind(this, [ section.id ])}>{section.title} {this.toggleButton(section.id)}</h2>
          <Expander ref={this.expander(section.id)}>
            {section.error
              ? <p class='errorMessage'>{section.error}</p>
              : section.content(this.props, this.state)}
          </Expander>
        </div>
      )}
    </main>
  }

  expander (what) {
    return (e) => { this.expanders[what] = e }
  }

  toggleButton (expander) {
    return <Badge transparent color='blue'>
      {this.expanders[expander]
        ? this.expanders[expander].isVisible() ? '-' : '+'
        : '-'
      }
    </Badge>
  }

  toggle (what) {
    if (this.expanders[what]) {
      this.expanders[what].toggle()
      this.forceUpdate()
    }
  }
}
