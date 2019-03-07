import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Primitive } from 'core/store/state.types'
import { storyBuilder } from 'core/test/stories.utils'
import { Scenarios } from 'core/test/scenarios.types'

import { Player } from 'app/store/players/types'
import { players, error } from 'app/store/players/mocks'

import PlayerWinningsPage, { Props } from './PlayerWinningsPage'

export const mockProps: Props = {
  fetchingPlayers: false,
  fetchPlayersError: null,
  players,
  playerEdits: {},
  editingPlayerId: null,
  savingEditedPlayer: false,
  saveEditedPlayerError: null,
  addingPlayer: false,
  savingAddedPlayer: false,
  saveAddedPlayerError: null,
  deletingPlayer: null,
  deletePlayerError: null,

  fetchPlayers: () => {
    //
  },
  addPlayer: () => {
    //
  },
  cancelAddPlayer: () => {
    //
  },
  editPlayer: (_id: Player['id']) => {
    //
  },
  cancelEditPlayer: (_id: Player['id']) => {
    //
  },
  editPlayerField: (_id: Player['id'], _field: string, _value: Primitive) => {
    //
  },
  saveEditedPlayer: (_id: Player['id'], _update: Partial<Player>) => {
    //
  },
  saveAddedPlayer: (_player: Partial<Player>) => {
    //
  },
  deletePlayer: (_id: Player['id']) => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <PlayerWinningsPage
      {...mockProps}
    />
  ),
  'no players': () => (
    <PlayerWinningsPage
      {...mockProps}
      players={undefined}
    />
  ),
  'fetchPlayersError': () => (
    <PlayerWinningsPage
      {...mockProps}
      players={undefined}
      fetchPlayersError={error}
    />
  ),
  'saveEditedPlayerError': () => (
    <PlayerWinningsPage
      {...mockProps}
      saveEditedPlayerError={error}
    />
  ),
  'saveAddedPlayerError': () => (
    <PlayerWinningsPage
      {...mockProps}
      saveAddedPlayerError={error}
    />
  ),
  'deletePlayerError': () => (
    <PlayerWinningsPage
      {...mockProps}
      deletePlayerError={error}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <PlayerWinningsPage
      {...mockProps}
      players={knobs.object('players', props.players)}
      fetchPlayersError={knobs.object('fetchPlayersError', props.fetchPlayersError)}
      saveEditedPlayerError={knobs.object('saveEditedPlayerError', props.saveEditedPlayerError)}
      saveAddedPlayerError={knobs.object('saveAddedPlayerError', props.saveAddedPlayerError)}
      deletePlayerError={knobs.object('deletePlayerError', props.deletePlayerError)}
    />
  ),
}

storyBuilder(scenarios, 'Pages/PlayerWinningsPage')
