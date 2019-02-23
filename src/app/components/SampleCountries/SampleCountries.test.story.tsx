import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import { countries, country, error } from 'app/store/sample/sample.test.mocks'

import SampleCountries, { Props } from './SampleCountries'

export const mockProps: Props = {
  countries,
  country,
  thunking: false,
  error: null,
  getCountries: () => {
    //
  },
  selectCountry: (code: string) => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <SampleCountries
      {...mockProps}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <SampleCountries
      {...mockProps}
      countries={knobs.object('countries', props.countries)}
      country={knobs.object('country', props.country)}
      thunking={knobs.boolean('thunking', !!props.thunking)}
    />
  ),
  'get countries': () => (
    <SampleCountries
      {...mockProps}
      country={null}
      countries={[]}
    />
  ),
  'select country': () => (
    <SampleCountries
      {...mockProps}
      country={null}
    />
  ),
  'country selected': () => (
    <SampleCountries
      {...mockProps}
    />
  ),
  'thunking, no country': () => (
    <SampleCountries
      {...mockProps}
      thunking={true}
      country={null}
    />
  ),
  'thunking, with country': () => (
    <SampleCountries
      {...mockProps}
      thunking={true}
    />
  ),
  'with error': () => (
    <SampleCountries
      {...mockProps}
      error={error}
    />
  ),
}

storyBuilder(scenarios, 'Components/SampleCountries')
