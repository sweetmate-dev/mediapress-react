'use-strict'
import Scene, { ElementUnion } from 'model/Scene'
import Project from 'model/Project'
import AppState from 'model/AppState'
import Job from 'model/Job'
import { SubPanel } from 'model/UiState'

import { isValidEmail } from 'lib/Util'
import ElementText from 'model/ElementText';
import ElementChart from 'model/ElementChart';
import ElementImage from 'model/ElementImage';

/**
 * Action Type Definitions
 *
 * This section defines the Typescript struct types which all actions must adhere to
 */

// App Actions
export type AppSetStateAction = {type: 'SET_STATE', state: AppState}
export type AppErrorAction = {type: 'ERROR', error: any}
export type AppAuthErrorAction = {type: 'ERROR_AUTH', error: any}
export type AppClearAction = {type: 'CLEAR'}
export type AppStateSyncRequest = {type: 'SYNC_REQUEST'}
export type AppStateSyncSuccess = {type: 'SYNC_SUCCESS', projects: any}
export type AppStateSyncFailure = {type: 'SYNC_FAILURE', message: any}

export type AppAction =
  | AppAuthErrorAction
  | AppSetStateAction
  | AppErrorAction
  | AppClearAction
  | AppStateSyncRequest
  | AppStateSyncSuccess
  | AppStateSyncFailure

// Camera Actions
export type CameraAdjustAction = {type: 'CAMERA_ADJUST', delta: Point}
export type CameraZoomInAction = {type: 'CAMERA_ZOOM_IN'}
export type CameraZoomOutAction = {type: 'CAMERA_ZOOM_OUT'}
export type CameraResetAction = {type: 'CAMERA_RESET'}
export type CameraResizeAction = {type: 'CAMERA_RESIZE', area: Point}

export type CameraAction =
  | CameraAdjustAction
  | CameraZoomInAction
  | CameraZoomOutAction
  | CameraResetAction
  | CameraResizeAction

// Element Actions
export type ElementUpdateAction = {type: 'ELEMENT_UPDATE', updates: {}}
export type ElementCreateAction = {type: 'ELEMENT_CREATE', element_type: 'text' | 'image' | 'chart', element: ElementText | ElementChart | ElementImage | null}
export type ElementTypeSetAction = {type: 'ELEMENT_TYPE_SET', element_type: 'text' | 'image' | 'chart'}
export type ElementSelectAction = {type: 'ELEMENT_SELECT', id: string}
export type ElementCommitAction = {type: 'ELEMENT_COMMIT'}
export type ElementCancelAction = {type: 'ELEMENT_CANCEL'}
export type ElementMoveAction = {type: 'ELEMENT_MOVE', delta: Point}
export type ElementTransformAction = {type: 'ELEMENT_TRANSFORM', delta: DeltaRect}
export type ElementSetAnimationAction = {type: 'ELEMENT_SET_ANIMATION', animation: any}
export type ElementCloneAction = {type: 'ELEMENT_CLONE', element: ElementUnion}
export type ElementSetImageRequest = {type: 'ELEMENT_SET_IMAGE_REQUEST', image: HTMLImageElement}
export type ElementSetImageSuccess = {type: 'ELEMENT_SET_IMAGE_SUCCESS', element: any}
export type ElementSetImageFailure = {type: 'ELEMENT_SET_IMAGE_FAILURE', message: any}
export type ElementUploadImageRequest = {type: 'ELEMENT_UPLOAD_IMAGE_REQUEST', id: string, image: HTMLImageElement}
export type ElementUploadImageSuccess = {type: 'ELEMENT_UPLOAD_IMAGE_SUCCESS', image: HTMLImageElement}
export type ElementUploadImageFailure = {type: 'ELEMENT_UPLOAD_IMAGE_FAILURE', message: any}

export type ElementAction =
  | ElementUpdateAction
  | ElementCreateAction
  | ElementTypeSetAction
  | ElementSelectAction
  | ElementCommitAction
  | ElementCancelAction
  | ElementSetAnimationAction
  | ElementMoveAction
  | ElementTransformAction
  | ElementCloneAction
  | ElementUploadImageRequest | ElementUploadImageSuccess | ElementUploadImageFailure
  | ElementSetImageRequest | ElementSetImageSuccess | ElementSetImageFailure

