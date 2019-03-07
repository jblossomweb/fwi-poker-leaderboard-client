import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import CountryDisplay, { Props } from './CountryDisplay'

const code: Props['code'] = 'US'

export const mockProps: Props = {
  code,
}

export const scenarios: Scenarios = {
  'basic': () => (
    <CountryDisplay
      {...mockProps}
    />
  ),
  'full': () => (
    <CountryDisplay
      {...mockProps}
      full={true}
    />
  ),
  'japan': () => (
    <CountryDisplay
      code={`JP`}
    />
  ),
  'invalid code': () => (
    <CountryDisplay
      code={`XX`}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <CountryDisplay
      code={knobs.text('code', props.code)}
      full={knobs.boolean('full', !!props.full)}
    />
  ),
}

storyBuilder(scenarios, 'Components/CountryDisplay')
