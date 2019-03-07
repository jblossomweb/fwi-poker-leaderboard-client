import forEach from 'lodash/forEach'
import { Tooltip } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios } from './CountryDisplay.test.story'
import { Country } from 'app/data/countries.types'
import CountryDisplay, { findByCode } from './CountryDisplay'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  CountryDisplay,
  component => ({
    Tooltip: component.find(Tooltip),
}))

const country: Country = {
  code: 'US',
  emoji: '🇺🇸',
  name: 'United States',
}

describe('components/CountryDisplay', () => {
  it(`always mounts the CountryDisplay component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`mounts a Tooltip wrapper when code is valid`, () => {
    forEach(scenes, scene => {
      if (findByCode(scene.props.code)) {
        expect(scene.elements.Tooltip.length).toBe(1)
      }
    })
  })
  it(`does not mount a Tooltip wrapper when code is invalid`, () => {
    forEach(scenes, scene => {
      if (!findByCode(scene.props.code)) {
        expect(scene.elements.Tooltip.length).toBe(0)
      }
    })
  })
  describe('findByCode', () => {
    it(`returns country object from a valid code`, () => {
      expect(findByCode(country.code)).toEqual(country)
    })
    it(`returns falsey from invalid code`, () => {
      expect(!!findByCode('XX')).toBe(false)
    })
  })
})
