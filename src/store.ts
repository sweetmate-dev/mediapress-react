/**
 * store.ts
 *
 * Exposes a store which contains the current AppState for mediapress
 *
 * Refer to `model/AppState` and it's child reducers for more information about it's structure.
 */

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import App from 'reducer'

import AppSaga from 'reducer/Sagas'

const sagaMiddleware = createSagaMiddleware()

const _window = (window as any)

// Compose and create final enhancer
const composeEnhancers =
  typeof window === 'object' && _window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    _window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // redux dev options go here
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

// create store from enhancer and load sagas
const store = createStore(App, enhancer)
sagaMiddleware.run(AppSaga)

export default store
