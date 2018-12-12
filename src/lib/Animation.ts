import { Instruction } from 'popmotion/src/animations/timeline/types'

import Scene from 'model/Scene'
import Element from 'model/Element'
import { easing } from 'popmotion'
import { duration } from './Motion'
import { concat } from 'ramda'

/**
 * Animation.ts
 *
 * A module for describing all animations that are available for user selection.
 */

export const NoAnimation = (s: Scene, e: Element): Instruction[] =>
  [{ track: 'frame', from: e.start, to: e.end, duration: duration(s), ease: easing.linear }]

export const SlideAnimation = (s: Scene, e: Element): Instruction[] =>
  concat(NoAnimation(s, e), [
    '-' + duration(s),
    { track: 'offset',
      from: [0,4000],
      to: [0,0],
      duration: duration(s) * 0.25 },
    duration(s) * 0.50,
    { track: 'offset',
      from: [0,0],
      to: [0,-4000],
      duration: duration(s) * 0.25 }
  ])

export const FadeAnimation = (s: Scene, e: Element): Instruction[] =>
  concat(NoAnimation(s, e), [
    '-' + duration(s),
    { track: 'opacity',
      from: 0,
      to: 1,
      duration: duration(s) * 0.40 },
    duration(s) * 0.20,
    { track: 'opacity',
      from: 1,
      to: 0,
      duration: duration(s) * 0.40 }
  ])

export const init = (s: Scene, e: Element): Instruction[] => {
  const name = e.animation === null ? 'none' : e.animation.name
  switch (name) {
    case 'none': return NoAnimation(s, e)
    case 'slide': return SlideAnimation(s, e)
    case 'fade': return FadeAnimation(s, e)
    default: throw Error('Invalid Animation Effect ' + name)
  }
}

export default {
  init
}
