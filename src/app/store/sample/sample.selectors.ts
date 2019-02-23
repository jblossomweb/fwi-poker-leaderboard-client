import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { AppState } from 'core/store/state.types'

import paths from './sample.paths'

/*
 * getSampleNumber
 */

const getSampleNumberSelector = (
  state: AppState,
): number => state.get('app').getIn(
  paths.number(),
  0,
)

export const getSampleNumber = createSelector([
  getSampleNumberSelector,
], (value) => value)

/*
 * getSampleThunking
 */

const getSampleThunkingSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.thunking(),
  false,
)

export const getSampleThunking = createSelector([
  getSampleThunkingSelector,
], (isThunking) => isThunking)

/*
 * getSampleCountries
 */

const getSampleCountriesSelector = (
  state: AppState,
): Immutable.Seq<any, any> => state.get('app').getIn(
  paths.countries(),
  Immutable.Seq(),
)

export const getSampleCountries = createSelector([
  getSampleCountriesSelector,
], (countries) => countries)

/*
 * getSampleCountry
 */

const getSampleCountrySelector = (
  state: AppState,
): Immutable.Map<any, any> => state.get('app').getIn(
  paths.country(),
  Immutable.Map(),
)

export const getSampleCountry = createSelector([
  getSampleCountrySelector,
], (country) => country)

/*
 * getSampleError
 */

const getSampleErrorSelector = (
  state: AppState,
): Immutable.Map<any, any> => state.get('app').getIn(
  paths.error(),
  Immutable.Map(),
)

export const getSampleError = createSelector([
  getSampleErrorSelector,
], (error) => error)

/*
 * default export
 */

export default {
  getSampleNumber,
  getSampleThunking,
  getSampleCountries,
  getSampleCountry,
  getSampleError,
}
