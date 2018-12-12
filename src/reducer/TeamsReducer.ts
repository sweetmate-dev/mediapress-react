// @flow

import AppState from 'model/AppState'
import { Action } from 'actions'

const TeamsReducer = (state: AppState | null = null, action: Action) => {
  switch (action.type) {
    case 'TEAM_KICK_REQUEST':
      // TODO: Revoke user's access to team
      return state
    case 'TEAM_CREATE_REQUEST':
      // TODO: Create a team, which has access to a group of projects?
      return state
    case 'TEAM_USER_ROLE_REQUEST':
      // TODO: Modify user permissions in regards to a team
      return state
    default:
      return state
  }
}

export default TeamsReducer
