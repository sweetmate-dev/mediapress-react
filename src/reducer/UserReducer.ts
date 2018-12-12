import User from 'model/User'
import { Action } from 'actions'
import { saveSession, loadSession } from 'lib/Session'

const UserReducer = (state: User | null = null, action: Action) => {
  if (state == null) { state = loadSession() }
  switch (action.type) {

    case 'USER_LOGIN_SUCCESS':
      return saveSession(new User(action.user))

    // @todo Need to comeup with a better solution for logging out users when session invalid
    // case 'ERROR_AUTH':
    //   logoutUser()
    //  return null

    case 'USER_LOGOUT_SUCCESS': return null
    case 'USER_LOGOUT_FAIL' : return state

    case 'USER_REGISTER_SUCCESS': return state
    case 'USER_REGISTER_FAIL': return state

    default: return state
  }
}

export default UserReducer
