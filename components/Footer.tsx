import Link from 'next/link';
import { CSSProperties } from 'react';
import { GITHUB_LINK, LINKEDIN_LINK } from '../helpers/Constants';
import styles from '../styles/Footer.module.css';
import LogoFull from './icons/LogoFull';

interface Props {
  style?: CSSProperties,
  mini?: boolean,
}

export default function Footer({ style, mini }: Props) {
  return (
    <footer className={styles.container} style={style}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <LogoFull
            width={200}
            height={50}
          />
          <p>© 2022 Brendan Chen. All rights reserved.</p>
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.linksContainer}>
            {mini ? undefined : (
              <p>
                <b>
                  Legal
                </b>
              </p>
            )}
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
                    Licenses
                  </u>
                </p>
              </a>
            </Link>
          </div>
          {mini ? undefined : (
            <div className={styles.linksContainer}>
              <p>
                <b>
                  Follow Me
                </b>
              </p>
              <Link href={GITHUB_LINK}>
                <a target="_blank" rel="noreferrer">
                  <p>
                    <u>
                      GitHub
                    </u>
                  </p>
                </a>
              </Link>
              <Link href={LINKEDIN_LINK}>
                <a target="_blank" rel="noreferrer">
                  <p>
                    <u>
                      LinkedIn
                    </u>
                  </p>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}