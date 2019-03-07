import { createSelector } from 'reselect'
import { AppState } from 'core/store/state.types'
import paths from './paths'

/*
 * getFetchingPlayers
 */

const getCurrentRouteSelector = (
  state: AppState,
): string => state.getIn(
  paths.currentRoute(),
  '/home',
)

export const getCurrentRoute = createSelector([
  getCurrentRouteSelector,
], (route: string) => route)

export default {
  getCurrentRoute,
}
