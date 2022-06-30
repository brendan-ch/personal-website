import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
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