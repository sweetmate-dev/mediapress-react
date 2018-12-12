const m = require('mithril')

const MenuEditPopoutView = {
  opened: false,
  element: null,
  view: function (vnode) {
    return m('div.menuedit-options', [
      m('a.hamburger', { href : '#' })
    ])
  }
}

export default MenuEditPopoutView
