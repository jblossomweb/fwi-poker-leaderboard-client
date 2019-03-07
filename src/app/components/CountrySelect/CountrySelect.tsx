import React from 'react'
import { Form, Select } from 'antd'

import { Country } from 'app/data/countries.types'
import countries from 'app/data/countries.json'

export interface WrapperProps {
  size?: 'default' | 'large' | 'small',
  countries?: Country[],
  onChange?: (value: string) => void,
  defaultValue?: string,
  disabled?: boolean,
}

export interface Props extends WrapperProps {
  form?: any,
  name: string,
}

class CountrySelect extends React.Component<Props> {
  render() {
    const { props } = this
    const { getFieldDecorator, getFieldError, setFieldsValue } = props.form
    const errors = getFieldError(props.name)
    const countryOptions = props.countries || countries

    return getFieldDecorator(props.name, {
      initialValue: props.defaultValue || ``,
      rules: [
        { required: true, message: 'select a country.' },
        { len: 2, message: 'select a two character country code.' },
      ],
    })(
      <React.Fragment>
        <Select
          style={{ width: '180px' }}
          placeholder={`🌎 Select Country`}
          size={props.size}
          showSearch={true}
          disabled={props.disabled}
          onChange={(value: string) => {
            const values = {}
            values[props.name] = value
            setFieldsValue(values)
            if (props.onChange) {
              props.onChange(value)
            }
          }}
        >
          {countryOptions.map(country => (
            <Select.Option value={country.code} key={country.code}>
              {country.emoji} {country.name}
            </Select.Option>
          ))}
        </Select>
        {errors && errors.length && (<div className="ant-form-explain">{errors[0]}</div>)}
      </React.Fragment>
    )
  }
}

export const WrappedCountrySelect = Form.create({ name: 'wrappedCountrySelect' })((props: {
  form: Props['form'],
  onChange?: Props['onChange'],
  defaultValue?: Props['defaultValue'],
  disabled?: Props['disabled'],
  size?: Props['size'],
}) => (
  <Form>
    <CountrySelect
      {...props}
      name={`wrappedCountrySelect`}
    />
  </Form>
))

export default CountrySelect
