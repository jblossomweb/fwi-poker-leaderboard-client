import Immutable, { fromJS } from 'immutable'
import { AppState } from './state.types'

export const getInitialState: () => AppState = () => Immutable.Map(fromJS({
  app: {}
}))
