import 'jest-canvas-mock'
import { Dispatch, AnyAction } from 'redux'
import { getInitialState } from 'core/store/state.utils'
import { AppState } from 'core/store/state.types'

import { PlayersService } from 'app/services/players/service'
import { mockUrl, mockRest } from 'app/services/players/service.test.mocks'

import playerSelectors from 'app/store/players/selectors'
import playerActions from 'app/store/players/action.creators'

import { DispatchProps } from './HomePage'

import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

const mockService = new PlayersService(mockUrl, mockRest)

describe('Pages/HomePage (redux wireup)', () => {
  describe('mapStateToProps', () => {
    const spies = {
      getFetchingPlayers: jest.spyOn(playerSelectors, 'getFetchingPlayers'),
      getFetchPlayersError: jest.spyOn(playerSelectors, 'getFetchPlayersError'),
      getTotalWinnings: jest.spyOn(playerSelectors, 'getTotalWinnings'),
      getTopPlayersBarData: jest.spyOn(playerSelectors, 'getTopPlayersBarData'),
      getCountryWinningsPieData: jest.spyOn(playerSelectors, 'getCountryWinningsPieData'),
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

    it('calls playerSelectors.getTotalWinnings to yield totalWinnings prop', () => {
      expect(spies.getTotalWinnings).toHaveBeenCalled()
      expect(stateProps.totalWinnings).toEqual(playerSelectors.getTotalWinnings(state))
      spies.getTotalWinnings.mockClear()
    })

    it('calls playerSelectors.getTopPlayersBarData to yield topPlayersBarData prop', () => {
      expect(spies.getTopPlayersBarData).toHaveBeenCalled()
      expect(stateProps.topPlayersBarData).toEqual(playerSelectors.getTopPlayersBarData(state))
      spies.getTopPlayersBarData.mockClear()
    })

    it('calls playerSelectors.getCountryWinningsPieData to yield countryWinningsPieData prop', () => {
      expect(spies.getCountryWinningsPieData).toHaveBeenCalled()
      expect(stateProps.countryWinningsPieData).toEqual(playerSelectors.getCountryWinningsPieData(state))
      spies.getCountryWinningsPieData.mockClear()
    })
  })

  describe('mapDispatchToProps', () => {
    const spies = {
      fetchPlayers: jest.spyOn(playerActions, 'fetchPlayers'),
      fetchPlayersSuccess: jest.spyOn(playerActions, 'fetchPlayersSuccess'),
      fetchPlayersError: jest.spyOn(playerActions, 'fetchPlayersError'),
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
  })
})
