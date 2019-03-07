import React from 'react'
import { mount } from 'enzyme'
import forEach from 'lodash/forEach'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'

import PlayerWinningsTable from 'app/components/PlayerWinningsTable'

import { scenarios, mockProps } from './PlayerWinningsPage.test.story'
import PlayerWinningsPage  from './PlayerWinningsPage'

const spies = {
  messageError: jest.spyOn(PlayerWinningsPage.prototype, 'messageError'),
  messageDestroy: jest.spyOn(PlayerWinningsPage.prototype, 'messageDestroy')
}

const mountedScenarios = mountScenarios(scenarios)

const scenes = getTestScenes(
  mountedScenarios,
  PlayerWinningsPage,
  component => ({
    PlayerWinningsTable: component.find(PlayerWinningsTable),
  })
)

describe('components/PlayerWinningsPage', () => {

  it(`always mounts the PlayerWinningsPage component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })

  it(`always mounts a PlayerWinningsTable component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.PlayerWinningsTable.length).toBe(1)
    })
  })

  it(`always passes an array to PlayerWinningsTable props.players`, () => {
    forEach(scenes, scene => {
      const tableProps = scene.elements.PlayerWinningsTable.props()
      expect(tableProps.players).toBeInstanceOf(Array)
    })
  })

  it(`calls props.fetchPlayers on mount if props.players is undefined`, () => {
    let called: boolean = false
    mount(
      <PlayerWinningsPage
        {...mockProps}
        players={undefined}
        fetchPlayers={() => {
          called = true
        }}
      />
    )
    expect(called).toBe(true)
  })

  it(`does not call props.fetchPlayers on mount if props.players is defined`, () => {
    let called: boolean = false
    mount(
      <PlayerWinningsPage
        {...mockProps}
        fetchPlayers={() => {
          called = true
        }}
      />
    )
    expect(called).toBe(false)
  })

  it(`displays a notification if there are errors`, () => {
    forEach(scenes, scene => {
      const props = scene.props
      if (
        props.fetchPlayersError ||
        props.saveEditedPlayerError ||
        props.saveAddedPlayerError ||
        props.deletePlayerError
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
        !props.fetchPlayersError &&
        !props.saveEditedPlayerError &&
        !props.saveAddedPlayerError &&
        !props.deletePlayerError
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
