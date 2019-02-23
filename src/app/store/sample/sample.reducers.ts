import Immutable, { fromJS } from 'immutable'
import { AppState } from 'core/store/state.types'
import { AppReducer } from 'core/store/reducer.types'

import samplePaths from './sample.paths'
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

/*
 * INCREMENT_SAMPLE_NUMBER
 */

const incrementSampleNumber = ((
  appState: AppState,
  _action: IncrementSampleNumberAction,
): AppState => {
  const path = samplePaths.number()
  let n: number = appState.getIn(path, 0)
  n++
  return appState.setIn(path, n)
}) as AppReducer

/*
 * DECREMENT_SAMPLE_NUMBER
 */

const decrementSampleNumber = ((
  appState: AppState,
  _action: DecrementSampleNumberAction,
): AppState => {
  const path = samplePaths.number()
  let n: number = appState.getIn(path, 0)
  n--
  return appState.setIn(path, n)
}) as AppReducer

/*
 * SET_SAMPLE_NUMBER
 */

const setSampleNumber = ((
  appState: AppState,
  action: SetSampleNumberAction,
): AppState => {
  const { value } = action.payload
  const path = samplePaths.number()
  return appState.setIn(path, value)
}) as AppReducer

/*
 * FETCH_SAMPLE_COUNTRIES
 */

const fetchSampleCountries = ((
  appState: AppState,
  _action: FetchSampleCountriesAction,
): AppState => {
  const path = samplePaths.thunking()
  return appState.setIn(path, true)
}) as AppReducer

/*
 * FETCH_SAMPLE_COUNTRIES_SUCCESS
 */

const fetchSampleCountriesSuccess = ((
  appState: AppState,
  action: FetchSampleCountriesSuccessAction,
): AppState => {
  const { countries } = action.payload
  const countriesPath = samplePaths.countries()
  const thunkingPath = samplePaths.thunking()
  const errorPath = samplePaths.error()
  return appState
    .setIn(countriesPath, Immutable.Seq(fromJS(countries)))
    .setIn(errorPath, null)
    .setIn(thunkingPath, false)
}) as AppReducer

/*
 * FETCH_SAMPLE_COUNTRIES_ERROR
 */

const fetchSampleCountriesError = ((
  appState: AppState,
  action: FetchSampleCountriesErrorAction,
): AppState => {
  const { error } = action.payload
  const errorPath = samplePaths.error()
  const thunkingPath = samplePaths.thunking()
  return appState
    .setIn(errorPath, Immutable.Map(fromJS(error)))
    .setIn(thunkingPath, false)
}) as AppReducer

/*
 * FETCH_SAMPLE_COUNTRY
 */

const fetchSampleCountry = ((
  appState: AppState,
  _action: FetchSampleCountryAction,
): AppState => {
  const path = samplePaths.thunking()
  return appState.setIn(path, true)
}) as AppReducer

/*
 * FETCH_SAMPLE_COUNTRY_SUCCESS
 */

const fetchSampleCountrySuccess = ((
  appState: AppState,
  action: FetchSampleCountrySuccessAction,
): AppState => {
  const { country } = action.payload
  const countryPath = samplePaths.country()
  const thunkingPath = samplePaths.thunking()
  const errorPath = samplePaths.error()
  return appState
    .setIn(countryPath, Immutable.Map(fromJS(country)))
    .setIn(errorPath, null)
    .setIn(thunkingPath, false)
}) as AppReducer

/*
 * FETCH_SAMPLE_COUNTRY_ERROR
 */

const fetchSampleCountryError = ((
  appState: AppState,
  action: FetchSampleCountryErrorAction,
): AppState => {
  const { error } = action.payload
  const errorPath = samplePaths.error()
  const thunkingPath = samplePaths.thunking()
  return appState
    .setIn(errorPath, Immutable.Map(fromJS(error)))
    .setIn(thunkingPath, false)
}) as AppReducer

export default {
  'INCREMENT_SAMPLE_NUMBER': incrementSampleNumber,
  'DECREMENT_SAMPLE_NUMBER': decrementSampleNumber,
  'SET_SAMPLE_NUMBER': setSampleNumber,

  'FETCH_SAMPLE_COUNTRIES': fetchSampleCountries,
  'FETCH_SAMPLE_COUNTRIES_SUCCESS': fetchSampleCountriesSuccess,
  'FETCH_SAMPLE_COUNTRIES_ERROR': fetchSampleCountriesError,

  'FETCH_SAMPLE_COUNTRY': fetchSampleCountry,
  'FETCH_SAMPLE_COUNTRY_SUCCESS': fetchSampleCountrySuccess,
  'FETCH_SAMPLE_COUNTRY_ERROR': fetchSampleCountryError,
}
