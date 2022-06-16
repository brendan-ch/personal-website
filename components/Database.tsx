import { DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';
import { MouseEvent, useState } from 'react';
import ListItem from './ListItem';
import Dropdown from './Dropdown';

interface Props {
  items: DatabaseItem[],
  tag: string,
  onDropdownButtonPress?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => any,
}

/**
 * @todo Move dropdown implementation and state up to projects page
 */
export default function Database({ items, tag, onDropdownButtonPress }: Props) {
  const filteredItems = tag ? items.filter((value) => value.tags.includes(tag)) : [];

  return (
    <div className={styles.container}>
      <div className={styles.dropdownButtonContainer}>
        <button
          className={styles.dropdownButton}
          onClick={onDropdownButtonPress ? (e) => onDropdownButtonPress(e) : undefined}
        >
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