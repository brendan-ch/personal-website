import { DatabaseItem, ProjectDatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
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
          imageLink={item.imageLink}
          link={`/project/${item.prettyLink}`}
        />
      ))}
    </div>
  );
}