import { NavigationSelected } from '../types';
import styles from '../styles/MobileNavMenu.module.css';
import MobileNavBar from './MobileNavBar';
import Link from 'next/link';
import GitHub from './icons/GitHub';

interface NavigationButtonProps {
  highlighted?: boolean,
  title: string,
  /**
   * Passed to the `<Link>` component.
   */
  href: string,
}

function NavigationButton({ highlighted, title, href }: NavigationButtonProps) {
  return (
    <Link
      href={href}
    >
      <button
        className={styles.navigationPaneButton}
      >
      <p className={highlighted ? styles.navigationPaneButtonTextHighlighted : undefined}>
        {title}
      </p>
      </button>
    </Link>
  )
}

interface Props {
  selected: NavigationSelected,
  visible?: boolean,
  onClose?: () => any,
}

/**
 * Navigation menu on mobile, only appears on mobile.
 */
export default function MobileNavMenu({ selected, visible, onClose }: Props) {
  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className={visible ? `${styles.container} ${styles.containerDisplay}` : `${styles.container}`}>
      <div
        className={visible ? `${styles.background} ${styles.backgroundDisplay} ${styles.fadeIn}` : `${styles.background} ${styles.fadeOut}`}
        onClick={() => handleClose()}
      />
      <div className={visible ? `${styles.navigationPane} ${styles.navigationPaneToggled}` : `${styles.navigationPane}`}>
        {/* Hamburger button to close nav menu */}
        <MobileNavBar
          title=""
          button="hamburger"
          onPress={() => handleClose()}
        />
        {/* Navigation pane content */}
        <div className={styles.navigationPaneContent}>
          {/* Navigation buttons */}
          <div className={styles.navigationPaneButtonContent} >
            <NavigationButton
              title="Projects"
              highlighted={selected === 'Projects'}
              href="/"
            />
            <NavigationButton
              title="About Me"
              highlighted={selected === 'About Me'}
              href="/about"
            />
          </div>
          {/* Social links */}
          <div className={styles.navigationPaneLinks}>
            <a href="https://github.com/brendan-ch" target="_blank" rel="noreferrer" >
              <GitHub
                width={21}
                height={21}
              />
              {' '}
              @brendan-ch
            </a>
            <Link
              href="/"
            >
              <a>
                Legal
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}