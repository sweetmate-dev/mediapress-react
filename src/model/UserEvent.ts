import ProjectInfo from 'model/ProjectInfo'
import { Asset } from 'model/Asset'
import Team from 'model/Team'
import User from 'model/User'

export default class UserEvent {
  _id: string
  message: string
  user: User

  // optional
  project: ProjectInfo | null
  team: Team | null
  targetUser: User | null
  asset: Asset | null

  constructor (obj: any) {
    this._id = obj._id
    this.message = obj.message
    this.user = obj.user
    this.team = typeof obj.team === 'undefined' ? null : obj.team
    this.targetUser = typeof obj.targetUser === 'undefined' ? null : obj.targetUser
    this.asset = typeof obj.asset === 'undefined' ? null : obj.asset
    return this
  }
}
