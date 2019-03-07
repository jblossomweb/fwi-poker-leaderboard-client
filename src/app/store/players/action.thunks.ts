import { Dispatch, Action } from 'redux'

import { PlayersServiceInterface } from 'app/services/players/types'
import { Player } from 'app/store/players/types'

/*
 * FETCH_PLAYERS
 */

 export const fetchPlayersThunk = (
  service: PlayersServiceInterface,
  fetchPlayersSuccess: (players: Player[]) => any,
  fetchPlayersError: (error: Error) => any,
) => (
  dispatch: Dispatch<Action>,
): Promise<any> => service
  .getPlayers()
  .then(players => dispatch(
    fetchPlayersSuccess(players)
  ))
  .catch(error => dispatch(
    fetchPlayersError({
      name: error.name,
      message: error.message,
    })
  ))

/*
 * SAVE_EDITED_PLAYER
 */

export const saveEditedPlayerThunk = (
  id: string,
  update: any,
  service: PlayersServiceInterface,
  saveEditedPlayerSuccess: (player: Player) => any,
  saveEditedPlayerError: (error: Error) => any,
) => (
  dispatch: Dispatch<Action>,
): Promise<any> => service
  .updatePlayer(id, update)
  .then(player => dispatch(
    saveEditedPlayerSuccess(player)
  ))
  .catch(error => dispatch(
    saveEditedPlayerError({
      name: error.name,
      message: error.message,
    })
  ))

/*
 * SAVE_ADDED_PLAYER
 */

export const saveAddedPlayerThunk = (
  player: any,
  service: PlayersServiceInterface,
  saveAddedPlayerSuccess: (player: Player) => any,
  saveAddedPlayerError: (error: Error) => any,
) => (
  dispatch: Dispatch<Action>,
): Promise<any> => service
  .createPlayer(player)
  .then(created => dispatch(
    saveAddedPlayerSuccess(created)
  ))
  .catch(error => dispatch(
    saveAddedPlayerError({
      name: error.name,
      message: error.message,
    })
  ))

/*
 * DELETE_PLAYER
 */

export const deletePlayerThunk = (
  id: string,
  service: PlayersServiceInterface,
  deletePlayerSuccess: (response: { message: string, player: Player}) => any,
  deletePlayerError: (error: Error) => any,
) => (
  dispatch: Dispatch<Action>,
): Promise<any> => service
  .deletePlayer(id)
  .then(response => dispatch(
    deletePlayerSuccess(response)
  ))
  .catch(error => dispatch(
    deletePlayerError({
      name: error.name,
      message: error.message,
    })
  ))
