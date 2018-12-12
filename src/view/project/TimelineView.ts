const m = require('mithril')
import { findIndex, propEq, map, take, reduce, clamp, range } from 'ramda'
import A from '../../actions'
import { play, pause, back, forward, seek } from 'lib/Player'
import Paint from 'lib/Paint'

import store from 'store'
import AppState from 'model/AppState'
import { toTimestamp } from 'lib/Util'
import Scene from 'model/Scene'
import * as Sortable from 'sortablejs'

const deleteScene = scene => () =>
  confirm('Are you sure you want to delete this scene?')
  ? store.dispatch(A.Scene.delete(scene.id))
  : false

const cloneScene = scene => () => store.dispatch(A.Scene.clone(scene))

let scrollOffset = 0
let firstX = 0
let currentSeekTime = 0
let thumbnails: string[] = []

/**
 * The bottom timeline represenation in the project area
 */
const TimelineView = {
  view: function () {

    const s: AppState = store.getState()
    const time = s.ui.player.time
    const playing = s.ui.player.playing

    if (s.project == null) { return m('div') }
    const scenes: Scene[] = s.project.scenes

    const activeScene = AppState.getActiveScene(s)
    const current = activeScene ? findIndex(propEq('id', activeScene.id))(scenes) : 0

    const reduceTime = reduce((x: number,y: number) => x + y, 0)
    const sceneOffset = reduceTime(map(x => x.frameLength, take(current, scenes)))

    // Subscribe to the horizontal scrolling of the timeline
    const onScroll = (e) => {
      scrollOffset = e.target.scrollLeft
    }

    // Handles the scrobbling when a user is seeking through the timeline
    // @todo: remove the -1 on scrobble clamp when last scene is seekable
    const seekBind = e => {
      const clampScrobble = clamp(0, reduceTime(map(x => x.frameLength, scenes)) - 1)
      const newTime = clampScrobble(currentSeekTime + (e.x - firstX))
      seek(newTime / activeScene.frameLength)
      store.dispatch({ type: 'PLAYER_SCROBBLE', time: newTime })
    }

    // Setup the scrobbling events when the indicator is clicked/tapped
    const handleIndicatorSeek = (e) => {
      firstX = e.x
      currentSeekTime = sceneOffset + time
      document.addEventListener('mousemove', seekBind)
      document.addEventListener('mouseup', e => {
        document.removeEventListener('mousemove', seekBind)
      })
    }

    const onMouseScroll = e => {
      store.dispatch(A.Ui.timelineZoom(e.deltaY))
    }

    scenes.forEach((scene) => {
      thumbnails[scene.id] = Paint.thumbnail([0,0,100,100,0.25], scene)
    })

    return m('section.timeline', { onwheel: onMouseScroll }, [
      m('.controls', [
        m('button.back', { onclick: back }, m('span', 'Back')),
        m('button.play', {
          onclick: play,
          class: !playing ? '' : 'hidden'
        }, m('span', 'Animate')),
        m('button.pause', {
          onclick: pause,
          class: !playing ? 'hidden' : ''
        }, m('span', 'Pause')),
        m('button.forward', { onclick: forward }, m('span', 'Forward')),
        m('span.info', toTimestamp((sceneOffset + time) / 60)),
        m('span.info.small', Math.round(sceneOffset + time))
      ]),
      m('.indicator', {
        onmousedown: handleIndicatorSeek,
        style: 'margin-left:' + ((sceneOffset + time - scrollOffset) * s.ui.timelineZoom) + 'px'
      }),
      m('.ruler', {
        style: 'margin-left:-' + (scrollOffset) + 'px'
      }, range(0,50).map(x => m('div', {
        style: 'margin-left:' + ((60 * s.ui.timelineZoom) - 1) + 'px'
      }))),
      m('ul', {
        onscroll: onScroll,
        className: 'scenes' + (scenes.length === 0 ? ' empty' : '')
      }, scenes.map(scene => {
        return m('li', {
          key: scene.id,
          style: {
            width: (scene.frameLength * s.ui.timelineZoom) + 'px',
            'background-color': scene.bgColor,
            'background-image': 'url(' + thumbnails[scene.id] + ')'
          },
          class: activeScene && scene.id === activeScene.id ? 'active' : '',
          onclick: () => store.dispatch(A.Scene.select(scene.id))
        }, [
          m('a.clone', { href: '#', onclick: cloneScene(scene) })
        ], scene.name)
      }))
    ])
  },

  oncreate: function (vnode: any) {
    Sortable.create(vnode.dom.lastChild, {
      onEnd: e => {
        store.dispatch(A.Scene.reorder(e.oldIndex, e.newIndex))
      }
    })
    vnode.dom.addEventListener('wheel', e => {
      const diff = e.deltaY
      // scrollOffset += diff
//      m.redraw()
      e.preventDefault()
    })
  }
}

export default TimelineView
