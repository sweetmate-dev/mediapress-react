import { keys } from 'ramda'

export const DashboardMenuItems = {
  'create': 'Create',
  'all-projects': 'Projects',
  'team': 'Team',
  'media': 'Media',
  'clients': 'Clients',
  // 'style-guide': 'Style Guides',
  'analytics': 'Analytics',
  'videos': 'All Videos',
  'trash': 'Trash',
  'settings': 'Settings',
  'account': 'Account',
  // 'help': 'Help'
}

/**
 * Represents a selectable dashboard Menu
 */
export type DashboardMenuItem = keyof typeof DashboardMenuItems

/**
 * A list of MenuItem Keys
 */
export const DashboardMenuItemKeys = (keys(DashboardMenuItems) as DashboardMenuItem[])

export default DashboardMenuItems
