import User from 'model/User'
import Team from 'model/Team'
import Project from 'model/Project'
import { put as push } from 'redux-saga/effects'
import 'whatwg-fetch'; 

type fetchMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'

const ls = localStorage
const NS = 'MP.'

/**
 * Helper function for building Request headers for fetch
 */
const reqHeaders = (fileData: boolean): Headers => {
  const token = ls.getItem('MP.USER.TOKEN')
  let headers = new Headers()
  headers.append('Accept', 'application/json')
  if (!fileData) {
    headers.append('Content-Type', 'application/json')
  }
  if (token !== null) headers.append('Authorization', 'bearer: ' + token)
  return headers
}

/**
 * Generates fetch() options based on request method and an optional payload
 */
export const opts = (method: fetchMethod, body: {} | FormData = null): RequestInit =>
  ({headers: reqHeaders(body instanceof FormData),
    credentials: 'same-origin',
    method: method,
    body: !body ? null : body instanceof FormData ? body : JSON.stringify(body) })

/**
 * Convience functions for fetch() requests
 */
const get = (url: string) => fetch('/api/' + url, opts('GET'))
const del = (url: string) => fetch('/api/' + url, opts('DELETE'))
const post = (url: string, data: any = null) => fetch('/api/' + url, opts('POST', data))
const put = (url: string, data: any = null) => fetch('/api/' + url, opts('PUT', data))
const patch = (url: string, data: any = {}) => fetch('/api/' + url, opts('PATCH', data))

/**
 * Api.ts
 *
 * Provides promise returning functions for interacting with the Mediapress Api
 *
 * Names should generally follow {method:lowercase}{subject:humanize}
 * Eg: getFoo, deleteBar
 */
export default class Api {

  static loginUser = (email, pass) =>
    post('login', { credentials: { email: email, password: pass } })

  static createProject = (proj) =>
    post('projects', { project: proj })

  static saveProject = (p: Project) =>
    put('projects/' + p.id, { project: Project.toObject(p) })

  static info = () => get('status')

  /**
   * Sends a render event to the api server
   *
   * @param {Project} p The project to render
   * @returns {Promise<any>} The results of the m.request to render
   */
  static renderProject = (pid: number) => post(`projects/${pid}/render`)

 /**
  * uploadImage :: string File -> Promise<Response>
  */
  static uploadImage (filename: string, file: any) {
    const data = new FormData()
    data.append('file', file)
    return post('assets', data)
  }

  /**
   * Logs out the current Account
   *
   * @fixme currently produces no side effects as api is currently not needed for logout
   */
  static logoutUser () {
    ls.removeItem(NS + 'USER')
    ls.removeItem(NS + 'USER.TOKEN')
    return get('users/logout')
  }

  // @TODO strip out nonupdatable info
  static updateUser = (user: User) => patch('users/' + user.id, user)

  static updateTeam (team: Team) {
    return patch('teams/' + team.id, team)
  }

  static getProjects = () => get('projects')

  static getProject = (id: number) => get('projects/' + id)

  static confirmEmail (email: string, code: string) {
    return get(`users/confirm_email/${email}/${code}`)
  }

  static registerUser = (registerData: {}) => post('users', registerData)

  static forgotPassword = (email: string) => post('users/forgot_password', { email: email })

  static resetPassword = (email: string, code: string, pass: string) =>
    post('users/reset_password', { email, code, pass })

  static changeProjectOwner (projectId: number, newOwnerId: number) {
    return get(`projects/chown/${projectId}/${newOwnerId}`)
  }

  static deleteProject (projectId: string) {
    return del(`projects/${projectId}`)
  }

  static deleteAsset (assetId: string) {
    return del(`assets/${assetId}`)
  }

  static deleteTeam (teamId: string) {
    return del(`teams/${teamId}`)
  }

  static deleteSlide = (slideId: string) =>
    del(`slides/${slideId}`)

  static createTeam (name: string) {
    return post(`teams`, { name })
  }

  static createService (service: {}) {
    return post('services', service)
  }

  static updateService = (service: {id: string}) => patch(`services/${service.id}`, service)

  static deleteService = (id: string) => del('services/' + id)

  /**
   * Invites a user to a team
   *
   * @param {string} teamId The id of a team that the user can invite users to
   * @param {string} user Can be either User.id or User.email
   * @param {Promise} A promise of the fetch request
   * @fixme fix typing issue with Redux/Action
   */
  static inviteUser (teamId: string, user: string) {
    const action: any = `teams/${teamId}/invite/${user}`
    return push(action)
  }
}

export const logoutUser = Api.logoutUser
