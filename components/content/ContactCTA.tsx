import ActionButton from '../ActionButton';
import Image from 'next/image';

import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  return (
    <div className={styles.contact}>
      <Image
        alt="Contact CTA background."
        src="/background-pattern.png"
        fill
        className={styles.backgroundImage}
      />
      <div className={styles.contactContainer}>
        <h1>Let{"'"}s work together.</h1>
        <div className={styles.contactButtons}>
          <ActionButton text="View resume" href="/resume.pdf" useRegularLink />
          <ActionButton text="me@bchen.dev" href="mailto:me@bchen.dev" highlighted />
        </div>
      </div>
    </div>
  )
}