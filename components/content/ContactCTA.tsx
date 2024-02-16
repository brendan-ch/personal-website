import ActionButton from '../ActionButton';

import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  return (
    <div className={styles.contact}>
      <h1>Let{"'"}s work together.</h1>
      <div className={styles.contactButtons}>
        <ActionButton text="View resume" href="/resume.pdf" useRegularLink />
        <ActionButton text="me@bchen.dev" href="mailto:me@bchen.dev" highlighted />
      </div>
    </div>
  )
}