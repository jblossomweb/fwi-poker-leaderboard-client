import windowOrGlobal from 'window-or-global'
import { mockDispatch } from 'core/store/dispatch.mock.utils'

import { PlayersService } from 'app/services/players/service'
import { PlayersServiceInterface } from 'app/services/players/types'
import { Player } from 'app/store/players/types'

import {
  mockUrl, mockRest, mockResponses, mockRestError, mockErrorResponse,
} from 'app/services/players/service.test.mocks'

import {
  fetchPlayersSuccess,
  fetchPlayersError,
  saveEditedPlayerSuccess,
  saveEditedPlayerError,
  saveAddedPlayerSuccess,
  saveAddedPlayerError,
  deletePlayerSuccess,
  deletePlayerError,
} from './action.creators'

import {
  fetchPlayersThunk,
  saveEditedPlayerThunk,
  saveAddedPlayerThunk,
  deletePlayerThunk,
} from './action.thunks'

const mockService = new PlayersService(mockUrl, mockRest)
const mockServiceError = new PlayersService(mockUrl, mockRestError)

windowOrGlobal.console = {
  error: jest.fn(),
}

const getSpies = (
  service: PlayersServiceInterface,
) => ({
  getPlayers: jest.spyOn(service, 'getPlayers'),
  createPlayer: jest.spyOn(service, 'createPlayer'),
  updatePlayer: jest.spyOn(service, 'updatePlayer'),
  deletePlayer: jest.spyOn(service, 'deletePlayer'),
})

const spies = {
  success: getSpies(mockService),
  fail: getSpies(mockServiceError),
}

describe('store/players/action.thunks', () => {
  describe('fetchPlayersThunk', () => {
    const success: Promise<any> = fetchPlayersThunk(
      mockService,
      fetchPlayersSuccess,
      fetchPlayersError,
    )(mockDispatch)
    const fail: Promise<any> = fetchPlayersThunk(
      mockServiceError,
      fetchPlayersSuccess,
      fetchPlayersError,
    )(mockDispatch)
    it(`always calls service.getPlayers`, async() => {
      await success
      expect(spies.success.getPlayers).toHaveBeenCalled()
      await fail
      expect(spies.fail.getPlayers).toHaveBeenCalled()
    })

    it(`dispatches fetchPlayersSuccess action upon success`, async() => {
      const dispatchedAction = await success
      expect(dispatchedAction).toEqual(
        mockDispatch(fetchPlayersSuccess(mockResponses.array))
      )
    })

    it(`dispatches fetchSampleCountriesError action upon fail`, async() => {
      const dispatchedAction = await fail
      expect(dispatchedAction).toEqual(
        mockDispatch(fetchPlayersError(mockErrorResponse))
      )
    })
  })
  describe('saveEditedPlayerThunk', () => {
    const id = '5c7453b9a8487142b8230669'
    const update = {
      name: 'Barney Rubble',
    }
    const success: Promise<any> = saveEditedPlayerThunk(
      id,
      update,
      mockService,
      saveEditedPlayerSuccess,
      saveEditedPlayerError,
    )(mockDispatch)
    const fail: Promise<any> = saveEditedPlayerThunk(
      id,
      update,
      mockServiceError,
      saveEditedPlayerSuccess,
      saveEditedPlayerError,
    )(mockDispatch)
    it(`always calls service.updatePlayer`, async() => {
      await success
      expect(spies.success.updatePlayer).toHaveBeenCalled()
      await fail
      expect(spies.fail.updatePlayer).toHaveBeenCalled()
    })

    it(`dispatches saveEditedPlayerSuccess action upon success`, async() => {
      const dispatchedAction = await success
      expect(dispatchedAction).toEqual(
        mockDispatch(saveEditedPlayerSuccess(mockResponses.object as Player))
      )
    })

    it(`dispatches saveEditedPlayerError action upon fail`, async() => {
      const dispatchedAction = await fail
      expect(dispatchedAction).toEqual(
        mockDispatch(saveEditedPlayerError(mockErrorResponse))
      )
    })
  })
  describe('saveAddedPlayerThunk', () => {
    const player = {
      name: 'Barney Rubble',
      country: 'US',
      winnings: 100,
    }
    const success: Promise<any> = saveAddedPlayerThunk(
      player,
      mockService,
      saveAddedPlayerSuccess,
      saveAddedPlayerError,
    )(mockDispatch)
    const fail: Promise<any> = saveAddedPlayerThunk(
      player,
      mockServiceError,
      saveAddedPlayerSuccess,
      saveAddedPlayerError,
    )(mockDispatch)
    it(`always calls service.createPlayer`, async() => {
      await success
      expect(spies.success.createPlayer).toHaveBeenCalled()
      await fail
      expect(spies.fail.createPlayer).toHaveBeenCalled()
    })

    it(`dispatches saveAddedPlayerSuccess action upon success`, async() => {
      const dispatchedAction = await success
      expect(dispatchedAction).toEqual(
        mockDispatch(saveAddedPlayerSuccess(mockResponses.object as Player))
      )
    })

    it(`dispatches saveAddedPlayerError action upon fail`, async() => {
      const dispatchedAction = await fail
      expect(dispatchedAction).toEqual(
        mockDispatch(saveAddedPlayerError(mockErrorResponse))
      )
    })
  })
  describe('deletePlayerThunk', () => {
    const id = '5c7453b9a8487142b8230669'
    const player: Player = {
      id,
      name: 'Barney Rubble',
      country: 'US',
      winnings: 100,
    }
    const response = {
      message: `Removed player with id: ${player.id}`,
      player,
    }
    const success: Promise<any> = deletePlayerThunk(
      id,
      mockService,
      deletePlayerSuccess,
      deletePlayerError,
    )(mockDispatch)
    const fail: Promise<any> = deletePlayerThunk(
      id,
      mockServiceError,
      deletePlayerSuccess,
      deletePlayerError,
    )(mockDispatch)
    it(`always calls service.deletePlayer`, async() => {
      await success
      expect(spies.success.deletePlayer).toHaveBeenCalled()
      await fail
      expect(spies.fail.deletePlayer).toHaveBeenCalled()
    })

    it(`dispatches deletePlayerSuccess action upon success`, async() => {
      const dispatchedAction = await success
      expect(dispatchedAction).toEqual(
        mockDispatch(deletePlayerSuccess(response))
      )
    })

    it(`dispatches deletePlayerError action upon fail`, async() => {
      const dispatchedAction = await fail
      expect(dispatchedAction).toEqual(
        mockDispatch(deletePlayerError(mockErrorResponse))
      )
    })
  })
})
