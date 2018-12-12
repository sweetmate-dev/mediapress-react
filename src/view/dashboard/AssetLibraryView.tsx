const m = require('mithril') // tslint:disable-line

import CommingSoonView from '../objects/CommingSoon'

export default {
  view: vnode => {
    return (<div class={'page ' + (vnode.attrs.active ? 'active' : '')}>
      {m(CommingSoonView)}
    </div>)
  }
}
