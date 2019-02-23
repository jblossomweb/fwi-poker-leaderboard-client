import {
  Scenario,
  Scenarios,
  MountedScenario,
  MountedScenarios,
} from './scenarios.types'

import React from 'react'
import mapValues from 'lodash/mapValues'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter as Router } from 'react-router-dom'
import {
  configure,
  mount,
  shallow,
} from 'enzyme'

import {
  mockKnobs,
} from './knobs.utils'

configure({ adapter: new Adapter() })

export const mountScenarios = (
  scenarios: Scenarios,
) => mapValues(
  scenarios,
  (scenario: Scenario) => mount(
    <Router>
      {scenario(mockKnobs)}
    </Router>
  )
)

export const shallowMountScenarios = (
  scenarios: Scenarios,
) => mapValues(
  scenarios,
  (scenario: Scenario) => shallow(
    <Router>
      {scenario(mockKnobs)}
    </Router>
  )
)

export const getTestScenes = (
  mountedScenarios: MountedScenarios,
  mainComponent: (props: any) => JSX.Element,
  getElements: (mountedComponent: any) => any,
) => mapValues(mountedScenarios, (
  pointer: MountedScenario,
) => {
  const component = pointer.find(mainComponent)
  const props = component.props()
  const elements = getElements(component)
  return { component, props, elements }
})
