import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import CancelSaveButtons, { Props } from './CancelSaveButtons'

export const mockProps: Props = {
  disabled: false,
  onCancel: () => {
    //
  },
  onSave: () => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <CancelSaveButtons
      {...mockProps}
    />
  ),
  'disabled': () => (
    <CancelSaveButtons
      {...mockProps}
      disabled={true}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <CancelSaveButtons
      {...mockProps}
      disabled={knobs.boolean('disabled', !!props.disabled)}
    />
  ),
}

storyBuilder(scenarios, 'Components/CancelSaveButtons')