// Player Actions
export type PlayerPlayAction = {type: 'PLAYER_PLAY'}
export type PlayerPauseAction = {type: 'PLAYER_PAUSE'}
export type PlayerRestartAction = {type: 'PLAYER_RESTART'}
export type PlayerSeekAction = {type: 'PLAYER_SEEK', time: number}
export type PlayerScrobbleAction = {type: 'PLAYER_SCROBBLE', time: number}
export type PlayerAction =
  | PlayerPlayAction
  | PlayerPauseAction
  | PlayerRestartAction
  | PlayerSeekAction
  | PlayerScrobbleAction

// Project Actions
export type ProjectUpdateAction = {type: 'PROJECT_UPDATE', updates: {}}
export type ProjectCloseAction = {type: 'PROJECT_CLOSE'}
export type ProjectRenameAction = {type: 'PROJECT_RENAME', name: string}
export type ProjectRemoveAction = {type: 'PROJECT_REMOVE'}
export type ProjectFinishRenderAction = {type: 'PROJECT_FINISH_RENDER', video: string}
export type ProjectOpenRequest = {type: 'PROJECT_OPEN_REQUEST', id: number}
export type ProjectOpenSuccess = {type: 'PROJECT_OPEN_SUCCESS', project: Project}
export type ProjectOpenFailure = {type: 'PROJECT_OPEN_FAIL', message: string}
export type ProjectSaveRequest = {type: 'PROJECT_SAVE_REQUEST', project: Project}
export type ProjectSaveSuccess = {type: 'PROJECT_SAVE_SUCCESS', project: Project}
export type ProjectSaveFailure = {type: 'PROJECT_SAVE_FAILURE', message: string}
export type ProjectDeleteRequest = {type: 'PROJECT_DELETE_REQUEST', id: string}
export type ProjectDeleteSuccess = {type: 'PROJECT_DELETE_SUCCESS'}
export type ProjectDeleteFailure = {type: 'PROJECT_DELETE_FAILURE', message: any}
export type ProjectRenderRequest = {type: 'PROJECT_RENDER_REQUEST', id: number}
export type ProjectRenderSuccess = {type: 'PROJECT_RENDER_SUCCESS', job: Job}
export type ProjectRenderFailure = {type: 'PROJECT_RENDER_FAILURE'}
export type ProjectCreateRequest = {type: 'PROJECT_CREATE_REQUEST', proj: {name: string, description: string}}
export type ProjectCreateSuccess = {type: 'PROJECT_CREATE_SUCCESS', project: Project}
export type ProjectCreateFailure = {type: 'PROJECT_CREATE_FAILURE', message: any}

export type ProjectAction =
  | ProjectOpenRequest | ProjectOpenSuccess | ProjectOpenFailure
  | ProjectSaveRequest | ProjectSaveSuccess | ProjectSaveFailure
  | ProjectRenderRequest | ProjectRenderSuccess | ProjectRenderFailure
  | ProjectDeleteRequest | ProjectDeleteSuccess | ProjectDeleteFailure
  | ProjectCreateRequest | ProjectCreateSuccess | ProjectCreateFailure
  | ProjectCloseAction
  | ProjectRenameAction
  | ProjectRemoveAction
  | ProjectFinishRenderAction
  | ProjectUpdateAction

// Scene Actions
export type SceneCreateAction = {type: 'SCENE_CREATE', scene: Scene}
export type SceneCancelAction = {type: 'SCENE_CANCEL'}
export type SceneCommitAction = {type: 'SCENE_COMMIT'}
export type SceneDeleteAction = {type: 'SCENE_DELETE', id: string}
export type SceneSelectAction = {type: 'SCENE_SELECT', id: string}
export type SceneUpdateAction = {type: 'SCENE_UPDATE', updates: {}}
export type SceneBackAction = {type: 'SCENE_BACK'}
export type SceneForwardAction = {type: 'SCENE_FORWARD'}
export type SceneSetTransitionAction = {type: 'SCENE_SET_TRANSITION', transition: any}
export type SceneReorderAction = {type: 'SCENE_REORDER', from: number, to: number}
export type SceneCloneAction = {type: 'SCENE_CLONE', scene: Scene}
export type SceneAction =
  | SceneCreateAction
  | SceneDeleteAction
  | SceneSelectAction
  | SceneCommitAction
  | SceneCancelAction
  | SceneUpdateAction
  | SceneBackAction
  | SceneForwardAction
  | SceneSetTransitionAction
  | SceneReorderAction
  | SceneCloneAction

