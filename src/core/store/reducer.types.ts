import { Reducer, AnyAction } from 'redux'
import { AppState } from './state.types'

export type AppReducer = Reducer<AppState, AnyAction>

export interface AppReducers {
  [key: string]: AppReducer,
}

export type CombineAllReducers = (
  reducers: AppReducers,
) => AppReducer
