import windowOrGlobal from 'window-or-global'
import forEach from 'lodash/forEach'
import { Spin, Form, Button } from 'antd'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import CountrySelect from 'app/components/CountrySelect'
import { scenarios, mockProps } from './AddPlayerForm.test.story'
import { WrappedAddPlayerForm, AddPlayerForm } from './AddPlayerForm'

windowOrGlobal.console.warn = jest.fn()
windowOrGlobal.console.error = jest.fn()

const spies = {
  saveAddedPlayer: jest.spyOn(mockProps, 'saveAddedPlayer'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  WrappedAddPlayerForm,
  component => ({
    AddPlayerForm: component.find(AddPlayerForm),
    Spin: component.find(Spin),
    Form: component.find(Form),
    CountrySelect: component.find(CountrySelect),
    inputName: component.find('input#addPlayer_name'),
    inputWinnings: component.find('input#addPlayer_winnings'),
    Button: component.find(Button),
}))

describe('components/AddPlayerForm', () => {

  it(`always mounts the WrappedAddPlayerForm component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })

  it(`always mounts the AddPlayerForm component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.AddPlayerForm.length).toBe(1)
    })
  })

  it(`always mounts the AddPlayerForm with 'form' prop from wrapper`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.AddPlayerForm.props()).toHaveProperty('form')
    })
  })

  it(`always mounts a Spin component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Spin.length).toBe(1)
    })
  })

  it(`spins the Spin component when savingAddedPlayer is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.savingAddedPlayer) {
        expect(scene.elements.Spin.props().spinning).toBe(true)
      }
    })
  })

  it(`does not spin the Spin component when savingAddedPlayer is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        expect(scene.elements.Spin.props().spinning).toBe(false)
      }
    })
  })

  it(`always mounts a Form component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Form.length).toBe(1)
    })
  })

  it(`always mounts a 'name' input component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.inputName.length).toBe(1)
    })
  })

  it(`always mounts a CountrySelect component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.CountrySelect.length).toBe(1)
    })
  })

  it(`always mounts a 'winnings' input component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.inputWinnings.length).toBe(1)
    })
  })

  it(`always mounts a Button component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Button.length).toBe(1)
    })
  })

  it(`calls handleSubmit when Button is clicked`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const button = scene.elements.Button
        const instance = scene.elements.AddPlayerForm.instance()
        const handleSubmit = jest.spyOn(instance, 'handleSubmit')
        button.simulate('click', () => {
          expect(handleSubmit).toHaveBeenCalled()
        })
      }
    })
  })

  it(`calls handleSubmit when Form is submitted`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const form = scene.elements.Form
        const instance = scene.elements.AddPlayerForm.instance()
        const handleSubmit = jest.spyOn(instance, 'handleSubmit')
        form.simulate('submit', () => {
          expect(handleSubmit).toHaveBeenCalled()
        })
      }
    })
  })

  it(`calls event.preventDefault when handleSubmit is called`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const event = { preventDefault: jest.fn() }
        instance.handleSubmit(event)
        expect(event.preventDefault).toHaveBeenCalled()
      }
    })
  })

  it(`runs validateFields when handleSubmit is called`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const event = { preventDefault: jest.fn() }
        const formHelper = instance.props.form
        const validateFields = jest.spyOn(formHelper, 'validateFields')
        instance.handleSubmit(event)
        expect(validateFields).toHaveBeenCalled()
      }
    })
  })

  it(`fails validateFields when 'name' is undefined`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const formHelper = instance.props.form
        const callback = jest.fn()
        formHelper.setFieldsValue({
          country: 'US',
          winnings: 1000,
        })
        formHelper.validateFields(callback)
        expect(callback).toHaveBeenCalled()
        const lastCall = callback.mock.calls[0]
        const error = lastCall[0]
        expect(error).toHaveProperty('name')
      }
    })
  })

  it(`fails validateFields when 'country' is undefined`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const formHelper = instance.props.form
        const callback = jest.fn()
        formHelper.setFieldsValue({
          name: 'Fred Flintstone',
          country: undefined,
          winnings: 1000,
        })
        formHelper.validateFields(callback)
        expect(callback).toHaveBeenCalled()
        const lastCall = callback.mock.calls[0]
        const error = lastCall[0]
        expect(error).toHaveProperty('country')
      }
    })
  })

  it(`fails validateFields when 'country' is not 2 characters`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const formHelper = instance.props.form
        const callback = jest.fn()
        formHelper.setFieldsValue({
          name: 'Fred Flintstone',
          country: 'USAAAAAA',
          winnings: 1000,
        })
        formHelper.validateFields(callback)
        expect(callback).toHaveBeenCalled()
        const lastCall = callback.mock.calls[0]
        const error = lastCall[0]
        expect(error).toHaveProperty('country')
      }
    })
  })

  it(`fails validateFields when 'winnings' is undefined`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const formHelper = instance.props.form
        const callback = jest.fn()
        formHelper.setFieldsValue({
          name: 'Fred Flintstone',
          country: 'US',
          winnings: undefined,
        })
        formHelper.validateFields(callback)
        expect(callback).toHaveBeenCalled()
        const lastCall = callback.mock.calls[0]
        const error = lastCall[0]
        expect(error).toHaveProperty('winnings')
      }
    })
  })

  it(`fails validateFields when 'winnings' is not numeric`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const formHelper = instance.props.form
        const callback = jest.fn()
        formHelper.setFieldsValue({
          name: 'Fred Flintstone',
          country: 'US',
          winnings: 'ABCDEFG',
        })
        formHelper.validateFields(callback)
        expect(callback).toHaveBeenCalled()
        const lastCall = callback.mock.calls[0]
        const error = lastCall[0]
        expect(error).toHaveProperty('winnings')
      }
    })
  })

  it(`fails validateFields when 'winnings' is a negative number`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const formHelper = instance.props.form
        const callback = jest.fn()
        formHelper.setFieldsValue({
          name: 'Fred Flintstone',
          country: 'US',
          winnings: -1,
        })
        formHelper.validateFields(callback)
        expect(callback).toHaveBeenCalled()
        const lastCall = callback.mock.calls[0]
        const error = lastCall[0]
        expect(error).toHaveProperty('winnings')
      }
    })
  })

  it(`calls saveAddedPlayer when validateFields passes`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const newPlayer = {
          name: 'Fred Flintstone',
          country: 'US',
          winnings: 1000,
        }
        const event = { preventDefault: jest.fn() }
        const formHelper = instance.props.form
        formHelper.validateFields = (
          callback: (error: any, values: any) => void,
        ) => {
          // simulate pass
          callback(null, newPlayer)
        }
        instance.handleSubmit(event)
        expect(spies.saveAddedPlayer).toHaveBeenLastCalledWith(newPlayer)
        spies.saveAddedPlayer.mockClear()
      }
    })
  })

  it(`does not call saveAddedPlayer when validateFields fails`, () => {
    forEach(scenes, scene => {
      if (!scene.props.savingAddedPlayer) {
        const instance = scene.elements.AddPlayerForm.instance()
        const event = { preventDefault: jest.fn() }
        const formHelper = instance.props.form
        formHelper.validateFields = (
          callback: (error: any, values?: any) => void,
        ) => {
          // simulate fail
          callback(new Error('fail'))
        }
        instance.handleSubmit(event)
        expect(spies.saveAddedPlayer).not.toHaveBeenCalled()
        spies.saveAddedPlayer.mockClear()
      }
    })
  })
})
