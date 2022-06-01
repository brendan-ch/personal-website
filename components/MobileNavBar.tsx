import styles from '../styles/MobileNavBar.module.css';
import { NavigationSelected } from '../types';
import Back from './icons/Back';
import Hamburger from './icons/Hamburger';

interface Props {
  button: 'none' | 'hamburger' | 'back',
  selected: NavigationSelected,
}

/**
 * Navigation bar on mobile. Includes a hamburger menu/back button.
 * The hamburger menu opens up an overlay with links to the other pages.
 * @param props
 */
export default function MobileNavBar({ button, selected }: Props) {
  return (
    <div className={styles.container}>
      {/* Hamburger menu */}
      {button !== 'none' ? (
        <button>
          {button === 'hamburger' ? (
            <Hamburger width={40} height={40} />
          ) : (
            <Back width={40} height={40} />
          )}
        </button>
      ) : undefined}
      {/* Text */}
      <h2>{selected}</h2>
    </div>
  );
}