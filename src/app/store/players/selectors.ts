import Immutable from 'immutable'
import { createSelector } from 'reselect'
import mapValues from 'lodash/mapValues'

import { AppState } from 'core/store/state.types'

import paths from './paths'
import { Player, ImmutablePlayers } from './types'

/*
 * getFetchingPlayers
 */

const getFetchingPlayersSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.fetchingPlayers(),
  false,
)

export const getFetchingPlayers = createSelector([
  getFetchingPlayersSelector,
], (fetching: boolean) => fetching)

/*
 * getFetchPlayersError
 */

const getFetchPlayersErrorSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.fetchPlayersError(),
  null,
)

export const getFetchPlayersError = createSelector([
  getFetchPlayersErrorSelector,
], (error: any) => error)

/*
 * getPlayers
 */

const getPlayersSelector = (
  state: AppState,
): ImmutablePlayers => state.get('app').getIn(
  paths.players(),
  null,
)

export const getPlayers = createSelector([
  getPlayersSelector,
], (
  players: ImmutablePlayers,
) => players ? players.valueSeq() : null)

/*
 * getEditingPlayerId
 */

const getEditingPlayerIdSelector = (
  state: AppState,
): Player['id'] | null => state.get('app').getIn(
  paths.editingPlayerId(),
  null,
)

export const getEditingPlayerId = createSelector([
  getEditingPlayerIdSelector,
], (
  playerId: Player['id'] | null,
) => playerId)

/*
 * getPlayerEdits
 */

const getPlayerEditsSelector = (
  state: AppState,
): ImmutablePlayers => state.get('app').getIn(
  paths.playerEdits(),
  Immutable.Map(),
)

export const getPlayerEdits = createSelector([
  getPlayerEditsSelector,
], (
  edits: ImmutablePlayers,
) => edits)

/*
 * getSavingEditedPlayer
 */

const getSavingEditedPlayerSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.savingEditedPlayer(),
  false,
)

export const getSavingEditedPlayer = createSelector([
  getSavingEditedPlayerSelector,
], (saving: boolean) => saving)

/*
 * getSaveEditedPlayerError
 */

const getSaveEditedPlayerErrorSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.saveEditedPlayerError(),
  null,
)

export const getSaveEditedPlayerError = createSelector([
  getSaveEditedPlayerErrorSelector,
], (error: any) => error)

/*
 * getAddingPlayer
 */

const getAddingPlayerSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.addingPlayer(),
  false,
)

export const getAddingPlayer = createSelector([
  getAddingPlayerSelector,
], (isAdding: boolean) => isAdding)

/*
 * getSavingAddedPlayer
 */

const getSavingAddedPlayerSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.savingAddedPlayer(),
  false,
)

export const getSavingAddedPlayer = createSelector([
  getSavingAddedPlayerSelector,
], (isSaving: boolean) => isSaving)

/*
 * getSaveAddedPlayerError
 */

const getSaveAddedPlayerErrorSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.saveAddedPlayerError(),
  false,
)

export const getSaveAddedPlayerError = createSelector([
  getSaveAddedPlayerErrorSelector,
], (error: any) => error)

/*
 * getDeletingPlayer
 */

const getDeletingPlayerSelector = (
  state: AppState,
): Player['id'] => state.get('app').getIn(
  paths.deletingPlayer(),
  null,
)

export const getDeletingPlayer = createSelector([
  getDeletingPlayerSelector,
], (deletingPlayer: Player['id']) => deletingPlayer)

/*
 * getDeletePlayerError
 */

const getDeletePlayerErrorSelector = (
  state: AppState,
): boolean => state.get('app').getIn(
  paths.deletePlayerError(),
  false,
)

export const getDeletePlayerError = createSelector([
  getDeletePlayerErrorSelector,
], (error: any) => error)

/*
 * getTopPlayersBarData
 */

export const getTopPlayersBarData = createSelector([
  getPlayers,
], (players => players ?
  players
    .sortBy(player => player.get('winnings'))
    .reverse()
    .slice(0, 3)
  : null
))

/*
 * getTotalWinnings
 */

export const getTotalWinnings = createSelector([
  getPlayers,
], (players => {
  if (!players) {
    return null
  }
  return players
    .reduce(((
      total: number,
      player: Immutable.Map<string, any>,
    ) => total + player.get('winnings')), 0)
}))

/*
 * getWinningsByCountry
 */

export const getWinningsByCountry = createSelector([
  getPlayers,
], (
  players => players && players.reduce(
    (
      accumulator: any,
      player: Immutable.Map<string, any>,
      i: number,
    ) => {
      const country = player.get('country', null)
      const winnings = player.get('winnings', 0)
      if (country && winnings) {
        if (accumulator[country]) {
          accumulator[country] += winnings
        } else {
          accumulator[country] = winnings
        }
      }
      return accumulator
    },
    {},
  )
))

/*
 * getCountryWinningsPieData
 */

export const getCountryWinningsPieData = createSelector([
  getWinningsByCountry,
], data => Object.values(mapValues(data, (
  winnings: number,
  country: string,
) => ({
  country,
  winnings,
}))))

/*
 * default export
 */

export default {
  getFetchingPlayers,
  getFetchPlayersError,
  getPlayers,
  getEditingPlayerId,
  getPlayerEdits,
  getSavingEditedPlayer,
  getSaveEditedPlayerError,
  getAddingPlayer,
  getSavingAddedPlayer,
  getSaveAddedPlayerError,
  getDeletingPlayer,
  getDeletePlayerError,
  getTopPlayersBarData,
  getTotalWinnings,
  getWinningsByCountry,
  getCountryWinningsPieData,
}
