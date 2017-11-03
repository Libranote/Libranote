import { render, h } from 'preact'
import './style'
import App from './components/app'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'preact-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './redux'

const store = createStore(reducers, applyMiddleware(logger, thunk))
console.log(store, applyMiddleware, thunk, reducers)

window.h = h
render(<Provider store={store}>
  <App />
</Provider>, document.body)
