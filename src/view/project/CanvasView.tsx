const m = require('mithril')
import A from 'actions'
import store from 'store'
import * as throttle from 'lodash.throttle'

import { draw } from 'lib/Player'

const handleZoom = e => {
  const diff = e.deltaY
  store.dispatch(diff < 0 ? A.Camera.zoomIn() : A.Camera.zoomOut())
  e.preventDefault()
  return false
}

const CanvasView = {

  view: function () {
    const bgColor = store.getState().ui.darkColors ? '#393939' : '#ededed'
    return (<canvas class='canvas-inner' id='canvas-inner' bgColor={bgColor}>
      <div id='camera'></div>
    </canvas>)
  },

  oncreate: function (vnode: any) {
    draw(vnode)
    store.subscribe(() => draw(vnode))
    window.addEventListener('resize', () => draw(vnode))
    // Setup Zoom Hooks
    vnode.dom.addEventListener('wheel', throttle(handleZoom, 100))
    vnode.dom.addEventListener('mousedown', ev => {
      if (ev.button !== 1) { return false }
      // On Mouse Down Drag
      const dragMouse = mouse =>
        store.dispatch(A.Camera.adjust([mouse.movementX, mouse.movementY]))
      window.addEventListener('mousemove', dragMouse, false)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', dragMouse, false)
      }, ({ useCapture: false, once: true } as any))
    })
  }
}


export default CanvasView
