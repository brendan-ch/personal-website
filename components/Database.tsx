import { DatabaseDropdownFilter, DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';
import { MouseEvent, useEffect, useState } from 'react';
import ListItem from './ListItem';
import Dropdown from './Dropdown';
import GalleryItem from './GalleryItem';

interface Props {
  items: DatabaseItem[],
  // dropdownFilter: DatabaseDropdownFilter,
}

export default function Database({
  items,
  // dropdownFilter,
}: Props) {
  // const filteredItems = dropdownFilter.tagName !== undefined
  //   // @ts-ignore
  //   ? items.filter((value) => value.tags.includes(dropdownFilter.tagName))
  //   : items;

  return (
    <div className={styles.container}>
      {/* Content */}
      {items.map((item) => (
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