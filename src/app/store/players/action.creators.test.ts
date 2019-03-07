import { mockDispatch } from 'core/store/dispatch.mock.utils'
import { PlayersService } from 'app/services/players/service'
import { mockUrl, mockRest } from 'app/services/players/service.test.mocks'
import { Player } from 'app/store/players/types'

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
} from './action.creators'

import * as thunks from './action.thunks'

const mockService = new PlayersService(mockUrl, mockRest)

const error: Error = {
  name: 'Sample Error',
  message: 'sample error message.'
}

const spies = {
  fetchPlayersThunk: jest.spyOn(thunks, 'fetchPlayersThunk'),
  saveEditedPlayerThunk: jest.spyOn(thunks, 'saveEditedPlayerThunk'),
  saveAddedPlayerThunk: jest.spyOn(thunks, 'saveAddedPlayerThunk'),
  deletePlayerThunk: jest.spyOn(thunks, 'deletePlayerThunk'),
}

describe('store/players/action.creators', () => {
  describe('fetchPlayers', () => {
    const action: FetchPlayersAction = fetchPlayers(mockService)(mockDispatch)
    const expectedAction: FetchPlayersAction = {
      type: 'FETCH_PLAYERS',
    }
    it(`should call fetchPlayersThunk`, () => {
      expect(spies.fetchPlayersThunk).toHaveBeenCalled()
    })
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
  })
  describe('fetchPlayersSuccess', () => {
    const players: Player[] = []
    const action = fetchPlayersSuccess(players)
    const expectedAction: FetchPlayersSuccessAction = {
      type: 'FETCH_PLAYERS_SUCCESS',
      payload: {
        players,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('fetchPlayersError', () => {
    const action = fetchPlayersError(error)
    const expectedAction: FetchPlayersErrorAction = {
      type: 'FETCH_PLAYERS_ERROR',
      payload: {
        error,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('editPlayer', () => {
    const id = '5c7453b9a8487142b8230669'
    const action = editPlayer(id)
    const expectedAction: EditPlayerAction = {
      type: 'EDIT_PLAYER',
      payload: {
        id,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('cancelEditPlayer', () => {
    const id = '5c7453b9a8487142b8230669'
    const action = cancelEditPlayer(id)
    const expectedAction: CancelEditPlayerAction = {
      type: 'CANCEL_EDIT_PLAYER',
      payload: {
        id,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('editPlayerField', () => {
    const id = '5c7453b9a8487142b8230669'
    const field = 'name'
    const value = 'Barney Rubble'
    const action = editPlayerField(id, field, value)
    const expectedAction: EditPlayerFieldAction = {
      type: 'EDIT_PLAYER_FIELD',
      payload: {
        id,
        field,
        value,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('saveEditedPlayer', () => {
    const id = '5c7453b9a8487142b8230669'
    const update = {
      name: 'Barney Rubble',
    }
    const action: SaveEditedPlayerAction = saveEditedPlayer(
      id,
      update,
      mockService,
    )(mockDispatch)
    const expectedAction: SaveEditedPlayerAction = {
      type: 'SAVE_EDITED_PLAYER',
      payload: {
        id,
        update,
      }
    }
    it(`should call saveEditedPlayerThunk`, () => {
      expect(spies.saveEditedPlayerThunk).toHaveBeenCalled()
    })
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('saveEditedPlayerSuccess', () => {
    const player: Player = {
      id: '5c7453b9a8487142b8230669',
      name: 'Barney Rubble',
      country: 'US',
      winnings: 100,
    }
    const action = saveEditedPlayerSuccess(player)
    const expectedAction: SaveEditedPlayerSuccessAction = {
      type: 'SAVE_EDITED_PLAYER_SUCCESS',
      payload: {
        player,
      },
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('saveEditedPlayerError', () => {
    const action = saveEditedPlayerError(error)
    const expectedAction: SaveEditedPlayerErrorAction = {
      type: 'SAVE_EDITED_PLAYER_ERROR',
      payload: {
        error,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('addPlayer', () => {
    const action = addPlayer()
    const expectedAction: AddPlayerAction = {
      type: 'ADD_PLAYER',
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
  })
  describe('cancelAddPlayer', () => {
    const action = cancelAddPlayer()
    const expectedAction: CancelAddPlayerAction = {
      type: 'CANCEL_ADD_PLAYER',
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
  })
  describe('saveAddedPlayer', () => {
    const player: Partial<Player> = {
      name: 'Barney Rubble',
      country: 'US',
      winnings: 100,
    }
    const action: SaveAddedPlayerAction = saveAddedPlayer(
      player,
      mockService,
    )(mockDispatch)
    const expectedAction: SaveAddedPlayerAction = {
      type: 'SAVE_ADDED_PLAYER',
      payload: {
        player,
      }
    }
    it(`should call saveAddedPlayerThunk`, () => {
      expect(spies.saveAddedPlayerThunk).toHaveBeenCalled()
    })
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('saveAddedPlayerSuccess', () => {
    const player: Player = {
      id: '5c7453b9a8487142b8230669',
      name: 'Barney Rubble',
      country: 'US',
      winnings: 100,
    }
    const action = saveAddedPlayerSuccess(player)
    const expectedAction: SaveAddedPlayerSuccessAction = {
      type: 'SAVE_ADDED_PLAYER_SUCCESS',
      payload: {
        player,
      },
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('saveAddedPlayerError', () => {
    const action = saveAddedPlayerError(error)
    const expectedAction: SaveAddedPlayerErrorAction = {
      type: 'SAVE_ADDED_PLAYER_ERROR',
      payload: {
        error,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('deletePlayer', () => {
    const id = '5c7453b9a8487142b8230669'
    const action: DeletePlayerAction = deletePlayer(
      id,
      mockService,
    )(mockDispatch)
    const expectedAction: DeletePlayerAction = {
      type: 'DELETE_PLAYER',
      payload: {
        id,
      }
    }
    it(`should call deletePlayerThunk`, () => {
      expect(spies.deletePlayerThunk).toHaveBeenCalled()
    })
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('deletePlayerSuccess', () => {
    const player: Player = {
      id: '5c7453b9a8487142b8230669',
      name: 'Barney Rubble',
      country: 'US',
      winnings: 100,
    }
    const response = {
      message: `Removed player with id: ${player.id}`,
      player,
    }
    const action = deletePlayerSuccess(response)
    const expectedAction: DeletePlayerSuccessAction = {
      type: 'DELETE_PLAYER_SUCCESS',
      payload: {
        response,
      },
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
  describe('deletePlayerError', () => {
    const action = deletePlayerError(error)
    const expectedAction: DeletePlayerErrorAction = {
      type: 'DELETE_PLAYER_ERROR',
      payload: {
        error,
      }
    }
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    })
    it(`should return ${expectedAction.type} action payload`, () => {
      expect(action.payload).toEqual(expectedAction.payload)
    })
  })
})
