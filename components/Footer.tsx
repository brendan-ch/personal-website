import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from '../styles/Footer.module.css';
import ChevronUp from './icons-v2/ChevronUp';

interface Props {
  style?: CSSProperties,
  hideScroll?: boolean,
  hideCopyright?: boolean,
}

export default function Footer({ style, hideScroll, hideCopyright }: Props) {
  return (
    <footer className={styles.container} style={style}>
      {!hideScroll ? (
        <div className={styles.horizontalWrapper}>
          <Link href="#top">
            <a>
              <p>
                Back to top
              </p>
              <ChevronUp
                width={24}
                height={24}
              />
            </a>
          </Link>
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
        {/* <p>|</p> */}
        <Link href="/doc/open-source-licenses">
          <a>
            <p>
              <u>Open Source Licenses</u>
            </p>
          </a>
        </Link>
        {/* <p>|</p> */}
        <Link href="/doc/fair-use-statement">
          <a>
            <p>
              <u>Fair Use Statement</u>
            </p>
          </a>
        </Link>
      </div>
      {!hideCopyright ? (
        <p>© {new Date().getUTCFullYear()} Brendan Chen. All rights reserved.</p>
      ) : undefined}
    </footer>
  );
}