'use-strict'
import Scene from 'model/Scene'
import Transition from 'lib/Transition'
import Paint from './Paint'
import Point from 'model/Point'
import store from 'store'
import AppState from 'model/AppState'
import { timeline, composite } from 'popmotion'
import { equals, last, map, zipObj, merge } from 'ramda'
import Effect from 'model/Effect'
import A from '../actions'
import Animation from 'lib/Animation'

// safely gets a string only ID
const getID = (ele?: {id: string}): string =>
  ele !== null && typeof ele !== 'undefined' ? ele.id : 'void'

// For handling wether to resetup canvas
let currentViewport = Point(0,0)

// Current Context for rendering
let ctx: CanvasRenderingContext2D = null

let _player = null
let _timeline = null

// Main player loop
const handleStart = x => {
  const s = store.getState()
  const scene = AppState.getActiveScene(s)
  scene.effects = new Effect(x.scene)
  for (let i = 0;i < scene.elements.length; i++) {
    scene.elements[i].effects = new Effect(x[scene.elements[i].id]).applyParent(scene.effects)
  }

  // Paint.draw(s.ui.camera, ctx, scene) // check if needed
  store.dispatch(A.Player.seek(x.scene.frame))
  // if (typeof x.offset !== 'undefined') { console.log(x.frame + ' - ' + x.offset[0]) }
}

/**
 * Updates Effects on slides and elements
 *
 * @todo include animations with a parallel compose
 */
export const update = (scene: Scene) => {
  const TL1 = { scene: timeline(Transition.init(scene)) }
  const TL2 = zipObj(
    map(e => e.id, scene.elements),
    map(e => timeline(Animation.init(scene, e)), scene.elements)
  )
  return composite(merge(TL1, TL2))
}

// @todo: determine if play and init need to be circular
export const init = () => {
  const s = store.getState()
  const scene = AppState.getActiveScene(s)
  const oldScene = s.ui.activeScene
  const lastScene: Scene = last(s.project.scenes)

  _player = update(scene).start({update: handleStart, complete: () => {
    const newS = store.getState()
    const newScene = newS.ui.activeScene
    if (oldScene === newScene && newScene === lastScene.id) {
      store.dispatch(A.Player.pause())
    } else {
      store.dispatch(A.Scene.forward())
      play()
    }
  }})
  _player.pause()
}

export const play = () => {
  const s = store.getState()
  const time = s.ui.player.time
  const length = AppState.getActiveScene(s).frameLength

  init()
  _player.seek(time / length)
  _player.resume()
  store.dispatch(A.Player.play())
}

// Keeps track of scene changes and calls init()
let _currentScene = null
store.subscribe(() => {
  const s = store.getState()
  const scene = AppState.getActiveScene(s)
  if (scene != null && (_currentScene === null || scene.id !== _currentScene.id)) {
    _currentScene = scene
    init()
  }
})

/**
 * Called whenever there is a state change and the canvas needs to be updated
 * to reflect
 */
export const draw = (vnode) => {
  const s = store.getState()
  const scene = AppState.getActiveScene(s)
  const ele = AppState.getActiveElement(s)
  const newViewport = Point(vnode.dom.offsetWidth, vnode.dom.offsetHeight)

  // Re-init Paint when the viewport changes and on the first run
  if (!equals(newViewport,currentViewport)) {
    ctx = Paint.init(s.ui.camera, vnode.dom)
    currentViewport = newViewport
  }

  // When there is a scene, draw the scene
  if (typeof scene !== 'undefined' && scene !== null) {
    // @todo put in caching for the Transition/Animation construction
    update(scene)
    Paint.draw(s.ui.camera, ctx, scene, s.ui.activeMenu === 'elements' ? getID(ele) : 'void')
  }

  return ctx
}

export const pause = () => {
  store.dispatch(A.Player.pause())
  if (_player == null || typeof _player.pause !== 'function') {
    init()
  }
  _player.pause()
}

export const seek = (time: number) => {
  _player.seek(time % 1)
}

export const back = () => store.dispatch(A.Scene.back())

export const forward = () => store.dispatch(A.Scene.forward())

export default {
  update, draw, play, pause, back, forward, seek
}
