import { Scenarios } from './scenarios.types'

export type StoryBuilder = (
  scenarios: Scenarios,
  storyPath: string,
) => void
