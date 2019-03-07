import React from 'react'
import { Tooltip, Input, Icon } from 'antd'
import { Player, PlayerEdits } from 'app/store/players/types'

export interface Props {
  player: Player,
  playerEdits: PlayerEdits,
  savingEditedPlayer: boolean,
  editField: (id: Player['id'], field: string, value: any) => void,
}

export default (props: Props) => (
  <Tooltip title={`enter full name`}>
    <Input
      size={`small`}
      defaultValue={
        (
          props.playerEdits[props.player.id] &&
          props.playerEdits[props.player.id].name
          ) ||
        props.player.name
      }
      disabled={props.savingEditedPlayer}
      prefix={<Icon type={`user`} style={{ color: 'rgba(0,0,0,.25)' }} />}
      onChange={({ target: { value } }) => value && props.editField(
        props.player.id,
        'name',
        value,
      )}
    />
  </Tooltip>
)
