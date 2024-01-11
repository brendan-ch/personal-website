import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import styles from './MobileNavBar.module.css';
import menuStyles from './MobileNavMenu.module.css';
import Exit from '../icons/Exit';
import Hamburger from '../icons/Hamburger';
import LogoFull from '../LogoFull';
import PortfolioLogo from '../logos/PortfolioLogo';

interface TabProps {
  text: string,
  href: string,
  /**
   * Whether the tab button is highlighted.
   * Useful for CTAs or other cases where button needs emphasis.
   */
  highlighted?: boolean,
}

function MobileNavBarTab({
  text,
  href,
  highlighted,
}: TabProps) {
  return (
    <div className={highlighted ? `${styles.tabHighlighted} ${styles.tab}` : styles.tab}>
      <Link href={href} role="tab">

        <p>
          {text}
        </p>

      </Link>
    </div>
  );
}

interface Props {
  /**
   * @deprecated No longer used since 2022-11-11.
   */
  selected?: string,
  style?: CSSProperties,
  mobileButtonType?: 'hamburger' | 'close',
  onMobileButtonClick?: () => any,
  hideLogo?: boolean,
}

/**
 * Navigation bar on mobile and desktop.
 * @param props
 * 
 * @todo make tab list customizable, and add tests for it
 */
export default function MobileNavBar({ selected, style, mobileButtonType, onMobileButtonClick, hideLogo }: Props) {
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
      <div className={hideLogo ? `${styles.contentContainer} ${styles.contentContainerWithoutLogo}` : styles.contentContainer}>
        {!hideLogo ? (
          <Link href="/" aria-label="Website Logo" className={styles.logoFull}>

            <LogoFull
              width={200}
            />

          </Link>
        ) : undefined}
        <Link href="/" aria-label="Website Logo" className={styles.logoStandalone}>

          <PortfolioLogo
            width={30.5}
            height={30.5}
          />

        </Link>
        <div className={styles.buttonsContainer} role="tablist">
          <MobileNavBarTab
            href="/"
            text="Home"
          />
          <MobileNavBarTab
            href="/work"
            text="My Work"
          />
          <MobileNavBarTab
            href="/contact"
            text="Contact Me"
            highlighted
          />
        </div>
        {button}
      </div>
    </nav>
  );
}