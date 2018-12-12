import 'regenerator-runtime/runtime'
import * as m from 'mithril'
require('./sass/styles.sass')
import AppView from './view/AppView'
import store from 'store'
import { equals } from 'ramda'

// Find the app container and mount mithril to load Mediapress
const initApp = () => {
  const $app = document.getElementById('app')
  m.mount($app, AppView)
  if (currentState.user !== null) { store.dispatch({ type: 'SYNC_REQUEST' }) }
}

// Determine the initial state
let currentState = store.getState()

// Subscribe to the Store and redraw on change
// @todo we can remove/reduce the firing of redraw since it already gets fired by CanvasView.draw
store.subscribe(() => {
  const newState = store.getState()
  if (!equals(currentState, newState)) m.redraw()
  currentState = newState
})

// Fire initApp on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp, false)
