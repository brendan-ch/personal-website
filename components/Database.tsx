import { DatabaseDropdownFilter, DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';
import { MouseEvent, useEffect, useState } from 'react';
import ListItem from './ListItem';
import Dropdown from './Dropdown';
import GalleryItem from './GalleryItem';

interface Props {
  items: DatabaseItem[],
  dropdownFilter: DatabaseDropdownFilter,
  onDropdownButtonPress?: (top: number, left: number) => any,
  onDropdownButtonPosChange?: (top: number, left: number) => any,
}

export default function Database({
    items,
    onDropdownButtonPress,
    onDropdownButtonPosChange,
    dropdownFilter,
  }: Props) {
  const filteredItems = dropdownFilter.tagName !== undefined
    // @ts-ignore
    ? items.filter((value) => value.tags.includes(dropdownFilter.tagName))
    : items;
  
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
      {/* Content */}
      {filteredItems.map((item) => (
        // <ListItem
        //   key={item.id}
        //   title={item.title}
        //   description={item.description}
        //   imageLink={item.imageLink}
        //   link={`/project/${item.id}`}
        // />
        <GalleryItem
          key={item.id}
          title={item.title}
          description={item.description}
          imageLink={item.imageLink}
          link={`/projects/${item.id}`}
        />
      ))}
    </div>
  );
}