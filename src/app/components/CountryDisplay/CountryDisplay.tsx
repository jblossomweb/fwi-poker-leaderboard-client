import React from 'react'
import find from 'lodash/find'
import Tooltip from 'antd/lib/tooltip'

import { Country } from 'app/data/countries.types'
import countries from 'app/data/countries.json'

export interface Props {
  code: Country['code'],
  full?: boolean,
}

export const findByCode = (
  code: Country['code'],
) => find(countries, { code })

const CountryDisplay = (
  props: Props,
) => {
  const { code, full } = props
  const country = findByCode(code)
  return country ? (
    <Tooltip title={country.name}>
      {country.emoji} {full ? country.name : country.code}
    </Tooltip>
  ) : null
}

export default CountryDisplay
