// @flow
import User from 'model/User'
import ProjectInfo from 'model/ProjectInfo'

/**
 * Represents a Team of users which can own projects have assign permissions to users
 *  for those projects
 */
export default class Team {

  id: string
  name: string
  owner: User
  members: User[]
  projects: ProjectInfo[]
  created: Date

  constructor (obj: any) {
    this.id = obj.id
    this.name = obj.name
    this.owner = obj.owner
    this.members = obj.members
    this.projects = obj.projects
    this.created = obj.members
    return this
  }

}
