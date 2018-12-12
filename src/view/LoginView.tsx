const m = require('mithril')
import A from 'actions'
import store from 'store'
import { version } from '../../package.json'
import Api from 'lib/Api'
import AppState from 'model/AppState'

let username = ''
let password = 'password'

const handleUser = e => username = e.target.value
const handlePass = e => password = e.target.value

// Dispatches a login action
const doLogin = e => {
  if (e) e.preventDefault()
  store.dispatch(A.User.login(username, password))
  return false
}

// Load Api Version on staging
let apiVersion = ''
if (window.location.hostname.indexOf('mediapress.io') > -1) {
  Api.info()
    .then(x => x.json())
    .then(x => { apiVersion = ' | Api ' + x.version; m.redraw() })
}

/**
 * Main View for the login Page
 */
const LoginView = {
  view: function () {

    const s: AppState = store.getState()
    const loginError = s.currentError

    return (<div class={'login-outer ' + (s.user == null ? '' : 'logged-in')}>
      <h1 class='logo animated bounceInDown'>Mediapress Login</h1>
      <div class={'error ' + (loginError ? 'active' : '')}>
        <span>{loginError}</span>
      </div>
      <form onsubmit={doLogin} autocomplete='on'>
        <div id='login'>
          <div class='inputs'>
            <input type='text' name='email' placeholder='email' value={username} oninput={handleUser} />
            <input type='password' name='password' value={password} oninput={handlePass} />
          </div>
        </div>
        <div id='login-footer'>
          <div class='sub-inputs animated bounceInUp'>
            <div class='left'>
              <a href='#'>Forgot Password</a>
            </div>
            <div class={'right ' + (s.ui.uploading ? 'active' : '')}>
              <div class='spinner-outer mini'><div class='spinner-inner'></div><div class='spinner'></div></div>
              <button type='submit' class='btn big' onclick={doLogin}>Login</button>
            </div>
          </div>
        </div>
        <div id='login-version'>
          <span>Version {version + ' ' + apiVersion}</span>
        </div>
      </form>
    </div>)
  }
}

export default LoginView
