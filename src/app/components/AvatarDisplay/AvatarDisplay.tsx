import React from 'react'
import Avatar, { ReactAvatarProps, ConfigProvider } from 'react-avatar'

import config from 'app/config'
import { Player } from 'app/store/players/types'

export interface Props {
  player: Player | Partial<Player>,
  size?: ReactAvatarProps['size'],
}

export default (props: Props) => (
  <ConfigProvider avatarRedirectUrl={config.avatarRedirectUrl}>
    <Avatar
      name={props.player && props.player.name}
      email={props.player && props.player.email}
      twitterHandle={props.player && props.player.twitterHandle || ''}
      round={true}
      size={props.size || `30`}
    />
  </ConfigProvider>
)
