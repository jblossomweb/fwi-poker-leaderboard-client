import React from 'react'
import { Button, Tooltip, Popconfirm } from 'antd'

export interface Props {
  disabled?: boolean,
  onEdit: () => void,
  onDelete: () => void,
  deleteConfirm: string,
}

export default (
  props: Props,
) => (
  <Button.Group>
    <Tooltip title={`edit`}>
      <Button
        data-tag={`buttonEdit`}
        icon={`edit`}
        size={`small`}
        type={`default`}
        disabled={props.disabled}
        onClick={props.onEdit}
      />
    </Tooltip>
    <Tooltip title={`delete`}>
      <Popconfirm
        title={props.deleteConfirm}
        cancelText={`no`}
        cancelButtonProps={{ icon: `close-circle`}}
        okText={`yes`}
        okType={`danger`}
        okButtonProps={{ icon: `delete`}}
        placement={`bottom`}
        onConfirm={props.onDelete}
      >
        <Button
          data-tag={`buttonDelete`}
          icon={`delete`}
          size={`small`}
          type={`danger`}
          disabled={props.disabled}
        />
      </Popconfirm>
    </Tooltip>
  </Button.Group>
)
