const m = require('mithril')
import store from 'store'
import A from 'actions'

const CanvasZoomView = {
  view: function () {
    const s = store.getState()
    const zoomString = Math.round(s.ui.camera[4] * 100)
    return (<div class='canvas-zoom'>
      <a class='canvas-zoom-label' onclick={() => store.dispatch(A.Ui.selectTab('preview'))}>Preview</a>
      <a class='canvas-zoom-out' onclick={() => store.dispatch(A.Camera.zoomOut())}>-</a>
      <span class='canvas-zoom-amount'>{zoomString}%</span>
      <a class='canvas-zoom-in' onclick={() => store.dispatch(A.Camera.zoomIn())}>+</a>
    </div>)
  }
}

export default CanvasZoomView
