// @flow

import { MenuItem, MenuItemKeys } from 'config/menuItems'
import { DashboardMenuItem as DMI, DashboardMenuItemKeys as DMIKeys } from 'config/dashboardMenuItems'

import PlayerState from 'model/PlayerState'

const NS = 'MP-UI.'
const ls = localStorage

/**
 * Gets the active menu from the localStorage
 * @param {string} key The key to search for in localStorage
 * @param {string} initial Fallback selection
 * @returns {string} MenuItem
 */
const getActiveMenu = (key: string, initial: MenuItem): MenuItem => {
  const res = ls.getItem(NS + key)
  return MenuItemKeys.find(x => x === res)
}

const getDashboardMenu = (key: string, initial: DMI): DMI => {
  const res = ls.getItem(NS + key)
  return DMIKeys.find(x => x === res)
}

const getLsBoolean = (key: string,initial: boolean): boolean => {
  const res = ls.getItem(NS + key) === 'true'
  return res === true ? res : initial
}

export type SubPanel = null | 'add' | 'image' | 'text' | 'chart' | 'video'

export default class UiState {

  activeMenu: MenuItem
  dashboardMenu: DMI
  activeScene: string | null
  activeElement: string | null
  camera: Camera
  darkColors: boolean
  player: PlayerState

  uploading: boolean
  menuCollapsed: boolean
  unsavedChanges: boolean
  previewing: boolean
  timelineZoom: number

  activeElementType: string | null

  // Global Modifier key tracking
  spaceMod: Boolean
  ctrlMod: Boolean
  altMod: Boolean

  // used for the edit subpanel, can be replaced with proper routes
  subPanel: SubPanel

  constructor () {
    this.menuCollapsed = getLsBoolean('menuCollapsed', false)
    this.activeMenu = getActiveMenu('activeMenu', 'preview')
    this.dashboardMenu = getDashboardMenu('dashboardMenu', 'all-projects')
    this.camera = [0,0,1920,1080,0.5]
    this.activeScene = null
    this.player = new PlayerState()
    this.activeElement = null
    this.previewing = false
    this.darkColors = false
    this.subPanel = null
    this.activeElementType = null
    this.timelineZoom = 1
    this.uploading = false
    this.spaceMod = false
    this.ctrlMod = false
    this.altMod = false
    return this
  }

  // Saves changes to the localStorage
  static commit (state: UiState): UiState {
    ls.setItem(NS + 'menuCollapsed', state.menuCollapsed.toString())
    ls.setItem(NS + 'activeMenu', state.activeMenu)
    ls.setItem(NS + 'dashboardMenu', state.dashboardMenu)
    return state
  }

}
