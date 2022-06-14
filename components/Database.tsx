import { DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';

interface Props {
  items: DatabaseItem[],
  /**
   * Render options in the dropdown menu.
   */
  tagOptions: string[],
}

export default function Database({ items, tagOptions }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.dropdownButtonContainer}>
        <button className={styles.dropdownButton}>
          <p>Featured</p>
          <Down
            width={40}
            height={40}
          />
        </button>
      </div>
      <div className={styles.line} />
    </div>
  );
}