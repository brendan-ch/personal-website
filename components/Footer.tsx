import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from '../styles/Footer.module.css';

interface Props {
  style?: CSSProperties,
}

export default function Footer({ style }: Props) {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.content}>
        <p>© 2022 Brendan Chen</p>
        <div className={styles.linksContainer}>
          <Link href="/doc/privacy">
            <a>
              <p>
                <u>
                  Privacy Policy
                </u>
              </p>
            </a>
          </Link>
          <Link href="/doc/copyright">
            <a>
              <p>
                <u>
                  Copyright and Licenses
                </u>
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}