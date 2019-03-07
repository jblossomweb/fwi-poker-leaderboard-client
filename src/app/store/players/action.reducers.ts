import Immutable, { fromJS } from 'immutable'
import mapKeys from 'lodash/mapKeys'
import { AppState } from 'core/store/state.types'
import { AppReducer } from 'core/store/reducer.types'

import {
  FetchPlayersAction,
  FetchPlayersSuccessAction,
  FetchPlayersErrorAction,
  EditPlayerAction,
  EditPlayerFieldAction,
  CancelEditPlayerAction,
  SaveEditedPlayerAction,
  SaveEditedPlayerSuccessAction,
  SaveEditedPlayerErrorAction,
  AddPlayerAction,
  CancelAddPlayerAction,
  SaveAddedPlayerAction,
  SaveAddedPlayerSuccessAction,
  SaveAddedPlayerErrorAction,
  DeletePlayerAction,
  DeletePlayerSuccessAction,
  DeletePlayerErrorAction,
} from './action.types'

import paths from './paths'

/*
 * FETCH_PLAYERS
 */

const fetchPlayers: AppReducer = ((
  state: AppState,
  _action: FetchPlayersAction,
): AppState => {
  return state
    .setIn(
      paths.fetchingPlayers(),
      true,
    )
}) as AppReducer

/*
 * FETCH_PLAYERS_SUCCESS
 */

const fetchPlayersSuccess = ((
  appState: AppState,
  action: FetchPlayersSuccessAction,
): AppState => {
  const { players } = action.payload
  const playersObject = mapKeys(players, player => player.id)
  return appState
    .setIn(
      paths.players(),
      Immutable.Map(fromJS(playersObject)),
    )
    .deleteIn(
      paths.fetchPlayersError(),
    )
    .setIn(
      paths.fetchingPlayers(),
      false,
    )
}) as AppReducer

/*
 * FETCH_PLAYERS_ERROR
 */

const fetchPlayersError = ((
  appState: AppState,
  action: FetchPlayersErrorAction,
): AppState => {
  const { error } = action.payload
  return appState
    .setIn(
      paths.fetchPlayersError(),
      Immutable.Map(fromJS(error)),
    )
    .setIn(
      paths.fetchingPlayers(),
      false,
    )
}) as AppReducer

/*
 * EDIT_PLAYER
 */

const editPlayer: AppReducer = ((
  state: AppState,
  action: EditPlayerAction,
): AppState => {
  const { id } = action.payload
  return state
    .setIn(
      paths.playerEdit(id),
      Immutable.Map(),
    )
    .setIn(
      paths.editingPlayerId(),
      id,
    )
}) as AppReducer

/*
 * EDIT_PLAYER_FIELD
 */

const editPlayerField: AppReducer = ((
  state: AppState,
  action: EditPlayerFieldAction,
): AppState => {
  const { id, field, value } = action.payload
  return state
    .setIn(
      paths.playerEditField(id, field),
      value,
    )
}) as AppReducer

/*
 * CANCEL_EDIT_PLAYER
 */

const cancelEditPlayer: AppReducer = ((
  state: AppState,
  action: CancelEditPlayerAction,
): AppState => {
  const { id } = action.payload
  return state
    .deleteIn(
      paths.playerEdit(id),
    )
    .deleteIn(
      paths.editingPlayerId(),
    )
}) as AppReducer

/*
 * SAVE_EDITED_PLAYER
 */

const saveEditedPlayer: AppReducer = ((
  state: AppState,
  _action: SaveEditedPlayerAction,
): AppState => {
  return state
    .setIn(
      paths.savingEditedPlayer(),
      true,
    )
}) as AppReducer

/*
 * SAVE_EDITED_PLAYER_SUCCESS
 */

const saveEditedPlayerSuccess = ((
  appState: AppState,
  action: SaveEditedPlayerSuccessAction,
): AppState => {
  const { player } = action.payload
  return appState
    .setIn(
      paths.player(player.id),
      Immutable.Map(fromJS(player)),
    )
    .deleteIn(
      paths.saveEditedPlayerError(),
    )
    .setIn(
      paths.savingEditedPlayer(),
      false,
    )
    .deleteIn(
      paths.editingPlayerId(),
    )
}) as AppReducer

/*
 * SAVE_EDITED_PLAYER_ERROR
 */

