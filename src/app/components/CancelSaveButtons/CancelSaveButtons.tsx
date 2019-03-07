import React from 'react'
import { Button, Tooltip } from 'antd'

export interface Props {
  disabled?: boolean,
  onCancel: () => void,
  onSave: () => void,
}

export default (
  props: Props,
) => (
  <Button.Group>
    <Tooltip title={`cancel`}>
      <Button
        data-tag={`buttonCancel`}
        icon={`close-circle`}
        size={`small`}
        type={`default`}
        disabled={props.disabled}
        onClick={props.onCancel}
      />
    </Tooltip>
    <Tooltip title={`save`}>
      <Button
        data-tag={`buttonSave`}
        icon={`save`}
        size={`small`}
        type={`primary`}
        disabled={props.disabled}
        onClick={props.onSave}
      />
    </Tooltip>
  </Button.Group>
)
