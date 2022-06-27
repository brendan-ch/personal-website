import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>© 2022 Brendan Chen</p>
        <Link href="/doc/copyright">
          <a>
            <p>
              Licenses
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
}