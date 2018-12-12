import user from './UserReducer'
import teams from './TeamsReducer'
import project from './ProjectReducer'
import ui from './UiReducer'
import element from './ElementReducer'
import app from './AppReducer'
import error from './ErrorReducer'
import scene from './SceneReducer'
import player from './PlayerReducer'

import AppState from 'model/AppState'
import { Action, CameraAction } from 'actions'

const reduceReducers = require('reduce-reducers')
import { Reducer } from 'redux'

/**
 * Central reducer in which all other reducers are combined into
 */
const App: Reducer<AppState> = reduceReducers(
  (state: AppState = new AppState(), action: Action) => {
    return new AppState({
      user: user(state.user, action),
      teams: teams(state.teams, action),
      ui: ui(state.ui, action as CameraAction),
      project: project(state.project, action),
      projects: state.projects
    })
  },
  player,
  scene,
  element,
  app,
  error
)

export default App
