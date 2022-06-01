import { NavigationSelected } from '../types';
import styles from '../styles/MobileNavMenu.module.css';

interface Props {
  selected: NavigationSelected,
  displayed: boolean,
}

/**
 * Navigation menu on mobile, only appears on mobile.
 */
export default function MobileNavMenu({ selected, displayed }: Props) {
  return (
    <div className={styles.container}>
      
    </div>
  );
}