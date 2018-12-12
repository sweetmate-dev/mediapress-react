const m = require('mithril')

import TextElementView from './MenuTextElementView'
import ImageElementView from './MenuImageElementView'
import ChartElementView from './MenuChartElementView'

import { TransitionNames } from 'model/Scene'
import MenuEditPopout from './MenuEditPopoutView'
import store from 'store'
import A from 'actions'
import Form from '../objects/Form'
import Element from 'model/Element'
import AppState from 'model/AppState'
import { keys, objOf } from 'ramda'

// Defines wether or not the user is on the settings edit page
let editSettings = false
const editScene = () => editSettings = true
const editElements = () => editSettings = false

const openSubPanel = (panel) => () => store.dispatch(A.Ui.openSubPanel(panel))

// Takes a prop and optionally a function that transforms the value and
// creates a function which maps onchange to store.dispatch
const updateScene = (field: string, overValue: any = v => v) => e =>
  store.dispatch(A.Scene.update(objOf(field, overValue(e.target.value))))

// Load SceneElement into a function for optional rendering
const SceneElement = scene => (<div class='edit simple active'>
  <h3>Scene Settings</h3>
  <a class='btn alt' onclick={editElements}>Edit Elements</a>
  <form class='form'>
    {Form.color('Background Color', scene.bgColor.toString(), updateScene('bgColor'))}
    {Form.file('Background Image', 'Image')}
    {Form.select('Transition Effect', scene.transition.name, keys(TransitionNames), updateScene('transition', n => objOf('name', n)))}
    {Form.text('Slide Time', scene.frameLength, updateScene('frameLength', parseInt))}
  </form>
</div>)

const MenuEditView = {
  view: function (vdom: any) {

    const s = store.getState()
    const scene = AppState.getActiveScene(s)
    const activeElement = AppState.getActiveElement(s)
    const active = vdom.attrs.active
    const subPanel = s.ui.subPanel
    const activeElementType = s.ui.activeElementType

    // No Scene Selected Panel
    if (scene === null || typeof scene === 'undefined') {
      return (<div class={'edit simple ' + active}>
        <h3>Edit Scene</h3>
        <p class='panel-content'>Select a scene below to start editing</p>
      </div>)
    }

    const elements = scene.elements

    // Internal Functions
    // const addElement = (type: 'text' | 'image' | 'chart') => () =>
    //   store.dispatch(A.Element.create(type))

    const setElementType = (type: 'text' | 'image' | 'chart') => () =>
      store.dispatch(A.Element.setType(type))

    const editElement = (e: Element) => {
      store.dispatch(A.Element.select(e.id))
    }

    const skipRenderingSubPanel: boolean = !active
                                        || activeElementType === null
                                        || typeof activeElement === 'undefined'
                                        || subPanel === 'add'
                                        || subPanel === null

    // Alternative Settings Menu
    if (editSettings && active) {
      return SceneElement(scene)
    }

    // View Render
    return (<div class='panel-group'>
      <div class={'edit simple ' + active}>
        <h3>Elements <a class='close' onclick={()=>{store.dispatch(A.Ui.selectTab(null))}}>Close</a></h3>
        <div class='panel-content'>
          <h4>Add Element</h4>
          <div class='elements-btn-container'>
            <div>
              <a class='btn txt' href='#' onclick={setElementType('text')}></a>
              <div>Text</div>
            </div>
            <div>
              <a class='btn img' href='#' onclick={null}></a>
              <div>Image</div>
            </div>
            <div>
              <a class='btn chart' href='#' onclick={null}></a>
              <div>Chart</div>
            </div>
            <div>
              <a class='btn line' href='#' onclick={null}></a>
              <div>Line</div>
            </div>
            <div>
            <a class='btn shape' href='#' onclick={null}></a>
              <div>Shape</div>
            </div>
            <div>
              <a class='btn icon' href='#' onclick={null}></a>
              <div>Icon</div>
            </div>
            <div>
              <a class='btn device' href='#' onclick={null}></a>
              <div>Device</div>
            </div>
            <div>
              <a class='btn video' href='#' onclick={null}></a>
              <div>Video</div>
            </div>
          </div>
          { activeElementType === 'text' ? m(TextElementView)
            : activeElementType === 'image' ? m(ImageElementView)
            : activeElementType === 'chart' ? m(ChartElementView)
            : null }
          
        </div>
      </div>
      
    </div>)
  }
}

export default MenuEditView