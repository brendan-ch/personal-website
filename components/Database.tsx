import { DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';
import { useState } from 'react';
import ListItem from './ListItem';

interface Props {
  items: DatabaseItem[],
  /**
   * Render options in the dropdown menu.
   */
  tagOptions: string[],
}

export default function Database({ items, tagOptions }: Props) {
  const [tag, setTag] = useState(tagOptions.length > 0 ? tagOptions[0] : undefined);

  const filteredItems = tag ? items.filter((value) => value.tags.includes(tag)) : [];

  return (
    <div className={styles.container}>
      <div className={styles.dropdownButtonContainer}>
        <button className={styles.dropdownButton}>
          <p>{tag}</p>
          <Down
            width={40}
            height={40}
          />
        </button>
      </div>
      <div className={styles.divider} />
      {/* Content */}
      {filteredItems.map((item) => (
        <ListItem
          key={item.id}
          title={item.title}
          description={item.description}
          imageLink={item.imageLink}
        />
      ))}
    </div>
  );
}