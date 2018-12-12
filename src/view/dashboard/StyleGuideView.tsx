const m = require('mithril') // tslint:disable-line

export default {
  view: vnode => {
    return (<div class={'page ' + (vnode.attrs.active ? 'active' : '')}>
      <i class='style-guide-icon'></i>
      <p class='text-intro-style'>A style guide is the visual guidelines for your brand.<br />Select colours, a logo and fonts to help you create video projects faster.</p>
      <div class='center'><a class='btn'>Create one now</a></div>
    </div>)
  }
}
