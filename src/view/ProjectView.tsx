'use-strict'
const m = require('mithril') // tslint:disable-line

import LoginView from 'view/LoginView'

import SidebarView from 'view/project/SidebarView'
import MenuView from 'view/project/MenuView'
import EditBarView from 'view/project/EditBarView'
import CanvasView from 'view/project/CanvasView'
import TimelineView from 'view/project/TimelineView'
import CanvasZoomView from 'view/project/CanvasZoomView'
import CanvasOverlay from 'view/project/CanvasOverlayView'

import DemoView from 'view/project/DemoView'

import store from 'store'
import AppState from 'model/AppState'
import A from 'actions'

import { rand } from '../lib/Util'

import * as interact from 'interactjs'

import { mockElement } from '../../__tests__/fixtures/mock'

const dragMoveListener = (event) => {
  var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

/**
 * Main view used when a project is loaded
 */
const ProjectView = {
  view: () => (<div id='app-inner'>
    {m(LoginView)}
    {m(SidebarView)}
    {m(MenuView)}
    <div class='spinner-outer'><div class='spinner-inner'></div><div class='spinner'></div></div>
    <div class='canvas-outer'>
      {m(EditBarView)}
      {m(DemoView)}
      {/* {m(CanvasView)}
      {m(CanvasOverlay)}
      {m(CanvasZoomView)} */}
    </div>
    {m(TimelineView)}
  </div>),

  oncreate: function (vnode: any) {
    interact('div#mock_tmp')
    .draggable({
      inertia: true,
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      onmove: dragMoveListener,
    })
    .on('up', function(event) {
      event.preventDefault();
      const s = store.getState();

      let stage = document.getElementById('demo-inner');

      let width = stage.offsetWidth;
      let height = stage.offsetHeight;

      var rect = stage.getBoundingClientRect();

      let mouseX = event.clientX;
      let mouseY = event.clientY;

      if(mouseX > rect.left && mouseX < rect.left+width && mouseY > rect.top && mouseY < rect.top+height){
        const e = mockElement('text')
        const time = s.ui.player.time  

        e.area = [mouseX - rect.left, mouseY - rect.top, 180, 50]
        e.value = 'template 1'
        e.size = 40
        e.color = {hex: '#FF0000'},
        e.background = {hex: '#FFFFFF'},
        e.time = time
        store.dispatch(A.Element.create('text', e))
      }
      // const s = store.getState();
      // const camera = s.ui.camera;
      // let stageWidth = 1920 * camera[4];
      // let stageHeight = 1080 * camera[4];

      // let canvas = document.getElementById('canvas-inner');

      // let canvasWidth = canvas.offsetWidth;
      // let canvasHeight = canvas.offsetHeight;

      // var rect = canvas.getBoundingClientRect();

      // let x, y, stageX, stageY;

      // if(canvasWidth > stageWidth){
      //   x = rect.left + (canvasWidth - stageWidth) / 2;
      //   stageX = x;
      // } else {
      //   x = rect.left;
      //   stageX = rect.left - (stageWidth - canvasWidth) / 2
      //   stageWidth = canvasWidth;
        
      // }

      // if(canvasHeight > stageHeight){
      //   y = rect.top + (canvasHeight - stageHeight) / 2;
      //   stageY = y;
      // } else {
      //   y = rect.top;
      //   stageY = rect.top - (stageHeight - canvasHeight) / 2
      //   stageHeight = canvasHeight;
      // }

      // let mouseX = event.clientX;
      // let mouseY = event.clientY;

      // if(mouseX > x && mouseX < x+stageWidth && mouseY > y && mouseY < y+stageHeight){
      //   const e = mockElement('text')
        
      //   e.area = [1920*(mouseX - stageX)/(1920 * camera[4]), 1080*(mouseY - stageY)/(1080 * camera[4]), 180, 50]
      //   e.value = 'Template 1'
      //   e.size = 40
      //   e.color = {hex: '#FF0000'}
      //   store.dispatch(A.Element.create('text', e))
      // }
    });
  }
}

export default ProjectView
