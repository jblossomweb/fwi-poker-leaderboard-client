import { Dispatch, Action } from 'redux'
import { Primitive } from 'core/store/state.types'
import { Player } from 'app/store/players/types'
import { PlayersServiceInterface } from 'app/services/players/types'

import {
  FetchPlayersAction,
  FetchPlayersSuccessAction,
  FetchPlayersErrorAction,
  EditPlayerAction,
  CancelEditPlayerAction,
  EditPlayerFieldAction,
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

import {
  fetchPlayersThunk,
  saveEditedPlayerThunk,
  saveAddedPlayerThunk,
  deletePlayerThunk,
} from './action.thunks'

/*
 * FETCH_PLAYERS
 */

export const fetchPlayers = (
  service: PlayersServiceInterface,
) => (
  dispatch: Dispatch<Action>
): FetchPlayersAction => {
  fetchPlayersThunk(
    service,
    fetchPlayersSuccess,
    fetchPlayersError,
  )(dispatch)
  return {
    type: 'FETCH_PLAYERS',
  }
}

/*
 * FETCH_PLAYERS_SUCCESS
 */

export const fetchPlayersSuccess = (
  players: any[],
): FetchPlayersSuccessAction => ({
  type: 'FETCH_PLAYERS_SUCCESS',
  payload: {
    players,
  },
})

/*
 * FETCH_PLAYERS_ERROR
 */

export const fetchPlayersError = (
  error: any,
): FetchPlayersErrorAction => ({
  type: 'FETCH_PLAYERS_ERROR',
  payload: {
    error,
  },
})

/*
 * EDIT_PLAYER
 */

export const editPlayer = (
  id: Player['id'],
): EditPlayerAction => ({
  type: 'EDIT_PLAYER',
  payload: {
    id,
  },
})

/*
 * CANCEL_EDIT_PLAYER
 */

export const cancelEditPlayer = (
  id: Player['id'],
): CancelEditPlayerAction => ({
  type: 'CANCEL_EDIT_PLAYER',
  payload: {
    id,
  },
})

/*
 * EDIT_PLAYER_FIELD
 */

export const editPlayerField = (
  id: Player['id'],
  field: string,
  value: Primitive,
): EditPlayerFieldAction => ({
  type: 'EDIT_PLAYER_FIELD',
  payload: {
    id,
    field,
    value,
  },
})

/*
 * SAVE_EDITED_PLAYER
 */

export const saveEditedPlayer = (
  id: Player['id'],
  update: Partial<Player>,
  service: PlayersServiceInterface,
) => (
  dispatch: Dispatch<Action>,
): SaveEditedPlayerAction => {
  saveEditedPlayerThunk(
    id,
    update,
    service,
    saveEditedPlayerSuccess,
    saveEditedPlayerError,
  )(dispatch)
  return {
    type: 'SAVE_EDITED_PLAYER',
    payload: {
      id,
      update,
    }
  }
}

/*
 * SAVE_EDITED_PLAYER_SUCCESS
 */

export const saveEditedPlayerSuccess = (
  player: Player,
): SaveEditedPlayerSuccessAction => ({
  type: 'SAVE_EDITED_PLAYER_SUCCESS',
  payload: {
    player,
  },
})

/*
 * SAVE_EDITED_PLAYER_ERROR
 */

export const saveEditedPlayerError = (
  error: any,
): SaveEditedPlayerErrorAction => ({
  type: 'SAVE_EDITED_PLAYER_ERROR',
  payload: {
    error,
  },
})

/*
 * ADD_PLAYER
 */

export const addPlayer = (): AddPlayerAction => ({
  type: 'ADD_PLAYER',
})

/*
 * CANCEL_ADD_PLAYER
 */

export const cancelAddPlayer = (): CancelAddPlayerAction => ({
  type: 'CANCEL_ADD_PLAYER',
})

/*
 * SAVE_ADDED_PLAYER
 */

export const saveAddedPlayer = (
  player: Partial<Player>,
  service: PlayersServiceInterface,
) => (
  dispatch: Dispatch<Action>,
): SaveAddedPlayerAction => {
  saveAddedPlayerThunk(
    player,
    service,
    saveAddedPlayerSuccess,
    saveAddedPlayerError,
  )(dispatch)
  return {
    type: 'SAVE_ADDED_PLAYER',
    payload: {
      player,
    }
  }
}

/*
 * SAVE_ADDED_PLAYER_SUCCESS
 */

export const saveAddedPlayerSuccess = (
  player: Player,
): SaveAddedPlayerSuccessAction => ({
  type: 'SAVE_ADDED_PLAYER_SUCCESS',
  payload: {
    player,
  },
})

/*
 * SAVE_ADDED_PLAYER_ERROR
 */

export const saveAddedPlayerError = (
  error: any,
): SaveAddedPlayerErrorAction => ({
  type: 'SAVE_ADDED_PLAYER_ERROR',
  payload: {
    error,
  },
})

/*
 * DELETE_PLAYER
 */

export const deletePlayer = (
  id: Player['id'],
  service: PlayersServiceInterface,
) => (
  dispatch: Dispatch<Action>,
): DeletePlayerAction => {
  deletePlayerThunk(
    id,
    service,
    deletePlayerSuccess,
    deletePlayerError,
  )(dispatch)
  return {
    type: 'DELETE_PLAYER',
    payload: {
      id,
    }
  }
}

/*
 * DELETE_PLAYER_SUCCESS
 */

export const deletePlayerSuccess = (
  response: {
    message: string,
    player: Player,
  },
): DeletePlayerSuccessAction => ({
  type: 'DELETE_PLAYER_SUCCESS',
  payload: {
    response,
  },
})

/*
 * DELETE_PLAYER_ERROR
 */

export const deletePlayerError = (
  error: any,
): DeletePlayerErrorAction => ({
  type: 'DELETE_PLAYER_ERROR',
  payload: {
    error,
  },
})

/*
 * default export
 */

export default {
  fetchPlayers,
  fetchPlayersSuccess,
  fetchPlayersError,
  editPlayer,
  cancelEditPlayer,
  editPlayerField,
  saveEditedPlayer,
  saveEditedPlayerSuccess,
  saveEditedPlayerError,
  addPlayer,
  cancelAddPlayer,
  saveAddedPlayer,
  saveAddedPlayerSuccess,
  saveAddedPlayerError,
  deletePlayer,
  deletePlayerSuccess,
  deletePlayerError,
}
