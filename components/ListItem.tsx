import Image from 'next/image';
import styles from '../styles/ListItem.module.css';

interface Props {
  imageLink?: string,
  title: string,
  description?: string,
}

export default function ListItem({ imageLink, title, description }: Props) {
  return (
    <div className={styles.container}>
      {imageLink ? (
        <Image
          className={styles.background}
          alt={`Image background for ${title}`}
          src={imageLink}
          layout="fill"
        />
      ) : undefined}
      <div className={styles.textFrame}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}