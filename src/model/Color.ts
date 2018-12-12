import { test } from 'ramda'

/**
 * Color Class
 *
 * A container wrapper around color
 */
export default class Color {

  hex: string

  constructor (hex: string | Color = '#FF0000') {
    this.hex = typeof hex === 'string' ? hex : hex.hex
    return this
  }

  /**
   * Safe function for parsing color
   *
   * @param {string} hex possibly a hex
   */
  static fromString (hex: string): Color | null {
    return Color.validate(hex) ? new Color(hex) : null
  }

  static black (): Color { return new Color('#000') }
  static white (): Color { return new Color('#FFF') }

  /**
   * Converts a Color to a hex string
   * @returns {string} Color as a hex string
   */
  static toString (color: Color | string | undefined): string {
    if (typeof color === 'undefined') { console.error('Error, not a valid Color', color); return '#000' }
    if (typeof color === 'string') { return color.toLowerCase() }
    return color.hex.toLowerCase()
  }

  /**
   * Returns true if valid Color else false
   *
   * @param {string} hex The hex to valid
   * @return {bool} True or False
   */
  static validate (hex: string): boolean {
    return test(/^#([0-9a-f]{6}|[0-9a-f]{3})$/i, hex)
  }

  toString (): string {
    return typeof this.hex === 'undefined' ? 'undefined' : this.hex.toLowerCase()
  }

}
