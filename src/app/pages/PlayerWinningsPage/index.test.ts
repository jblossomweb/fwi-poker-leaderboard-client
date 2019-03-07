import { Dispatch, AnyAction } from 'redux'
import { getInitialState } from 'core/store/state.utils'
import { AppState } from 'core/store/state.types'

import { Player } from 'app/store/players/types'
import { PlayersService } from 'app/services/players/service'
import { mockUrl, mockRest } from 'app/services/players/service.test.mocks'

import playerSelectors from 'app/store/players/selectors'
import playerActions from 'app/store/players/action.creators'

import { DispatchProps } from './PlayerWinningsPage'

import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

const mockService = new PlayersService(mockUrl, mockRest)

describe('Pages/PlayerWinningsPage (redux wireup)', () => {
  describe('mapStateToProps', () => {
    const spies = {
      getFetchingPlayers: jest.spyOn(playerSelectors, 'getFetchingPlayers'),
      getFetchPlayersError: jest.spyOn(playerSelectors, 'getFetchPlayersError'),
      getPlayers: jest.spyOn(playerSelectors, 'getPlayers'),
      getPlayerEdits: jest.spyOn(playerSelectors, 'getPlayerEdits'),
      getEditingPlayerId: jest.spyOn(playerSelectors, 'getEditingPlayerId'),
      getSavingEditedPlayer: jest.spyOn(playerSelectors, 'getSavingEditedPlayer'),
      getSaveEditedPlayerError: jest.spyOn(playerSelectors, 'getSaveEditedPlayerError'),
      getAddingPlayer: jest.spyOn(playerSelectors, 'getAddingPlayer'),
      getSavingAddedPlayer: jest.spyOn(playerSelectors, 'getSavingAddedPlayer'),
      getSaveAddedPlayerError: jest.spyOn(playerSelectors, 'getSaveAddedPlayerError'),
      getDeletingPlayer: jest.spyOn(playerSelectors, 'getDeletingPlayer'),
      getDeletePlayerError: jest.spyOn(playerSelectors, 'getDeletePlayerError'),
    }

    const state: AppState = getInitialState()
    const stateProps = mapStateToProps(state)

    it('calls playerSelectors.getFetchingPlayers to yield fetchingPlayers prop', () => {
      expect(spies.getFetchingPlayers).toHaveBeenCalled()
      expect(stateProps.fetchingPlayers).toEqual(playerSelectors.getFetchingPlayers(state))
      spies.getFetchingPlayers.mockClear()
    })

    it('calls playerSelectors.getFetchPlayersError to yield fetchPlayersError prop', () => {
      expect(spies.getFetchPlayersError).toHaveBeenCalled()
      expect(stateProps.fetchPlayersError).toEqual(playerSelectors.getFetchPlayersError(state))
      spies.getFetchPlayersError.mockClear()
    })

    it('calls playerSelectors.getPlayers to yield players prop', () => {
      expect(spies.getPlayers).toHaveBeenCalled()
      expect(stateProps.players).toEqual(playerSelectors.getPlayers(state))
      spies.getPlayers.mockClear()
    })

    it('calls playerSelectors.getPlayerEdits to yield playerEdits prop', () => {
      expect(spies.getPlayerEdits).toHaveBeenCalled()
      expect(stateProps.playerEdits).toEqual(playerSelectors.getPlayerEdits(state))
      spies.getPlayerEdits.mockClear()
    })

    it('calls playerSelectors.getEditingPlayerId to yield editingPlayerId prop', () => {
      expect(spies.getEditingPlayerId).toHaveBeenCalled()
      expect(stateProps.editingPlayerId).toEqual(playerSelectors.getEditingPlayerId(state))
      spies.getEditingPlayerId.mockClear()
    })

    it('calls playerSelectors.getSavingEditedPlayer to yield savingEditedPlayer prop', () => {
      expect(spies.getSavingEditedPlayer).toHaveBeenCalled()
      expect(stateProps.savingEditedPlayer).toEqual(playerSelectors.getSavingEditedPlayer(state))
      spies.getSavingEditedPlayer.mockClear()
    })

    it('calls playerSelectors.getSaveEditedPlayerError to yield saveEditedPlayerError prop', () => {
      expect(spies.getSaveEditedPlayerError).toHaveBeenCalled()
      expect(stateProps.saveEditedPlayerError).toEqual(playerSelectors.getSaveEditedPlayerError(state))
      spies.getSaveEditedPlayerError.mockClear()
    })

    it('calls playerSelectors.getAddingPlayer to yield addingPlayer prop', () => {
      expect(spies.getAddingPlayer).toHaveBeenCalled()
      expect(stateProps.addingPlayer).toEqual(playerSelectors.getAddingPlayer(state))
      spies.getAddingPlayer.mockClear()
    })

    it('calls playerSelectors.getSavingAddedPlayer to yield savingAddedPlayer prop', () => {
      expect(spies.getSavingAddedPlayer).toHaveBeenCalled()
      expect(stateProps.savingAddedPlayer).toEqual(playerSelectors.getSavingAddedPlayer(state))
      spies.getSavingAddedPlayer.mockClear()
    })

    it('calls playerSelectors.getSaveAddedPlayerError to yield saveAddedPlayerError prop', () => {
      expect(spies.getSaveAddedPlayerError).toHaveBeenCalled()
      expect(stateProps.saveAddedPlayerError).toEqual(playerSelectors.getSaveAddedPlayerError(state))
      spies.getSaveAddedPlayerError.mockClear()
    })

    it('calls playerSelectors.getDeletingPlayer to yield deletingPlayer prop', () => {
      expect(spies.getDeletingPlayer).toHaveBeenCalled()
      expect(stateProps.deletingPlayer).toEqual(playerSelectors.getDeletingPlayer(state))
      spies.getDeletingPlayer.mockClear()
    })

    it('calls playerSelectors.getDeletePlayerError to yield deletePlayerError prop', () => {
      expect(spies.getDeletePlayerError).toHaveBeenCalled()
      expect(stateProps.deletePlayerError).toEqual(playerSelectors.getDeletePlayerError(state))
      spies.getDeletePlayerError.mockClear()
    })
  })

  describe('mapDispatchToProps', () => {
    const spies = {
      fetchPlayers: jest.spyOn(playerActions, 'fetchPlayers'),
      fetchPlayersSuccess: jest.spyOn(playerActions, 'fetchPlayersSuccess'),
      fetchPlayersError: jest.spyOn(playerActions, 'fetchPlayersError'),
      editPlayer: jest.spyOn(playerActions, 'editPlayer'),
      cancelEditPlayer: jest.spyOn(playerActions, 'cancelEditPlayer'),
      editPlayerField: jest.spyOn(playerActions, 'editPlayerField'),
      saveEditedPlayer: jest.spyOn(playerActions, 'saveEditedPlayer'),
      saveEditedPlayerSuccess: jest.spyOn(playerActions, 'saveEditedPlayerSuccess'),
      saveEditedPlayerError: jest.spyOn(playerActions, 'saveEditedPlayerError'),
      addPlayer: jest.spyOn(playerActions, 'addPlayer'),
      cancelAddPlayer: jest.spyOn(playerActions, 'cancelAddPlayer'),
      saveAddedPlayer: jest.spyOn(playerActions, 'saveAddedPlayer'),
      saveAddedPlayerSuccess: jest.spyOn(playerActions, 'saveAddedPlayerSuccess'),
      saveAddedPlayerError: jest.spyOn(playerActions, 'saveAddedPlayerError'),
      deletePlayer: jest.spyOn(playerActions, 'deletePlayer'),
      deletePlayerSuccess: jest.spyOn(playerActions, 'deletePlayerSuccess'),
      deletePlayerError: jest.spyOn(playerActions, 'deletePlayerError'),
    }
    const dispatch: Dispatch<AnyAction> = (action: AnyAction) => action.type

    const dispatchProps: DispatchProps = mapDispatchToProps(mockService)(dispatch)

    it('maps a thunk dispatch to playerActions.fetchPlayers as fetchPlayers prop', () => {
      const prop = dispatchProps.fetchPlayers()
      expect(spies.fetchPlayers).toHaveBeenCalled()
      expect(spies.fetchPlayers).toHaveBeenLastCalledWith(mockService)
      expect(prop).toEqual(dispatch(playerActions.fetchPlayers(mockService)(dispatch)))
      spies.fetchPlayers.mockClear()
    })

    it('maps a dispatch to playerActions.editPlayer as editPlayer prop', () => {
      const id: string = '5c7c2d24287fe6637a21c7da'
      const prop = dispatchProps.editPlayer(id)
      expect(spies.editPlayer).toHaveBeenCalled()
      expect(spies.editPlayer).toHaveBeenLastCalledWith(id)
      expect(prop).toEqual(dispatch(playerActions.editPlayer(id)))
      spies.editPlayer.mockClear()
    })

    it('maps a dispatch to playerActions.editPlayerField as editPlayerField prop', () => {
      const id: string = '5c7c2d24287fe6637a21c7da'
      const field: string = 'name'
      const value: string = 'Freddy Flintstones'
      const prop = dispatchProps.editPlayerField(id, field, value)
      expect(spies.editPlayerField).toHaveBeenCalled()
      expect(spies.editPlayerField).toHaveBeenLastCalledWith(id, field, value)
      expect(prop).toEqual(dispatch(playerActions.editPlayerField(id, field, value)))
      spies.editPlayerField.mockClear()
    })

    it('maps a dispatch to playerActions.cancelEditPlayer as cancelEditPlayer prop', () => {
      const id: string = '5c7c2d24287fe6637a21c7da'
      const prop = dispatchProps.cancelEditPlayer(id)
      expect(spies.cancelEditPlayer).toHaveBeenCalled()
      expect(spies.cancelEditPlayer).toHaveBeenLastCalledWith(id)
      expect(prop).toEqual(dispatch(playerActions.cancelEditPlayer(id)))
      spies.cancelEditPlayer.mockClear()
    })

    it('maps a thunk dispatch to playerActions.saveEditedPlayer as saveEditedPlayer prop', () => {
      const id: string = '5c7c2d24287fe6637a21c7da'
      const update: Partial<Player> = {
        name: 'Freddy Flintstones',
      }
      const prop = dispatchProps.saveEditedPlayer(id, update)
      expect(spies.saveEditedPlayer).toHaveBeenCalled()
      expect(spies.saveEditedPlayer).toHaveBeenLastCalledWith(id, update, mockService)
      expect(prop).toEqual(dispatch(playerActions.saveEditedPlayer(id, update, mockService)(dispatch)))
      spies.saveEditedPlayer.mockClear()
    })

    it('maps a dispatch to playerActions.addPlayer as addPlayer prop', () => {
      const prop = dispatchProps.addPlayer()
      expect(spies.addPlayer).toHaveBeenCalled()
      expect(prop).toEqual(dispatch(playerActions.addPlayer()))
      spies.addPlayer.mockClear()
    })

    it('maps a dispatch to playerActions.cancelAddPlayer as cancelAddPlayer prop', () => {
      const prop = dispatchProps.cancelAddPlayer()
      expect(spies.cancelAddPlayer).toHaveBeenCalled()
      expect(prop).toEqual(dispatch(playerActions.cancelAddPlayer()))
      spies.cancelAddPlayer.mockClear()
    })

    it('maps a thunk dispatch to playerActions.saveAddedPlayer as saveAddedPlayer prop', () => {
      const player: Partial<Player> = {
        name: 'Freddy Flintstones',
        country: 'US',
        winnings: 1000,
      }
      const prop = dispatchProps.saveAddedPlayer(player)
      expect(spies.saveAddedPlayer).toHaveBeenCalled()
      expect(spies.saveAddedPlayer).toHaveBeenLastCalledWith(player, mockService)
      expect(prop).toEqual(dispatch(playerActions.saveAddedPlayer(player, mockService)(dispatch)))
      spies.saveAddedPlayer.mockClear()
    })

    it('maps a thunk dispatch to playerActions.deletePlayer as deletePlayer prop', () => {
      const id: string = '5c7c2d24287fe6637a21c7da'
      const prop = dispatchProps.deletePlayer(id)
      expect(spies.deletePlayer).toHaveBeenCalled()
      expect(spies.deletePlayer).toHaveBeenLastCalledWith(id, mockService)
      expect(prop).toEqual(dispatch(playerActions.deletePlayer(id, mockService)(dispatch)))
      spies.deletePlayer.mockClear()
    })
  })
})
