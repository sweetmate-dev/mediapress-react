// @flow

import Project from 'model/Project'
import { Action } from 'actions'
import { compose, set, lensProp, merge } from 'ramda'

const finishRender = (p: Project, latestRender: string): Project => new Project(compose(
  set(lensProp('latestRender'), latestRender),
  set(lensProp('rendering'), false)
)(p))

const ProjectReducer = (state: Project | null = null, action: Action): Project | null => {
  switch (action.type) {
    case 'PROJECT_UPDATE':
      return merge(state, action.updates)
    case 'PROJECT_CREATE_SUCCESS':
    case 'PROJECT_OPEN_SUCCESS':
      return new Project(action.project)
    case 'PROJECT_CLOSE':
      return null
    case 'PROJECT_RENDER_REQUEST':
      return set(lensProp('rendering'), true, state)
    case 'PROJECT_FINISH_RENDER':
      return finishRender(state, action.video)
    default: return state
  }
}

export default ProjectReducer
