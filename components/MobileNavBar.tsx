import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BLUE, CYAN, RED } from '../helpers/Constants';
import styles from '../styles/MobileNavBar.module.css';
import Hamburger from './icons/Hamburger';
import LogoFull from './icons/LogoFull';
import LogoStandalone from './icons/LogoStandalone';
import MobileNavMenu from './MobileNavMenu';

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
  selected?: string,
}

/**
 * Navigation bar on mobile and desktop.
 * @param props
 * 
 * @todo make tab list customizable, and add tests for it
 */
export default function MobileNavBar({ selected }: Props) {
  const [menuToggled, setMenuToggled] = useState(false);

  function handleMenuPress() {
    setMenuToggled(!menuToggled);
  }

  return (
    <nav className={styles.container}>
      <MobileNavMenu 
        selected={selected}
        visible={menuToggled}
      />
      <div className={`${styles.line} ${styles.lineMobile}`} />
      <div className={styles.contentContainer}>
        <Link href="/" aria-label="Website Logo">
          <a className={styles.logoFull}>
            <LogoFull
              width={200}
              height={1}
            />
          </a>
        </Link>
        <Link href="/" aria-label="Website Logo">
          <a className={styles.logoStandalone}>
            <LogoStandalone
              width={30.5}
              height={30.5}
            />
          </a>
        </Link>
        <div className={styles.buttonsContainer} role="tablist">
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
        <button
          className={styles.menuContainer}
          onClick={handleMenuPress}
        >
          <Hamburger
            width={45}
            height={45}
          />
        </button>
      </div>
      <div className={`${styles.line} ${styles.lineDesktop}`} />
    </nav>
  );
}