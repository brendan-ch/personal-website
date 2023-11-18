import styles from './Focus.module.css';
import Image from 'next/image';

interface Props {
  children: React.ReactNode | React.ReactNode[],
  imagePath?: string,
  imageAlt?: string,
}

export default function Focus({ children, imagePath, imageAlt }: Props) {
  return (
    <div className={imagePath && imageAlt ? `${styles.focus} ${styles.focusWithImage}` : styles.focus}>
      <div className={styles.focusContent}>
        {children}
      </div>
      {imagePath && imageAlt ? (
        <div className={styles.imageContainer}>
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className={styles.image}
          />
        </div>
      ) : <></>}
    </div>
  );
}