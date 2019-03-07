import Immutable, { fromJS } from 'immutable'
import mapKeys from 'lodash/mapKeys'
import { getInitialState } from 'core/store/state.utils'
import { AppReducer } from 'core/store/reducer.types'
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

import paths from './paths'
import reducers from './action.reducers'

const error: Error = {
  name: 'Sample Error',
  message: 'sample error message.'
}

const id: Player['id'] = '5c7453b9a8487142b8230669'

const player: Player = {
  id,
  name: 'Barney Rubble',
  country: 'US',
  winnings: 100,
}

const newPlayer: Partial<Player> = {
  name: 'Barney Rubble',
  country: 'US',
  winnings: 100,
}

const players: Player[] = [player]

const map: { [key: string]: Player } = mapKeys(players, player => player.id)

describe('store/players/action.reducers', () => {

  describe('FETCH_PLAYERS', () => {
    const action: FetchPlayersAction = {
      type: 'FETCH_PLAYERS'
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set fetchingPlayers to true', () => {
      const path = paths.fetchingPlayers()
      const state = getInitialState().setIn(path, false)
      expect(state.getIn(path)).toEqual(false)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(true)
    })
  })

  describe('FETCH_PLAYERS_SUCCESS', () => {
    const action: FetchPlayersSuccessAction = {
      type: 'FETCH_PLAYERS_SUCCESS',
      payload: {
        players,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should set players to an Immutable.Map of action.payload.players', () => {
      const path = paths.players()
      const existing = Immutable.Map(fromJS({}))
      const expected = Immutable.Map(fromJS(map))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should clear fetchPlayersError', () => {
      const path = paths.fetchPlayersError()
      const existing = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })

    it('should set fetchingPlayers to false', () => {
      const path = paths.fetchingPlayers()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('FETCH_PLAYERS_ERROR', () => {
    const action: FetchPlayersErrorAction = {
      type: 'FETCH_PLAYERS_ERROR',
      payload: {
        error,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should not mutate players', () => {
      const path = paths.players()
      const existing = Immutable.Map(fromJS({}))
      const state = getInitialState().setIn(path, existing)
      expect(state.getIn(path)).toEqual(existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(existing)
    })

    it('should set fetchPlayersError to action.payload.error', () => {
      const path = paths.fetchPlayersError()
      const expected = Immutable.Map(fromJS(error))
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set fetchingPlayers to false', () => {
      const path = paths.fetchingPlayers()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('EDIT_PLAYER', () => {
    const action: EditPlayerAction = {
      type: 'EDIT_PLAYER',
      payload: {
        id,
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set playerEdit(action.payload.id) to an empty Immutable.Map', () => {
      const path = paths.playerEdit(action.payload.id)
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(Immutable.Map())
    })
    it('should set editingPlayerId to action.payload.id', () => {
      const path = paths.editingPlayerId()
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(action.payload.id)
    })
  })

  describe('EDIT_PLAYER_FIELD', () => {
    const action: EditPlayerFieldAction = {
      type: 'EDIT_PLAYER_FIELD',
      payload: {
        id,
        field: 'name',
        value: 'Barney Rubble',
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set editing player field to action.payload.value', () => {
      const path = paths.playerEditField(action.payload.id, action.payload.field)
      const state = getInitialState().setIn(path, 'Fred Flintstone')
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(action.payload.value)
    })
  })

  describe('CANCEL_EDIT_PLAYER', () => {
    const action: CancelEditPlayerAction = {
      type: 'CANCEL_EDIT_PLAYER',
      payload: {
        id,
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should clear playerEdit(action.payload.id)', () => {
      const path = paths.playerEdit(action.payload.id)
      const state = getInitialState().setIn(path, Immutable.Map())
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })
    it('should clear editingPlayerId', () => {
      const path = paths.editingPlayerId()
      const state = getInitialState().setIn(path, id)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })
  })

  describe('SAVE_EDITED_PLAYER', () => {
    const action: SaveEditedPlayerAction = {
      type: 'SAVE_EDITED_PLAYER',
      payload: {
        id,
        update: { name: 'Fred Flintstone' },
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set savingEditedPlayer to true', () => {
      const path = paths.savingEditedPlayer()
      const state = getInitialState().setIn(path, false)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(true)
    })
  })

  describe('SAVE_EDITED_PLAYER_SUCCESS', () => {
    const action: SaveEditedPlayerSuccessAction = {
      type: 'SAVE_EDITED_PLAYER_SUCCESS',
      payload: {
        player,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should set player to an Immutable.Map of action.payload.player', () => {
      const path = paths.player(action.payload.player.id)
      const expected = Immutable.Map(fromJS(player))
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should clear saveEditedPlayerError', () => {
      const path = paths.saveEditedPlayerError()
      const existing = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })

    it('should set savingEditedPlayer to false', () => {
      const path = paths.savingEditedPlayer()
      const state = getInitialState().setIn(path, true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })

    it('should clear editingPlayerId', () => {
      const path = paths.editingPlayerId()
      const state = getInitialState().setIn(path, id)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })
  })

  describe('SAVE_EDITED_PLAYER_ERROR', () => {
    const action: SaveEditedPlayerErrorAction = {
      type: 'SAVE_EDITED_PLAYER_ERROR',
      payload: {
        error,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should not mutate players', () => {
      const path = paths.players()
      const existing = Immutable.Map(fromJS(map))
      const state = getInitialState().setIn(path, existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(existing)
    })

    it('should set saveEditedPlayerError to action.payload.error', () => {
      const path = paths.saveEditedPlayerError()
      const expected = Immutable.Map(fromJS(error))
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set savingEditedPlayer to false', () => {
      const path = paths.savingEditedPlayer()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('ADD_PLAYER', () => {
    const action: AddPlayerAction = {
      type: 'ADD_PLAYER',
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set addingPlayer to true', () => {
      const path = paths.addingPlayer()
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(true)
    })
  })

  describe('CANCEL_ADD_PLAYER', () => {
    const action: CancelAddPlayerAction = {
      type: 'CANCEL_ADD_PLAYER',
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set addingPlayer to false', () => {
      const path = paths.addingPlayer()
      const state = getInitialState().setIn(path, true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('SAVE_ADDED_PLAYER', () => {
    const action: SaveAddedPlayerAction = {
      type: 'SAVE_ADDED_PLAYER',
      payload: {
        player: newPlayer,
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set savingAddedPlayer to true', () => {
      const path = paths.savingAddedPlayer()
      const state = getInitialState().setIn(path, false)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(true)
    })
  })

  describe('SAVE_ADDED_PLAYER_SUCCESS', () => {
    const action: SaveAddedPlayerSuccessAction = {
      type: 'SAVE_ADDED_PLAYER_SUCCESS',
      payload: {
        player,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should set player to an Immutable.Map of action.payload.player', () => {
      const path = paths.player(action.payload.player.id)
      const expected = Immutable.Map(fromJS(player))
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should clear saveAddedPlayerError', () => {
      const path = paths.saveAddedPlayerError()
      const existing = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })

    it('should set savingAddedPlayer to false', () => {
      const path = paths.savingAddedPlayer()
      const state = getInitialState().setIn(path, true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })

    it('should set addingPlayer to false', () => {
      const path = paths.addingPlayer()
      const state = getInitialState().setIn(path, true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('SAVE_ADDED_PLAYER_ERROR', () => {
    const action: SaveAddedPlayerErrorAction = {
      type: 'SAVE_ADDED_PLAYER_ERROR',
      payload: {
        error,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should not mutate players', () => {
      const path = paths.players()
      const existing = Immutable.Map(fromJS(map))
      const state = getInitialState().setIn(path, existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(existing)
    })

    it('should set saveAddedPlayerError to action.payload.error', () => {
      const path = paths.saveAddedPlayerError()
      const expected = Immutable.Map(fromJS(error))
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should set savingAddedPlayer to false', () => {
      const path = paths.savingAddedPlayer()
      const state = getInitialState().setIn(path, true)
      expect(state.getIn(path)).toEqual(true)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(false)
    })
  })

  describe('DELETE_PLAYER', () => {
    const action: DeletePlayerAction = {
      type: 'DELETE_PLAYER',
      payload: {
        id,
      }
    }
    const reducer: AppReducer = reducers[action.type]
    it('should set deletingPlayer to action.payload.id', () => {
      const path = paths.deletingPlayer()
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(action.payload.id)
    })
  })

  describe('DELETE_PLAYER_SUCCESS', () => {
    const action: DeletePlayerSuccessAction = {
      type: 'DELETE_PLAYER_SUCCESS',
      payload: {
        response: {
          message: `Removed player with id: ${player.id}`,
          player,
        },
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should delete player from state with id matching action.payload response', () => {
      const path = paths.player(player.id)
      const state = getInitialState().setIn(path, player)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })

    it('should clear deletePlayerError', () => {
      const path = paths.deletePlayerError()
      const existing = Immutable.Map(fromJS(error))
      const state = getInitialState().setIn(path, existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })

    it('should clear deletingPlayer', () => {
      const path = paths.deletingPlayer()
      const state = getInitialState().setIn(path, player.id)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })
  })

  describe('DELETE_PLAYER_ERROR', () => {
    const action: DeletePlayerErrorAction = {
      type: 'DELETE_PLAYER_ERROR',
      payload: {
        error,
      }
    }
    const reducer: AppReducer = reducers[action.type]

    it('should not mutate players', () => {
      const path = paths.players()
      const existing = Immutable.Map(fromJS(map))
      const state = getInitialState().setIn(path, existing)
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(existing)
    })

    it('should set deletePlayerError to action.payload.error', () => {
      const path = paths.deletePlayerError()
      const expected = Immutable.Map(fromJS(error))
      const state = getInitialState()
      const newState = reducer(state, action)
      expect(newState.getIn(path)).toEqual(expected)
    })

    it('should clear deletingPlayer', () => {
      const path = paths.deletingPlayer()
      const state = getInitialState().setIn(path, player.id)
      const newState = reducer(state, action)
      expect(newState.getIn(path, undefined)).toEqual(undefined)
    })
  })
})
