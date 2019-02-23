import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import SampleCounter, { Props } from './SampleCounter'

let mockValue: number = 0

export const mockProps: Props = {
  value: mockValue,
  increment: () => {
    mockValue++
  },
  decrement: () => {
    mockValue--
  },
  setTo: (n: number) => {
    mockValue = n
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <SampleCounter
      {...mockProps}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <SampleCounter
      {...mockProps}
      value={knobs.number('value', props.value)}
    />
  ),
}

storyBuilder(scenarios, 'Components/SampleCounter')
