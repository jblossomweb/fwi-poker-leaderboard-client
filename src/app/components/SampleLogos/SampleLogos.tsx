import React from 'react'

import reactLogo from './images/react.svg'
import reduxLogo from './images/redux.svg'
import graphqlLogo from './images/graphql.svg'
import immutableLogo from './images/immutable.svg'
import storybookLogo from './images/storybook.svg'

import styles from './SampleLogos.module.css'

export interface Props {
  react?: boolean,
  redux?: boolean,
  graphql?: boolean,
  immutable?: boolean,
  storybook?: boolean,
  spin?: boolean,
}

const SampleLogos = (
  props: Props,
) => (
  <div className={styles.wrapper}>
    <p className={styles.logos}>
      {props.redux && (
        <img
          src={reduxLogo}
          className={`${styles.logoRedux}`}
          alt={`redux`}
        />
      )}
      {props.react && (
        <img
          src={reactLogo}
          className={`${styles.logoReact} ${props.spin && styles.logoSpin}`}
          alt={`react`}
        />
      )}
      {props.graphql && (
        <img
          src={graphqlLogo}
          className={`${styles.logoGraph}`}
          alt={`graphql`}
        />
      )}
    </p>
    <p>
      {props.immutable && (
        <img
          src={immutableLogo}
          className={styles.logoImmutable}
          alt={`immutable`}
        />
      )}
    </p>
    <p>
      {props.storybook && (
        <img
          src={storybookLogo}
          className={styles.logoStorybook}
          alt={`storybook`}
        />
      )}
    </p>
  </div>
)

export default SampleLogos
