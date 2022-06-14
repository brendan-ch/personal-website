import Image from 'next/image';
import styles from '../styles/ListItem.module.css';

interface Props {
  imageLink?: string,
  title: string,
  description?: string,
}

export default function ListItem({ imageLink, title, description }: Props) {
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.textFrame}
      >
        <p className={styles.bold}>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}