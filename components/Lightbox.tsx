import { useEffect } from 'react';
import styles from '../styles/Lightbox.module.css';
import Exit from './icons/Exit';
import ImageWithFadeIn from './ImageWithFadeIn';

interface Props {
  imageLink?: string,
  caption?: string,
  visible?: boolean,
  onClose?: () => any,
}

/**
 * Lightbox component that takes an image prop and a caption.
 */
export default function Lightbox({ imageLink, caption, visible, onClose }: Props) {
  
  useEffect(() => {
    function handleKeyPress(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    }
    // Add keyboard listener
    window.document.addEventListener('keydown', handleKeyPress);

    return () => {
      window.document.removeEventListener('keydown', handleKeyPress); 
    }
  }, [onClose]);

  return (
    <div
      className={visible ? `${styles.container} ${styles.containerVisible}` : styles.container}
      onClick={onClose ? onClose : undefined}
      role="group"
    >
      <div className={styles.closeTabBar}>
        <div className={styles.closeButtonWrapper}>
          <Exit width={38} height={38} />
        </div>
      </div>
      <div className={styles.imageFrame}>
        {imageLink ? (
          <div className={styles.imageWrapper}>
            <ImageWithFadeIn
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