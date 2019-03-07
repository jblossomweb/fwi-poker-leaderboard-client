import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'
import { Primitive } from 'core/store/state.types'
import { Player } from 'app/store/players/types'
import { error, id, players, edits } from 'app/store/players/mocks'

import PlayerWinningsTable, { Props } from './PlayerWinningsTable'

export const mockProps: Props = {
  players,
  playerEdits: {},
  fetchingPlayers: false,
  fetchPlayersError: null,
  editing: null,
  savingEditedPlayer: false,
  saveEditedPlayerError: null,
  adding: false,
  savingAddedPlayer: false,
  saveAddedPlayerError: null,
  deletingPlayer: null,
  deletePlayerError: null,

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
    <PlayerWinningsTable
      {...mockProps}
    />
  ),
  'no data': () => (
    <PlayerWinningsTable
      {...mockProps}
      players={[]}
    />
  ),
  'fetchingPlayers': () => (
    <PlayerWinningsTable
      {...mockProps}
      players={[]}
      fetchingPlayers={true}
    />
  ),
  'fetchPlayersError': () => (
    <PlayerWinningsTable
      {...mockProps}
      players={[]}
      fetchPlayersError={error}
    />
  ),
  'editing': () => (
    <PlayerWinningsTable
      {...mockProps}
      editing={id}
    />
  ),
  'with edits': () => (
    <PlayerWinningsTable
      {...mockProps}
      editing={id}
      playerEdits={edits}
    />
  ),
  'saving edits': () => (
    <PlayerWinningsTable
      {...mockProps}
      editing={id}
      playerEdits={edits}
      savingEditedPlayer={true}
    />
  ),
  'save edit error': () => (
    <PlayerWinningsTable
      {...mockProps}
      editing={id}
      playerEdits={edits}
      saveEditedPlayerError={error}
    />
  ),
  'adding': () => (
    <PlayerWinningsTable
      {...mockProps}
      adding={true}
    />
  ),
  'saving add': () => (
    <PlayerWinningsTable
      {...mockProps}
      adding={true}
      savingAddedPlayer={true}
    />
  ),
  'save add error': () => (
    <PlayerWinningsTable
      {...mockProps}
      adding={true}
      saveAddedPlayerError={error}
    />
  ),
  'deleting': () => (
    <PlayerWinningsTable
      {...mockProps}
      deletingPlayer={id}
    />
  ),
  'delete error': () => (
    <PlayerWinningsTable
      {...mockProps}
      deletePlayerError={error}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <PlayerWinningsTable
      {...mockProps}
      fetchingPlayers={knobs.boolean('fetchingPlayers', props.fetchingPlayers)}
      adding={knobs.boolean('adding', props.adding)}
      savingAddedPlayer={knobs.boolean('saving add', false)}
      editing={knobs.boolean('editing Barney', false) ? id : null}
      savingEditedPlayer={knobs.boolean('saving Barney edits', false)}
      deletingPlayer={knobs.boolean('deleting Barney', false) ? id : null}
      players={knobs.object('players', props.players)}
    />
  ),
}

storyBuilder(scenarios, 'Components/PlayerWinningsTable')
