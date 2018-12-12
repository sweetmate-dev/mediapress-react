import { curry, replace, test, assoc } from 'ramda'
import { v4 as uuid } from 'uuid'

const pad2 = num => num < 10 && num > -10 ? '0' + num : num + ''

/**
 * Generic utility class
 */
export default class Util {

/**
 * Returns a random number between the first and second paramater. Is curried.
 *
 * @param min {number} Min Value
 * @param max {number} Max Value
 * @return number
 */
  static rand = curry((min: number, max: number): number => Math.random() * (max - min) + min)

  /**
   * Checks for valid emails
   *
   * @return boolean
   */
  static isValidEmail = test(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  /**
   * Replaces spaces with dashes, also lowercases
   *
   * @return string
   */
  static dashed (s: string) {
    return replace(' ', '-', s).toLowerCase()
  }

/**
 * Converts a frame timestamp into a string based timestamp in "ii:ss" iso format
 */
  static toTimestamp (time: number): string {
    return pad2(Math.floor(time / 60)) + ':' + pad2(Math.floor(time % 60))
  }

}

export const toTimestamp = Util.toTimestamp
export const dashed = Util.dashed
export const rand = Util.rand
export const isValidEmail = Util.isValidEmail
export const clone = (o: {id: any}) => assoc('id', uuid(), o)
