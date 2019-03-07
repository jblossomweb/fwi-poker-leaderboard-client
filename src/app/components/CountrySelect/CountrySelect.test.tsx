// import windowOrGlobal from 'window-or-global'
import forEach from 'lodash/forEach'
import { Form, Select } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios, mockProps } from './CountrySelect.test.story'
import CountrySelect, { WrappedCountrySelect, WrapperProps }  from './CountrySelect'

// windowOrGlobal.console.warn = jest.fn()
// windowOrGlobal.console.error = jest.fn()

const spies = {
  onChange: jest.spyOn(mockProps, 'onChange'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  WrappedCountrySelect,
  component => ({
    CountrySelect: component.find(CountrySelect),
    Form: component.find(Form),
    Select: component.find(Select),
}))

describe('components/CountrySelect', () => {
  describe('WrappedCountrySelect', () => {
    it(`always mounts the WrappedCountrySelect component`, () => {
      forEach(scenes, scene => {
        expect(scene.component.length).toBe(1)
      })
    })

    it(`always mounts a CountrySelect component`, () => {
      forEach(scenes, scene => {
        expect(scene.elements.CountrySelect.length).toBe(1)
      })
    })

    it(`always mounts a Form component`, () => {
      forEach(scenes, scene => {
        expect(scene.elements.Form.length).toBe(1)
      })
    })

    it(`always mounts a Select component`, () => {
      forEach(scenes, scene => {
        expect(scene.elements.Select.length).toBe(1)
      })
    })

    it(`calls props.onChange when Select component value changes`, () => {
      forEach(scenes, scene => {
        const onChange = scene.elements.Select.props().onChange
        expect(spies.onChange).not.toHaveBeenCalled()
        onChange('MX')
        if (scene.props.onChange) {
          expect(spies.onChange).toHaveBeenCalled()
        } else {
          expect(spies.onChange).not.toHaveBeenCalled()
        }
        spies.onChange.mockClear()
      })
    })
  })
})