const saveEditedPlayerError = ((
  appState: AppState,
  action: SaveEditedPlayerErrorAction,
): AppState => {
  const { error } = action.payload
  return appState
    .setIn(
      paths.saveEditedPlayerError(),
      Immutable.Map(fromJS(error)),
    )
    .setIn(
      paths.savingEditedPlayer(),
      false,
    )
}) as AppReducer

/*
 * ADD_PLAYER
 */

const addPlayer: AppReducer = ((
  state: AppState,
  _action: AddPlayerAction,
): AppState => {
  return state
    .setIn(
      paths.addingPlayer(),
      true,
    )
}) as AppReducer

/*
 * CANCEL_ADD_PLAYER
 */

const cancelAddPlayer: AppReducer = ((
  state: AppState,
  _action: CancelAddPlayerAction,
): AppState => {
  return state
    .setIn(
      paths.addingPlayer(),
      false,
    )
}) as AppReducer

/*
 * SAVE_ADDED_PLAYER
 */

const saveAddedPlayer: AppReducer = ((
  state: AppState,
  _action: SaveAddedPlayerAction,
): AppState => {
  return state
    .setIn(
      paths.savingAddedPlayer(),
      true,
    )
}) as AppReducer

/*
 * SAVE_ADDED_PLAYER_SUCCESS
 */

const saveAddedPlayerSuccess = ((
  appState: AppState,
  action: SaveAddedPlayerSuccessAction,
): AppState => {
  const { player } = action.payload
  return appState
    .setIn(
      paths.player(player.id),
      Immutable.Map(fromJS(player)),
    )
    .deleteIn(
      paths.saveAddedPlayerError(),
    )
    .setIn(
      paths.savingAddedPlayer(),
      false,
    )
    .setIn(
      paths.addingPlayer(),
      false,
    )
}) as AppReducer

/*
 * SAVE_ADDED_PLAYER_ERROR
 */

const saveAddedPlayerError = ((
  appState: AppState,
  action: SaveAddedPlayerErrorAction,
): AppState => {
  const { error } = action.payload
  return appState
    .setIn(
      paths.saveAddedPlayerError(),
      Immutable.Map(fromJS(error)),
    )
    .setIn(
      paths.savingAddedPlayer(),
      false,
    )
}) as AppReducer

/*
 * DELETE_PLAYER
 */

const deletePlayer: AppReducer = ((
  state: AppState,
  action: DeletePlayerAction,
): AppState => {
  return state
    .setIn(
      paths.deletingPlayer(),
      action.payload.id,
    )
}) as AppReducer

/*
 * DELETE_PLAYER_SUCCESS
 */

const deletePlayerSuccess = ((
  appState: AppState,
  action: DeletePlayerSuccessAction,
): AppState => {
  const { player } = action.payload.response
  return appState
    .deleteIn(
      paths.player(player.id),
    )
    .deleteIn(
      paths.deletePlayerError(),
    )
    .deleteIn(
      paths.deletingPlayer(),
    )
}) as AppReducer

/*
 * DELETE_PLAYER_ERROR
 */

const deletePlayerError = ((
  appState: AppState,
  action: DeletePlayerErrorAction,
): AppState => {
  const { error } = action.payload
  return appState
    .setIn(
      paths.deletePlayerError(),
      Immutable.Map(fromJS(error)),
    )
    .deleteIn(
      paths.deletingPlayer(),
    )
}) as AppReducer

export default {
  'FETCH_PLAYERS': fetchPlayers,
  'FETCH_PLAYERS_SUCCESS': fetchPlayersSuccess,
  'FETCH_PLAYERS_ERROR': fetchPlayersError,
  'EDIT_PLAYER': editPlayer,
  'EDIT_PLAYER_FIELD': editPlayerField,
  'CANCEL_EDIT_PLAYER': cancelEditPlayer,
  'SAVE_EDITED_PLAYER': saveEditedPlayer,
  'SAVE_EDITED_PLAYER_SUCCESS': saveEditedPlayerSuccess,
  'SAVE_EDITED_PLAYER_ERROR': saveEditedPlayerError,
  'ADD_PLAYER': addPlayer,
  'CANCEL_ADD_PLAYER': cancelAddPlayer,
  'SAVE_ADDED_PLAYER': saveAddedPlayer,
  'SAVE_ADDED_PLAYER_SUCCESS': saveAddedPlayerSuccess,
  'SAVE_ADDED_PLAYER_ERROR': saveAddedPlayerError,
  'DELETE_PLAYER': deletePlayer,
  'DELETE_PLAYER_SUCCESS': deletePlayerSuccess,
  'DELETE_PLAYER_ERROR': deletePlayerError,
}
