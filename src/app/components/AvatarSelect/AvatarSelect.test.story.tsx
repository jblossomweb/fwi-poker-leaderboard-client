import React from 'react'
import { Primitive } from 'core/store/state.types'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import { Player } from 'app/store/players/types'

import AvatarSelect, { Props } from './AvatarSelect'

const player: Player = {
  id: '5c7c2d24287fe6637a21c7da',
  name: 'Fred Flintstone',
  country: 'US',
  winnings: 1000,
}

const playerEdits = {
  '5c7c2d24287fe6637a21c7da': {
    twitterHandle: 'FredFlintstone_',
  }
}

export const mockProps: Props = {
  player,
  disabled: false,
  playerEdits: {},
  editField: (_id: Player['id'], _field: string, _value: Primitive) => {
    //
  },
  saveEditedPlayer: (_id: Player['id'], _update: Partial<Player>) => {
    //
  },
  cancelEditPlayer: (_id: Player['id']) => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <AvatarSelect
      {...mockProps}
    />
  ),
  'disabled': () => (
    <AvatarSelect
      {...mockProps}
      disabled={true}
    />
  ),
  'unsaved changes': () => (
    <AvatarSelect
      {...mockProps}
      playerEdits={playerEdits}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <AvatarSelect
      {...mockProps}
      disabled={knobs.boolean('disabled', !!props.disabled)}
      playerEdits={knobs.object('playerEdits', playerEdits)}
      player={{
        id: props.player.id,
        country: props.player.country,
        name: knobs.text('player.name', props.player.name || ''),
        winnings: props.player.winnings,
        email: knobs.text('player.email', props.player.email || ''),
        twitterHandle: knobs.text('player.twitterHandle', props.player.twitterHandle || ''),
      }}
    />
  ),
}

storyBuilder(scenarios, 'Components/AvatarSelect')
