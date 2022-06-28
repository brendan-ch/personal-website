import Link from 'next/link';
import { useRouter } from 'next/router';
import { BLUE, CYAN, RED } from '../helpers/Constants';
import styles from '../styles/MobileNavBar.module.css';
import LogoFull from './icons/LogoFull';
import LogoStandalone from './icons/LogoStandalone';

interface TabProps {
  selected: boolean,
  text: string,
  href: string,
  selectedColor?: string,
}

function MobileNavBarTab({
  selected,
  text,
  href,
  selectedColor,
}: TabProps) {
  return (
    <div className={styles.tab}>
      <Link href={href}>
        <a>
          <div
            className={selected ? `${styles.tabLineMobile} ${styles.tabLine} ${styles.tabLineSelected}` : `${styles.tabLineMobile} ${styles.tabLine}`}
            style={{
              backgroundColor: selected && selectedColor ? selectedColor : undefined,
            }}
          />
          <p
            style={{
              color: selected && selectedColor ? selectedColor : undefined,
            }}
          >
            {text}
          </p>
          <div
            className={selected ? `${styles.tabLineDesktop} ${styles.tabLine} ${styles.tabLineSelected}` : `${styles.tabLineDesktop} ${styles.tabLine}`}
            style={{
              backgroundColor: selected && selectedColor ? selectedColor : undefined,
            }}
          />
        </a>
      </Link>
    </div>
  )
}

interface Props {
  /**
   * @deprecated This prop has no effect.
   */
  display: 'tabs' | 'project' | 'title',
  /**
   * Only shown if `display` is set to `project`.
   */
  title?: string,
  selected?: string,
}

/**
 * Navigation bar on mobile. Includes a hamburger menu/back button.
 * The hamburger menu opens up an overlay with links to the other pages.
 * @param props
 */
export default function MobileNavBar({ title, selected }: Props) {
  return (
    <nav className={styles.container}>
      <div className={`${styles.line} ${styles.lineMobile}`} />
      <div className={styles.contentContainer}>
        <Link href="/">
          <a className={styles.logoFull}>
            <LogoFull
              width={200}
              height={1}
            />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.logoStandalone}>
            <LogoStandalone
              width={30}
              height={30}
            />
          </a>
        </Link>
        <div className={styles.buttonsContainer}>
          <MobileNavBarTab
            href="/"
            selected={selected === 'Featured'}
            text="Home"
            selectedColor={RED}
          />
          <MobileNavBarTab
            href="/about"
            selected={selected === 'About Me'}
            text="About Me"
            selectedColor={BLUE}
          />
        </div>
      </div>
      <div className={`${styles.line} ${styles.lineDesktop}`} />
    </nav>
  );
}