// Team Actions
export type TeamInviteAction = {type: 'TEAM_INVITE_ID_REQUEST', id: string} | {type: 'TEAM_INVITE_EMAIL_REQUEST', email: string}
export type TeamKickAction = {type: 'TEAM_KICK_REQUEST'}
export type TeamCreateAction = {type: 'TEAM_CREATE_REQUEST'}
export type TeamSetUserRoleAction = {type: 'TEAM_USER_ROLE_REQUEST', team_id: string, user_id: string, role: string}
export type TeamAction =
  | TeamInviteAction
  | TeamKickAction
  | TeamCreateAction
  | TeamSetUserRoleAction

// User Actions
export type UserLoginRequest = {type: 'USER_LOGIN_REQUEST', user: string, pass: string}
export type UserLoginSuccess = {type: 'USER_LOGIN_SUCCESS', user: any}
export type UserLoginFailure = {type: 'USER_LOGIN_FAILURE', message: string}
export type UserLogoutRequest = {type: 'USER_LOGOUT_REQUEST'}
export type UserLogoutSuccess = {type: 'USER_LOGOUT_SUCCESS'}
export type UserLogoutFail = {type: 'USER_LOGOUT_FAIL', message: string}
export type UserRegisterRequest = {type: 'USER_REGISTER_REQUEST', user: any}
export type UserRegisterSuccess = {type: 'USER_REGISTER_SUCCESS'}
export type UserRegisterFail = {type: 'USER_REGISTER_FAIL', message: string}
export type UserForgotRequest = {type: 'USER_FORGOT_PASSWORD_REQUEST', email: string}
export type UserForgotSuccess = {type: 'USER_FORGOT_PASSWORD_SUCCESS'}
export type UserForgotFail = {type: 'USER_FORGOT_PASSWORD_FAIL', message: string}
export type UserAction =
  | UserLoginRequest | UserLoginSuccess | UserLoginFailure
  | UserLogoutRequest | UserLogoutSuccess | UserLogoutFail
  | UserRegisterRequest | UserRegisterSuccess | UserRegisterFail
  | UserForgotRequest | UserForgotSuccess | UserForgotFail

// UI Actions
export type UiSelectTabAction = {type: 'SELECT_TAB', tab: string}
export type UiSelectDashboardTabAction = {type: 'SELECT_DASH_TAB', tab: string}
export type UiToggleMenuCollapseAction = {type: 'TOGGLE_MENU_COLLAPSE'}
export type UiDismissNotificationAction = {type: 'DISMISS_NOTIFICATION'}
export type UiStartPreview = {type: 'PROJECT_PREVIEW'}
export type UiStopPreview = {type: 'PROJECT_STOP_PREVIEW'}
export type UiDarkMode = {type: 'DARK_MODE_ENABLE'}
export type UiLightMode = {type: 'DARK_MODE_DISABLE'}
export type UiOpenSubPanel = {type: 'UI_OPEN_SUB_PANEL', panel: SubPanel}
export type UiZoomTimeline = {type: 'UI_ZOOM_TIMELINE', delta: number}
export type UiClearUploading = {type: 'UI_CLEAR_UPLOADING'}
export type UiSpaceMod = {type: 'UI_SPACE_MOD', pressed: boolean}
export type UiCtrlMod = {type: 'UI_CTRL_MOD', pressed: boolean}
export type UiAltMod = {type: 'UI_ALT_MOD', pressed: boolean}
export type UiAction =
  | UiSelectTabAction
  | UiSelectDashboardTabAction
  | UiToggleMenuCollapseAction
  | UiDismissNotificationAction
  | UiStartPreview
  | UiStopPreview
  | UiDarkMode
  | UiLightMode
  | UiOpenSubPanel
  | UiZoomTimeline
  | UiClearUploading
  | UiSpaceMod
  | UiCtrlMod
  | UiAltMod

// Mock Actions
// @TODO Move mock into a test only reducer
export type MockStateAction = {type: 'MOCK', state: AppState}
export type InitAction = {type: '@@INIT'}

// Union Types
export type Action =
  AppAction |
  CameraAction |
  ElementAction |
  ProjectAction |
  PlayerAction |
  SceneAction |
  TeamAction |
  UserAction |
  UiAction |
	MockStateAction |
  InitAction

