
import { map } from 'ramda'

import ElementUnion from '../model/Element'
import ElementText from '../model/ElementText'
import ElementImage from '../model/ElementImage'
import ElementChart from '../model/ElementChart'

import Color from '../model/Color'
import { add, updateSize } from '../model/Camera'
import Scene from '../model/Scene'
import Point, { add as addPoint } from '../model/Point'
import { topLeft } from '../model/Rectangle'
import * as Chart from 'chart.js'

// import Animation from '../model/Animation'

type Canvas = HTMLCanvasElement

// tslint:disable-next-line
const noop = () => {}

const ACTIVE_COLOR = 'rgba(67, 83, 255, 0.2)'

const CANVAS_THUMB = document.createElement('canvas')
CANVAS_THUMB.id = 'canvas-thumb'

export const getObjectPos = (camera: Camera, area: Rectangle) =>
  updateSize(area[2], area[3], add(Point(-1920 / 2,-1080 / 2), add(topLeft(area), camera)))
export const getElementPos = (camera: Camera, element: ElementUnion) =>
  getObjectPos(camera, element.effects.adjust(element.area))

/**
 * Paint
 *
 * Utility class for drawing to the canvas
 */
export default class Paint {

  /**
   * Initialize the canvas for rendering by Paint, returns a CTX objectid. Should be
   * called whenever the viewport size changes as well.
   *
   * @param {Camera} camera User Camera
   * @param {HTMLCanvasElement} canvas The canvas to latch onto
   * @return {CanvasRenderingContext2D} The context to the canvas
   */
  public static init (camera: Camera, canvas: Canvas): Ctx {
    // Construct the viewport and apply to the canvas
    let ctx = canvas.getContext('2d')
    const viewport = canvas.getBoundingClientRect()
    canvas.width = viewport.width
    canvas.height = viewport.height
    return ctx
  }

  /**
   * Draw the canvas based on the provided scene and optionally activeElement
   * @param {Camera} cam The current User Camera
   * @param {CanvasRenderingContext2D} ctx Canvas CTX
   * @param {Scene} scene The scene to render
   * @param {Element.id} active Optional ID to specificy an active style for an element
   * @return {void} memes
   */
  public static draw (cam: Camera, ctx: Ctx, scene: Scene, active: string = 'void'): void {
    // Checks if the passed Element is the active one
    const isActive = (e: ElementUnion): boolean => e.id === active

    Paint.clear(ctx)
    Paint.setupScaling(cam, ctx)

    Paint.drawSceneBg(cam, ctx, scene)
    map(e => Paint.drawElement(100, isActive(e), cam, ctx, e), scene.elements)
  }

  public static thumbnail (cam: Camera, scene: Scene): string {
    if ((global as any).TEST) { return '' }
    const ctx = Paint.init(cam, CANVAS_THUMB)
    CANVAS_THUMB.width = 320
    CANVAS_THUMB.height = 180
    Paint.draw(cam, ctx, scene)
    return CANVAS_THUMB.toDataURL()
  }

  private static clear (ctx: Ctx): Ctx {
    const bgAttr = ctx.canvas.attributes.getNamedItem('bgColor')
    const bgColor = bgAttr === null ? '#AAA' : bgAttr.value
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.fillStyle = bgColor
    ctx.clearRect(-5000,-5000,ctx.canvas.width + 10000,ctx.canvas.height + 10000)
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
    return ctx
  }

  private static reset (ctx: Ctx): Ctx {
    ctx.shadowOffsetY = 0
    ctx.shadowOffsetX = 0
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
    return ctx
  }

  private static setupScaling (camera: Camera, ctx: Ctx): Ctx {
    ctx.setTransform(camera[4],0,0,camera[4],ctx.canvas.width / 2,ctx.canvas.height / 2)
    return ctx
  }

  private static drawSceneBg (camera: Camera, ctx: Ctx, scene?: Scene): Ctx | null {

    if (scene == null) { return null }
    const pos = scene.effects.adjust(getObjectPos(camera, [0, 0, 1920, 1080]))

    // Render scene bg image
    if (scene.bgImage) {
      const img = scene.bgImage
      ctx.drawImage(
        img,
        camera[0] - (img[2] / 2),
        camera[1] - (img[3] / 2),
        img[2],
        img[3])
    }

    // inner background (Active Scene)
    ctx.shadowColor = 'rgba(0,0,0,.5)'
    ctx.shadowBlur = 6
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 2
    ctx.fillStyle = Color.toString(scene.bgColor)
    ctx.globalAlpha = scene.effects.opacity

    ctx.fillRect(pos[0], pos[1], pos[2], pos[3])
    ctx = Paint.reset(ctx)
    return ctx
  }

