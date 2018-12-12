import * as m from 'mithril' // tslint:disable-line

import LoginView from './LoginView'
import DashboardView from './DashboardView'
import ProjectView from 'view/ProjectView'

import Store from '../store'
import A from 'actions'

function fetchColorClass () {
  return (Store.getState().ui.darkColors === true ? 'night-colors' : 'day-colors')
}

let filedrag = false

/**
 * AppView
 *
 * The ultimate View in which all other Views are mounted onto. From here the main
 * sections include the Login, Dashboard and Project views.
 */
const AppView = {
  data: { filedrag: false },
  view: function () {
    const ui = Store.getState().ui
    return m('div', {
      class: fetchColorClass() + (ui.uploading ? ' uploading' : '') + (filedrag ? ' filedrag' : '')
    }, Store.getState().project == null
           ? m('div#app-shell', [LoginView, DashboardView].map((m as any)))
           : m(ProjectView)
    )
  },

  oncreate: function (vnode) {

    // Global Keyboard Event Handler
    window.addEventListener('keydown', e => {
      if ((e as any).target.tagName === 'INPUT') { return true }
      const ui = Store.getState().ui
      if (e.keyCode === 32 && !ui.spaceMod) { Store.dispatch(A.Ui.spaceMod(true)) }
      e.preventDefault()
    })
    window.addEventListener('keyup', e => {
      if ((e as any).target.tagName === 'INPUT') { return true }
      const ui = Store.getState().ui
      if (e.keyCode === 32 && ui.spaceMod) { Store.dispatch(A.Ui.spaceMod(false)) }
      e.preventDefault()
    })
  }
}

export default AppView
