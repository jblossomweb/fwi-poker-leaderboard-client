import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import { scenarios } from './HomePage.test.story'
import HomePage from './HomePage'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  HomePage,
  component => ({})
)

describe('Pages/HomePage', () => {
  it(`always mounts the HomePage component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
})
