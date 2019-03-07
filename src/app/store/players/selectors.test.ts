import Immutable, { fromJS } from 'immutable'
import concat from 'lodash/concat'
import mapKeys from 'lodash/mapKeys'
import { getInitialState } from 'core/store/state.utils'
import { Player, ImmutablePlayers } from 'app/store/players/types'

import paths from './paths'
import selectors from './selectors'

const error: Error = {
  name: 'Sample Error',
  message: 'sample error message.'
}

const id: Player['id'] = '5c7453b9a8487142b8230669'

const barney: Player = {
  id,
  name: 'Barney Rubble',
  country: 'US',
  winnings: 3000,
}

const fred: Player = {
  id: '5c7453b9a8487142b8230668',
  name: 'Fred Flintstone',
  country: 'US',
  winnings: 2000,
}

const ralph: Player = {
  id: '5c7453b9a8487142b8230667',
  name: 'Wreck-It Ralph',
  country: 'US',
  winnings: 1000,
}

const four: Player = {
  id: '5c7453b9a8487142b8230666',
  name: 'Player Four',
  country: 'CA',
  winnings: 100,
}

const five: Player = {
  id: '5c7453b9a8487142b8230665',
  name: 'Player Five',
  country: 'MX',
  winnings: 100,
}

const players: Player[] = [
  barney,
  fred,
  ralph,
  four,
  five,
]
const playersMap: { [key: string]: Player } = mapKeys(players, p => p.id)
const immutablePlayers: ImmutablePlayers = Immutable.Map(fromJS(playersMap))

