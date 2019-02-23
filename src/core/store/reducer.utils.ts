import { AnyAction } from 'redux'
import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'

import { AppReducer, AppReducers } from './reducer.types'
import { AppState } from './state.types'

import { getInitialState } from './state.utils'
import { getHistory } from './history.utils'

export const combineAllReducers = (
  appReducers: AppReducers,
) => combineReducers({
  router: connectRouter(getHistory()),
  app: ((
    appState: AppState = getInitialState(),
    action: AnyAction,
  ): AppState => {
    const reducer: AppReducer = appReducers[action.type]
    return reducer ? reducer(appState, action) : appState
  }) as AppReducer,
})
