/**
 * Contains the definition of the User Model and any pure functions
 * @fixme Rename to Account
 */
export default class User {

  id: number | null
  name: string
  email: string
  token: string | null

  constructor (u: BaseUser) {
    this.id = u.id ? u.id : null
    this.name = u.name
    this.email = u.email
    this.token = typeof u.token === 'string' ? u.token : null
    return this
  }

}

type BaseUser = {
  id?: number
  name: string
  email: string
  token?: string
}
