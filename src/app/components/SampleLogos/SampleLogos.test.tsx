import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import { scenarios } from './SampleLogos.test.story'
import SampleLogos from './SampleLogos'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  SampleLogos,
  _component => ({})
)

describe('components/SampleLogos', () => {
  it(`always mounts the SampleLogos component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
})
