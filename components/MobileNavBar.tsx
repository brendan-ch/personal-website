import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import { BLUE, RED } from '../helpers/Constants';
import styles from '../styles/MobileNavBar.module.css';
import menuStyles from '../styles/MobileNavMenu.module.css';
import Exit from './icons-v2/Exit';
import Hamburger from './icons-v2/Hamburger';
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
        <a role="tab">
          <p
            style={{
              color: selected && selectedColor ? selectedColor : undefined,
            }}
          >
            {text}
          </p>
        </a>
      </Link>
    </div>
  )
}

interface Props {
  selected?: string,
  style?: CSSProperties,
  mobileButtonType?: 'hamburger' | 'close',
  onMobileButtonClick?: () => any,
}

/**
 * Navigation bar on mobile and desktop.
 * @param props
 * 
 * @todo make tab list customizable, and add tests for it
 */
export default function MobileNavBar({ selected, style, mobileButtonType, onMobileButtonClick }: Props) {
  const [jsLoaded, setJsLoaded] = useState(false);

  useEffect(() => {
    setJsLoaded(true);
  }, []);

  let button = (
    <a
      className={styles.menuContainer}
      href={`#${menuStyles.navMenuContainer}`}
      tabIndex={0}
    >
      <Hamburger
        width={24}
        height={24}
      />
    </a>
  );

  if (jsLoaded && mobileButtonType === 'close') {
    button = (
      <button
        className={styles.menuContainer}
        onClick={onMobileButtonClick}
        tabIndex={0}
      >
        <Exit
          width={24}
          height={24}
        />
      </button>
    );
  } else if (jsLoaded) {
    button = (
      <button
        className={styles.menuContainer}
        onClick={onMobileButtonClick}
        tabIndex={0}
      >
        <Hamburger
          width={24}
          height={24}
        />
      </button>
    );
  } else if (mobileButtonType === 'close') {
    button = (
      <a
        className={styles.menuContainer}
        href="#"
        tabIndex={0}
      >
        <Exit
          width={45}
          height={45}
        />
      </a>
    );
  }

  return (
    <nav className={styles.container} style={style}>
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
            href="/work"
            selected={selected === 'Work'}
            text="My Work"
            selectedColor={RED}
          />
          <MobileNavBarTab
            href="/about"
            selected={selected === 'About Me'}
            text="About Me"
            selectedColor={RED}
          />
        </div>
        {button}
      </div>
    </nav>
  );
}