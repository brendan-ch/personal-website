import styles from '../styles/PageButton.module.css';

interface Props {
  text: string,
  onClick?: () => any,
  highlighted?: boolean,
  disabled?: boolean,
}

/**
 * Button intended to be used on a page.
 * @param param0
 * @returns
 */
export default function PageButton({ text, onClick, highlighted, disabled }: Props) {
  let className = `${styles.container}`;
  if (highlighted) {
    className += ` ${styles.highlighted}`;
  }
  if (disabled) {
    className += ` ${styles.disabled}`;
  }

  return (
    <button
      className={className}
      onClick={disabled ? undefined : onClick}
    >
      <p>
        {text}
      </p>
    </button>
  );
}