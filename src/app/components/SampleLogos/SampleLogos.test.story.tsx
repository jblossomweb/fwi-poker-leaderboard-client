import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import SampleLogos, { Props } from './SampleLogos'

export const mockProps: Props = {
  react: true,
  redux: true,
  graphql: true,
  immutable: true,
  storybook: true,
  spin: true,
}

export const scenarios: Scenarios = {
  'basic': () => (
    <SampleLogos
      {...mockProps}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <SampleLogos
      spin={knobs.boolean('spin', !!props.spin)}
      react={knobs.boolean('react', !!props.react)}
      redux={knobs.boolean('redux', !!props.redux)}
      graphql={knobs.boolean('graphql', !!props.graphql)}
      immutable={knobs.boolean('immutable', !!props.immutable)}
      storybook={knobs.boolean('storybook', !!props.storybook)}
    />
  ),
  'no spin': () => (
    <SampleLogos
      {...mockProps}
      spin={false}
    />
  ),
  'no logos': () => (
    <SampleLogos
      {...mockProps}
      react={false}
      redux={false}
      immutable={false}
      storybook={false}
    />
  ),
}

storyBuilder(scenarios, 'Components/SampleLogos')
