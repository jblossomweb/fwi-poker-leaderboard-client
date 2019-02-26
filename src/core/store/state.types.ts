import Immutable from 'immutable'

export type AppState = Immutable.Map<string, any>

export type Primitive = string | number | boolean

export interface PrimitiveInterface {
  [key: string]: Primitive,
}
