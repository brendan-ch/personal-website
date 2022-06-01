import { NavigationSelected } from '../types';
import styles from '../styles/MobileNavMenu.module.css';
import MobileNavBar from './MobileNavBar';

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
      <div className={styles.navigationPane}>
        <MobileNavBar
          title=""
          button="hamburger"
          onPress={() => handleClose()}
        />
      </div>
    </div>
  );
}