import React from 'react'
import concat from 'lodash/concat'
import { createMemoryHistory } from 'history'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'
import { menuRoutes } from 'app/App.routes'

import MainMenu, { Props } from './MainMenu'

export const mockProps: Props = {
  history: createMemoryHistory({}),
  routes: [
    {
      title: `Home`,
      icon: `home`,
      path: `/home`,
    },
    {
      title: `Menu Item`,
      icon: `coffee`,
      path: `/item`,
    },
  ],
  current: '/home',
}

export const routesWithChildRoutes: Props['routes'] = concat(mockProps.routes, [{
  title: `Parent Item`,
  icon: `crown`,
  path: `/parent`,
  childRoutes: [
    {
      title: `Child One`,
      icon: `smile`,
      path: `/child-one`,
    },
    {
      title: `Child Two`,
      icon: `thunderbolt`,
      path: `/child-two`,
    },
  ]
}])

export const routesWithNoIcon: Props['routes'] = concat(mockProps.routes, [{
  title: `No Icon Item`,
  path: `/no-icon`,
}])

export const scenarios: Scenarios = {
  'basic': () => (
    <MainMenu
      {...mockProps}
    />
  ),
  'item selected': () => (
    <MainMenu
      {...mockProps}
      current={`/item`}
    />
  ),
  'none selected': () => (
    <MainMenu
      {...mockProps}
      current={``}
    />
  ),
  'child routes': () => (
    <MainMenu
      {...mockProps}
      routes={routesWithChildRoutes}
      current={`/home`}
    />
  ),
  'no icon': () => (
    <MainMenu
      {...mockProps}
      routes={routesWithNoIcon}
      current={`/home`}
    />
  ),
  'actual menuRoutes': () => (
    <MainMenu
      {...mockProps}
      routes={menuRoutes}
      current={`/home`}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <MainMenu
      {...mockProps}
      current={knobs.select('current', ['/home', '/item', '/child-one', '/child-two'], props.current)}
      routes={knobs.object('fetchingPlayers', routesWithChildRoutes)}
    />
  ),
}

storyBuilder(scenarios, 'Components/MainMenu')
