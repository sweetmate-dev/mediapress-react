import { curry } from 'ramda'

export default function Point (x,y): Point {
  return [x,y]
}

type PointLike = Point | Rectangle | Camera

const addI = (p1: PointLike, p2: PointLike): Point =>
  Point(p1[0] + p2[0], p1[1] + p2[1])

const subtractI = (p1: PointLike, p2: PointLike): Point =>
  Point(p1[0] - p2[0], p1[1] - p2[1])

export const add = curry(addI)
export const subtract = curry(subtractI)
