import { over, lensProp, assocPath, set, compose, clamp } from 'ramda'
import { adjust, zoomIn, zoomOut } from 'model/Camera'
import UiState from 'model/UiState'
import { UiAction, CameraAction, SceneAction, UserLoginSuccess, ElementAction, ProjectAction, UserLoginFailure, UserLoginRequest, UserLogoutSuccess } from 'actions'

type AllowedActions =
  | UiAction
  | CameraAction
  | SceneAction
  | ElementAction
  | UserLoginRequest
  | UserLoginFailure
  | UserLoginSuccess
  | UserLogoutSuccess
  | ProjectAction

//    handleZoom :: number -> number -> number
// Takes the delta of the zoom, the current value and returns the correct zoom
const handleZoom = delta => v => clamp(0.1, 3, delta > 0 ? v + 0.1 : v - 0.1)

// Lens Definitions
const setPreviewing = set(lensProp('previewing'))
const camera = lensProp('camera')
const setTheme = set(lensProp('darkColors'))
const setUploading = set(lensProp('uploading'))

// Updates the width/height of the camera by providing a point
const updateArea = (area: Point, state: UiState): UiState => {
  return (compose(
    assocPath((['camera', 2]), area[0]),
    assocPath((['camera', 3]), area[1])
  )(state) as UiState)
}

const UiReducer = (state: UiState = new UiState(), action: AllowedActions): UiState => {

  switch (action.type) {
    case 'SELECT_TAB':
      return UiState.commit(set(lensProp('activeMenu'), action.tab, state))
    case 'SELECT_DASH_TAB':
      return UiState.commit(set(lensProp('dashboardMenu'), action.tab, state))
    case 'TOGGLE_MENU_COLLAPSE':
      return UiState.commit(over(lensProp('menuCollapsed'), m => !m, state))
    case 'CAMERA_ADJUST':
      return over(camera, c => adjust(action.delta, c), state)
    case 'CAMERA_RESIZE':
      return updateArea(action.area, state)
    case 'CAMERA_ZOOM_IN':
      return over(camera, zoomIn, state)
    case 'CAMERA_ZOOM_OUT':
      return over(camera, zoomOut, state)
    case 'PROJECT_PREVIEW': return setPreviewing(true, state)
    case 'UI_OPEN_SUB_PANEL':
      return set(lensProp('subPanel'), action.panel, state)
    case 'PROJECT_STOP_PREVIEW': return setPreviewing(false, state)
    case 'DARK_MODE_ENABLE': return UiState.commit(setTheme(true, state))
    case 'DARK_MODE_DISABLE': return UiState.commit(setTheme(false, state))
    case 'UI_ZOOM_TIMELINE':
      return over(lensProp('timelineZoom'), handleZoom(action.delta), state)

    case 'UI_SPACE_MOD': return set(lensProp('spaceMod'), action.pressed, state)
    case 'UI_CTRL_MOD': return set(lensProp('ctrlMod'), action.pressed, state)
    case 'UI_ALT_MOD': return set(lensProp('altMod'), action.pressed, state)

    // On login, focus the project list view
    case 'USER_LOGIN_SUCCESS':
      return UiState.commit(set(lensProp('uploading'), false, set(lensProp('dashboardMenu'), 'all-projects', state)))
    // On scene selection or creation, focus the edit menu
    case 'SCENE_CREATE':
    case 'SCENE_SELECT': return UiState.commit(set(lensProp('activeMenu'), 'edit', state))

    // Uploading / Async handling (Triggering the spinners)
    case 'PROJECT_SAVE_REQUEST':
    case 'USER_LOGIN_REQUEST':
    case 'ELEMENT_UPLOAD_IMAGE_REQUEST':
      return setUploading(false, state)
    case 'USER_LOGIN_FAILURE':
    case 'PROJECT_SAVE_SUCCESS':
    case 'PROJECT_SAVE_FAILURE':
    case 'USER_LOGOUT_SUCCESS':
    case 'ELEMENT_UPLOAD_IMAGE_FAILURE':
    case 'ELEMENT_UPLOAD_IMAGE_SUCCESS':
      return setUploading(false, state)
    default:
      return state
  }
}

export default UiReducer