// Union of all Saga Requests
export type SagaRequest =
  | UserLoginRequest
  | UserLogoutRequest
  | UserRegisterRequest
  | UserForgotRequest
  | ProjectSaveRequest
  | ProjectRenderRequest
  | ProjectDeleteRequest
  | ProjectCreateRequest
  | AppStateSyncRequest
  | ElementUploadImageRequest
  | ElementSetImageRequest

/**
 * Action Constructors
 *
 * Contains functions for creating reducer actions and saga requests. All functions
 * here should be typed and return a valid Action that can be directly dispatched
 * to a Redux store
 */
export default {

  App: {
    setState: (state: any): AppSetStateAction => ({ type: 'SET_STATE', state: state }),
    error: (error: any): AppErrorAction => ({ type: 'ERROR', error: error }),
    authError: (error: any): AppAuthErrorAction => ({ type: 'ERROR_AUTH', error: error })
  },

  Camera: {
    adjust: (delta: Point): CameraAdjustAction => ({ type: 'CAMERA_ADJUST', delta: delta }),
    zoomIn: (): CameraZoomInAction => ({ type: 'CAMERA_ZOOM_IN' }),
    zoomOut: (): CameraZoomOutAction => ({ type: 'CAMERA_ZOOM_OUT' }),
    reset: (): CameraResetAction => ({ type: 'CAMERA_RESET' }),
    resize: (area: Point): CameraResizeAction => ({ type: 'CAMERA_RESIZE', area: area })
  },

  Element: {
    update: (updates: {}): ElementUpdateAction => ({ type: 'ELEMENT_UPDATE', updates: updates }),
    create: (type: 'text' | 'image' | 'chart', element: ElementText | ElementChart | ElementImage | null): ElementCreateAction =>
      ({ type: 'ELEMENT_CREATE', element_type: type, element: element }),
    setType: (type: 'text' | 'image' | 'chart'): ElementTypeSetAction =>
      ({ type: 'ELEMENT_TYPE_SET', element_type: type }),
    select: (id: string): ElementSelectAction => ({ type: 'ELEMENT_SELECT', id: id }),
    commit: (): ElementCommitAction => ({ type: 'ELEMENT_COMMIT' }),
    cancel: (): ElementCancelAction => ({ type: 'ELEMENT_CANCEL' }),
    setAnimation: (a: any): ElementSetAnimationAction => ({ type: 'ELEMENT_SET_ANIMATION', animation: a }),
    uploadImage: (id: string, image: HTMLImageElement) => ({ type: 'ELEMENT_UPLOAD_IMAGE_REQUEST', id: id, image: image }),
    setImage: (id: string, imageId: string) => ({ type: 'ELEMENT_SET_IMAGE_REQUEST', id: id, imageId: imageId }),
    move: (dx: number, dy: number) => ({ type: 'ELEMENT_MOVE', delta: [dx, dy] }),
    transform: (delta: DeltaRect) => ({ type: 'ELEMENT_TRANSFORM', delta: delta }),
    clone: (element: ElementUnion) => ({ type: 'ELEMENT_CLONE', element: element })
  },

  Player: {
    play: (): PlayerPlayAction => ({ type: 'PLAYER_PLAY' }),
    pause: (): PlayerPauseAction => ({ type: 'PLAYER_PAUSE' }),
    seek: (time: number): PlayerSeekAction => ({ type: 'PLAYER_SEEK', time: time }),
    scrobble: (time: number): PlayerScrobbleAction => ({ type: 'PLAYER_SCROBBLE', time: time })
  },

  Project: {
    open: (id: number): ProjectOpenRequest => ({ type: 'PROJECT_OPEN_REQUEST', id: id }),
    close: (): ProjectCloseAction => ({ type: 'PROJECT_CLOSE' }),
    save: (project: Project): ProjectSaveRequest => ({ type: 'PROJECT_SAVE_REQUEST', project: project }),
    create: (proj): ProjectCreateRequest => ({ type: 'PROJECT_CREATE_REQUEST', proj: proj }),
    rename: (name: string): ProjectRenameAction => ({ type: 'PROJECT_RENAME', name: name }),
    update: (updates: {}): ProjectUpdateAction => ({ type: 'PROJECT_UPDATE', updates: updates }),
    remove: (): ProjectRemoveAction => ({ type: 'PROJECT_REMOVE' }),
    render: (id: number): ProjectRenderRequest => ({ type: 'PROJECT_RENDER_REQUEST', id: id }),
    finishRender: (url: string): ProjectFinishRenderAction => ({ type: 'PROJECT_FINISH_RENDER', video: url })
  },

  Scene: {
    update: (updates: {}): SceneUpdateAction => ({ type: 'SCENE_UPDATE', updates: updates }),
    create: (scene: Scene): SceneCreateAction => ({ type: 'SCENE_CREATE', scene: scene }),
    delete: (id: string): SceneDeleteAction => ({ type: 'SCENE_DELETE', id: id }),
    select: (id: string): SceneSelectAction => ({ type: 'SCENE_SELECT', id: id }),
    commit: (): SceneCommitAction => ({ type: 'SCENE_COMMIT' }),
    cancel: (): SceneCancelAction => ({ type: 'SCENE_CANCEL' }),
    back: (): SceneBackAction => ({ type: 'SCENE_BACK' }),
    forward: (): SceneForwardAction => ({ type: 'SCENE_FORWARD' }),
    setTransition: (t: any): SceneSetTransitionAction => ({ type: 'SCENE_SET_TRANSITION', transition: t }),
    reorder: (from: number, to: number) => ({ type: 'SCENE_REORDER', from: from, to: to }),
    clone: (scene: Scene) => ({ type: 'SCENE_CLONE', scene: scene })
  },

  Team: {
    invite: (id: string): TeamInviteAction => {
      return isValidEmail(id)
        ? { type: 'TEAM_INVITE_EMAIL_REQUEST', email: id }
        : { type: 'TEAM_INVITE_ID_REQUEST', id: id }
    },
    create: (): TeamCreateAction => ({ type: 'TEAM_CREATE_REQUEST' }),
    setUserRole: (teamId: string, userId: string, role: string): TeamSetUserRoleAction =>
      ({ type: 'TEAM_USER_ROLE_REQUEST', team_id: teamId, user_id: userId, role: role }),
    kick: (id: string): TeamKickAction => ({ type: 'TEAM_KICK_REQUEST' })
  },

  User: {
    login: (user: string, pass: string): UserLoginRequest =>
      ({ type: 'USER_LOGIN_REQUEST', user: user, pass: pass }),
    logout: (): UserLogoutRequest => ({ type: 'USER_LOGOUT_REQUEST' }),
    register: (user: any): UserRegisterRequest => ({ type: 'USER_REGISTER_REQUEST', user: user }),
    forgotPassword: (email: string): UserForgotRequest => ({ type: 'USER_FORGOT_PASSWORD_REQUEST', email: email }),
    resetPassword: (email: string, code: string, newPass: string) =>
      ({ type: 'USER_RESET_PASSWORD_REQUEST', email: email, code: code, pass: newPass })
  },

  Ui: {
    selectTab: (tab: string): UiSelectTabAction => ({ type: 'SELECT_TAB', tab: tab }), // tab types!
    selectDashboardTab: (tab: string): UiSelectDashboardTabAction => ({ type: 'SELECT_DASH_TAB', tab: tab }),
    toggleMenuCollapse: (): UiToggleMenuCollapseAction => ({ type: 'TOGGLE_MENU_COLLAPSE' }),
    dismissNotification: (): UiDismissNotificationAction => ({ type: 'DISMISS_NOTIFICATION' }),
    startPreview: (): UiStartPreview => ({ type: 'PROJECT_PREVIEW' }),
    stopPreview: (): UiStopPreview => ({ type: 'PROJECT_STOP_PREVIEW' }),
    darkMode: (): UiDarkMode => ({ type: 'DARK_MODE_ENABLE' }),
    lightMode: (): UiLightMode => ({ type: 'DARK_MODE_DISABLE' }),
    openSubPanel: (panel: SubPanel): UiOpenSubPanel => ({ type: 'UI_OPEN_SUB_PANEL', panel: panel }),
    timelineZoom: (delta: number): UiZoomTimeline => ({ type: 'UI_ZOOM_TIMELINE', delta: delta }),
    clearUploading: () => ({ type: 'UI_CLEAR_UPLOADING' }),
    spaceMod: (pressed: boolean) => ({ type: 'UI_SPACE_MOD', pressed: pressed }),
    ctrlMod: (pressed: boolean) => ({ type: 'UI_CTRL_MOD', pressed: pressed }),
    altMod: (pressed: boolean) => ({ type: 'UI_ALT_MOD', pressed: pressed })
  },

  Mock: {
    MockState: (state: AppState): MockStateAction => ({ type: 'MOCK', state: state })
  }
}
