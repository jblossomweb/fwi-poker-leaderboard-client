import { fromJS } from 'immutable'

import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  StoreEnhancer,
  Middleware,
} from 'redux'

import { AppState } from './state.types'
import { getMiddlewares } from './middleware.utils'
import { getEnhancers } from './enhancer.utils'

const middlewares: Middleware[] = getMiddlewares()
const enhancers: StoreEnhancer[] = getEnhancers()

const composedEnhancers = fromJS(compose(
  applyMiddleware(...middlewares),
  ...enhancers,
))

const composeStore = (
  initialState: AppState,
  appReducers: any,
): Store<AppState> => createStore(
  appReducers,
  initialState,
  composedEnhancers,
)

export default composeStore
