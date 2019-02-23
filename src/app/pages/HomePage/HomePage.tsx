import React from 'react'

import SampleCounter from 'app/components/SampleCounter'
import SampleCountries from 'app/components/SampleCountries'
import SampleLinks from 'app/components/SampleLinks'
import SampleLogos from 'app/components/SampleLogos'

import styles from './HomePage.module.css'

export interface StateProps {
  sampleNumber: number,
  sampleThunking: boolean,
  sampleError?: Error | null,
  sampleCountries: any[],
  sampleCountry: any,
}

export interface DispatchProps {
  incrementSampleNumber: () => void,
  decrementSampleNumber: () => void,
  setSampleNumber: (value: number) => void,
  fetchSampleCountries: () => void,
  fetchSampleCountry: (code: string) => void,
}

export type Props = StateProps & DispatchProps

const HomePage = (
  props: Props,
) => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <SampleLogos
        react={true}
        redux={true}
        graphql={true}
        immutable={true}
        storybook={true}
        spin={true}
      />
      <p>
        Edit <code>src/app/pages/Home.tsx</code> and save to reload.
      </p>
      <div className={styles.samples}>
        <SampleCounter
          value={props.sampleNumber}
          increment={props.incrementSampleNumber}
          decrement={props.decrementSampleNumber}
          setTo={props.setSampleNumber}
        />
        <SampleCountries
          countries={props.sampleCountries}
          country={props.sampleCountry}
          getCountries={props.fetchSampleCountries}
          selectCountry={props.fetchSampleCountry}
          thunking={props.sampleThunking}
          error={props.sampleError}
        />
      </div>
      <SampleLinks
        links={[
          {
            title: 'React',
            href: 'https://reactjs.org/',
            external: true,
          },
          {
            title: 'Redux',
            href: 'https://redux.js.org/',
            external: true,
          },
          {
            title: 'GraphQL',
            href: 'https://graphql.org/',
            external: true,
          },
          {
            title: 'Immutable',
            href: 'https://immutable-js.github.io/immutable-js/',
            external: true,
          },
          {
            title: 'Reselect',
            href: 'https://github.com/reduxjs/reselect',
            external: true,
          },
          {
            title: 'Thunk',
            href: 'https://github.com/reduxjs/redux-thunk',
            external: true,
          },
          {
            title: 'Storybook',
            href: 'https://storybook.js.org/',
            external: true,
          },
        ]}
      />
    </header>
  </div>
)

export default HomePage
