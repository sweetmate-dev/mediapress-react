const m = require('mithril') // tslint:disable-line
import { toPairs } from 'ramda'

import store from 'store'
import A from '../../actions'
import SwitchView from '../objects/LightSwitch'
import dmi from 'config/dashboardMenuItems'
import { dashed } from 'lib/Util'

//    MenuItems :: Pair<slug, name>
const MenuItems: [string, string][] = (toPairs(dmi))

//    bottomBtn :: String -> (Void -> Void) -> Mithril
const bottomBtn = (label, onclick) =>
  m('a.' + dashed(label), {
    href: '#', title: label, onclick: onclick
  }, label)

const ProjectSidebarView = {
  view: function () {
    const s = store.getState()
    const activeMenu = s.ui.dashboardMenu
    return m('section.sidebar.no-timeline', {
      class: s.ui.menuCollapsed ? 'mini' : ''
    }, [
      m('a.logo', { href: '#' }, ''),
      m('ul', MenuItems.map(
        x => m('li', {
          class: x[0] + (x[0] === activeMenu ? ' active' : '') + (x[0] === 'settings' ? ' dashboard' : '')
        }, [ m('a', {
          href: '#',
          onclick: () => store.dispatch(A.Ui.selectDashboardTab(x[0]))
        }, x[1])])
      )),
      m('div.bottom', [
        bottomBtn('Toggle Collapse', () => store.dispatch(A.Ui.toggleMenuCollapse())),
        m(SwitchView)
      ])
    ])
  }
}

export default ProjectSidebarView
