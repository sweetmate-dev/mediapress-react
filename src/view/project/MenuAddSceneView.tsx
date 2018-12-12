const m = require('mithril')

import A from 'actions'
import store from 'store'
import { range } from 'ramda'
import Scene from 'model/Scene'

const addScene = x => store.dispatch(A.Scene.create(new Scene({ name: x })))

const MenuAddSceneView = {
  view: function () {
    return m('div', [
      m('h3', 'Add Scene', [m('a.close', { onclick : ()=>{store.dispatch(A.Ui.selectTab(null))}} )]),

      m('div.scenes', range(1,7).map(x => `Test Scene ${x}`).map(
        x => m('a.btn.full.small', {
          onclick: () => addScene(x),
          src: 'http://placehold.it/200x120'
        }, x)
      ))
    ])
  }
}

export default MenuAddSceneView
