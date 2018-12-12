const m = require('mithril')

import A from 'actions'
import store from 'store'
import { rand } from '../../lib/Util'
import Color from '../../model/Color'
import AppState from 'model/AppState'
import ElementText from 'model/ElementText'
import { objOf } from 'ramda'

import { mockElement } from '../../../__tests__/fixtures/mock'

const MenuTextElementView = {

  view: function () {

    const addTextElement = template => () => {
      const e = mockElement('text')
      e.area = [rand(100,900), rand(100,500), 300, 300]
      e.color = new Color(template.style.color)
      e.size = template.style.fontSize
      e.value = template.text
      store.dispatch(A.Element.create('text', e))
    }

    const mockTemplate = {
      text: 'template 1',
      style: {
        color: '#F00',
        fontSize: 40
      }
    }

    return (
      <div class='text template container cus'>
        {/* <div onclick={addTextElement(mockTemplate)} style={mockTemplate.style} id="mock_tmp"> */}
        <div style={mockTemplate.style} id="mock_tmp">
          {mockTemplate.text}
        </div>
      </div>
    )
  }
}

export default MenuTextElementView
