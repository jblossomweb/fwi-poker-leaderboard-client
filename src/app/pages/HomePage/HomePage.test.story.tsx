import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { storyBuilder } from 'core/test/stories.utils'
import { Scenarios } from 'core/test/scenarios.types'

import { countries, country } from 'app/store/sample/sample.test.mocks'

import HomePage, { Props } from './HomePage'

let mockNumber: number = 0

export const mockProps: Props = {
  sampleNumber: mockNumber,
  incrementSampleNumber: () => { mockNumber++ },
  decrementSampleNumber: () => { mockNumber-- },
  setSampleNumber: (n: number) => { mockNumber = n },
  fetchSampleCountries: () => {
    //
  },
  fetchSampleCountry: (code: string) => {
    //
  },
  sampleCountries: countries,
  sampleCountry: country,
  sampleThunking: false,
  sampleError: null,
}

export const scenarios: Scenarios = {
  'basic': () => (
    <HomePage
      {...mockProps}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <HomePage
      {...mockProps}
      sampleNumber={knobs.number('sampleNumber', props.sampleNumber)}
      sampleCountries={knobs.object('sampleCountries', props.sampleCountries)}
      sampleCountry={knobs.number('sampleCountry', props.sampleCountry)}
      sampleThunking={knobs.boolean('sampleThunking', props.sampleThunking)}
      sampleError={knobs.object('sampleError', props.sampleError)}
    />
  ),
}

storyBuilder(scenarios, 'Pages/HomePage')
