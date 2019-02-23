import React from 'react'

import styles from './SampleLinks.module.css'

export interface Props {
  links: {
    title: string,
    href: string,
    external?: boolean,
  }[]
}

const SampleLinks = (
  props: Props,
) => (
  <div className={styles.wrapper}>
    <p>
      {props.links.map((link, i) => (
        <React.Fragment key={i}>
          <a
            className={styles.link}
            target={link.external ? `_blank` : ``}
            href={link.href}
          >
            {link.title}
          </a>
          {i < props.links.length - 1 ? (
            <span data-index={`pipe`}>&nbsp;|&nbsp;</span>
          ) : null}
        </React.Fragment>
      ))}
    </p>
  </div>
)

export default SampleLinks
