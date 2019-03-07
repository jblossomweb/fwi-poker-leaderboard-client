import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import { Player } from 'app/store/players/types'

import NameEdit, { Props } from './NameEdit'

const player: Player = {
  id: '5c7c2d24287fe6637a21c7da',
  name: 'Fred Flintstone',
  country: 'US',
  winnings: 1000,
}

export const mockProps: Props = {
  player,
  playerEdits: {},
  savingEditedPlayer: false,
  editField: (_id: Player['id'], _field: string, _value: any) => {
    //
  },
}

const mockEdits = {}
mockEdits[player.id] = { name: 'Freddy Flintstone' }

export const scenarios: Scenarios = {
  'basic': () => (
    <NameEdit
      {...mockProps}
    />
  ),
  'with edits': () => (
    <NameEdit
      {...mockProps}
      playerEdits={mockEdits}
    />
  ),
  'saving': () => (
    <NameEdit
      {...mockProps}
      playerEdits={mockEdits}
      savingEditedPlayer={true}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <NameEdit
      {...mockProps}
      savingEditedPlayer={knobs.boolean('savingEditedPlayer', false)}
    />
  ),
}

storyBuilder(scenarios, 'Components/NameEdit')
