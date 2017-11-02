import { render, h } from 'preact'
import './style'
import App from './components/app'

window.h = h
render(<App />, document.body)
console.log(App)
