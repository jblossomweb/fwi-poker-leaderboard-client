import React from 'react'

import { storyBuilder } from 'core/test/stories.utils'
import { Scenarios } from 'core/test/scenarios.types'

import NotFound from './NotFoundPage'

export const scenarios: Scenarios = {
  'basic': () => (
    <NotFound />
  ),
}

storyBuilder(scenarios, 'Pages/NotFoundPage')
