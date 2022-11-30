import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from '../styles/Footer.module.css';
import ChevronUp from './icons-v2/ChevronUp';

interface Props {
  style?: CSSProperties,
  hideScroll?: boolean,
}

export default function Footer({ style, hideScroll }: Props) {
  return (
    <footer className={styles.container} style={style}>
      {!hideScroll ? (
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
      ) : undefined}
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
      <p>Made by Brendan Chen with ❤️ and ☕️</p>
    </footer>
  );
}