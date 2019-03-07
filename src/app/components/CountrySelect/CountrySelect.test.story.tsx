import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import countries from 'app/data/countries.json'

import { WrappedCountrySelect, WrapperProps } from './CountrySelect'

export const mockProps = {
  defaultValue: 'US',
  countries,
  onChange: (_value: string) => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <WrappedCountrySelect
      {...mockProps}
    />
  ),
  'disabled': () => (
    <WrappedCountrySelect
      {...mockProps}
      disabled={true}
    />
  ),
  'large': () => (
    <WrappedCountrySelect
      {...mockProps}
      size={`large`}
    />
  ),
  'small': () => (
    <WrappedCountrySelect
      {...mockProps}
      size={`small`}
    />
  ),
  'no onChange': () => (
    <WrappedCountrySelect
      {...mockProps}
      onChange={undefined}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: WrapperProps = mockProps,
  ) => (
    <WrappedCountrySelect
      {...mockProps}
      size={knobs.select('size', ['default', 'large', 'small'], props.size)}
      disabled={knobs.boolean('disabled', !!props.disabled)}
      defaultValue={knobs.text('defaultValue', props.defaultValue || '')}
    />
  ),
}

storyBuilder(scenarios, 'Components/CountrySelect')
