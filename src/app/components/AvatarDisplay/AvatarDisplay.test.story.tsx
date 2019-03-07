import React from 'react'
import extend from 'lodash/extend'
import { KnobsInterface } from 'core/test/knobs.types'
import { Scenarios } from 'core/test/scenarios.types'
import { storyBuilder } from 'core/test/stories.utils'

import { Player } from 'app/store/players/types'

import AvatarDisplay, { Props } from './AvatarDisplay'

const player: Player = {
  id: '5c7c2d24287fe6637a21c7da',
  name: 'Fred Flintstone',
  country: 'US',
  winnings: 1000,
}

const withGravatar: Player = extend({
  email: 'mathews.kyle@gmail.com',
}, player)

const withTwitter: Player = extend({
  twitterHandle: 'fredflintstone_',
}, player)

export const mockProps: Props = {
  player,
}

export const scenarios: Scenarios = {
  'basic': () => (
    <AvatarDisplay
      {...mockProps}
    />
  ),
  'gravatar': () => (
    <AvatarDisplay
      player={withGravatar}
    />
  ),
  'twitter': () => (
    <AvatarDisplay
      player={withTwitter}
    />
  ),
  'size': () => (
    <AvatarDisplay
      {...mockProps}
      size={`80px`}
    />
  ),
  'knobs': (
    knobs: KnobsInterface,
    props: Props = mockProps,
  ) => (
    <AvatarDisplay
      player={{
        name: knobs.text('player.name', props.player.name || ''),
        email: knobs.text('player.email', props.player.email || ''),
        twitterHandle: knobs.text('player.twitterHandle', props.player.twitterHandle || ''),
      }}
      size={String(knobs.number('size', 30))}
    />
  ),
}

storyBuilder(scenarios, 'Components/AvatarDisplay')
