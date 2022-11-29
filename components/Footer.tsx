import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from '../styles/Footer.module.css';
import ChevronUp from './icons-v2/ChevronUp';

interface Props {
  style?: CSSProperties,
  mini?: boolean,
}

export default function Footer({ style, mini }: Props) {
  return (
    <footer className={styles.container} style={style}>
      <div className={styles.horizontalWrapper}>
        <Link href="#top">
          <a>
            <p>
              Back to top
            </p>
          </a>
        </Link>
        <ChevronUp
          width={24}
          height={24}
        />
      </div>
      <div className={styles.horizontalWrapper}>
        <Link href="/doc/privacy">
          <a>
            <p>
              <u>Privacy Policy</u>
            </p>
          </a>
        </Link>
        <p>|</p>
        <Link href="/doc/copyright">
          <a>
            <p>
              <u>Licenses</u>
            </p>
          </a>
        </Link>
      </div>
      <p>© 2022 Brendan Chen. All rights reserved.</p>
    </footer>
  );
}