import React from 'react'

import styles from './SampleCounter.module.css'

export interface Props {
  value: number,
  increment: () => void,
  decrement: () => void,
  setTo: (value: number) => void,
}

const SampleCounter = (
  props: Props,
) => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>Sample Redux</h3>
    <p className={styles.counter}>
      <button
        data-index={`downArrow`}
        className={styles.emoji}
        onClick={(_e) => props.decrement()}
      >
        🔻
      </button>
      <input
        type="text"
        data-index={`numberInput`}
        className={styles.number}
        value={props.value}
        onChange={(event) => {
          const value: string = event.target.value
          if (!value.length) {
            props.setTo(0)
          } else if (!isNaN(Number(value))) {
            props.setTo(Number(value))
          }
        }}
      />
      <button
        data-index={`upArrow`}
        className={styles.emoji}
        onClick={(_e) => props.increment()}
      >
        🔺
      </button>
    </p>
    <p>
      <a
        data-index={`clover`}
        className={styles.emoji}
        onClick={(_e) => props.setTo(7)}
      >
        🍀
      </a>
    </p>
  </div>
)

export default SampleCounter
