import AppState from 'model/AppState'
import Scene from 'model/Scene'
import { SceneAction, ProjectCreateSuccess, ProjectOpenSuccess } from '../actions'
import { append, set, remove, over, lensPath, map, indexOf, compose, merge, max, min, last, insert } from 'ramda'
import { clone } from 'lib/Util'

type ValidActions = SceneAction | ProjectCreateSuccess | ProjectOpenSuccess

// Lens Definitions
const currentSceneLens = lensPath(['ui', 'activeScene'])
const sceneLens = lensPath(['project', 'scenes'])

const clearActives = (s: AppState): AppState => new AppState(compose(
  set(lensPath(['ui', 'activeScene']), null),
  set(lensPath(['ui', 'activeElement']), null)
)(s))

const clearTime = set(lensPath(['ui','player', 'time']), 0)

const setDefaultScene = (state: AppState) => over(
  currentSceneLens,
  id => last(state.project.scenes).id,
  state)

// Reorders the elements based on from/to
const handleOrder = (from: number, to: number) => (list: Scene[]): Scene[] =>
  insert(to, list[from], remove(from, 1, list))

const SceneReducer = (state: AppState = new AppState(), action: ValidActions): AppState => {

  // Bail out when no active scene
  const p = state.project
  if (p == null || typeof p === 'undefined') { return state }

  // Creates a lens to a property on a scene
  const sceneIndex = indexOf(state.ui.activeScene, map(x => x.id, p.scenes))
  const scenePrism = lensPath(['project', 'scenes', sceneIndex])

  const nextId = () => p.scenes[min(p.scenes.length - 1, sceneIndex + 1)].id
  const prevId = () => p.scenes[max(0, sceneIndex - 1)].id

  // Apply the dispatched Action
  switch (action.type) {
    case 'SCENE_SELECT': return clearTime(set(currentSceneLens, action.id, state))
    case 'SCENE_FORWARD': return clearTime(set(currentSceneLens, nextId(), state))
    case 'SCENE_BACK': return clearTime(set(currentSceneLens, prevId(), state))
    case 'SCENE_CREATE': return setDefaultScene(over(sceneLens, append(new Scene(action.scene)), state))
    case 'SCENE_COMMIT': return clearActives(state)
    case 'SCENE_CANCEL': return clearActives(state)
    case 'SCENE_UPDATE': return over(scenePrism, x => merge(x, action.updates), state)
    case 'SCENE_DELETE': return over(sceneLens, remove(sceneIndex, 1), state)
    case 'SCENE_REORDER': return over(sceneLens, handleOrder(action.from, action.to), state)
    case 'SCENE_CLONE': return over(sceneLens, append(clone(action.scene)), state)
    case 'PROJECT_CREATE_SUCCESS':
    case 'PROJECT_OPEN_SUCCESS': return setDefaultScene(state)
    default: return state
  }
}

export default SceneReducer
