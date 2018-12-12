const m = require('mithril')
import { values } from 'ramda'
import A from 'actions'

import store from 'store'
import { MenuItems as mi } from 'config/menuItems'
import { dashed } from 'lib/Util'
import SwitchView from '../objects/LightSwitch'

const MenuItems = values(mi)

const bottomBtn = (label, onclick, className = '') =>
  m('a.' + dashed(label), {
    href: '#',
    title: label,
    onclick: onclick,
    class: className
  }, label)

const SidebarView = {
  view: function () {
    const s = store.getState()
    return m('section.sidebar', {
      class: s.ui.menuCollapsed ? 'mini' : ''
    }, [
      m('a.logo', { href: '#' }, ''),
      m('div.menu-text', 'Menus'),
      m('ul', MenuItems.map(x =>
        m('li', {
          class: dashed(x) + (dashed(x) === s.ui.activeMenu ? ' active' : '')
        }, [
          m('a', {
            href: '#',
            onclick: () => store.dispatch(A.Ui.selectTab(dashed(x)))
          }, x)
        ]))
      ),
      m('div.bottom.save', [
        bottomBtn('Save', () => store.dispatch(A.Project.save(s.project)), s.ui.unsavedChanges ? 'unsaved' : ''),
        bottomBtn('Close', () => store.dispatch(A.Project.close()))
      ]),
      m('div.bottom', [
        bottomBtn('Toggle Collapse', () => store.dispatch(A.Ui.toggleMenuCollapse())),
        m(SwitchView)
      ])
    ])
  }
}

export default SidebarView
