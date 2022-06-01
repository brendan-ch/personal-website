import styles from '../styles/MobileNavBar.module.css';
import Back from './icons/Back';
import Hamburger from './icons/Hamburger';

interface Props {
  button?: 'none' | 'hamburger' | 'back',
  title?: string,
  onPress?: () => any,
}

/**
 * Navigation bar on mobile. Includes a hamburger menu/back button.
 * The hamburger menu opens up an overlay with links to the other pages.
 * @param props
 */
export default function MobileNavBar({ button, title, onPress }: Props) {
  return (
    <div className={styles.container}>
      {/* Hamburger menu */}
      {button && button !== 'none' ? (
        <button
          className={styles.navBarButton}
          onClick={onPress ? () => onPress() : undefined}>
          {button === 'hamburger' ? (
            <Hamburger width={40} height={40} />
          ) : (
            <Back width={40} height={40} />
          )}
        </button>
      ) : undefined}
      {/* Text */}
      <h2>{title}</h2>
    </div>
  );
}