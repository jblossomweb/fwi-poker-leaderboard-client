import windowOrGlobal from 'window-or-global'
import { StoreEnhancer } from 'redux'

import config from '../config'

export const getEnhancers = () => {
  const enhancers: StoreEnhancer[] = []
  if (config.environment !== 'production' || config.reduxDevToolsInProduction) {
    const devToolsExtension: () => StoreEnhancer = windowOrGlobal.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }
  return enhancers
}
