// @flow

export type ServiceType =
  | 'doubleClick'
  | 'google'
  | 'facebook'
  | 'youtube'
  | 'twitter'
  | 'instagram'
  | 'snapchat'

/**
 * Service Model
 *
 * Represents an api connection with a remote service
 */
export default class Service {

  _id: string
  type: ServiceType
  token: string

  constructor (obj: any) {
    this._id = obj._id
    this.type = obj.type
    this.token = obj.token
    return this
  }

}
