
/**
 * Dropdown
 */
const m = require('mithril')

export default {
  data: {
    open: false,
    title: 'undefined',
    content: 'undefined'
  },
  oninit: vnode => {
    vnode.state.data.content = vnode.children[0]
    vnode.state.data.title = vnode.children[1].title
  },
  onupdate: vnode => {
    vnode.state.data.content = vnode.children[0]
  },
  view: vnode => {
    const data = vnode.state.data
    const toggleInner = () => data.open = !data.open
    return (<div class={'dropdown ' + (data.open ? 'open' : '')}>
      <a class='dropdown-header' onclick={toggleInner}>{data.title}</a>
      <div class='dropdown-inner'>{data.content}</div>
    </div>)
  }
}
