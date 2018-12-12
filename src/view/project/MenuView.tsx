const m = require('mithril')
import store from 'store'

import MenuAddSceneView from './MenuAddSceneView'
import MenuEditView from './MenuEditView'
import ExportView from './ExportView'
import ProjectSettingsView from './ProjectSettingsView'

/**
 * Main Sidebar used in the project area
 *
 * Expects Project to always exist, slide/activeElement maybe
 */
const MenuView = {

  view: function () {

    const s = store.getState()

    //    isActive :: String -> String
    const isActive = x => s.ui.activeMenu === x ? 'active' : ''

    return m('section.menu', { class: s.ui.menuCollapsed ? 'mini' : '' }, [
      m(MenuEditView, { active: isActive('elements') }),
      m('.add-scene.simple', { class: isActive('add-scene') }, [
        m(MenuAddSceneView)
      ]),
      m('.audio.full', { class: isActive('audio') }, [
        m('h3', 'Audio')
      ]),
      m(ExportView),
      m(ProjectSettingsView, { active: isActive('settings') })
    ])
  }
}

export default MenuView
