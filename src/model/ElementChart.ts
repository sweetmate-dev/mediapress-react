
import Element from './Element'

export type ChartVariant =
  | 'pie'
  | 'bar'
  | 'line'

const defaultValue = [{ label: 'Default', type: 'single', value: [] }]

export default class ElementChart extends Element {

  // Core
  type: 'chart'
  value: {label?: string, type: string, value: any}[]
  variant: ChartVariant
  label: string

  // Styling
  fontSize: number

  constructor (e: any) {
    super(e)
    this.type = 'chart'
    this.value = typeof e.value === 'undefined' ? defaultValue : e.value
    this.fontSize = typeof e.fontSize === 'undefined' ? 40 : e.fontSize
    this.variant = typeof e.variant === 'undefined' ? 'pie' : e.variant
    this.label = typeof e.label === 'undefined' ? 'Default Label' : e.label
    return this
  }
}
