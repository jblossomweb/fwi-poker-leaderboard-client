import { mountScenarios } from 'core/test/scenarios.utils'
import {
  scenarios,
} from './NotFoundPage.test.story'

import NotFound from './NotFoundPage'

const mountedScenarios = mountScenarios(scenarios)

describe('Pages/NotFoundPage', () => {
  it(`mounts the NotFound component`, () => {
    expect(
      mountedScenarios.basic
      .find(NotFound)
      .length
    ).toBe(1)
  })
})
