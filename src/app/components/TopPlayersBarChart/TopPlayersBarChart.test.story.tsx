import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'
import { players } from 'app/store/players/mocks'

import TopPlayersBarChart, { Props } from './TopPlayersBarChart'

export const mockProps: Props = {
  fetchingPlayers: false,
  fetchPlayersError: null,
  topPlayersBarData: players.slice(0, 3),
}

export const scenarios: Scenarios = {
  'basic': () => (
    <TopPlayersBarChart
      {...mockProps}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <TopPlayersBarChart
      fetchingPlayers={knobs.boolean('fetchingPlayers', props.fetchingPlayers)}
      fetchPlayersError={knobs.object('fetchPlayersError', props.fetchPlayersError)}
      topPlayersBarData={knobs.object('countryWinningsPieData', props.topPlayersBarData)}
    />
  ),
}

storyBuilder(scenarios, 'Components/TopPlayersBarChart')
