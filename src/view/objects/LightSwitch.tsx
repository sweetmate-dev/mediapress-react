const m = require('mithril')
import Store from 'store'
import A from 'actions'

const toggleNightColors = (_e) => {
  switch (Store.getState().ui.darkColors) {
    case true:
      Store.dispatch(A.Ui.lightMode())
      break
    case false:
      Store.dispatch(A.Ui.darkMode())
      break
  }
}

const SwitchView = {
  view: function () {
    return (
      <div class='light-switch-wrap'>
        <input id='light-switch' class='light-switch' type='checkbox' onclick={toggleNightColors}> </input>
        <label for='light-switch'><span>Night Mode</span></label>
        <span class='flag-span'>{Store.getState().ui.darkColors ? 'On' : 'Off'}</span>
      </div>
    )
  }
}

export default SwitchView
