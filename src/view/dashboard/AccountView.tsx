import * as m from 'mithril' // tslint:disable-line
import store from 'store'
import A from '../../actions'

/**
 * Dashboard Page for viewing user account information
 */
const AccountView = {
  view: function (vnode) {
    return m('.page', { class: vnode.attrs.active ? 'active' : '' }, [
      m('h3', 'My Account'),
      m('p', 'More to come'),
      m('a.btn', { onclick: () => store.dispatch(A.User.logout()) }, 'Logout')
    ])
  }
}

export default AccountView
