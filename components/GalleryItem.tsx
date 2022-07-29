import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/GalleryItem.module.css';
import ImageWithFadeIn from './ImageWithFadeIn';

interface Props {
  imageLink?: string,
  title?: string,
  description?: string,
  link?: string,
  /**
   * Width of the image.
   */
  width?: number | string,
  /**
   * Height of the image.
   */
  height?: number | string,
}

export default function GalleryItem({ imageLink, title, description, link, width, height }: Props) {
  if (link) {
    return (
      <Link href={link || '/'}>
        <a className={styles.container}>
          {imageLink ? (
            <Image
              className={styles.image}
              src={imageLink}
              width={width || 600}
              height={height || 200}
              objectFit="cover"
              objectPosition="50%"
              alt={`Preview banner for ${title}.`}
            />
          ) : undefined}
          <div className={styles.details}>
            <p>{title}</p>
            {description ? (
              <p className={styles.description}>{description}</p>
            ) : undefined}
          </div>
        </a>
      </Link>
    );
  } else {
    return (
      <div className={styles.container}>
        {imageLink ? (
          <ImageWithFadeIn
            className={styles.image}
            src={imageLink}
            width={width || 600}
            height={height || 200}
            objectFit="cover"
            objectPosition="50%"
            alt={`Preview banner for ${title}.`}
          />
        ) : undefined}
        <div className={styles.details}>
          <p>{title}</p>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : undefined}
        </div>
      </div>
    );
  }
}