const m = require('mithril')

import Form from '../objects/Form'
import A from 'actions'
import AppState from 'model/AppState'
import ElementImage from 'model/ElementImage'

import store from 'store'
import { set, lensIndex } from 'ramda'

const MenuImageElementView = {

  view: () => {

    // Setup
    const s: AppState = store.getState()
    const scene = AppState.getActiveScene(s)
    const activeElement = AppState.getActiveElement(s)
    if (!scene || !activeElement) return (<div class='empty'></div>)
    const element = new ElementImage(activeElement)

    // Helper functions
    const finishOp = () => store.dispatch(A.Element.commit())
    const cancelOp = () => store.dispatch(A.Element.cancel())
    const updateArea = (prop: number) => (e: any) =>
      store.dispatch(A.Element.update({ area: set(lensIndex(prop), parseInt(e.target.value, 10), activeElement.area) }))

    return (<div class='simple active image edit'>
      <h3>Edit Image Element</h3>
      <form class='form'>
        {Form.image('Image', element.value.src, img => store.dispatch(A.Element.uploadImage(element.id, img)))}
      </form>
      <div class='bottom'>
        <button class='btn back' onclick={cancelOp}>Cancel</button>
        <button class='btn save' onclick={finishOp}>Save</button>
      </div>
    </div>)

  }

}

export default MenuImageElementView
