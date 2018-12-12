/**
 * Motion.ts
 *
 * Provides a basic collections of functions for easier construction Animations and Transitions
 */

import Scene from 'model/Scene'

const toTime = f => f * 16.6666667

export const duration = (scene: Scene) => toTime(scene.frameLength)

export const and = (scene: Scene) => ['-' + duration(scene)]

export type MotionPosition =
  | 'start'
  | 'default'
  | 'end'

export const partialDuration = (pos: MotionPosition, scene: Scene) =>
  duration(scene) * (pos === 'default' ? 0.60 : 0.20)

export const scroll = (scene: Scene) => duration(scene) + ''

export const track = (track: string, from: any, to: any, position: MotionPosition = 'default') => (scene: Scene) => ({
  track: track,
  from: from,
  to: to,
  duration: partialDuration(position, scene)
})
