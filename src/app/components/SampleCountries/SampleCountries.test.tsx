import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import { scenarios, mockProps } from './SampleCountries.test.story'
import SampleCountries from './SampleCountries'

const spies = {
  getCountries: jest.spyOn(mockProps, 'getCountries'),
  selectCountry: jest.spyOn(mockProps, 'selectCountry'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  SampleCountries,
  component => ({
    getCountries: component.find('button[data-index="getCountries"]'),
    selectCountry: component.find('select[data-index="selectCountry"]'),
    countryInfo: component.find('div[data-index="countryInfo"]'),
    thunkingSpinner: component.find('img[data-index="thunkingSpinner"]'),
}))

describe('components/SampleCountries', () => {

  it(`always mounts the SampleCountries component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })

  it(`always renders a single getCountries <button> when there are no countries`, () => {
    forEach(scenes, scene => {
      const { countries } = scene.props
      if (!countries || !countries.length) {
        expect(scene.elements.getCountries.length).toBe(1)
      }
    })
  })

  it(`never renders a getCountries <button> when there are countries`, () => {
    forEach(scenes, scene => {
      const { countries } = scene.props
      if (countries && countries.length) {
        expect(scene.elements.getCountries.length).toBe(0)
      }
    })
  })

  it(`always calls props.getCountries() one time when getCountries is clicked`, () => {
    const spy = spies.getCountries
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      const { countries } = scene.props
      if (!countries || !countries.length) {
        scene.elements.getCountries.simulate('click')
        expectedCalls++
      }
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
    })
    spy.mockClear()
  })

  it(`always renders a single selectCountry <select> when there are countries, and not thunking`, () => {
    forEach(scenes, scene => {
      const { countries, thunking } = scene.props
      if (!thunking && countries && countries.length) {
        expect(scene.elements.selectCountry.length).toBe(1)
      }
    })
  })

  it(`never renders a selectCountry <select> unless there are countries`, () => {
    forEach(scenes, scene => {
      const { countries } = scene.props
      if (!countries || !countries.length) {
        expect(scene.elements.selectCountry.length).toBe(0)
      }
    })
  })

  it(`never renders a selectCountry <select> when thunking`, () => {
    forEach(scenes, scene => {
      const { thunking } = scene.props
      if (thunking) {
        expect(scene.elements.selectCountry.length).toBe(0)
      }
    })
  })

  it(`always calls props.selectCountry(code) one time when selectCountry <select> is changed to a truthy value`, () => {
    const code = 'US'
    const spy = spies.selectCountry
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      const { countries, thunking } = scene.props
      if (!thunking && countries && countries.length) {
        scene.elements.selectCountry.simulate('change', {
          target: { value : code}
        })
        expectedCalls++
      }
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
      expect(spy).toHaveBeenLastCalledWith(code)
    })
    spy.mockClear()
  })

  it(`never calls props.selectCountry(code) unless selectCountry <select> is changed to a truthy value`, () => {
    const code = null
    const spy = spies.selectCountry
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      const { countries, thunking } = scene.props
      if (!thunking && countries && countries.length) {
        scene.elements.selectCountry.simulate('change', {
          target: { value : code}
        })
      }
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
    })
    spy.mockClear()
  })

  it(`always renders a single countryInfo <div> when there are countries, one is selected, and no error`, () => {
    forEach(scenes, scene => {
      const { countries, country, error } = scene.props
      if (!error && countries && countries.length && country) {
        expect(scene.elements.countryInfo.length).toBe(1)
      }
    })
  })

  it(`never renders a countryInfo <div> when there is an error`, () => {
    forEach(scenes, scene => {
      const { error } = scene.props
      if (error) {
        expect(scene.elements.countryInfo.length).toBe(0)
      }
    })
  })

  it(`never renders a countryInfo <div> unless a country is selected`, () => {
    forEach(scenes, scene => {
      const { country } = scene.props
      if (!country) {
        expect(scene.elements.countryInfo.length).toBe(0)
      }
    })
  })
  
})
