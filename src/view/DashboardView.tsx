'use-strict'
const m = require('mithril') // tslint:disable-line

import DashboardSidebar from 'view/dashboard/DashboardSidebarView'
import ProjectList from 'view/dashboard/ProjectListView'
import AccountView from 'view/dashboard/AccountView'
import AnalyticsView from 'view/dashboard/AnalyticsView'
import ProjectCreate from 'view/dashboard/ProjectCreateView'
import ClientsView from 'view/dashboard/ClientsView'
import TeamView from 'view/dashboard/TeamView'
import AssetLibraryView from 'view/dashboard/AssetLibraryView'
import VideoListView from 'view/dashboard/VideoListView'
import TrashView from 'view/dashboard/TrashView'
import SettingsView from 'view/dashboard/SettingsView'

import store from 'store'

const DashboardView = {
  view: function () {
    const s = store.getState()
    const activePage = s.ui.dashboardMenu
    return m('div#app-inner', { class: s.user ? '' : 'hidden' }, [
      m(DashboardSidebar),
      m(ProjectCreate, { active: activePage === 'create' }),
      m(ProjectList, { active: activePage === 'all-projects' }),
      m(AssetLibraryView, { active: activePage === 'media' }),
      m(TeamView, { active: activePage === 'team' }),
      m(ClientsView, { active: activePage === 'clients' }),
      m(AnalyticsView, { active: activePage === 'analytics' }),
      m(VideoListView, { active: activePage === 'videos' }),
      m(TrashView, { active: activePage === 'trash' }),
      m(AccountView, { active: activePage === 'account' }),
      m(SettingsView, { active: activePage === 'settings' }),
      // m(HelpView, { active: activePage === 'help' })
    ])
  }
}

export default DashboardView
