const m = require('mithril')

import CommingSoonView from '../objects/CommingSoon'

export default {
  view: vnode => {
    return (<div class={'page commingSoon ' + (vnode.attrs.active ? 'active' : '')}>
      {m(CommingSoonView)}
    </div>)
  }
}
