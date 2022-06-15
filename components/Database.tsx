import { DatabaseItem } from '../types';
import styles from '../styles/Database.module.css';
import Down from './icons/Down';
import { MouseEvent, useState } from 'react';
import ListItem from './ListItem';
import Dropdown from './Dropdown';

interface Props {
  items: DatabaseItem[],
  /**
   * Render options in the dropdown menu.
   */
  tagOptions: string[],
}

/**
 * @todo Move dropdown implementation and state up to projects page
 */
export default function Database({ items, tagOptions }: Props) {
  const [tag, setTag] = useState(tagOptions.length > 0 ? tagOptions[0] : undefined);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [visible, setVisible] = useState(false);

  const filteredItems = tag ? items.filter((value) => value.tags.includes(tag)) : [];

  /**
   * Handle the press of the dropdown menu button.
   * @param e
   */
  function handleButtonPress(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    // @ts-ignore
    const button: HTMLButtonElement = e.target;

    console.log(button.offsetTop);
    console.log(button.offsetLeft);

    setTop(button.offsetTop);
    setLeft(button.offsetLeft);
    setVisible(true);
  }


  return (
    <div className={styles.container}>
      <Dropdown
        top={top}
        left={left}
        visible={visible}
        options={['Featured', 'All Projects']}
        onSelect={() => {}}
        onClose={() => setVisible(false)}
      />
      <div className={styles.dropdownButtonContainer}>
        <button
          className={styles.dropdownButton}
          onClick={(e) => handleButtonPress(e)}
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