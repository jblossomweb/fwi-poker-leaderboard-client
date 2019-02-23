import React from 'react'

import graphqlLogo from '../SampleLogos/images/graphql.svg'

import styles from './SampleCountries.module.css'

export interface Props {
  countries?: any[],
  country?: any,
  thunking?: boolean,
  error?: any,
  getCountries: () => void,
  selectCountry: (code: string) => void,
}

const SampleCountries = (
  props: Props,
) => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>Sample Thunk</h3>
    <div className={styles.cta}>
      {props.thunking ? (
        <img
          data-index={`thunkingSpinner`}
          src={graphqlLogo}
          className={styles.spinner}
        />
      ) : (
        <React.Fragment>
          {props.countries && props.countries.length ? (
            <select
              data-index={`selectCountry`}
              placeholder={`select country...`}
              className={styles.select}
              value={props.country ? props.country.code : undefined}
              onChange={(event) => {
                const value: string = event.target.value
                if (value) {
                  props.selectCountry(value)
                }
              }}
            >
              {props.countries.map(country => (
                <option
                  key={country.code}
                  value={country.code}
                >
                  {country.emoji} {country.name}
                </option>
              ))}
            </select>
          ) : (
            <button
              data-index={`getCountries`}
              className={styles.button}
              onClick={(_e) => props.getCountries()}
            >
              Get Countries
            </button>
          )}
        </React.Fragment>
      )}
    </div>
    {!props.error && props.country ? (
      <div className={styles.country} data-index={`countryInfo`}>
        {props.country.native}<br />
        {props.country.continent && props.country.continent.name}<br />
        {props.country.languages && props.country.languages[0] && props.country.languages[0].native}
      </div>
    ) : null}
    {props.error ? (
      <div
        data-index={`displayError`}
        className={styles.error}
      >
        {props.error.message}
      </div>
    ) : null}
  </div>
)

export default SampleCountries
