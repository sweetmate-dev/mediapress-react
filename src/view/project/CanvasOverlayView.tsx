const m = require('mithril')
import { map } from 'ramda'
import store from 'store'
import AppState from 'model/AppState'
import { getElementPos } from 'lib/Paint'
import A from 'actions'
import * as interact from 'interactjs'

// FF for some reason requires 2x the margin to align the overlay correctly
const ifFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
const mm = ifFF ? 2 : 1

const renderOverlay = (camera: Camera) => (element: any) => {
  const pos = getElementPos(camera, element)
  const styling = {
    'margin-left': (pos[0] + pos[2] / 2) * mm,
    'margin-top': (pos[1] + element.size / 2) * mm,
    width: pos[2],
    height: element.size * 1.6
  }

  return (<div class='object' element={element.id} onclick={e => store.dispatch(A.Element.select(element.id))} style={styling}></div>)
}

const applyInteract = (e: HTMLElement) => {
  const s: AppState = store.getState()
  const zoom = s.ui.camera[4]

  return interact('div.object', { context: e })
    .draggable({
      onmove: e => {
        if (store.getState().ui.spaceMod === false) { store.dispatch(A.Element.move(e.dx, e.dy)) }
      }
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true }
    })
    .on('resizemove', function (event) {
      const prevElement = AppState.getActiveElement(store.getState());

      const e: any = event // @bug, deltaRect doesn't exist
      store.dispatch(A.Element.transform(e.deltaRect))

      const activeElement = AppState.getActiveElement(store.getState());
      store.dispatch(A.Element.update({ size: prevElement.size * activeElement.area[2] / prevElement.area[2] }))
    })
}
const CanvasOverlayView = {
  view: function (vnode) {

    const s: AppState = store.getState()
    const scene = AppState.getActiveScene(s)
    const ae = AppState.getActiveElement(s)
    const styles = { transform: `scale(${s.ui.camera[4]},${s.ui.camera[4]})` }
    return (<div class='canvas-overlay' style={styles}>
      { scene ? map(renderOverlay(s.ui.camera), scene.elements) : null }
    </div>)
  },

  oncreate: function (vnode: any) {

    // Setup Zoom Hooks
    vnode.dom.addEventListener('wheel', e => {
      const diff = e.deltaY
      store.dispatch(diff < 0 ? A.Camera.zoomIn() : A.Camera.zoomOut())
      e.preventDefault()
      return false
    })
    vnode.dom.addEventListener('mousedown', ev => {
      const spaceMod = store.getState().ui.spaceMod
      if (ev.button !== 1 && !spaceMod) { return false }
      // On Mouse Down Drag
      const dragMouse = mouse =>
        store.dispatch(A.Camera.adjust([mouse.movementX, mouse.movementY]))
      window.addEventListener('mousemove', dragMouse, false)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', dragMouse, false)
      }, ({ useCapture: false, once: true } as any))
    })
    applyInteract(vnode.dom)
  }
}

export default CanvasOverlayView
