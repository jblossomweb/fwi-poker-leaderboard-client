import { ReactWrapper } from 'enzyme'

export type Scenario = (...args: any[]) => JSX.Element

export interface Scenarios {
  [key: string]: Scenario
}

export type MountedScenario = ReactWrapper

export interface MountedScenarios {
  [key: string]: MountedScenario
}

export interface Spies {
  [key: string]: Function,
}
