import ProjectInfo from 'model/ProjectInfo'
import Team from 'model/Team'
import { Asset } from 'model/Asset'

/**
 * Represents a store of information related specifically to a user
 */
export default class Library {

  projects: ProjectInfo[]
  teams: Team[]
  assets: Asset[]

  constructor (obj: any) {
    this.projects = obj.projects
    this.teams = obj.teams
    this.assets = obj.assets
    return this
  }

}
