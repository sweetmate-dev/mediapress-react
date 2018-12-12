import Job from 'model/Job'

/**
 * ProjectInfo
 *
 * A subset of {Project} which contains strictly metadata about the project
 * to avoid users needing every project loaded at once
 */
export default class ProjectInfo {

  _id: string
  name: string
  latestJob?: Job

  /**
   * Constructs a {ProjectInfo} from a generic object
   */
  constructor (obj: any) {
    this._id = obj._id
    this.name = obj.name
    this.latestJob = obj.latestRender
    return this
  }

}
