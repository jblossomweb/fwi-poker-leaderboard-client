import React from 'react'
import keys from 'lodash/keys'
import { Form, Icon, Input, InputNumber, Button, Spin } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form.d'

import { Player } from 'app/store/players/types'
import CountrySelect from 'app/components/CountrySelect'

import styles from './AddPlayerForm.module.css'

export interface WrapperProps {
  saveAddedPlayer: (player: Partial<Player>) => void,
  savingAddedPlayer: boolean,
  saveAddedPlayerError: Error | null,
}

export interface Props extends WrapperProps {
  form: WrappedFormUtils,
}

export class AddPlayerForm extends React.Component<Props> {

  hasErrors = (fieldsError: any) => keys(fieldsError)
    .some(field => fieldsError[field])

  handleSubmit = (e: any) => {
    e.preventDefault()
    const { form, saveAddedPlayer } = this.props
    form.validateFields((error: any, values: any) => {
      if (!error) {
        saveAddedPlayer(values)
        form.resetFields(['name', 'country', 'winnings'])
      }
    })
  }

  render() {
    const { form, savingAddedPlayer } = this.props
    const { getFieldDecorator, getFieldsError, getFieldError } = form
    
    return (
      <Spin spinning={savingAddedPlayer} tip="Saving Player...">
        <Form layout={`inline`} onSubmit={this.handleSubmit} className={styles.form}>
          <Form.Item className={styles.item}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'enter full name.' },
              ],
            })(
              <Input
                style={{ width: '300px' }} // TODO: move to css module
                size={`small`}
                prefix={<Icon type={`user`} style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={`Name`}
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={
              getFieldError('country') ? 'error' : 'success'
            }
            className={styles.item}
          >
            <CountrySelect form={form} name={`country`} size={`small`} />
          </Form.Item>
          <Form.Item className={styles.item}>
            {getFieldDecorator('winnings', {
              initialValue: 0,
              rules: [
                {
                  transform: (value) => Number(value),
                  required: true,
                  type: 'number',
                  min: 0,
                  message: 'enter positive number.',
                },
              ],
            })(
              <InputNumber
                style={{ width: '200px' }} // TODO: move to css module
                size={`small`}
                formatter={value => `$${Number(value).toLocaleString()}`}
                min={0}
              />
            )}
          </Form.Item>
          <Form.Item className={styles.item}>
            <Button
              type={`primary`}
              size={`small`}
              htmlType={`submit`}
              icon={`save`}
              disabled={this.hasErrors(getFieldsError()) || savingAddedPlayer}
            >
              Add Player
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}

export const WrappedAddPlayerForm = Form.create({
  name: 'addPlayer',
})(AddPlayerForm)
