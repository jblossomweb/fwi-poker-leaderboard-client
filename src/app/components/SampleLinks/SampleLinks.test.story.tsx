import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import SampleLinks, { Props } from './SampleLinks'

export const mockProps: Props = {
  links: [
    {
      title: 'React',
      href: 'https://reactjs.org/',
      external: true,
    },
    {
      title: 'Redux',
      href: 'https://reactjs.org/',
      external: true,
    },
    {
      title: 'Immutable',
      href: 'https://immutable-js.github.io/immutable-js/',
      external: true,
    },
    {
      title: 'Reselect',
      href: 'https://github.com/reduxjs/reselect',
      external: true,
    },
    {
      title: 'Thunk',
      href: 'https://github.com/reduxjs/redux-thunk',
      external: true,
    },
    {
      title: 'Storybook',
      href: 'https://storybook.js.org/',
      external: true,
    },
  ],
}

export const scenarios: Scenarios = {
  'basic': () => (
    <SampleLinks
      {...mockProps}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <SampleLinks
      links={knobs.object('links', props.links)}
    />
  ),
  'external': () => (
    <SampleLinks
      links={[{
        title: 'External',
        href: 'https://www.google.com/',
        external: true,
      }]}
    />
  ),
  'not external': () => (
    <SampleLinks
      links={[{
        title: 'Not External',
        href: 'https://www.google.com/',
        external: false,
      }]}
    />
  ),
}

storyBuilder(scenarios, 'Components/SampleLinks')
