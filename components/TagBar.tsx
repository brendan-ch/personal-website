import styles from '../styles/TagBar.module.css';
import { TagObject } from "../types";
import Tag from "./Tag";

interface Props {
  /**
   * All possible tag combinations.
   */
  tags: TagObject[],
  /**
   * Selected tag names.
   */
  selected: number[],
  onSelect: (index: number) => any,
}

export default function TagBar({ tags, selected, onSelect }: Props) {
  let availableTags = tags.slice();

  selected.forEach((index) => {
    availableTags = availableTags.filter((availableTag) => availableTag.relatedTo.includes(index));
  });

  return (
    <div className={styles.container}>
      {tags.map((tag, index) => {
        let state = 'disabled';
        
        if (selected.length === 0 || availableTags.includes(tag)) {
          state = 'deselected';
        }

        if (selected.includes(index)) {
          state = 'selected';
        }

        return (
          <Tag
            key={index}
            text={tag.name}
            onClick={() => onSelect(index)}
            // @ts-ignore
            state={state}
          />
        );
      })}
    </div>
  );
}