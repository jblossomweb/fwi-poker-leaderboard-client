import React from 'react'
import keys from 'lodash/keys'
import {
  Button, Tooltip, Popconfirm, Input, Icon
} from 'antd'
import { Primitive } from 'core/store/state.types'
import { Player, PlayerEdits } from 'app/store/players/types'
import AvatarDisplay from 'app/components/AvatarDisplay'

import styles from './AvatarSelect.module.css'

export interface Props {
  player: Player,
  disabled?: boolean,
  playerEdits: PlayerEdits,
  editField: (id: Player['id'], field: string, value: Primitive) => void,
  saveEditedPlayer: (id: Player['id'], update: Partial<Player>) => void,
  cancelEditPlayer: (id: Player['id']) => void,
}

export default (
  props: Props,
) => (
<div className={styles.wrapper}>
  <div className={styles.avatar}>
    <AvatarDisplay player={props.player} />
  </div>
  <Button.Group className={styles.buttons}>
    <Tooltip title={`email`}>
      <Popconfirm
        data-tag={`emailPop`}
        icon={false}
        title={(
          <Tooltip title={`enter email for gravitar`}>
            <Input
              data-tag={`emailInput`}
              size={`small`}
              defaultValue={
                (
                  props.playerEdits[props.player.id] &&
                  props.playerEdits[props.player.id].email
                ) || props.player.email
              }
              placeholder={`email`}
              disabled={props.disabled}
              prefix={<Icon type={`mail`} style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={({ target: { value } }) => value && props.editField(
                props.player.id,
                'email',
                value,
              )}
            />
          </Tooltip>
        )}
        cancelText={`cancel`}
        cancelButtonProps={{ icon: `close-circle`, disabled: props.disabled }}
        okText={`ok`}
        okType={`primary`}
        okButtonProps={{ icon: `save`, disabled: props.disabled }}
        placement={`bottom`}
        onConfirm={() => {
          const unsavedChanges = props.playerEdits[props.player.id]
          if (unsavedChanges && keys(unsavedChanges).length) {
            props.saveEditedPlayer(props.player.id, unsavedChanges)
          }
        }}
        onCancel={() => props.editField(
          props.player.id,
          'email',
          undefined,
        )}
      >
        <Button
          icon={`mail`}
          size={`small`}
          type={`default`}
          disabled={props.disabled}
        />
      </Popconfirm>
    </Tooltip>
    <Tooltip title={`twitter`}>
      <Popconfirm
        data-tag={`twitterPop`}
        icon={false}
        title={(
          <Tooltip title={`enter twitter handle`}>
            <Input
              data-tag={`twitterInput`}
              allowClear={true}
              size={`small`}
              defaultValue={
                (
                  props.playerEdits[props.player.id] &&
                  props.playerEdits[props.player.id].twitterHandle
                ) || props.player.twitterHandle
              }
              placeholder={`twitter handle`}
              disabled={props.disabled}
              prefix={(<span style={{ color: 'rgba(0,0,0,.25)' }}>@</span>)}
              onChange={({ target: { value } }) => value && props.editField(
                props.player.id,
                'twitterHandle',
                value,
              )}
            />
          </Tooltip>
        )}
        cancelText={`cancel`}
        cancelButtonProps={{ icon: `close-circle`, disabled: props.disabled }}
        okText={`ok`}
        okType={`primary`}
        okButtonProps={{ icon: `save`, disabled: props.disabled }}
        placement={`bottom`}
        onConfirm={() => {
          const unsavedChanges = props.playerEdits[props.player.id]
          if (unsavedChanges && keys(unsavedChanges).length) {
            props.saveEditedPlayer(props.player.id, unsavedChanges)
          }
        }}
        onCancel={() => props.editField(
          props.player.id,
          'twitterHandle',
          undefined,
        )}
      >
        <Button
          icon={`twitter`}
          size={`small`}
          type={`default`}
          disabled={props.disabled}
        />
      </Popconfirm>
    </Tooltip>
  </Button.Group>
</div>
)
