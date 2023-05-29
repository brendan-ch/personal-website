import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/MobileNavMenu.module.css';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import MobileNavBar from './MobileNavBar';

interface ButtonProps {
  toggled?: boolean,
  text: string,
  href: string,
}

export function MobileNavMenuButton({ toggled, text, href }: ButtonProps) {
  return (
    (<Link href={href} className={styles.buttonWrapper}>

      <div className={styles.line} />
      <div className={styles.buttonTextContainer}>
        <h3 className={toggled ? styles.red : undefined}>
          {toggled ? (
            <b>
              {text}
            </b>
          ) : text}
        </h3>
      </div>

    </Link>)
  );
}

interface Props {
  selected?: string,
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
      <div className={styles.grayBackground} />
      <ImageWithFadeIn
        src={require('../public/background-pattern.png')}
        layout="fill"
        objectFit="cover"
        style={{
          zIndex: 3,
        }}
        alt="Background image"
      />
      <div className={styles.contentContainer}>
        <MobileNavBar
          style={{
            zIndex: 4,
            position: 'relative',
          }}
          mobileButtonType="close"
          onMobileButtonClick={onClose}
        />
        <div className={styles.buttons}>
          <MobileNavMenuButton
            toggled={selected === 'Featured'}
            text="Home"
            href="/"
          />
          <MobileNavMenuButton
            toggled={selected === 'Work'}
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
        <Footer
          hideScroll
          hideCopyright
          style={{
            backgroundColor: 'transparent',
          }}
        />
      </div>
    </div>
  );
}