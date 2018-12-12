// @flow
//
import { set, lensProp } from 'ramda'

type PlayerStatus =
  | 'pause'
  | 'play'

const setTime = set(lensProp('time'))

export default class PlayerState {

  time: number
  status: PlayerStatus
  playing: boolean

  constructor (time: number = 0, status: PlayerStatus = 'pause') {
    this.time = time
    this.status = status
    this.playing = false
    return this
  }

  static setTime (time: number, e: PlayerState): PlayerState {
    return setTime(time, e)
  }

  static reset (e: PlayerState): PlayerState {
    return setTime(0, e)
  }

  static tick (e: PlayerState): PlayerState {
    return setTime(e.time + 1, e)
  }

  backSlide () {
    // @todo
  }

  nextSlide () {
    // @todo
  }

}