  private static drawElement (time: number, active: boolean, camera: Camera, ctx: Ctx, e: ElementUnion): void {
    e.type === 'image'
      ? Paint.drawImage(time, active, camera, ctx, new ElementImage(e))
      : e.type === 'text'
      ? Paint.drawText(time, active, camera, ctx, new ElementText(e))
      : e.type === 'chart'
      ? Paint.drawChart(time, active, camera, ctx, new ElementChart(e))
      : noop()
  }

  private static drawChart (time: number, active: boolean, camera: Camera, ctx: Ctx, chart: ElementChart): ElementChart {

    // @TODO This is cancer
    let tmpCanvas = document.createElement('canvas')
    tmpCanvas.setAttribute('width', chart.area[2] + '')
    tmpCanvas.setAttribute('height', chart.area[3] + '')

    // Defer rendering to offscreen canvas
    const defer = document.querySelector('#defer-canvas')
    if (defer !== null) {
      defer.innerHTML = ''
      defer.appendChild(tmpCanvas)
    }

    let myChart = new Chart(tmpCanvas, {
      type: chart.variant,
      data: {
        labels: map(v => v.label, chart.value),
        datasets: [{
          label: (chart.variant !== 'bar' ? chart.label : map(v => v.label, chart.value)) as string,
          data: map(v => v.value, chart.value),
          backgroundColor: chart.variant === 'line' ? 'rgba(255,99,132,1)' : [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      },
      options: {
        devicePixelRatio: 2, // @todo make user configurable
        legend: {
          display: chart.variant === 'bar' ? false : true,
          labels: { fontSize: chart.fontSize, padding: chart.fontSize / 2 }
        },
        animation: {
          duration: 1000,
          lazy: false,
          onProgress: function (a) {
            // console.log('animation', a)
          },
          onComplete: function () { console.log('asdsad') }
        },
        defaultFontSize: chart.fontSize // not sure if works
      } as any
    })
    console.log('0-0--0-0--0')

    // @todo the answers to the animation issues with charts
    // console.log(Chart.animationService.animations)
    const pos = getElementPos(camera, chart)

    const value = new Image(chart.area[2], chart.area[3])
    value.src = (myChart as any).toBase64Image()
    // Draw the image onto the canvas
    if (active) {
      ctx.fillStyle = ACTIVE_COLOR
      ctx.strokeRect(pos[0], pos[1], chart.area[2], chart.area[3])
    }
    ctx.globalAlpha = chart.effects.opacity
    ctx.drawImage(tmpCanvas, pos[0], pos[1], chart.area[2], chart.area[3])

    Paint.reset(ctx)

    return chart
  }

  private static drawImage (time: number, active: boolean, camera: Camera, ctx: Ctx, image: ElementImage): ElementImage {

    const pos = getElementPos(camera, image)
    ctx.globalAlpha = image.effects.opacity

    // Draw the image onto the canvas
    if (active) {
      ctx.fillStyle = ACTIVE_COLOR
      ctx.fillRect(pos[0], pos[1], image.area[2], image.area[3])
    }
    ctx.drawImage(image.value, pos[0], pos[1], image.area[2], image.area[3])
    return image
  }

  private static drawText (time: number, active: boolean, camera: Camera, ctx: Ctx, e: ElementText) {
    if (active !== true) { active = false }
    const pos = addPoint(getElementPos(camera, e), [e.horizontalPadding, e.verticalPadding])

    const styleString = `
font:${e.bold ? 'bold' : ''} ${e.italic ? 'italic' : ''} ${e.size}px ${e.font.name};
color: ${Color.toString(e.color)};`
    const data = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + e.area[2] + '" height="' + e.area[3] + '">' +
                                    '<link xmlns="http://www.w3.org/1999/xhtml" href="' + e.font.url + '" rel="stylesheet" type="text/css" />' +
                                    '<foreignObject width="100%" height="100%">' +
                                    '<div xmlns="http://www.w3.org/1999/xhtml" style="' + styleString + '">' +
                                    '<span>' + e.value + '</span>' +
                                    '</div>' +
                                    '</foreignObject>' +
                                    '</svg>')

    const img = new Image(e.area[2], e.area[3])
    img.onload = function () {
      ctx.drawImage(img, pos[0], pos[1], e.area[2], e.area[3])
    }
    img.src = 'data:image/svg+xml,' + data

    return this
  }

}
