import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MobileNavMenu.module.css';
// import Footer from './Footer';
import MobileNavBar from './MobileNavBar';
import { SelectedPage } from '../../types';

interface ButtonProps {
  toggled?: boolean,
  text: string,
  href: string,
}

export function MobileNavMenuButton({ toggled, text, href }: ButtonProps) {
  return (
    (<Link href={href} className={styles.buttonWrapper}>

      <div className={styles.buttonTextContainer}>
        <h1 className={toggled ? styles.red : undefined}>
          <b>
            {text}
          </b>
        </h1>
      </div>

    </Link>)
  );
}

interface Props {
  selected?: SelectedPage,
  visible?: boolean,
  onClose?: () => any,
}

/**
 * Navigation menu that displays a list of links.
 * @param props
 * @returns
 */
export default function MobileNavMenu({ selected, visible, onClose }: Props) {
  const [jsLoaded, setJsLoaded] = useState(false);

  useEffect(() => {
    setJsLoaded(true);
  }, []);
  
  return (
    <div
      className={!visible ? `${styles.container} ${styles.containerInvisible}` : `${styles.container} ${styles.containerVisible}`}
      id={jsLoaded ? undefined : styles.navMenuContainer}
      role="menu"
    >
      <div className={styles.contentContainer}>
        <MobileNavBar
          style={{
            zIndex: 4,
            position: 'relative',
          }}
          mobileButtonType="close"
          onMobileButtonClick={onClose}
          hideLogo
        />
        <div className={styles.buttons}>
          <MobileNavMenuButton
            toggled={selected === 'Home'}
            text="Home"
            href="/"
          />
          <MobileNavMenuButton
            toggled={selected === 'My Work'}
            text="My Work"
            href="/work"
          />
          {/* to-do: emphasize this button */}
          <MobileNavMenuButton
            toggled={selected === 'Contact Me'}
            text="Contact Me"
            href="/contact"
          />
        </div>
        {/* <Footer
          hideScroll
          hideCopyright
          style={{
            backgroundColor: 'transparent',
          }}
        /> */}
      </div>
    </div>
  );
}