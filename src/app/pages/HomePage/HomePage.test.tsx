import 'jest-canvas-mock'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import { scenarios, mockProps } from './HomePage.test.story'
import HomePage  from './HomePage'

const spies = {
  messageError: jest.spyOn(HomePage.prototype, 'messageError'),
  messageDestroy: jest.spyOn(HomePage.prototype, 'messageDestroy')
}

const mountedScenarios = mountScenarios(scenarios)

const scenes = getTestScenes(
  mountedScenarios,
  HomePage,
  component => ({
    // someElement: component.find(someElement),
  })
)

describe('components/HomePage', () => {

  it(`always mounts the HomePage component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })

  it(`calls props.fetchPlayers on mount if props.topPlayersBarData is empty or undefined`, () => {
    let called: boolean = false
    mount(
      <Router>
        <HomePage
          {...mockProps}
          topPlayersBarData={[]}
          fetchPlayers={() => {
            called = true
          }}
        />
      </Router>
    )
    expect(called).toBe(true)
  })

  it(`does not call props.fetchPlayers on mount if props.topPlayersBarData is defined and not empty`, () => {
    let called: boolean = false
    mount(
      <Router>
        <HomePage
          {...mockProps}
          fetchPlayers={() => {
            called = true
          }}
        />
      </Router>
    )
    expect(called).toBe(false)
  })

  it(`displays a notification if there are errors`, () => {
    forEach(scenes, scene => {
      const props = scene.props
      if (
        props.fetchPlayersError
      ) {
        const instance: any = scene.component.instance()
        expect(spies.messageError).not.toHaveBeenCalled()
        instance.componentDidUpdate(props, props)
        expect(spies.messageError).toHaveBeenCalled()
        spies.messageError.mockClear()
      }
    })
  })

  it(`does not display a notification if there are no errors`, () => {
    forEach(scenes, scene => {
      const props = scene.props
      if (
        !props.fetchPlayersError
      ) {
        const instance: any = scene.component.instance()
        expect(spies.messageError).not.toHaveBeenCalled()
        expect(spies.messageDestroy).not.toHaveBeenCalled()
        instance.componentDidUpdate(props, props)
        expect(spies.messageError).not.toHaveBeenCalled()
        expect(spies.messageDestroy).toHaveBeenCalled()
        spies.messageError.mockClear()
        spies.messageDestroy.mockClear()
      }
    })
  })
})
