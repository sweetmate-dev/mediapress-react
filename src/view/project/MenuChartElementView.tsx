'use-strict'

import Form from '../objects/Form'
import A from '../../actions'
import AppState from 'model/AppState'
import ElementChart from 'model/ElementChart'
import { map, set, lensProp, lensIndex, append, min, max, reduce, objOf } from 'ramda'
import * as m from 'mithril'

import store from 'store'
import { rand } from 'lib/Util'

const chartTypes = ['pie', 'line', 'bar']
let highlightNewCell = false

const updateProp = (field: string, overValue: any = v => v) => e =>
  store.dispatch(A.Element.update(objOf(field, overValue(e.target.value))))

const MenuChartElementView = {

  onupdate: (vnode: any) => {
    if (highlightNewCell) {
      vnode.dom.querySelector('.grid-table tbody tr:nth-last-child(2) td:first-child input').focus()
      highlightNewCell = false
    }
  },

  view: (vnode: any) => {

    // Setup
    const s = store.getState()
    const scene = AppState.getActiveScene(s)
    const activeElement = AppState.getActiveElement(s)
    if (!scene || !activeElement) return (<div class='empty'></div>)
    const element = new ElementChart(activeElement)

    // Internal functions
    const finishOp = () => store.dispatch(A.Element.commit())
    const cancelOp = () => store.dispatch(A.Element.cancel())

    const somewhereBetweenValues = (element: ElementChart): number =>
      Math.round(rand(
        (reduce(min, Infinity, map(x => parseInt(x.value, 10), element.value)) as number),
        (reduce(max, 0, map(x => x.value, element.value)) as number)
      ))

    const updateValue = (v: any, field: string) => (e: any) =>
      store.dispatch(A.Element.update({
        value: map(r => r == v ? set(lensProp(field), e.target.value, r) : r, element.value)
      }))
    const addRow = (e) => {
      e.target.blur()
      store.dispatch(A.Element.update({
        value: append({ label: 'New Label', type: 'single', value: [somewhereBetweenValues(element)] }, element.value)
      }))
      highlightNewCell = true
    }
    const updateArea = (prop: number) => (e: any) =>
      store.dispatch(A.Element.update({ area: set(lensIndex(prop), parseInt(e.target.value, 10), activeElement.area) }))

    return (<div class='simple edit active chart double'>
      <h3>Edit Chart Element</h3>
      <form class='form'>
        {Form.select('Chart Type', 'bar', chartTypes, updateProp('variant'))}
      </form>
      <div class='accord active'>
        <div class='title'>Line Chart Data</div>
        <div class='content'>
          { element.variant !== 'pie' ? Form.text('Label', element.label, updateProp('label')) : null }
          <table class='grid-table content'>
          <thead>
            <th>Label</th>
            <th>Value</th>
          </thead>
          <tbody>
            {element.value.map(v => (<tr>
              <td><input type='text' value={v.label} onkeyup={updateValue(v, 'label')} /></td>
              <td><input type='text' value={v.value} onkeyup={updateValue(v, 'value')} /></td>
            </tr>))}
            <tr class='grid-add'>
              <td colspan='2'><a href='#' onfocus={addRow} onclick={addRow}>Add Row</a></td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
      <div class='bottom'>
        <button class='btn back' onclick={cancelOp}>Cancel</button>
        <button class='btn save' onclick={finishOp}>Save</button>
      </div>
    </div>)

  }

}

export default MenuChartElementView
