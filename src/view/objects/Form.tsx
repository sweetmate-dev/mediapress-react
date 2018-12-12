'use strict'

import Font from 'model/Font'
import * as m from 'mithril'
import { dashed } from 'lib/Util'

import { readFile, readFileRaw } from 'lib/File'

const noop = e => console.warn('NOOP', e)

export type stringish =
  string | number

// Available file types
export type fileType =
  'Image' | 'Video'

export default class FormHelper {

  /**
   * Renders a standard input field
   *
   * @todo not working
   * @return MithrilNode
   */
  static input (field: string, label: string = 'string') {
    return (<div class='input'>
      <label>{label}</label>
    </div>)
  }

/**
 * Renders a standard text field
 * @todo not working
 * @return MithrilNode
 */
  static text (label: string, value: stringish, onchange: Function = noop) {
    return (<div class={'input text ' + dashed(label)}>
      <label>{label}</label>
      <input value={value} onkeyup={onchange} />
    </div>)
  }

  static selectOld (label: string, value?: string, options: any = [value], onchange = noop) {
    const isSelected = (o: string): boolean => (o === value || (o === 'Please Select..' && !value))
    return m('div.select.input', [
      m('label', label),
      m('select', { oninput: onchange }, options.map(
        e => m('option', { value: e, selected: isSelected(e) ? 'selected' : false }, e)
      ))
    ])
  }

  static range (label, value, min = 0, max = 100, onchange = noop) {
    return (<div class={'input range ' + dashed(label)}>
      <label>{label}</label>
      <input type='text' value={value} onkeyup={onchange} />
      <input type='range' id={dashed(label)} min={min} max={max} value={value} oninput={onchange} />
    </div>)
  }

  //         file :: Editable -> String -> Mithril
  static file (label: string, type: fileType = 'Image', oncomplete: Function = noop): any {
    return (<div class={'input file ' + dashed(label)}>
      <label>{label}</label>
      <input type='file' onchange={readFile} />
    </div>)
  }

/**
 * Outputs a mithril element that handles image file fields. Does not
 * actually upload itself. Returns a HTMLImageElement to OnUpload
 *
 * (String, String, (HTMLImageElement) -> Any) -> MithrilElement
 */
  static image (label: string, value?: string, onUpload = noop) {
    return (<div class='input file file-image'>
      <label>{label}</label>
      <img src={value} />
      <input type='file' onchange={e => readFileRaw(e).then(onUpload)} />
      <div class='drop-zone'></div>
    </div>)
  }

  static color (label: string, value: string, onchange = noop) {
    return (<div class={'input color ' + dashed(label)}>
      <label>{label}</label>
      <div class='color-show' style={{backgroundColor: value}} onclick={()=>{
        document.getElementById('font-color-input').click();
      }}></div>
      <input type='color' id='font-color-input' value={value} onchange={onchange} />
    </div>)
  }

  static backgroundColor (label: string, value: string, onchange = noop) {
    return (<div class={'input color ' + dashed(label)}>
      <label>{label}</label>
      <div class='color-show' onclick={()=>{
        document.getElementById('background-color-input').click();
      }}></div>
      <input type='color' id='background-color-input' value={value} onchange={onchange} />
      <input class="background-show" value={value}/>      
    </div>)
  }

  static select (label: string, value?: string, options: any = [value], onchange = noop) {
    const isSelected = (o: string): boolean => (o === value || (o === 'Please Select..' && !value))
    return m('div.select.input', [
      m('label', label),
      m('.dropdown', [
        m('.dropdown-header', [m('span', value)]),
        m('.dropdown-inner', [
          m('.dropdown-list', options.map(i => m('li', {
            onclick: () => onchange({ target: { value: i } })
          }, i)))
        ])
      ])
    ])
  }

  static font (label: string, value: string, onchange = noop) {
    return (<div class={'input color ' + dashed(label)}>
      <label>{label}</label>
      <div class='dropdown'>
        <div class={'dropdown-header font-' + value.replace(' ','-')}><span>{value}</span></div>
        <div class='dropdown-inner'>
          <ul class='dropdown-list'>
            {Font.globalFonts.map(
               f => (<li class={'font-' + f.value} onclick={() => onchange({ target: { value: f.name } })} >{f.name}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>)
  }

  static icon (name: string, value: boolean, onchange = noop) {
    return (<div class={'input icon ' + dashed(name)}>
      <i onclick={onchange} class={'icon-' + dashed(name) + (value ? ' active' : '')}></i>
    </div>)
  }

  static label (name: string, value: boolean, onchange = noop) {
    return (<div class={'input label ' + dashed(name)}>
      <span onclick={onchange} class={'label-' + dashed(name) + (value ? ' active' : '')}> {name} </span>
    </div>)
  }
}
