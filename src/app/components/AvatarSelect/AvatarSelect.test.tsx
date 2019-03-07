import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import { mount } from 'enzyme'
import { Button, Popconfirm, Input } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import AvatarDisplay from 'app/components/AvatarDisplay'
import { scenarios, mockProps } from './AvatarSelect.test.story'
import AvatarSelect from './AvatarSelect'

const spies = {
  editField: jest.spyOn(mockProps, 'editField'),
  saveEditedPlayer: jest.spyOn(mockProps, 'saveEditedPlayer'),
  cancelEditPlayer: jest.spyOn(mockProps, 'cancelEditPlayer'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  AvatarSelect,
  component => ({
    AvatarDisplay: component.find(AvatarDisplay),
    ButtonGroup: component.find(Button.Group),
    Button: component.find(Button),
    Popconfirm: component.find(Popconfirm),
    emailPop: component.find('Popconfirm[data-tag="emailPop"]'),
    emailInput: mount(
      component.find('Popconfirm[data-tag="emailPop"]').props().title
    ).find(Input),
    twitterPop: component.find('Popconfirm[data-tag="twitterPop"]'),
    twitterInput: mount(
      component.find('Popconfirm[data-tag="twitterPop"]').props().title
    ).find(Input),
}))

describe('components/AvatarSelect', () => {
  it(`always mounts the AvatarSelect component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts an AvatarDisplay component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.AvatarDisplay.length).toBe(1)
    })
  })
  it(`always mounts a Button.Group component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.ButtonGroup.length).toBe(1)
    })
  })
  it(`always mounts 2 Button components`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Button.length).toBe(2)
    })
  })
  it(`disables both Button components when props.disabled is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.disabled) {
        const buttonOne = scene.elements.Button.get(0)
        const buttonTwo = scene.elements.Button.get(1)
        expect(buttonOne.props.disabled).toBe(true)
        expect(buttonTwo.props.disabled).toBe(true)
      }
    })
  })
  it(`always mounts 2 Popconfirm components`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Popconfirm.length).toBe(2)
    })
  })
  it(`disables both sets of Popconfirm buttons when props.disabled is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.disabled) {
        const popOne = scene.elements.Popconfirm.get(0)
        const popTwo = scene.elements.Popconfirm.get(1)
        expect(popOne.props.okButtonProps.disabled).toBe(true)
        expect(popOne.props.cancelButtonProps.disabled).toBe(true)
        expect(popTwo.props.okButtonProps.disabled).toBe(true)
        expect(popTwo.props.cancelButtonProps.disabled).toBe(true)
      }
    })
  })
  it(`always mounts emailPop component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.emailPop.length).toBe(1)
    })
  })
  it(`always mounts emailInput component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.emailInput.length).toBe(1)
    })
  })
  it(`disables emailInput component when props.disabled is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.disabled) {
        expect(scene.elements.emailInput.props().disabled).toBe(true)
      }
    })
  })
  it(`calls editField when emailInput is changed to a value`, () => {
    forEach(scenes, scene => {
      const emailInput = scene.elements.emailInput
      const onChange = emailInput.props().onChange
      expect(spies.editField).not.toHaveBeenCalled()
      onChange({ target: { value: 'foo@bar.com' }})
      expect(spies.editField).toHaveBeenCalled()
      spies.editField.mockClear()
    })
  })
  it(`calls saveEditedPlayer when emailPop is confirmed with unsaved changes`, () => {
    forEach(scenes, scene => {
      if (
        scene.props.playerEdits[scene.props.player.id] &&
        keys(scene.props.playerEdits[scene.props.player.id]).length
      ) {
        const emailPop = scene.elements.emailPop
        const onConfirm = emailPop.props().onConfirm
        expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
        onConfirm()
        expect(spies.saveEditedPlayer).toHaveBeenCalled()
        spies.saveEditedPlayer.mockClear()
      }
    })
  })
  it(`does not call saveEditedPlayer when emailPop is confirmed with no unsaved changes`, () => {
    forEach(scenes, scene => {
      if (
        !scene.props.playerEdits[scene.props.player.id] ||
        !keys(scene.props.playerEdits[scene.props.player.id]).length
      ) {
        const emailPop = scene.elements.emailPop
        const onConfirm = emailPop.props().onConfirm
        expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
        onConfirm()
        expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
        spies.saveEditedPlayer.mockClear()
      }
    })
  })
  it(`calls editField to unset playerEdits.email when emailPop is cancelled`, () => {
    forEach(scenes, scene => {
      const emailPop = scene.elements.emailPop
      const onCancel = emailPop.props().onCancel
      expect(spies.editField).not.toHaveBeenCalled()
      onCancel()
      expect(spies.editField).toHaveBeenLastCalledWith(
        scene.props.player.id,
        'email',
        undefined,
      )
      spies.editField.mockClear()
    })
  })
  it(`always mounts twitterPop component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.twitterPop.length).toBe(1)
    })
  })
  it(`always mounts twitterInput component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.twitterInput.length).toBe(1)
    })
  })
  it(`disables twitterInput component when props.disabled is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.disabled) {
        expect(scene.elements.twitterInput.props().disabled).toBe(true)
      }
    })
  })
  it(`calls editField when twitterInput is changed to a value`, () => {
    forEach(scenes, scene => {
      const twitterInput = scene.elements.twitterInput
      const onChange = twitterInput.props().onChange
      expect(spies.editField).not.toHaveBeenCalled()
      onChange({ target: { value: 'foo@bar.com' }})
      expect(spies.editField).toHaveBeenCalled()
      spies.editField.mockClear()
    })
  })
  it(`calls saveEditedPlayer when twitterPop is confirmed with unsaved changes`, () => {
    forEach(scenes, scene => {
      if (
        scene.props.playerEdits[scene.props.player.id] &&
        keys(scene.props.playerEdits[scene.props.player.id]).length
      ) {
        const twitterPop = scene.elements.twitterPop
        const onConfirm = twitterPop.props().onConfirm
        expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
        onConfirm()
        expect(spies.saveEditedPlayer).toHaveBeenCalled()
        spies.saveEditedPlayer.mockClear()
      }
    })
  })
  it(`does not call saveEditedPlayer when twitterPop is confirmed with no unsaved changes`, () => {
    forEach(scenes, scene => {
      if (
        !scene.props.playerEdits[scene.props.player.id] ||
        !keys(scene.props.playerEdits[scene.props.player.id]).length
      ) {
        const twitterPop = scene.elements.twitterPop
        const onConfirm = twitterPop.props().onConfirm
        expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
        onConfirm()
        expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
        spies.saveEditedPlayer.mockClear()
      }
    })
  })
  it(`calls editField to unset playerEdits.twitterHandle when twitterPop is cancelled`, () => {
    forEach(scenes, scene => {
      const twitterPop = scene.elements.twitterPop
      const onCancel = twitterPop.props().onCancel
      expect(spies.editField).not.toHaveBeenCalled()
      onCancel()
      expect(spies.editField).toHaveBeenLastCalledWith(
        scene.props.player.id,
        'twitterHandle',
        undefined,
      )
      spies.editField.mockClear()
    })
  })
})
