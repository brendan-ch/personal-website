import Link from 'next/link';
import ChevronUp from '../components/icons-v2/ChevronUp';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Link href="#" className={styles.horizontalWrapper}>
        <p>
          Back to top
        </p>
        <ChevronUp
          width={24}
          height={24}
        />
      </Link>
      <Link href="https://github.com/brendan-ch/personal-website" target="_blank" rel="noreferrer">
        <p>
          View on GitHub
        </p>
      </Link>
      <p>
        © 2023 Brendan Chen
      </p>
    </div>
  )
}