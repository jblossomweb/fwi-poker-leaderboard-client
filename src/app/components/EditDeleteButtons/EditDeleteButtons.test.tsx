import forEach from 'lodash/forEach'
import { Tooltip, Button, Popconfirm } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios, mockProps } from './EditDeleteButtons.test.story'
import EditDeleteButtons from './EditDeleteButtons'

const spies = {
  onEdit: jest.spyOn(mockProps, 'onEdit'),
  onDelete: jest.spyOn(mockProps, 'onDelete'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  EditDeleteButtons,
  component => ({
    Tooltip: component.find(Tooltip),
    Button: component.find(Button),
    ButtonGroup: component.find(Button.Group),
    buttonEdit: component.find('Button[data-tag="buttonEdit"]'),
    buttonDelete: component.find('Button[data-tag="buttonDelete"]'),
    Popconfirm: component.find(Popconfirm)
}))

describe('components/EditDeleteButtons', () => {
  it(`always mounts the EditDeleteButtons component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts a Button.Group component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.ButtonGroup.length).toBe(1)
    })
  })
  it(`always mounts at least 2 Tooltip components`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Tooltip.length).toBeGreaterThanOrEqual(2)
    })
  })
  it(`always mounts 2 Button components`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Button.length).toBe(2)
    })
  })
  it(`always mounts a buttonEdit component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.buttonEdit.length).toBe(1)
    })
  })
  it(`calls onEdit when buttonEdit is clicked`, () => {
    forEach(scenes, scene => {
      const button = scene.elements.buttonEdit
      const onClick = button.props().onClick
      expect(spies.onEdit).not.toHaveBeenCalled()
      onClick()
      expect(spies.onEdit).toHaveBeenCalled()
      spies.onEdit.mockClear()
    })
  })
  it(`always mounts a buttonDelete component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.buttonDelete.length).toBe(1)
    })
  })
  it(`always mounts a Popconfirm component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Popconfirm.length).toBe(1)
    })
  })
  it(`calls onDelete when save Popconfirm is confirmed`, () => {
    forEach(scenes, scene => {
      const popConfirm = scene.elements.Popconfirm
      const onConfirm = popConfirm.props().onConfirm
      expect(spies.onDelete).not.toHaveBeenCalled()
      onConfirm()
      expect(spies.onDelete).toHaveBeenCalled()
      spies.onDelete.mockClear()
    })
  })
})
