import forEach from 'lodash/forEach'
import { Tooltip, Input } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios, mockProps } from './NameEdit.test.story'
import NameEdit from './NameEdit'

const spies = {
  editField: jest.spyOn(mockProps, 'editField'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  NameEdit,
  component => ({
    Tooltip: component.find(Tooltip),
    Input: component.find(Input),
}))

describe('components/NameEdit', () => {
  it(`always mounts the NameEdit component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts a Tooltip component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Tooltip.length).toBe(1)
    })
  })
  it(`always mounts an Input component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Input.length).toBe(1)
    })
  })
  it(`calls editField when Input component changes value`, () => {
    forEach(scenes, scene => {
      const input = scene.elements.Input
      const onChange = input.props().onChange
      expect(spies.editField).not.toHaveBeenCalled()
      onChange({ target: { value: 'Freddy Flintstones' }})
      expect(spies.editField).toHaveBeenCalled()
      spies.editField.mockClear()
    })
  })
})
