import { NavigationSelected } from '../types';
import styles from '../styles/MobileNavMenu.module.css';
import MobileNavBar from './MobileNavBar';

interface NavigationButtonProps {
  highlighted?: boolean,
  onPress?: () => any,
  title: string,
}

function NavigationButton({ highlighted, onPress, title }: NavigationButtonProps) {
  return (
    <button
      onClick={onPress ? () => onPress() : undefined}
      className={styles.navigationPaneButton}
    >
      <p className={highlighted ? styles.navigationPaneButtonTextHighlighted : undefined}>
        {title}
      </p>
    </button>
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
          <div className={styles.navigationPaneButtonContent} >
            <NavigationButton
              title="Projects"
              highlighted={selected === 'Projects'}
            />
            <NavigationButton
              title="About"
              highlighted={selected === 'About'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}