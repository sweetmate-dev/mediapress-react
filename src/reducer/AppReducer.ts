import { set, lensProp, map } from 'ramda'

import Project from 'model/Project'
import AppState from 'model/AppState'
import { Action } from 'actions'

const AppReducer = (state: AppState = new AppState(), action: Action): AppState => {
  switch (action.type) {
    case '@@INIT': return state
    case 'SYNC_SUCCESS':
      return set(lensProp('projects'), map(x => new Project(x), action.projects), state)
    case 'SYNC_FAILURE':
      if (action.message === 'Api Server Down') {
        return set(lensProp('currentError'), action.message, set(lensProp('user'), null, state))
      }
      return state
    case 'SET_STATE':
      return set(lensProp('projects'), action.state.projects, state)
    case 'CLEAR': return new AppState()
    case 'MOCK': {
      return action.state
    }
  }
  return state
}

export default AppReducer
