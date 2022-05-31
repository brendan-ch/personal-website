import Link from 'next/link';
import styles from './navbar.module.css';

interface Props {
  selected: 'Projects' | 'About',
}

/**
 * Navigation bar to the left of the content.
 */
export default function NavBar({ selected }: Props) {
  return (
    <div className={styles.container}>
      {/* Navigation links */}
      <div className={styles.linksContainer}>
        <Link href="/">
          <a className={selected === 'Projects' ? styles.selected : undefined}>Projects</a>
        </Link>
        <div className={styles.ellipse} />
        <Link href="/about">
          <a className={selected === 'About' ? styles.selected : undefined}>About</a>
        </Link>
      </div>
      {/* Line divider */}
      <div className={styles.divider}></div>
      {/* Social links */}
      <div></div>
    </div>
  );
}