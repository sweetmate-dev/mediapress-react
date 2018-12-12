import Point from './Point'
import { clamp as clampNum } from 'ramda'

export default function Rectangle (x: number = 0 ,y: number = 0, width: number = 0, height: number = 0): Rectangle {
  return [x,y,width,height]
}

 /**
  * Construct Rectangle from a plain rectangle object
  * @param {Rectangle} o A non-constructed or super-set of a rectangle as an object
  * @returns {Rectangle} An instanced Rectangle
  */
export const fromObject = function (o: {x: number, y: number, width: number, height: number}): Rectangle {
  return Rectangle(o[0],o[1],o[2],o[3])
}

export const center = function (r: Rectangle): Point {
  return Point(r[0] + (r[2] / 2), r[1] + (r[3] / 2))
}

export const topLeft = function (r: Rectangle): Point {
  return Point(r[0], r[1])
}

export const adjust = function (p: Point, r: Rectangle): Rectangle {
  return Rectangle(r[0] + p[0], r[1] + p[1], r[2], r[3])
}

export const translate = function (r: Rectangle): Rectangle {
  return Rectangle(r[0] - (r[2] / 2), r[1] - (r[3] / 2), r[2], r[3])
}

export const clamp = function (p: Rectangle, r: Rectangle): Rectangle {
  return Rectangle(clampNum(p[0], p[2] - r[2], r[0]), clampNum(p[1], p[3] - r[3], r[1]), r[2], r[3])
}

/**
 * Takes a DeltaRect and applys the transform the Rectangle
 */
export const transformDelta = (os: Point, delta: DeltaRect, r: Rectangle): Rectangle => {
  const d = delta.width !== 0 ? delta.width : delta.height
  return [
    r[0] + delta.left,  // Left
    r[1] + delta.top,   // Top
    r[2] + d, // Width
    r[3] + delta.height
    // (os[0] / os[1]) * (r[2] + d) // lock the Y delta to the original ratio
  ]
}
