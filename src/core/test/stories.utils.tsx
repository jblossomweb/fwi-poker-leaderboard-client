import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import keys from 'lodash/keys'

import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
  number,
  object,
  select,
} from '@storybook/addon-knobs/react'
import { checkA11y } from '@storybook/addon-a11y'

import { StoryBuilder } from './stories.types'
import { Scenarios } from './scenarios.types'

const knobs = {
  text,
  boolean,
  number,
  object,
  select,
}

export const storyBuilder: StoryBuilder = (
  scenarios: Scenarios,
  storyPath: string,
) => {
  const stories = storiesOf(storyPath, module)
  stories
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)

  keys(scenarios).forEach((key: string) => {
    stories.add(key, () => (
      <React.Fragment>
        <Router>
          <div>
            {scenarios[key](knobs)}
          </div>
        </Router>
      </React.Fragment>
    ))
  })
}
