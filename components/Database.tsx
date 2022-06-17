import { DatabaseDropdownFilter, DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';
import { MouseEvent, useEffect, useState } from 'react';
import ListItem from './ListItem';
import Dropdown from './Dropdown';

interface Props {
  items: DatabaseItem[],
  dropdownFilter: DatabaseDropdownFilter,
  onDropdownButtonPress?: (top: number, left: number) => any,
  onDropdownButtonPosChange?: (top: number, left: number) => any,
}

/**
 * @todo Move dropdown implementation and state up to projects page
 */
export default function Database({
    items,
    onDropdownButtonPress,
    onDropdownButtonPosChange,
    dropdownFilter,
  }: Props) {
  const filteredItems = dropdownFilter.tagName !== undefined
    // @ts-ignore
    ? items.filter((value) => value.tags.includes(dropdownFilter.tagName))
    : [];
  
  /**
   * Handle the press of the dropdown menu button.
   * @param e
   */
  function handleButtonPress(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    const button = document.getElementById('dropdownButton');
    if (!button || !onDropdownButtonPress) return;

    onDropdownButtonPress(button?.offsetTop, button.offsetLeft);
  }

  useEffect(() => {
    function resizeDropdown() {
      if (!onDropdownButtonPosChange) return;
      const button = document.getElementById('dropdownButton');
      if (!button) return;

      // Get position of button
      onDropdownButtonPosChange(button?.offsetTop, button.offsetLeft);
    }

    window.addEventListener('resize', resizeDropdown);
  }, [onDropdownButtonPosChange]);

  return (
    <div className={styles.container}>
      <div className={styles.dropdownButtonContainer}>
        <button id="dropdownButton"
          className={styles.dropdownButton}
          onClick={onDropdownButtonPress ? (e) => handleButtonPress(e) : undefined}
        >
          <p>{dropdownFilter.dropdownName}</p>
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