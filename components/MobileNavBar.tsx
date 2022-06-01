import styles from '../styles/MobileNavBar.module.css';
import Hamburger from './icons/Hamburger';

interface Props {
  button: 'none' | 'hamburger' | 'back',
  selected: 'Projects' | 'About',
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
      <Hamburger width={40} height={40} />
      {/* Text */}
      <h2>{selected}</h2>
    </div>
  );
}