import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ListItem.module.css';

interface Props {
  imageLink?: string,
  title: string,
  description?: string,
}

export default function ListItem({ imageLink, title, description }: Props) {
  return (
    <Link
      href="/"
    >
      <a
        className={styles.container}
      >
        <div
          className={styles.textFrame}
        >
          <p className={styles.bold}>{title}</p>
          <p>{description}</p>
        </div>
      </a>
    </Link>
  );
}