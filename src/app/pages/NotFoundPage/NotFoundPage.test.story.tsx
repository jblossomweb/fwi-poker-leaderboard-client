import React from 'react'
import 'antd/dist/antd.css'
import 'app/../index.css'
import { storyBuilder } from 'core/test/stories.utils'
import { Scenarios } from 'core/test/scenarios.types'

import NotFound from './NotFoundPage'

export const scenarios: Scenarios = {
  'basic': () => (
    <NotFound />
  ),
}

storyBuilder(scenarios, 'Pages/NotFoundPage')
