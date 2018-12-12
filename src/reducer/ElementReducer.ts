
import AppState from 'model/AppState'
import { Action } from '../actions'
import { over, set, lensPath, merge, indexOf, map, append, pipe, view } from 'ramda'
import { adjust, clamp, transformDelta } from 'model/Rectangle'
import { clone } from 'lib/Util'

// @todo remove mock
import { mockElement } from '../../__tests__/fixtures/mock'

const applyZoom = (zoom: number, p: Point): Point => [p[0] * (1 / zoom), p[1] * (1 / zoom)]

const clampCanvas = (r: Rectangle) => clamp([0,0,1920,1080], r)

/**
 * Handles reducers for the current active element mainly
 * @param {AppState} state The AppState to be operated on
 * @param {Action} action The action to apply
 * @return {AppState} New AppState
 */
const ElementReducer = (state: AppState = new AppState(), action: Action): AppState => {

  if (state.project == null || AppState.getActiveScene(state) == null) return state

  // Lens Setup
  const sceneIndex = indexOf(state.ui.activeScene, map(x => x.id, state.project.scenes))
  const elementIndex = indexOf(state.ui.activeElement, map(x => x.id, state.project.scenes[sceneIndex].elements))
  const baseLens = [
    'project',
    'scenes',
    sceneIndex,
    'elements'
  ]
  const elementsLens = lensPath(baseLens)
  const elementLens = lensPath(baseLens.concat(elementIndex))
  const areaLens = lensPath(baseLens.concat(elementIndex).concat('area'))
  const valueLens = lensPath(baseLens.concat(elementIndex).concat('value'))
  const originalLens = lensPath(baseLens.concat(elementIndex).concat('originalSize'))

  const setActive = set(lensPath(['ui', 'activeElement']))
  const setWidth = (img: HTMLImageElement) => pipe(
    over(areaLens, (r: Rectangle) => [r[0], r[1], img.width, img.height]),
    over(originalLens, (p: Point) => [img.width, img.height])
  )

  switch (action.type) {
    case 'ELEMENT_CREATE':
      const e = action.element
      return set(lensPath(['ui', 'subPanel']), e.type, setActive(e.id, over(elementsLens, append(e), state)))
    case 'ELEMENT_TYPE_SET':
      return set(lensPath(['ui', 'activeElementType']), action.element_type, state)
    case 'ELEMENT_SELECT':
      const newState = set(lensPath(['ui', 'activeElement']), action.id, state)
      const ae = AppState.getActiveElement(newState)
      return set(lensPath(['ui', 'subPanel']), ae.type, newState)
    case 'ELEMENT_COMMIT':
    case 'ELEMENT_CANCEL':
      return set(lensPath(['ui', 'activeElement']), null, state)
    case 'ELEMENT_UPDATE':
      return over(elementLens, x => merge(x, action.updates), state)
    case 'ELEMENT_CLONE':
      return over(elementsLens, append(clone(action.element)), state)
    case 'ELEMENT_MOVE': return over(areaLens, x => clampCanvas(adjust(applyZoom(state.ui.camera[4], action.delta), x)), state)
    case 'ELEMENT_TRANSFORM': return over(areaLens, x => clampCanvas(transformDelta(view(originalLens, state), action.delta, x)), state)
    case 'ELEMENT_UPLOAD_IMAGE_SUCCESS': return setWidth(action.image)(set(valueLens, action.image, state)) as AppState
  }

  return state
}

export default ElementReducer
