import { PageData } from '../types';
import styles from '../styles/Database.module.css';
import GalleryItem from './GalleryItem';

interface Props {
  items: PageData[],
  prefix: 'blog' | 'work' | 'doc',
}

export default function Database({
  items,
  prefix,
}: Props) {
  // const filteredItems = dropdownFilter.tagName !== undefined
  //   // @ts-ignore
  //   ? items.filter((value) => value.tags.includes(dropdownFilter.tagName))
  //   : items;

  return (
    <div className={styles.container}>
      {/* Content */}
      {items.map((item) => (
        <GalleryItem
          key={item.id}
          title={item.title || ''}
          imageLink={item.previewImage || ''}
          link={`/${prefix}/${item.id}`}
        />
      ))}
    </div>
  );
}