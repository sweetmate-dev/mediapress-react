
import { set, lensProp } from 'ramda'

import Element from './Element'
import Rectangle from './Rectangle'

export default class ElementImage extends Element {

  value: any

  constructor (e: any) {
    super(e)
    this.type = 'image'
    // Image Construction handling
    if (e.value instanceof Image) {
      this.value = e.value
    } else if (typeof e.value === 'string') {
      this.value = new Image(this.area[2], this.area[3])
      this.value.src = e.value
    } else {
      this.value = new Image(this.area[2], this.area[3])
      this.value.src = 'https://placehold.it/300x300'
    }
    return this
  }

  toObject () {
    return set(lensProp('value'), this.value.src, this)
  }

  resize (x: number, y: number): ElementImage {
    const newArea = Rectangle(
      this.area[0],
      1080 * ((x + 1) / (y + 1)),
      this.value.width,
      this.value.height
    )
    return set(lensProp('area'), newArea, this)
  }
}
