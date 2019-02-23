import { Dispatch, Action } from 'redux'

import { SampleServiceInterface } from 'app/services/sample/sample.service.types'

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
  fetchSampleCountriesThunk,
  fetchSampleCountryThunk,
} from './sample.actions.thunks'

/*
 * INCREMENT_SAMPLE_NUMBER
 */

export const incrementSampleNumber = (): IncrementSampleNumberAction => ({
  type: 'INCREMENT_SAMPLE_NUMBER',
})

/*
 * DECREMENT_SAMPLE_NUMBER
 */

export const decrementSampleNumber = (): DecrementSampleNumberAction => ({
  type: 'DECREMENT_SAMPLE_NUMBER',
})

/*
 * SET_SAMPLE_NUMBER
 */

export const setSampleNumber = (
  value: number,
): SetSampleNumberAction => ({
  type: 'SET_SAMPLE_NUMBER',
  payload: {
    value,
  },
})

/*
 * FETCH_SAMPLE_COUNTRIES
 */

export const fetchSampleCountries = (
  service: SampleServiceInterface,
) => (
  dispatch: Dispatch<Action>
): FetchSampleCountriesAction => {
  fetchSampleCountriesThunk(service)(dispatch)
  return {
    type: 'FETCH_SAMPLE_COUNTRIES',
  }
}

/*
 * FETCH_SAMPLE_COUNTRIES_SUCCESS
 */

export const fetchSampleCountriesSuccess = (
  countries: any[],
): FetchSampleCountriesSuccessAction => ({
  type: 'FETCH_SAMPLE_COUNTRIES_SUCCESS',
  payload: {
    countries,
  },
})

/*
 * FETCH_SAMPLE_COUNTRIES_ERROR
 */

export const fetchSampleCountriesError = (
  error: any,
): FetchSampleCountriesErrorAction => ({
  type: 'FETCH_SAMPLE_COUNTRIES_ERROR',
  payload: {
    error,
  },
})

/*
 * FETCH_SAMPLE_COUNTRY
 */

export const fetchSampleCountry = (
  code: string,
  service: SampleServiceInterface,
) => (
  dispatch: Dispatch<Action>
): FetchSampleCountryAction => {
  fetchSampleCountryThunk(code, service)(dispatch)
  return {
    type: 'FETCH_SAMPLE_COUNTRY',
    payload: {
      code,
    }
  }
}

/*
 * FETCH_SAMPLE_COUNTRY_SUCCESS
 */

export const fetchSampleCountrySuccess = (
  country: any,
): FetchSampleCountrySuccessAction => ({
  type: 'FETCH_SAMPLE_COUNTRY_SUCCESS',
  payload: {
    country,
  },
})

/*
 * FETCH_SAMPLE_COUNTRY_ERROR
 */

export const fetchSampleCountryError = (
  error: any,
): FetchSampleCountryErrorAction => ({
  type: 'FETCH_SAMPLE_COUNTRY_ERROR',
  payload: {
    error,
  },
})

/*
 * default export
 */

export default {
  incrementSampleNumber,
  decrementSampleNumber,
  setSampleNumber,
  fetchSampleCountries,
  fetchSampleCountriesSuccess,
  fetchSampleCountriesError,
  fetchSampleCountry,
  fetchSampleCountrySuccess,
  fetchSampleCountryError,
}
