import { NavigationSelected } from '../types';
import styles from '../styles/MobileNavMenu.module.css';

interface Props {
  selected: NavigationSelected,
  visible?: boolean,
  onClose?: () => any,
}

/**
 * Navigation menu on mobile, only appears on mobile.
 */
export default function MobileNavMenu({ selected, visible }: Props) {
  console.log(visible);

  return (
    <div className={visible ? `${styles.container} ${styles.containerDisplay}` : `${styles.container}`}>
      <div className={visible ? `${styles.background} ${styles.backgroundDisplay} ${styles.fadeIn}` : `${styles.background} ${styles.fadeOut}`} />
    </div>
  );
}