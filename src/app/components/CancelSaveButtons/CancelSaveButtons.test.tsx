import forEach from 'lodash/forEach'
import { Tooltip, Button } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios, mockProps } from './CancelSaveButtons.test.story'
import CancelSaveButtons from './CancelSaveButtons'

const spies = {
  onCancel: jest.spyOn(mockProps, 'onCancel'),
  onSave: jest.spyOn(mockProps, 'onSave'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  CancelSaveButtons,
  component => ({
    Tooltip: component.find(Tooltip),
    Button: component.find(Button),
    ButtonGroup: component.find(Button.Group),
    buttonCancel: component.find('Button[data-tag="buttonCancel"]'),
    buttonSave: component.find('Button[data-tag="buttonSave"]'),
}))

describe('components/CancelSaveButtons', () => {
  it(`always mounts the CancelSaveButtons component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts a Button.Group component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.ButtonGroup.length).toBe(1)
    })
  })
  it(`always mounts 2 Tooltip components`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Tooltip.length).toBe(2)
    })
  })
  it(`always mounts 2 Button components`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Button.length).toBe(2)
    })
  })
  it(`calls onCancel when cancel Button is clicked`, () => {
    forEach(scenes, scene => {
      const button = scene.elements.buttonCancel
      const onClick = button.props().onClick
      expect(spies.onCancel).not.toHaveBeenCalled()
      onClick()
      expect(spies.onCancel).toHaveBeenCalled()
      spies.onCancel.mockClear()
    })
  })
  it(`calls onSave when save Button is clicked`, () => {
    forEach(scenes, scene => {
      const button = scene.elements.buttonSave
      const onClick = button.props().onClick
      expect(spies.onSave).not.toHaveBeenCalled()
      onClick()
      expect(spies.onSave).toHaveBeenCalled()
      spies.onSave.mockClear()
    })
  })
})
