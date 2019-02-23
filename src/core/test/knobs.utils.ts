import extend from 'lodash/extend'
import mapValues from 'lodash/mapValues'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

import { KnobsInterface } from './knobs.types'

export const mockKnobs: KnobsInterface = {
  text: (_name: string, val: string) => val,
  number: (_name: string, val: number) => val,
  boolean: (_name: string, val: boolean) => val,
  object: (_name: string, val: object) => val,
}

export const injectKnobs = (
  knobs: KnobsInterface,
  knobValues: any,
  baseProps: any,
) => extend(
  {},
  baseProps,
  mapValues(
    knobValues,
    (value, key) => {
      switch (true) {
        case isBoolean(baseProps[key]):
          return knobs.boolean(key, value)
        case isNumber(baseProps[key]):
          return knobs.number(key, value)
        case isObject(baseProps[key]):
        case isArray(baseProps[key]):
          return knobs.object(key, value)
        case isString(baseProps[key]):
        default:
          return knobs.text(key, value)
      }
    },
  )
)
