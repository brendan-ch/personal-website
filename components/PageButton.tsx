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
  return (
    <button
      className={highlighted ? `${styles.container} ${styles.highlighted}` : styles.container}
      onClick={disabled ? undefined : onClick}
    >
      <p>
        {text}
      </p>
    </button>
  );
}