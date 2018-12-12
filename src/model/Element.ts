import { v4 as uuid } from 'uuid'
import Rectangle from './Rectangle'
import Effect from './Effect'
import { pipe, dissoc, evolve } from 'ramda'

export const AnimationNames = {
  'none': 'None',
  'slide': 'Slide',
  'fade': 'Fade'
}

export type AnimationName = keyof typeof AnimationNames

/**
 * Base Animation Type
 */
export type AnimationOpts = {
  name: AnimationName,
  direction?: string
  start?: number
  end?: number
}

export const toObject = pipe(
  dissoc('effects'),
  evolve({
    color: x => x.toString()
  })
)

/**
 * Base Element class, to be extended by a more specific Element class
 */
export default class Element {

  id: string
  type: string
  area: Rectangle
  order: number
  value: any
  originalSize: Point
  size: number

  // Animation
  animation: AnimationOpts
  effects?: Effect
  start: number
  end: number

  constructor (e: any) {
    this.id = typeof e.id === 'undefined' ? uuid() : e.id
    this.type = e.type
    this.area = Array.isArray(e.area) ? e.area : Rectangle()
    this.animation = typeof e.animation === 'undefined' ? { name: 'none' } : e.animation
    this.start = typeof e.start === 'undefined' ? 0 : parseInt(e.start, 10)
    this.end = typeof e.end === 'undefined' ? 300 : parseInt(e.end, 10)
    this.value = e.value
    this.order = e.order
    this.effects = typeof e.effects === 'undefined' ? new Effect() : e.effects
    this.originalSize = typeof e.originalSize === 'undefined' ? [this.area[2],this.area[3]] : e.originalSize
    return this
  }

  static toString (element: Element): string {
    return typeof element === 'undefined' ? 'undefined'
      : element.type === 'image' ? 'Image'
      : element.type === 'chart' ? 'Chart'
      : element.value
  }

  toObject (): {} {
    return toObject(this)
  }

}
