import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import { Player } from 'app/store/players/types'

import { WrappedAddPlayerForm, Props } from './AddPlayerForm'

const saveAddedPlayer: Props['saveAddedPlayer'] = (
  _player: Partial<Player>,
) => {
  //
}

const error: Error = {
  name: 'Sample Error',
  message: 'sample error message.'
}

export const mockProps = {
  saveAddedPlayer,
  savingAddedPlayer: false,
  saveAddedPlayerError: null,
}

export const scenarios: Scenarios = {
  'basic': () => (
    <WrappedAddPlayerForm
      {...mockProps}
    />
  ),
  'saving': () => (
    <WrappedAddPlayerForm
      {...mockProps}
      savingAddedPlayer={true}
    />
  ),
  'error': () => (
    <WrappedAddPlayerForm
      {...mockProps}
      saveAddedPlayerError={error}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Partial<Props> = mockProps,
  ) => (
    <WrappedAddPlayerForm
      {...mockProps}
      savingAddedPlayer={knobs.boolean('savingAddedPlayer', !!props.savingAddedPlayer)}
      saveAddedPlayerError={knobs.object('saveAddedPlayerError', props.saveAddedPlayerError)}
    />
  ),
}

storyBuilder(scenarios, 'Components/AddPlayerForm')
