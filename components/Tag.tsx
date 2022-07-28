import styles from '../styles/Tag.module.css';

interface Props {
  text: string,
  state: 'selected' | 'deselected' | 'disabled',
  onClick?: () => any,
}

export default function Tag({ text, state, onClick }: Props) {
  let containerStyle = styles.container;
  if (state === 'selected') {
    containerStyle = `${styles.selected} ${styles.container}`;
  } else if (state === 'disabled') {
    containerStyle = `${styles.disabled} ${styles.container}`;
  }

  return (
    <button className={containerStyle}>
      <p>{text}</p>
    </button>
  );
}