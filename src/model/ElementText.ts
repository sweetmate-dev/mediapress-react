
import Color from './Color'
import Font from './Font'
import Element from './Element'

export default class ElementText extends Element {

  type: 'text'
  value: string

  // Styling
  color: Color
  background: Color
  font: Font
  size: number
  alignment: Alignment

  letterSpacing: number
  lineHeight: number
  bold: boolean
  italic: boolean
  verticalPadding: number
  horizontalPadding: number

  center: boolean
  uppercase: boolean
  listshow: boolean

  textAlign: string

  transparency: number

  constructor (e: any) {
    super(e)
    this.type = 'text'
    this.value = typeof e.value === 'string' ? e.value : 'New Text Element'
    this.color = e.color === null || typeof e.color === 'undefined' ? new Color() : new Color(e.color)
    this.background = e.background === null || typeof e.background === 'undefined' ? new Color() : new Color(e.background)
    this.font = e.font instanceof Font ? e.font : Font.globalFonts[0]
    this.size = typeof e.size === 'undefined' ? 44 : Math.floor(e.size)
    this.lineHeight = typeof e.lineHeight === 'undefined' ? 44 : Math.floor(e.lineHeight)
    this.letterSpacing = typeof e.letterSpacing === 'undefined' ? 0 : Math.floor(e.letterSpacing)
    this.alignment = 'center'
    this.bold = e.bold === true ? true : false
    this.italic = e.italic === true ? true : false
    this.verticalPadding = typeof e.verticalPadding === 'undefined' ? 0 : Math.floor(e.verticalPadding)
    this.horizontalPadding = typeof e.horizontalPadding === 'undefined' ? 0 : Math.floor(e.horizontalPadding)
    this.transparency = typeof e.transparency === 'undefined' ? 100 : Math.floor(e.transparency)
    return this
  }

  static toString (element: ElementText): string {
    return element.value
  }
}
