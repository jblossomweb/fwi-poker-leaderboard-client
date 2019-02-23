import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import { scenarios } from './SampleLinks.test.story'
import SampleLinks from './SampleLinks'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  SampleLinks,
  component => ({
  a: component.find('a'),
  pipe: component.find('span[data-index="pipe"]'),
}))

describe('components/SampleLinks', () => {
  it(`always mounts the SampleLinks component`, () => {
    forEach(scenes, scene => {
      expect(
        scene.component.length,
      ).toBe(1)
    })
  })
  it(`always renders same number of <a> elements as props.links`, () => {
    forEach(scenes, scene => {
      expect(
        scene.elements.a.length,
      ).toBe(scene.props.links.length)
    })
  })
  it(`always renders one less pipe than number of props.links`, () => {
    forEach(scenes, scene => {
      expect(
        scene.elements.pipe.length,
      ).toBe(scene.props.links.length - 1)
    })
  })
  it(`always renders <a> elements with target="_blank" when link.external is true`, () => {
    forEach(scenes, scene => {
      const links = scene.props.links
      const anchors = scene.elements.a
      forEach(links, (link, i) => {
        const anchor = anchors.get(i)
        if (link.external) {
          expect(anchor.props.target).toEqual('_blank')
        } else {
          expect(anchor.props.target).toEqual('')
        }
      })
    })
  })
})
