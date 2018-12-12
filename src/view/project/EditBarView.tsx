const m = require('mithril')
import store from 'store'

import ElementChart from 'model/ElementChart'
import Font from 'model/Font'
import AppState from 'model/AppState'
import ElementText from 'model/ElementText'
import Color from 'model/Color'
import { objOf, keys } from 'ramda'
import A from 'actions'
import { AnimationNames } from 'model/Element'

import Form from '../objects/Form'
import Dropdown from '../objects/Dropdown'
import Dropdown2 from '../objects/DropDown2'
import { mockElement } from '../../../__tests__/fixtures/mock'

const updateProp = (field: string, overValue: any = v => v) => e =>{
  if(e.target.type === 'range') {
    let elementId = ''
    for(let i=0; i<field.length; i++){
      if (field[i] == field[i].toUpperCase()) {
        elementId += '-'
        elementId += field[i].toLowerCase();
      } else {
        elementId += field[i];      
      }
    }
    let element: any = document.getElementById(elementId);
    let cssVal = (e.target.value - element.getAttribute('min'))/(element.getAttribute('max') - element.getAttribute('min'));
    document.getElementById(elementId).style.backgroundImage = `-webkit-gradient(linear, left top, right top, color-stop(${cssVal}, #4353ff), color-stop(${cssVal}, #d8d8d8))`
  }
  store.dispatch(A.Element.update(objOf(field, overValue(e.target.value))))}

const renderChartBar = (e: ElementChart) => (<div class='edit-bar active'>
  <div class='edit-group'>

  </div>
</div>)

const fontSizeArr = (from, to) => {
  let arr = [];
  for(let i=from; i<to; i++){
    arr.push(i);
  }
  return arr;
}



const renderTextBar = (e: ElementText, vnode: any) => (<div class='edit-bar active'>
  {/* <div class="left-side">
    <div class='arrow' onclick={null}></div>
    <div class='move' onclick={null}></div>
  </div> */}
  <div class="right-side">
    <div class='edit-group'>
      { Form.font('Font', e.font.name, updateProp('font', v => new Font(v))) }
      { Form.select('Text Size', e.size.toString(), fontSizeArr(12, 180),  updateProp('size', parseInt)) }
      { Form.color('Font Color', e.color.hex, updateProp('color', v => new Color(v))) }
      { Form.icon('bold', e.bold, updateProp('bold', v => !e.bold)) }
      { Form.icon('italic', e.italic, updateProp('italic', v => !e.italic)) }
      <div class="text-align">
          {vnode.state.data.textAlignArr.map(i => m((vnode.state.data.textAlignArr.indexOf(i)===0?'div.selectedItem':'div.hiddenItem')+' '+i, {
            onclick: () => {
              let arr = vnode.state.data.textAlignArr;
              let index = arr.indexOf(i);
              arr[index] = arr[0]
              arr[0] = i;
              store.dispatch(A.Element.update(objOf('textAlign', i)))
            }
          }, ''))}
      </div>
      <div class='uppercase' onclick={()=>store.dispatch(A.Element.update(objOf('uppercase', !e.uppercase)))}></div>
      <div class='dot-point' onclick={()=>store.dispatch(A.Element.update(objOf('listshow', !e.listshow)))}></div>
    </div>
    <div class='edit-group nosep text-control'>
      { m(Dropdown, (
          <div>
            { Form.range('Line Height', e.lineHeight, 12, 180, updateProp('lineHeight', parseInt)) }
            { Form.range('Letter Spacing', e.letterSpacing, -20, 20, updateProp('letterSpacing', parseInt)) }
          </div>
      ), { title: 'Text Spacing' }) }
      { m(Dropdown2, (
          <div>
            { Form.range('Vertical Padding', e.verticalPadding, 0, 50, updateProp('verticalPadding', parseInt)) }
            { Form.range('Horizontal Padding', e.horizontalPadding, 0, 50, updateProp('horizontalPadding', parseInt)) }
            { Form.backgroundColor('Background Color', e.background.hex, updateProp('background', v => new Color(v))) }
          </div>
      ), { title: 'Background' }) }
      <div class='opacity' onclick={() => vnode.state.data.opacityView = !vnode.state.data.opacityView}>
        { vnode.state.data.opacityView && <div class='opacity-control' onclick={event => event.stopPropagation()}>{Form.range('Transparency', e.transparency, 0, 100, updateProp('transparency', parseInt)) }</div>}        
      </div>
      <a class='copy' onclick={() => {
        const newEle = mockElement('text')
        let newObj = Object.assign({}, e);
        delete newObj.id;
        let targetEle = Object.assign({}, newEle, newObj);
      }}>Duplicate</a>
      <a class='delete'>Delete</a>
    </div>
  </div>
  
</div>)

/**
 * Used on the ProjectEdit tab for giving the user many shortcuts
 * for editing elements
 */
const EditBar = {

  data: {
    textAlignArr: ['center', 'left', 'right'],
    opacityView: false
  },

  view: vnode => {
    const s = store.getState()
    const activeScene = AppState.getActiveScene(s)
    const e:any = AppState.getActiveElement(s)
    
    let rangeArr = ['lineHeight', 'letterSpacing', 'verticalPadding', 'horizontalPadding', 'transparency'];
    rangeArr.forEach(item=>{
      let elementId = ''
      for(let i=0; i<item.length; i++){
        if (item[i] == item[i].toUpperCase()) {
          elementId += '-'
          elementId += item[i].toLowerCase();
        } else {
          elementId += item[i];      
        }
      }
      setTimeout(()=>{
      let element: any = document.getElementById(elementId);
        if(e && element){
            let cssVal = (e[item] - element.getAttribute('min'))/(element.getAttribute('max') - element.getAttribute('min'));  
            document.getElementById(elementId).style.backgroundImage = `-webkit-gradient(linear, left top, right top, color-stop(${cssVal}, #4353ff), color-stop(${cssVal}, #d8d8d8))`
        }
      }, 100)
    })

    if (!activeScene || !e || e.type !== 'text') return m('div.empty')
    return renderTextBar(e as ElementText, vnode as any)
  }
}

export default EditBar
