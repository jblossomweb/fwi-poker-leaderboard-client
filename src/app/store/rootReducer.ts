import extend from 'lodash/extend'
import { combineAllReducers } from 'core/store/reducer.utils'
import { AppReducers } from 'core/store/reducer.types'

// import your reducers here.
import sampleReducers from './sample/sample.reducers'

export const appReducers: AppReducers = extend({},
  // register your reducers here.
  sampleReducers,
)

export default combineAllReducers(appReducers)
