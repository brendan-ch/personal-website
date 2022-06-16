import styles from '../styles/Dropdown.module.css';

interface Props {
  options: string[],
  onSelect: (selected: string) => any,
  onClose?: () => any,
  top: number,
  left: number,
  visible?: boolean,
}

/**
 * Dropdown content and wrapper.
 * @returns
 */
export default function Dropdown({ top, left, options, onClose, onSelect, visible }: Props) {
  return (
    <div
      className={styles.clickListener}
      onClick={onClose ? () => onClose() : undefined}
    >
      <div
        className={visible ? `${styles.container} ${styles.containerVisible}` : styles.container}
        style={{
          top,
          left,
        }}
      >
        {options.map((value, index) => (
          <button className={styles.dropdownItem} key={index}>
            <p>{value}</p>
          </button>
        ))}
      </div>
    </div>
  );
}