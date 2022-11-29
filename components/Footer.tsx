import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from '../styles/Footer.module.css';

interface Props {
  style?: CSSProperties,
  mini?: boolean,
}

export default function Footer({ style, mini }: Props) {
  return (
    <footer className={styles.container} style={style}>
      
      <div className={styles.linksWrapper}>
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