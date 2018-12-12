
import Scene from './Scene'
import { map, over, lensProp } from 'ramda'
import Font from 'model/Font'

/**
 * Project model
 *
 * Defines the structure of a project and includes utility functions
 */
export default class Project {

  id: number
  name: string
  description: string
  owner: string
  scenes: Scene[]
  latestRender: string | null
  rendering: boolean
  font: Font

  /**
   * constructor - constructs a Project
   *
   * @param  {object} project Untyped Project
   * @return {Project}        A new instanced Project
   */
  constructor (p: any) {
    this.id = typeof p.id === 'number' ? p.id : parseInt(p.id, 0)
    this.name = p.name
    this.description = typeof p.description === 'undefined' ? '' : p.description
    this.scenes = typeof p.scenes === 'undefined' ? [] : map(x => new Scene(x), p.scenes)
    this.latestRender = typeof p.latestRender === 'undefined' ? null : p.latestRender
    this.rendering = typeof p.rendering === 'undefined' ? false : p.rendering
    this.font = p.font instanceof Font ? p.font : new Font(typeof p.font === 'string' ? p.font : 'Open Sans')
    return this
  }

  static toObject (p: Project): any {
    return over(lensProp('scenes'), map(Scene.toObject), p)
  }

}
