import React from 'react'
import 'jest-canvas-mock'
import forEach from 'lodash/forEach'
import { mount } from 'enzyme'
import { Menu, Icon } from 'antd'
import { MemoryRouter as Router } from 'react-router-dom'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios, mockProps, routesWithNoIcon } from './MainMenu.test.story'
import MainMenu, { MainMenuItem, MainMenuItemTitle } from './MainMenu'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  MainMenu,
  component => ({
    Menu: component.find(Menu),
    MainMenuItemTitle: component.find(MainMenuItemTitle),
}))

describe('components/MainMenu', () => {
  it(`always mounts the MainMenu component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts MainMenuItemTitle components when there are routes`, () => {
    forEach(scenes, scene => {
      if (scene.props.routes.length) {
        expect(scene.elements.MainMenuItemTitle.length).toBeGreaterThan(0)
      }
    })
  })
  it(`pushes route to history when an item is clicked`, () => {
    forEach(scenes, scene => {
      const push = jest.spyOn(scene.props.history, 'push')
      const onClick = scene.elements.Menu.first().props().onClick
      const event = { key: '/foo'}
      onClick(event)
      expect(push).toHaveBeenLastCalledWith(event.key)
    })
  })
  describe('MainMenuItem', () => {
    it(`always mounts the MainMenuItem for a route`, () => {
      forEach(mockProps.routes, route => {
        const mounted = mount(
          <Router>
            <Menu>
              {MainMenuItem(route)}
            </Menu>
          </Router>
        )
        expect(mounted.length).toBe(1)
      })
    })
  })
  describe('MainMenuItemTitle', () => {
    it(`always mounts the MainMenuItemTitle for a route`, () => {
      forEach(mockProps.routes, route => {
        const mounted = mount(MainMenuItemTitle(route))
        expect(mounted.length).toBe(1)
      })
    })
    it(`always mounts an itemTitleWrapper span for a route`, () => {
      forEach(mockProps.routes, route => {
        const mounted = mount(MainMenuItemTitle(route))
        const itemTitleWrapper = mounted.find('span[data-tag="itemTitleWrapper"]')
        expect(itemTitleWrapper.length).toBe(1)
      })
    })
    it(`always mounts an inner itemTitle span for a route`, () => {
      forEach(mockProps.routes, route => {
        const mounted = mount(MainMenuItemTitle(route))
        const itemTitleWrapper = mounted.find('span[data-tag="itemTitleWrapper"]')
        const itemTitle = itemTitleWrapper.find('span[data-tag="itemTitle"]')
        expect(itemTitle.length).toBe(1)
      })
    })
    it(`mounts an inner Icon component for a route with an icon`, () => {
      forEach(mockProps.routes, route => {
        if (route.icon) {
          const mounted = mount(MainMenuItemTitle(route))
          const itemTitleWrapper = mounted.find('span[data-tag="itemTitleWrapper"]')
          const icon = itemTitleWrapper.find(Icon)
          expect(icon.length).toBe(1)
        }
      })
    })
    it(`does not mount an inner Icon component for a route with no icon`, () => {
      forEach(routesWithNoIcon, route => {
        if (!route.icon) {
          const mounted = mount(MainMenuItemTitle(route))
          const itemTitleWrapper = mounted.find('span[data-tag="itemTitleWrapper"]')
          const icon = itemTitleWrapper.find(Icon)
          expect(icon.length).toBe(0)
        }
      })
    })
  })
})
