import Image from 'next/image';
import styles from '../styles/Lightbox.module.css';
import Exit from './icons/Exit';

interface Props {
  imageLink?: string,
  caption?: string,
  visible?: boolean,
  onClose?: () => any,
}

/**
 * Lightbox component that takes an image prop and a caption.
 */
export default function Lightbox({ imageLink, caption, visible }: Props) {
  console.log(imageLink);

  return (
    <div className={visible ? `${styles.container} ${styles.containerVisible}` : styles.container}>
      <div className={styles.closeTabBar}>
        <Exit width={40} height={40} />
      </div>
      <div className={styles.imageFrame}>
        {imageLink ? (
          <div className={styles.imageWrapper}>
            <Image
              src={imageLink}
              alt={caption}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : undefined}
        {/* <p>{caption}</p> */}
        {/* <div className={styles.contentFrame}>
        </div> */}
      </div>
    </div>
  );
}