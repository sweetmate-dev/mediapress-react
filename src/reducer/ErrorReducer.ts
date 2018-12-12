// @flow

import AppState from 'model/AppState'
import { Action } from 'actions'
import { set, lensProp } from 'ramda'

/**
 * ErrorReducer
 *
 * Handles all error related actions, mainly from failed sagas
 * @param {AppState} state The AppState to operate on
 * @param {Action} action The reducer action
 * @return {AppState} The new AppState
 */
const ErrorReducer = (state: AppState = new AppState(), action: Action): AppState => {
  switch (action.type) {
    case 'USER_LOGIN_FAILURE':
    case 'USER_LOGOUT_FAIL':
      return set(lensProp('currentError'), action.message, state)
  }
  return state
}

export default ErrorReducer
