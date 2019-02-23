import { mockDispatch } from 'core/store/dispatch.mock.utils'
import { SampleService } from 'app/services/sample/sample.service'
import { mockUrl, mockRest } from 'app/services/sample/sample.service.test.mocks'
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

import {
  incrementSampleNumber,
  decrementSampleNumber,
  setSampleNumber,
  fetchSampleCountries,
  fetchSampleCountriesSuccess,
  fetchSampleCountriesError,
  fetchSampleCountry,
  fetchSampleCountrySuccess,
  fetchSampleCountryError,
} from './sample.actions'

const mockService = new SampleService(mockUrl, mockRest)

describe('store/sample/sample.actions', () => {
  describe('incrementSampleNumber', () => {
    const expectedAction: IncrementSampleNumberAction = {
      type: 'INCREMENT_SAMPLE_NUMBER',
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = incrementSampleNumber()
      expect(action.type).toEqual(expectedAction.type)
    })
  })
  describe('decrementSampleNumber', () => {
    const expectedAction: DecrementSampleNumberAction = {
      type: 'DECREMENT_SAMPLE_NUMBER',
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = decrementSampleNumber()
      expect(action.type).toEqual(expectedAction.type)
    })
  })
  describe('setSampleNumber', () => {
    const value: number = 7
    const expectedAction: SetSampleNumberAction = {
      type: 'SET_SAMPLE_NUMBER',
      payload: {
        value,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = setSampleNumber(value)
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      const action = setSampleNumber(value)
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('fetchSampleCountries', () => {
    const expectedAction: FetchSampleCountriesAction = {
      type: 'FETCH_SAMPLE_COUNTRIES',
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = fetchSampleCountries(mockService)(mockDispatch)
      expect(action.type).toEqual(expectedAction.type)
    })
  })
  describe('fetchSampleCountriesSuccess', () => {
    const expectedAction: FetchSampleCountriesSuccessAction = {
      type: 'FETCH_SAMPLE_COUNTRIES_SUCCESS',
      payload: {
        countries,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = fetchSampleCountriesSuccess(countries)
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      const action = fetchSampleCountriesSuccess(countries)
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('fetchSampleCountriesError', () => {
    const expectedAction: FetchSampleCountriesErrorAction = {
      type: 'FETCH_SAMPLE_COUNTRIES_ERROR',
      payload: {
        error,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = fetchSampleCountriesError(error)
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      const action = fetchSampleCountriesError(error)
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('fetchSampleCountry', () => {
    const expectedAction: FetchSampleCountryAction = {
      type: 'FETCH_SAMPLE_COUNTRY',
      payload: {
        code,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = fetchSampleCountry(code, mockService)(mockDispatch)
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      const action = fetchSampleCountry(code, mockService)(mockDispatch)
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('fetchSampleCountrySuccess', () => {
    const expectedAction: FetchSampleCountrySuccessAction = {
      type: 'FETCH_SAMPLE_COUNTRY_SUCCESS',
      payload: {
        country,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = fetchSampleCountrySuccess(country)
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      const action = fetchSampleCountrySuccess(country)
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('fetchSampleCountryError', () => {
    const expectedAction: FetchSampleCountryErrorAction = {
      type: 'FETCH_SAMPLE_COUNTRY_ERROR',
      payload: {
        error,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      const action = fetchSampleCountryError(error)
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      const action = fetchSampleCountryError(error)
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
})
