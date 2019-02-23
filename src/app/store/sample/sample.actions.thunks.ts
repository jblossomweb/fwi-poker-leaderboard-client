import { Dispatch, Action } from 'redux'

import {
  SampleServiceInterface,
} from 'app/services/sample/sample.service.types'

import {
  fetchSampleCountriesSuccess,
  fetchSampleCountriesError,
  fetchSampleCountrySuccess,
  fetchSampleCountryError,
} from './sample.actions'

/*
 * FETCH_SAMPLE_COUNTRIES
 */

 export const fetchSampleCountriesThunk = (
  service: SampleServiceInterface,
) => (
  dispatch: Dispatch<Action>,
): Promise<any> => service
  .getAllSampleCountries()
  .then(countries => dispatch(
    fetchSampleCountriesSuccess(countries)
  ))
  .catch(error => dispatch(
    fetchSampleCountriesError({
      name: error.name,
      message: error.message,
    })
  ))

/*
 * FETCH_SAMPLE_COUNTRY
 */

export const fetchSampleCountryThunk = (
  code: string,
  service: SampleServiceInterface,
) => (
  dispatch: Dispatch<Action>,
): Promise<any> => service
  .getSampleCountryByCode(code)
  .then(country => dispatch(
    fetchSampleCountrySuccess(country)
  ))
  .catch(error => dispatch(
    fetchSampleCountryError({
      name: error.name,
      message: error.message,
    })
  ))
