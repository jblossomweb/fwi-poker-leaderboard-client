import extend from 'lodash/extend'
import { combineAllReducers } from 'core/store/reducer.utils'
import { AppReducers } from 'core/store/reducer.types'

// import your reducers here.
import playerReducers from './players/action.reducers'

export const appReducers: AppReducers = extend({},
  // register your reducers here.
  playerReducers,
)

export default combineAllReducers(appReducers)
