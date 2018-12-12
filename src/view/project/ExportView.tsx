const m = require('mithril')
import store from 'store'
import A from '../../actions'
import FormHelper from '../objects/Form'
import { rand } from 'lib/Util'

let progress = 0
let videoReady = false

const stopPreview = () => store.dispatch(A.Ui.stopPreview())
const startPreview = () => store.dispatch(A.Ui.startPreview())

const mockRender = () => {
  setTimeout(() => {
    progress += Math.round(rand(0,2))
    if (progress < 100) {
      mockRender()
      m.redraw()
    } else {
      videoReady = true
      store.dispatch(A.Project.finishRender('/static/movie.mp4'))
    }
  }, rand(10,300))
}

const dispatchRender = () => () => {
  const project = store.getState().project
  store.dispatch(A.Project.render(project.id))
  mockRender()
}

const ExportView = {
  view: () => {
    const s = store.getState()
    const active = s.ui.activeMenu === 'export' ? 'active' : ''
    return (<div class={'panel-group ' + active}>
      <div class={'previewing ' + (s.ui.previewing ? 'active' : '')} onclick={stopPreview}>
        <video width='320' height='240' controls>
          <source src='/static/movie.mp4' type='video/mp4' />
          <source src='/static/movie.mp4' type='video/ogg' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class={'exporting ' + (active === 'active' && s.project.rendering ? 'active' : '')}>
        <p>Your video is now exporting</p>
        <div class='spinner-outer'>
          <div class='spinner-inner'>{progress}%</div>
          <div class='spinner'></div>
        </div>
        <p>Once exporting is complete you will be able to download and share your project</p>
        <p>You can also find your exported videos in the "All Videos" section of your dashboard</p>
      </div>
      <div class={'export simple ' + active}>
        <h3>Export your video <a class='close' onclick={()=>{store.dispatch(A.Ui.selectTab(null))}}>Close</a></h3>
        <ul class='accord'><li class='active'>
          <div class='title'>Video Meta Information</div>
          <div class='content nopad'>
            {FormHelper.text('Video Title', '')}
            {FormHelper.text('Video Description', '')}
            {FormHelper.text('Video Author', '')}
          </div>
        </li></ul>
        <ul class='accord'><li class='active'>
          <div class='title'>Export Settings</div>
          <div class='content nopad'>
            {FormHelper.select('Resolution', '1920x1080', ['1920x1080', '1280x720', '1440x1080'])}
            {FormHelper.select('File Format', 'H.264 (MP4)', ['H.264 (MP4)', 'VP8 (WebM)'])}
            {FormHelper.select('Frames Per Second', '60', ['30', '60', '90', '120'])}
          </div>
        </li></ul>
        <a class='btn small full render' onclick={dispatchRender()}>Render Video</a>
        <a class='btn small full alt' onclick={startPreview} disabled={!videoReady}>View Last Render</a>
      </div>
    </div>)
  }
}

export default ExportView
