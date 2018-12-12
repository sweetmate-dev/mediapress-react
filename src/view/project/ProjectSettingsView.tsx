const m = require('mithril')
import FormHelper from '../objects/Form'
import store from 'store'
import AppState from 'model/AppState'
import { objOf } from 'ramda'
import Font from 'model/Font'

import A from '../../actions'

const ProjectSettingsView = {
  view: (vnode: any) => {

    const s: AppState = store.getState()
    const project = s.project
    const scene = AppState.getActiveScene(s)

    // Takes a prop and optionally a function that transforms the value and
    // creates a function which maps onchange to store.dispatch
    const updateProj = (field: string, overValue: any = v => v) => e =>
      store.dispatch(A.Project.update(objOf(field, overValue(e.target.value))))

    if (project === null || typeof project === 'undefined') { return (<div></div>) }
    return (<div class={'settings simple ' + vnode.attrs.active}>
      <h3>Project Settings <a class='close white' onclick={()=>{store.dispatch(A.Ui.selectTab(null))}}>Close</a></h3>
      <form class='form'>
        {FormHelper.font('Font', project.font.name, updateProj('font', v => new Font(v))) }
        {FormHelper.text('Name', project.name, updateProj('name'))}
        {FormHelper.text('Description', project.description, updateProj('description'))}
      </form>
    </div>)
  }
}

export default ProjectSettingsView
