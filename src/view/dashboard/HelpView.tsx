const m = require('mithril') // tslint:disable-line

import CommingSoonView from '../objects/CommingSoon'

const HelpView = {
  view: function (vnode) {
    return m('.page', { class: vnode.attrs.active ? 'active' : '' }, [
      m(CommingSoonView)
    ])
  }
}

export default HelpView
