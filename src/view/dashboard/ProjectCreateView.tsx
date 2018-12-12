const m = require('mithril')
import { set, lensProp as lens } from 'ramda'
import store from 'store'
import A from 'actions'
import Form from '../objects/Form'

let proj = {
  name: '',
  description: '',
  scenes: [ { name: 'Default Slide', frameLength: 300, bgColor: '#FFF', transition: { name: 'none' }, elements: [] } ]
}

let modalShown = false

const clearInput = p => set(lens('name'), '', set(lens('description'), '', p))

const handleInput = field => e => proj[field] = e.target.value

const createProject = e => {
  e.preventDefault()
  if (proj.name && proj.description) {
    store.dispatch(A.Project.create(proj))
    proj = clearInput(proj)
    modalShown = false
  }
  return false
}

const switchModal = () => {
  modalShown = !modalShown
}

export default {
  view: vnode => {
    return (
      <div class={'page ' + (vnode.attrs.active ? 'active' : '')}>
        <div class={'modal' + (modalShown ? ' active' : '')}>
          <div class='modal-inner'>
            <h3>Create a Project <a class='close white' onclick = {switchModal}>Close</a></h3>
            <form class='form'>
              {Form.text('Name', proj.name, handleInput('name'))}
              {Form.text('Description', proj.description, handleInput('description'))}
              <button class='btn primary right' onclick={createProject}>Create New Project</button>
              <div class='clear'></div>
            </form>
          </div>
        </div>
        {/* <h2>Create a new Project</h2>
        <p>Create a new project from a customized template based upon a styleguide</p>
        <form onsubmit={createProject}>
          {Form.text('Name', proj.name, handleInput('name'))}
          {Form.text('Description', proj.description, handleInput('description'))}
          <button class='btn small' onclick={createProject}>Create New Project</button>
        </form> */}
        <div class='project-create'>
          <h2>Select a template below</h2>
          <div class='template-container'>
            <div class='project-template'>
              <div class={'tmp-content' + (modalShown ? ' active' : '')} onclick = {switchModal}></div>
              <div class='tmp-title'>Blank template</div>
            </div>
            <div class='project-template'>
              <div class='tmp-content'></div>
              <div class='tmp-title'>Template 1</div>
            </div>
            <div class='project-template'>
              <div class='tmp-content'></div>
              <div class='tmp-title'>Template 2</div>
            </div>
            <div class='project-template'>
              <div class='tmp-content'></div>
              <div class='tmp-title'>Template 3</div>
            </div>
            <div class='project-template'>
              <div class='tmp-content'></div>
              <div class='tmp-title'>Template 4</div>
            </div>
            <div class='project-template'>
              <div class='tmp-content'></div>
              <div class='tmp-title'>Template 5</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
