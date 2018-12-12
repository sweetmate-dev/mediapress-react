// @flow

import Element from './Element'

/**
 * Represents the a Video Element
 */
export default class ElementVideo extends Element {

  type: 'video'
  value: string

  constructor (obj: any) {
    super(obj)
    this.type = 'video'
    this.value = obj.value
    return this
  }

}
