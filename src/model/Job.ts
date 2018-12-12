export default class Job {

  _id: string
  status: string
  progress: number
  url: null | string
  created: null | Date
  finished: null | Date

  constructor (obj: any) {
    this._id = obj._id
    this.status = 'Rendering'
    this.progress = 0
    this.created = typeof obj.created === 'undefined' ? null : obj.created
    this.finished = typeof obj.finished === 'undefined' ? null : obj.finished
    this.url = typeof obj.url === 'undefined' ? null : obj.url
    return this
  }

}
