
import { find, propEq } from 'ramda'

import User from './User'
import Project from './Project'
import UiState from './UiState'
import Scene from './Scene'
import Element from './Element'

/**
 * The default object when empty constructing AppState
 */
const AppStateDefault = { project: null, user: null, ui: null, projects: [], teams: [] }

/**
 * Represents the entire frontend state
 *
 * Includes static functions for purely aquiring important
 * sub elements
 */
export default class AppState {

  project: Project | null
  user: User | null
  ui: UiState
  projects: Project[]
  teams: any // @todo
  currentError: string | null

  constructor (s: any = AppStateDefault) {
    this.project = (typeof s.project === 'undefined' || s.project === null) ? null : s.project
    this.user = (typeof s.user === 'undefined' || s.user === null) ? null : s.user
    this.ui = (typeof s.ui === 'undefined' || s.ui === null) ? new UiState() : s.ui
    this.projects = typeof s.projects !== 'undefined' ? s.projects : [{ id: 'wut' }]
    this.teams = (typeof s.teams === 'undefined' || s.teams === null) ? [] : s.teams
    this.currentError = null
    return this
  }

 /**
  * Takes the current appstate and returns either the current
  * active scene or null if it doesn't exist
  *
  * @param {AppState} state The appstate to get the Scene from
  * @return {Maybe Scene} A scene if it exists
  */
  static getActiveScene (state: AppState): Scene | null {
    const proj = state.project
    if (proj === null || typeof proj === 'undefined' || proj.scenes === null) { return null }
    const res = find(propEq('id', state.ui.activeScene), proj.scenes)
    return typeof res === 'undefined' ? null : res
  }

  /**
   * Takes the current AppState and returns either the current
   * active element or null if it doesn't exist
   *
   * @param {AppState} state The appstate to get the Scene from
   *  @return {Maybe Element} A scene if it exists
   */
  static getActiveElement (state: AppState): Element | null {
    const proj = state.project
    if (proj === null || proj === undefined) { return null }
    const scene = AppState.getActiveScene(state)
    if (scene === null || scene === undefined) { return null }
    return find(propEq('id', state.ui.activeElement), scene.elements)
  }

}

export const getActiveScene = AppState.getActiveScene
export const getActiveElement = AppState.getActiveElement
