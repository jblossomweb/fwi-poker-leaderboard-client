import React from 'react'
import 'antd/dist/antd.css'
import 'app/../index.css'
import { KnobsInterface } from 'core/test/knobs.types'
import { storyBuilder } from 'core/test/stories.utils'
import { Scenarios } from 'core/test/scenarios.types'
import { players, error } from 'app/store/players/mocks'

import HomePage, { Props } from './HomePage'

export const mockProps: Props = {
  fetchingPlayers: false,
  fetchPlayersError: null,
  totalWinnings: 6000,
  topPlayersBarData: players.slice(0, 3),
  countryWinningsPieData: [
    {
      country: 'US',
      winnings: 6000,
    },
  ],
  fetchPlayers: () => {
    //
  },
}

export const scenarios: Scenarios = {
  'basic': () => (
    <HomePage
      {...mockProps}
    />
  ),
  'fetching': () => (
    <HomePage
      {...mockProps}
      topPlayersBarData={[]}
      fetchingPlayers={true}
    />
  ),
  'fetch error': () => (
    <HomePage
      {...mockProps}
      topPlayersBarData={[]}
      fetchPlayersError={error}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <HomePage
      {...mockProps}
      fetchingPlayers={knobs.boolean('fetchingPlayers', props.fetchingPlayers)}
      fetchPlayersError={knobs.object('fetchPlayersError', props.fetchPlayersError)}
      totalWinnings={knobs.number('totalWinnings', props.totalWinnings || 0)}
      topPlayersBarData={knobs.object('topPlayersBarData', props.topPlayersBarData)}
      countryWinningsPieData={knobs.object('countryWinningsPieData', props.countryWinningsPieData)}
    />
  ),
}

storyBuilder(scenarios, 'Pages/HomePage')
