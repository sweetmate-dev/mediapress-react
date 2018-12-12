import { set, lensIndex, max, min } from 'ramda'

export const zoomLens = lensIndex(4)
const zoomLevels = [0.10, 0.2, 0.3, 0.4, 0.5, 0.66, 0.82, 1, 1.25, 1.5, 2, 2.5, 3]
const _zoomOut = (z: number) => zoomLevels[max(min(zoomLevels.indexOf(z) - 1, zoomLevels.length - 1), 0)]
const _zoomIn = (z: number) => zoomLevels[max(min(zoomLevels.indexOf(z) + 1, zoomLevels.length - 1), 0)]

/**
 * Constructs a new Camera model
 * @param {number} x Offset X
 * @param {number} y Offset Y
 * @param {number} width Viewport Width
 * @param {number} height Viewport Height
 * @param {float} zoom Zoom Amount
 * @returns {Camera} New Camera
 */
export default function Camera (x: number, y: number, width: number = 0 , height: number = 0, zoom: any = 0.5): Camera {
  return [x,y,width,height,zoom]
}

export const updateSize = function (width: number, height: number, camera: Camera): Camera {
  return Camera(camera[0], camera[1], width, height, camera[4])
}

  /**
   * Adjust the Camera with a Point, taking zoom into consideration.
   * Is also curried function
   * @param {Point} p The point to apply to the camera, like a delta of mouse
   * @param {Camera} c The camera to adjust
   * @return {Camera} The adjusted camera
   */
export const adjust = function<self> (p: Point, c: Camera): Camera {
  return Camera(c[0] + p[0] / c[4], c[1] + p[1] / c[4], c[2], c[3], c[4])
}

/**
 * Applies the logic to zoom in the camera, respecting boundaries
 * @param {Camera} c Current Camera
 * @returns {Camera} New Camera
 */
export const zoomIn = (c: Camera): Camera =>
  set(zoomLens, _zoomIn(c[4]), c)

/**
 * Applies the logic to zoom out the camera, respecting boundaries
 * @param {Camera} c Current Camera
 * @returns {Camera} New Camera
 */
export const zoomOut = (c: Camera): Camera =>
  set(zoomLens, _zoomOut(c[4]), c)

export const add = (p: Point, c: Camera): Camera =>
  Camera(c[0] + p[0], c[1] + p[1], c[2], c[3], c[4])
