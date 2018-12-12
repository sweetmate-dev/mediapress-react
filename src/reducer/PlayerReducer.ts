import { set, lensPath, map, sum, clamp } from 'ramda'
import AppState from 'model/AppState'
import { PlayerAction } from 'actions'

const timeLens = lensPath(['ui', 'player', 'time'])
const playingLens = lensPath(['ui', 'player', 'playing'])
const activeSceneLens = lensPath(['ui', 'activeScene'])

const PlayerReducer = (state: AppState = new AppState(), action: PlayerAction): AppState => {
  switch (action.type) {
    case 'PLAYER_SCROBBLE':
      const times = map(x => x.frameLength, state.project.scenes)
      const time = clamp(0, sum(times), action.time)
      let offset = 0
      for (let i = 0; i < times.length; i++) {
        if (offset < time && offset + times[i] > time) {
          return set(activeSceneLens, state.project.scenes[i].id, set(timeLens, time - offset, state))
        } else {
          offset += times[i]
        }
      }
      return state
    case 'PLAYER_SEEK': return set(timeLens, action.time, state)
    case 'PLAYER_PLAY': return set(playingLens, true, state)
    case 'PLAYER_PAUSE': return set(playingLens, false, state)
    default: return state
  }
}

export default PlayerReducer
