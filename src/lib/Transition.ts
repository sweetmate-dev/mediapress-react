/**
 * Transition.ts
 *
 * Handles the side effects for applying Transitions to Slides
 *
 */

import { Instruction } from 'popmotion/src/animations/timeline/types'
import { concat } from 'ramda'

import Scene from 'model/Scene'
import { easing } from 'popmotion'
import { duration } from './Motion'

/**
 * None Transition
 */
export const NoneTransition = (scene: Scene): Instruction[] =>
  [{ track: 'frame', from: 0, to: scene.frameLength, duration: duration(scene), ease: easing.linear }]

/**
 * Slide in Transition
 */
export const SlideTransition = (scene: Scene): Instruction[] =>
  concat(NoneTransition(scene), [
    '-' + duration(scene),
    { track: 'offset',
      from: [-4000,0],
      to: [0,0],
      duration: duration(scene) * 0.20 },
    duration(scene) * 0.60,
    { track: 'offset',
      from: [0,0],
      to: [4000,0],
      duration: duration(scene) * 0.20 }
  ])

export const FadeTransition = (scene: Scene): Instruction[] =>
  concat(NoneTransition(scene), [
    '-' + duration(scene),
    { track: 'opacity',
      from: 0,
      to: 1,
      duration: duration(scene) * 0.20 },
    duration(scene) * 0.60,
    { track: 'opacity',
      from: 1,
      to: 0,
      duration: duration(scene) * 0.20 }
  ])

export const init = (scene: Scene): Instruction[] => {
  const name = scene.transition === null ? 'none' : scene.transition.name
  switch (name) {
    case 'none': return NoneTransition(scene)
    case 'slide': return SlideTransition(scene)
    case 'fade': return FadeTransition(scene)
    default: throw Error('Invalid Transition Effect ' + name)
  }
}

export default {
  init
}
