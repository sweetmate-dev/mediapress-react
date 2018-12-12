
import { set, lensProp, evolve, map, dissoc, pipe } from 'ramda'
import { v4 as uuid } from 'uuid'

import Color from './Color'
import Effect from './Effect'
import Element from './Element'
import ElementImage from './ElementImage'
import ElementChart from './ElementChart'
import ElementText from './ElementText'
import ElementVideo from './ElementVideo'

/**
 * A Union containing every valid Element Type
 */
export type ElementUnion =
  | ElementChart
  | ElementImage
  | ElementText
  | ElementVideo
  | Element

/**
 * All valid Transition names
 */
export const TransitionNames = {
  'none': 'None',
  'slide': 'Slide',
  'fade': 'Fade'
}

export type TransitionName = keyof typeof TransitionNames

/**
 * Base Transition Type
 */
export type TransitionOpts = {
  name: TransitionName,
  direction?: string
  start?: number
  end?: number
}

export const toObject = pipe(
  dissoc('effects'),
  evolve({
    elements: map(x => Scene.constructElement(x).toObject()),
    bgColor: x => x.toString()
  })
)

/**
 * Scene
 *
 * Represents a singular scene within a {Project} that contains many
 * {Element}.
 */
export default class Scene {

  id: string
  name: string
  frameLength: number
  bgColor: Color
  bgImage: any
  elements: Element[]
  transition: TransitionOpts
  effects?: Effect

  constructor (s: any) {
    this.id = typeof s.id === 'undefined' ? uuid() : s.id
    this.name = s.name
    this.frameLength = typeof s.frameLength === 'undefined' ? 300 : s.frameLength
    this.bgColor = typeof s.bgColor === 'object' ? s.bgColor : Color.white()
    this.bgImage = typeof s.bgImage === 'undefined' ? null : s.bgImage
    this.elements = !s.elements ? [] : map(Scene.constructElement, s.elements)
    this.transition = typeof s.transition === 'undefined' ? { name: 'none' } : s.transition
    this.effects = typeof s.effects === 'undefined' ? new Effect() : s.effects
    return this
  }

  /**
   * Converts a constructed Scene into a generic object
   *
   * @param scene {Scene} The scene to convert
   * @return {object} Plain JS object
   */
  static toObject (scene: Scene): {} {
    return toObject(scene)
  }

  static constructElement (e: any): ElementUnion {
    switch (e.type) {
      case 'text': return new ElementText(e)
      case 'image': return new ElementImage(e)
      case 'chart': return new ElementChart(e)
      case 'video': return new ElementVideo(e)
      default: return new Element(e)
    }
  }

  /**
   * Helper function for setting a prop on scene
   *
   * @deprecated Should probably be removed
   * @param field {string} The field to modify
   * @param val {any} The value to set
   */
  setValue (field: string, val: any): Scene {
    return set(lensProp(field), val)(this)
  }

}
