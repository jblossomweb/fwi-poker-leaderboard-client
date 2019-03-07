import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import EditDeleteButtons, { Props } from './EditDeleteButtons'

export const mockProps: Props = {
  disabled: false,
  deleteConfirm: 'delete confirm?',
  onEdit: () => {
    //
  },
  onDelete: () => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <EditDeleteButtons
      {...mockProps}
    />
  ),
  'disabled': () => (
    <EditDeleteButtons
      {...mockProps}
      disabled={true}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <EditDeleteButtons
      {...mockProps}
      disabled={knobs.boolean('disabled', !!props.disabled)}
    />
  ),
}

storyBuilder(scenarios, 'Components/EditDeleteButtons')
