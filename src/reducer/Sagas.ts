import { call, put, takeLatest } from 'redux-saga/effects'
import Api from 'lib/Api'

// Import Specific types for each saga
import {
  SagaRequest,
  UserLoginRequest,
  ProjectCreateRequest,
  ProjectSaveRequest,
  ProjectDeleteRequest,
  ProjectRenderRequest,
  AppStateSyncRequest,
  ProjectOpenRequest,
  ElementUploadImageRequest} from 'actions'

function checkErrors (res: Response) {
  // @todo Need to seperate login fail and unauthorized
  if (res.status === 401) { throw new Error('Invalid Login') }
  // if (res.status === 403) { return put({ type: 'ERROR_AUTH', error: res.body }) }
  if (res.status === 422) { throw new Error('Validation Error') }
  if (!res.ok) { throw new Error('Connection Error') }
  return false
}

function* userLogin (action: UserLoginRequest) {
  try {
    const result: Response = yield call(Api.loginUser, action.user, action.pass)
    if (checkErrors(result) !== false) { return yield checkErrors(result) }
    const user = yield result.json()
    yield put({ type: 'USER_LOGIN_SUCCESS', user: user })
  } catch (e) {
    yield put({ type: 'USER_LOGIN_FAILURE', message: e.message })
  }
}

function* userLogout (action: SagaRequest) {
  try {
    yield call(Api.logoutUser)
    yield put({ type: 'USER_LOGOUT_SUCCESS' })
  } catch (e) {
    yield put({ type: 'USER_LOGOUT_FAiL', message: e.message })
  }
}

function* projectCreate (action: ProjectCreateRequest) {
  try {
    const result: Response = yield call(Api.createProject, action.proj)
    if (result.status === 403) { return yield put({ type: 'ERROR_AUTH', error: result.body }) }
    const project = yield result.json()
    yield put({ type: 'PROJECT_CREATE_SUCCESS', project: project.data })
  } catch (e) {
    yield put({ type: 'PROJECT_CREATE_FAIL', message: e.message })
  }
}

function* projectSave (action: ProjectSaveRequest) {
  try {
    const result = yield call(Api.saveProject, action.project)
    if (checkErrors(result) !== false) { return yield checkErrors(result) }
    yield put({ type: 'PROJECT_SAVE_SUCCESS' })
  } catch (e) {
    yield put({ type: 'PROJECT_SAVE_FAIL', message: e.message })
  }
}

function* elementImageUpload (action: ElementUploadImageRequest) {
  try {
    const res = yield call(Api.uploadImage, action.id, action.image)
    if (checkErrors(res) !== false) { return yield checkErrors(res) }
    const r = yield res.json()
    // const element = {id: r.id, value: r.url, area: [0,0,r.width,r.height]}
    const image = new Image(r.width, r.height)
    image.src = r.url
    yield put({ type: 'ELEMENT_UPLOAD_IMAGE_SUCCESS', image: image })
  } catch (e) {
    yield put({ type: 'ELEMENT_UPLOAD_IMAGE_FAIL', message: e.message })
  }
}

function* projectRender (action: ProjectRenderRequest) {
  try {
    yield call(Api.renderProject, action.id)
    yield put({ type: 'PROJECT_RENDER_SUCCESS' })
  } catch (e) {
    yield put({ type: 'PROJECT_RENDER_FAIL', message: e.message })
  }
}

function* projectDelete (action: ProjectDeleteRequest) {
  try {
    yield call(Api.deleteProject, action.id)
    yield put({ type: 'PROJECT_DELETE_SUCCESS' })
  } catch (e) {
    yield put({ type: 'PROJECT_SAVE_FAIL', message: e.message })
  }
}

function* sync (action: AppStateSyncRequest) {
  try {
    const result = yield call(Api.getProjects)
    if (result.status === 504) { throw new Error('Api Server Down') }
    const projects = yield result.json()
    yield put({ type: 'SYNC_SUCCESS', projects: projects.data })
  } catch (e) {
    yield put({ type: 'SYNC_FAILURE', message: e.message })
  }
}

function* projectOpen (action: ProjectOpenRequest) {
  try {
    const result = yield call(Api.getProject, action.id)
    const project = yield result.json()
    yield put({ type: 'PROJECT_OPEN_SUCCESS', project:  project.data })
  } catch (e) {
    yield put({ type: 'PROJECT_OPEN_FAILURE', message: e.message })
  }
}

/**
 * The Single Saga Reducer in the App. Handles *_REQUEST actions
 * in an async fashion and dispatches back with either *_SUCCESS or
 * *_FAIL
 * @returns {any} Nothing
 */
function* AppSaga (): any {
  yield takeLatest('USER_LOGIN_REQUEST', userLogin)
  yield takeLatest('USER_LOGOUT_REQUEST', userLogout)
  yield takeLatest('PROJECT_OPEN_REQUEST', projectOpen)
  yield takeLatest('PROJECT_CREATE_REQUEST', projectCreate)
  yield takeLatest('PROJECT_SAVE_REQUEST', projectSave)
  yield takeLatest('PROJECT_RENDER_REQUEST', projectRender)
  yield takeLatest('PROJECT_DELETE_REQUEST', projectDelete)
  // yield takeLatest('USER_REGISTER_REQUEST', userRegister)
  yield takeLatest('ELEMENT_UPLOAD_IMAGE_REQUEST', elementImageUpload)

  // Define actions to bind to full state sync
  yield takeLatest('SYNC_REQUEST', sync)
  yield takeLatest('PROJECT_CLOSE', sync)
}

export default AppSaga
