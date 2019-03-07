import { Primitive } from 'core/store/state.types'
import { Player } from 'app/store/players/types'

/*
 * FETCH_PLAYERS
 */

export interface FetchPlayersAction {
  type: 'FETCH_PLAYERS',
}

/*
 * FETCH_PLAYERS_SUCCESS
 */

export interface FetchPlayersSuccessAction {
  type: 'FETCH_PLAYERS_SUCCESS',
  payload: {
    players: Player[],
  }
}

/*
 * FETCH_PLAYERS_ERROR
 */

export interface FetchPlayersErrorAction {
  type: 'FETCH_PLAYERS_ERROR',
  payload: {
    error: any,
  }
}

/*
 * EDIT_PLAYER
 */

export interface EditPlayerAction {
  type: 'EDIT_PLAYER',
  payload: {
    id: Player['id'],
  },
}

/*
 * CANCEL_EDIT_PLAYER
 */

export interface CancelEditPlayerAction {
  type: 'CANCEL_EDIT_PLAYER',
  payload: {
    id: Player['id'],
  },
}

/*
 * EDIT_PLAYER_FIELD
 */

export interface EditPlayerFieldAction {
  type: 'EDIT_PLAYER_FIELD',
  payload: {
    id: Player['id'],
    field: string,
    value: Primitive,
  },
}

/*
 * SAVE_EDITED_PLAYER
 */

export interface SaveEditedPlayerAction {
  type: 'SAVE_EDITED_PLAYER',
  payload: {
    id: string,
    update: Partial<Player>,
  }
}

/*
 * SAVE_EDITED_PLAYER_SUCCESS
 */

export interface SaveEditedPlayerSuccessAction {
  type: 'SAVE_EDITED_PLAYER_SUCCESS',
  payload: {
    player: Player,
  }
}

/*
 * SAVE_EDITED_PLAYER_ERROR
 */

export interface SaveEditedPlayerErrorAction {
  type: 'SAVE_EDITED_PLAYER_ERROR',
  payload: {
    error: any,
  }
}

/*
 * ADD_PLAYER
 */

export interface AddPlayerAction {
  type: 'ADD_PLAYER',
}

/*
 * CANCEL_ADD_PLAYER
 */

export interface CancelAddPlayerAction {
  type: 'CANCEL_ADD_PLAYER',
}

/*
 * SAVE_ADDED_PLAYER
 */

export interface SaveAddedPlayerAction {
  type: 'SAVE_ADDED_PLAYER',
  payload: {
    player: Partial<Player>,
  }
}

/*
 * SAVE_ADDED_PLAYER_SUCCESS
 */

export interface SaveAddedPlayerSuccessAction {
  type: 'SAVE_ADDED_PLAYER_SUCCESS',
  payload: {
    player: Player,
  }
}

/*
 * SAVE_ADDED_PLAYER_ERROR
 */

export interface SaveAddedPlayerErrorAction {
  type: 'SAVE_ADDED_PLAYER_ERROR',
  payload: {
    error: any,
  }
}

/*
 * DELETE_PLAYER
 */

export interface DeletePlayerAction {
  type: 'DELETE_PLAYER',
  payload: {
    id: Player['id'],
  }
}

/*
 * DELETE_PLAYER_SUCCESS
 */

export interface DeletePlayerSuccessAction {
  type: 'DELETE_PLAYER_SUCCESS',
  payload: {
    response: {
      message: string,
      player: Player,
    },
  }
}

/*
 * DELETE_PLAYER_ERROR
 */

export interface DeletePlayerErrorAction {
  type: 'DELETE_PLAYER_ERROR',
  payload: {
    error: any,
  }
}
