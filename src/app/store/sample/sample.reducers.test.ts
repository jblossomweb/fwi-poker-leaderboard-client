import Immutable, { fromJS } from 'immutable'
import { getInitialState } from 'core/store/state.utils'
import { AppReducer } from 'core/store/reducer.types'

import {
  countries,
  country,
  code,
  error,
} from 'app/store/sample/sample.test.mocks'

import {
  IncrementSampleNumberAction,
  DecrementSampleNumberAction,
  SetSampleNumberAction,
  FetchSampleCountriesAction,
  FetchSampleCountriesSuccessAction,
  FetchSampleCountriesErrorAction,
  FetchSampleCountryAction,
  FetchSampleCountrySuccessAction,
  FetchSampleCountryErrorAction,
} from './sample.actions.types'

import paths from './sample.paths'
import reducers from './sample.reducers'

describe('store/sample/sample.reducers', () => {

  describe('INCREMENT_SAMPLE_NUMBER', () => {
    const action: IncrementSampleNumberAction = {
      type: 'INCREMENT_SAMPLE_NUMBER'
    }
    const reducer: AppReducer = reducers[action.type]
    it('should increment the number in the store path', () => {
      const path = paths.number()
      const state = getInitialState().setIn(path, 1)
      expect(state.getIn(path)).toEqual(1)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(2)
    })
  })

  describe('DECREMENT_SAMPLE_NUMBER', () => {
    const action: DecrementSampleNumberAction = {
      type: 'DECREMENT_SAMPLE_NUMBER'
    }
    const reducer: AppReducer = reducers[action.type]
    it('should decrement the number in the store path', () => {
      const path = paths.number()
      const state = getInitialState().setIn(path, 2)
      expect(state.getIn(path)).toEqual(2)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(1)
    })
  })

  describe('SET_SAMPLE_NUMBER', () => {
    const action: SetSampleNumberAction = {
      type: 'SET_SAMPLE_NUMBER',
      payload: {
        value: 7,
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set number to payload value', () => {
      const path = paths.number()
      const state = getInitialState().setIn(path, 1)
      expect(state.getIn(path)).toEqual(1)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(action.payload.value)
    })
  })

  describe('FETCH_SAMPLE_COUNTRIES', () => {
    const action: FetchSampleCountriesAction = {
      type: 'FETCH_SAMPLE_COUNTRIES',
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set thunking to true', () => {
      const path = paths.thunking()
      const state = getInitialState().setIn(path, false)
      expect(state.getIn(path)).toEqual(false)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(true)
    })
  })

  describe('FETCH_SAMPLE_COUNTRIES_SUCCESS', () => {
    const action: FetchSampleCountriesSuccessAction = {
      type: 'FETCH_SAMPLE_COUNTRIES_SUCCESS',
      payload: {
        countries,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should set countries to an Immutable.Seq of action.payload.countries', () => {
      const path = paths.countries()
      const existing = Immutable.Seq(fromJS([]))
      const expected = Immutable.Seq(fromJS(countries))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set error to null', () => {
      const path = paths.error()
      const existing = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(null)
    })

    it('should set thunking to false', () => {
      const path = paths.thunking()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('FETCH_SAMPLE_COUNTRIES_ERROR', () => {
    const action: FetchSampleCountriesErrorAction = {
      type: 'FETCH_SAMPLE_COUNTRIES_ERROR',
      payload: {
        error,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should not mutate countries', () => {
      const path = paths.countries()
      const existing = Immutable.Seq(fromJS(countries))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(existing)
    })

    it('should set error to action.payload.error', () => {
      const path = paths.error()
      const expected = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, null)
      expect(state.getIn(path)).toEqual(null)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set thunking to false', () => {
      const path = paths.thunking()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('FETCH_SAMPLE_COUNTRY', () => {
    const action: FetchSampleCountryAction = {
      type: 'FETCH_SAMPLE_COUNTRY',
      payload: {
        code
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set thunking to true', () => {
      const path = paths.thunking()
      const state = getInitialState().setIn(path, false)
      expect(state.getIn(path)).toEqual(false)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(true)
    })
  })

  describe('FETCH_SAMPLE_COUNTRY_SUCCESS', () => {
    const action: FetchSampleCountrySuccessAction = {
      type: 'FETCH_SAMPLE_COUNTRY_SUCCESS',
      payload: {
        country,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should set country to an Immutable.Map of action.payload.country', () => {
      const path = paths.country()
      const expected = Immutable.Map(fromJS(country))
      const state = getInitialState().setIn(path, null)
      expect(state.getIn(path)).toEqual(null)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set error to null', () => {
      const path = paths.error()
      const existing = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(null)
    })

    it('should set thunking to false', () => {
      const path = paths.thunking()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('FETCH_SAMPLE_COUNTRY_ERROR', () => {
    const action: FetchSampleCountryErrorAction = {
      type: 'FETCH_SAMPLE_COUNTRY_ERROR',
      payload: {
        error,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should not mutate country', () => {
      const path = paths.country()
      const state = getInitialState().setIn(path, null)
      expect(state.getIn(path)).toEqual(null)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(null)
    })

    it('should set error to action.payload.error', () => {
      const path = paths.error()
      const expected = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, null)
      expect(state.getIn(path)).toEqual(null)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set thunking to false', () => {
      const path = paths.thunking()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })
})
