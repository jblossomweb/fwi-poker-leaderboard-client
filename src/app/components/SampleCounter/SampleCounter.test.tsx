import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import { scenarios, mockProps } from './SampleCounter.test.story'
import SampleCounter from './SampleCounter'

const spies = {
  increment: jest.spyOn(mockProps, 'increment'),
  decrement: jest.spyOn(mockProps, 'decrement'),
  setTo: jest.spyOn(mockProps, 'setTo'),
}

const scenes = getTestScenes(
  mountScenarios(scenarios),
  SampleCounter,
  component => ({
    button: component.find('button'),
    numberInput: component.find('input[data-index="numberInput"]'),
    upArrow: component.find('button[data-index="upArrow"]'),
    downArrow: component.find('button[data-index="downArrow"]'),
    clover: component.find('a[data-index="clover"]'),
}))

describe('components/SampleCounter', () => {

  it(`always mounts the SampleCounter component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })

  it(`always renders a single numberInput`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.numberInput.length).toBe(1)
    })
  })

  it(`always renders props.value in numberInput`, () => {
    forEach(scenes, scene => {
      const numberInput = scene.elements.numberInput
      const value: number = numberInput.props().value
      expect(value).toEqual(scene.props.value)
    })
  })

  it(`always calls props.setTo(Number(value)) one time when numberInput is changed to a numeric string`, () => {
    const value: string = '42'
    const spy = spies.setTo
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      scene.elements.numberInput.simulate('change', {
        target: { value }
      })
      expectedCalls++
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
      expect(spy).toHaveBeenLastCalledWith(Number(value))
    })
    spy.mockClear()
  })

  it(`always calls props.setTo(0) when numberInput is changed to a blank string`, () => {
    const value: string = ''
    const spy = spies.setTo
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      scene.elements.numberInput.simulate('change', {
        target: { value }
      })
      expectedCalls++
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
      expect(spy).toHaveBeenLastCalledWith(0)
    })
    spy.mockClear()
  })

  it(`never calls props.setTo when numberInput is changed to a non-blank string`, () => {
    const value: string = 'not a number'
    const spy = spies.setTo
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      scene.elements.numberInput.simulate('change', {
        target: { value }
      })
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
    })
    spy.mockClear()
  })

  it(`always renders 2 <button> elements`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.button.length).toBe(2)
    })
  })

  it(`always renders a single upArrow`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.upArrow.length).toBe(1)
    })
  })

  it(`always calls props.increment() one time when upArrow is clicked`, () => {
    const spy = spies.increment
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      scene.elements.upArrow.simulate('click')
      expectedCalls++
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
    })
    spy.mockClear()
  })

  it(`always renders a single downArrow`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.downArrow.length).toBe(1)
    })
  })

  it(`always calls props.decrement() one time when downArrow is clicked`, () => {
    const spy = spies.decrement
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      scene.elements.downArrow.simulate('click')
      expectedCalls++
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
    })
    spy.mockClear()
  })

  it(`always renders a single clover`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.clover.length).toBe(1)
    })
  })

  it(`always calls props.setTo(7) one time when clover is clicked`, () => {
    const spy = spies.setTo
    let expectedCalls: number = 0
    expect(spy).toHaveBeenCalledTimes(expectedCalls)
    forEach(scenes, scene => {
      scene.elements.clover.simulate('click')
      expectedCalls++
      expect(spy).toHaveBeenCalledTimes(expectedCalls)
    })
    spy.mockClear()
  })
})
