import Color from './Color'
import Point, { add } from './Point'
import { clamp } from 'ramda'

export type ValidTracks =
  | 'frame'
  | 'color'
  | 'offset'

export type AnimationDef = {
  track: ValidTracks
  from?: number | Point
  to?: number | Point
  duration?: number
}

export default class Effect {

  frame: number
  color: Color
  offset: Point
  scale: Point
  opacity: number
  rotation: number

  constructor (e = {}) {
    Object.assign(this, {
      frame: 0,
      color: new Color('#000000'),
      offset: Point(0,0),
      scale: Point(1,1),
      opacity: 1,
      rotation: 0
    }, e)
  }

  public adjust (r: Rectangle | Camera): Rectangle {
    return [this.offset[0] + r[0], this.offset[1] + r[1], r[2], r[3]]
  }

  public clampOpacity (opacity: number): number {
    return clamp(0, this.opacity, opacity)
  }

  public applyParent (parent: Effect): Effect {
    this.offset = add(this.offset, parent.offset)
    return this
  }
}
