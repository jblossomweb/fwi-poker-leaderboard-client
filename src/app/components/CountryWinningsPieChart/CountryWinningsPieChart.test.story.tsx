import React from 'react'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import CountryWinningsPieChart, { Props } from './CountryWinningsPieChart'

export const mockProps: Props = {
  fetchingPlayers: false,
  fetchPlayersError: null,
  countryWinningsPieData: [
    { country: 'US', winnings: 1000 },
    { country: 'CA', winnings: 600 },
    { country: 'MX', winnings: 900 },
    { country: 'NI', winnings: 300 },
    { country: 'JP', winnings: 500 },
    { country: 'CN', winnings: 1200 },
    { country: 'RU', winnings: 1100 },
  ],
}

export const scenarios: Scenarios = {
  'basic': () => (
    <CountryWinningsPieChart
      {...mockProps}
    />
  ),
  'no data': () => (
    <CountryWinningsPieChart
      {...mockProps}
      countryWinningsPieData={[]}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <CountryWinningsPieChart
      fetchingPlayers={knobs.boolean('fetchingPlayers', props.fetchingPlayers)}
      fetchPlayersError={knobs.object('fetchPlayersError', props.fetchPlayersError)}
      countryWinningsPieData={knobs.object('countryWinningsPieData', props.countryWinningsPieData)}
    />
  ),
}

storyBuilder(scenarios, 'Components/CountryWinningsPieChart')