describe('store/players/selectors', () => {

  describe('getFetchingPlayers', () => {
    const path = concat(['app'], paths.fetchingPlayers())
    const value = true
    const state = getInitialState().setIn(path, value)
    it('should select value from fetchingPlayers', () => {
      const selected = selectors.getFetchingPlayers(state)
      expect(selected).toBe(true)
    })
  })

  describe('getFetchPlayersError', () => {
    const path = concat(['app'], paths.fetchPlayersError())
    const state = getInitialState().setIn(path, error)
    it('should select value from fetchPlayersError', () => {
      const selected = selectors.getFetchPlayersError(state)
      expect(selected).toEqual(error)
    })
  })

  describe('getPlayers', () => {
    const path = concat(['app'], paths.players())
    const value = immutablePlayers
    const state = getInitialState().setIn(path, value)
    it('should select value sequence from players map', () => {
      const selected = selectors.getPlayers(state)
      expect(selected).toEqual(immutablePlayers.valueSeq())
    })
  })

  describe('getEditingPlayerId', () => {
    const path = concat(['app'], paths.editingPlayerId())
    const value = id
    const state = getInitialState().setIn(path, value)
    it('should select value from editingPlayerId', () => {
      const selected = selectors.getEditingPlayerId(state)
      expect(selected).toBe(id)
    })
  })

  describe('getPlayerEdits', () => {
    const path = concat(['app'], paths.playerEdits())
    const value = Immutable.Map(fromJS({ name: 'Fred Flintstone' }))
    const state = getInitialState().setIn(path, value)
    it('should select value from playerEdits', () => {
      const selected = selectors.getPlayerEdits(state)
      expect(selected).toEqual(value)
    })
  })

  describe('getSavingEditedPlayer', () => {
    const path = concat(['app'], paths.savingEditedPlayer())
    const value = true
    const state = getInitialState().setIn(path, value)
    it('should select value from savingEditedPlayer', () => {
      const selected = selectors.getSavingEditedPlayer(state)
      expect(selected).toBe(true)
    })
  })

  describe('getSaveEditedPlayerError', () => {
    const path = concat(['app'], paths.saveEditedPlayerError())
    const state = getInitialState().setIn(path, error)
    it('should select value from saveEditedPlayerError', () => {
      const selected = selectors.getSaveEditedPlayerError(state)
      expect(selected).toEqual(error)
    })
  })

  describe('getAddingPlayer', () => {
    const path = concat(['app'], paths.addingPlayer())
    const value = true
    const state = getInitialState().setIn(path, value)
    it('should select value from addingPlayer', () => {
      const selected = selectors.getAddingPlayer(state)
      expect(selected).toBe(true)
    })
  })

  describe('getSavingAddedPlayer', () => {
    const path = concat(['app'], paths.savingAddedPlayer())
    const value = true
    const state = getInitialState().setIn(path, value)
    it('should select value from savingAddedPlayer', () => {
      const selected = selectors.getSavingAddedPlayer(state)
      expect(selected).toBe(true)
    })
  })

  describe('getSaveAddedPlayerError', () => {
    const path = concat(['app'], paths.saveAddedPlayerError())
    const state = getInitialState().setIn(path, error)
    it('should select value from saveAddedPlayerError', () => {
      const selected = selectors.getSaveAddedPlayerError(state)
      expect(selected).toEqual(error)
    })
  })

  describe('getDeletingPlayer', () => {
    const path = concat(['app'], paths.deletingPlayer())
    const value = true
    const state = getInitialState().setIn(path, value)
    it('should select value from deletingPlayer', () => {
      const selected = selectors.getDeletingPlayer(state)
      expect(selected).toBe(true)
    })
  })

  describe('getDeletePlayerError', () => {
    const path = concat(['app'], paths.deletePlayerError())
    const state = getInitialState().setIn(path, error)
    it('should select value from deletePlayerError', () => {
      const selected = selectors.getDeletePlayerError(state)
      expect(selected).toEqual(error)
    })
  })

  describe('getTopPlayersBarData', () => {
    const path = concat(['app'], paths.players())
    const state = getInitialState().setIn(path, immutablePlayers)

    it('should select 3 players', () => {
      const selected = selectors.getTopPlayersBarData(state)
      expect(selected && selected.size).toEqual(3)
    })

    it('should sort by winnings descending', () => {
      const selectedPlayers = selectors.getPlayers(state)
      const expected = selectedPlayers && selectedPlayers
        .sortBy(p => p.get('winnings')).reverse().slice(0, 3)
      const selected = selectors.getTopPlayersBarData(state)
      expect(selected).toEqual(expected)
    })

    it('should select correct #1', () => {
      const selected = selectors.getTopPlayersBarData(state)
      const values = selected && selected.toArray()
      expect(values && values[0]).toEqual(Immutable.Map(fromJS(barney)))
    })

    it('should select correct #2', () => {
      const selected = selectors.getTopPlayersBarData(state)
      const values = selected && selected.toArray()
      expect(values && values[1]).toEqual(Immutable.Map(fromJS(fred)))
    })

    it('should select correct #3', () => {
      const selected = selectors.getTopPlayersBarData(state)
      const values = selected && selected.toArray()
      expect(values && values[2]).toEqual(Immutable.Map(fromJS(ralph)))
    })
  })

  describe('getTotalWinnings', () => {
    const path = concat(['app'], paths.players())
    const state = getInitialState().setIn(path, immutablePlayers)

    it('should select a numeric value', () => {
      const selected = selectors.getTotalWinnings(state)
      expect(typeof selected).toBe('number')
    })

    it('should select the correct sum of all winnings values', () => {
      const selected = selectors.getTotalWinnings(state)
      expect(selected).toBe(6200)
    })
  })

  describe('getWinningsByCountry', () => {
    const path = concat(['app'], paths.players())
    const state = getInitialState().setIn(path, immutablePlayers)

    it('should select correct numeric values', () => {
      const selected = selectors.getWinningsByCountry(state)
      expect(selected).toEqual({
        US: 6000,
        CA: 100,
        MX: 100,
      })
    })
    it('should not count winnings without a country', () => {
      const emptyWinningsState = getInitialState().setIn(path, Immutable.Map(fromJS({
        'playerone': { name: 'Player One', country: 'US', winnings: 100 },
        'playertwo': { name: 'Player Two', winnings: 100 },
      })))
      const selected = selectors.getWinningsByCountry(emptyWinningsState)
      expect(selected).toEqual({
        US: 100,
      })
    })
  })

  describe('getCountryWinningsPieData', () => {
    const path = concat(['app'], paths.players())
    const state = getInitialState().setIn(path, immutablePlayers)

    it('should select collection of correct numeric values', () => {
      const selected = selectors.getCountryWinningsPieData(state)
      expect(selected).toEqual([
        { country: 'US', winnings: 6000 },
        { country: 'CA', winnings: 100 },
        { country: 'MX', winnings: 100 },
      ])
    })
  })
})
