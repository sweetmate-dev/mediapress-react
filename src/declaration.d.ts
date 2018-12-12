// Non JS Imports
declare module '*.scss' {
  const content: any
  export default content
}

declare module '*package.json' {
  const content: any
  export const version: string
  export default content
}

// Internal Types
type Ctx = CanvasRenderingContext2D

type Alignment =
  | 'center'
  | 'left'
  | 'right'
  | 'justify'

type Point = [number, number]
type Rectangle = [number, number, number, number]
type Camera = [number, number, number, number, number]

type DeltaRect = {
  top: number,
  right: number,
  bottom: number,
  left: number,
  height: number,
  width: number
}
