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
  return (
    <div className={visible ? `${styles.container} ${styles.containerDisplay}` : styles.container}>
      
    </div>
  );
}