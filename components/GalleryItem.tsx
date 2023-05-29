import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/GalleryItem.module.css';

interface Props {
  imageLink?: string,
  title?: string,
  description?: string,
  hoverContent?: string,
  link?: string,
  /**
   * Width of the image.
   */
  width?: number,
  /**
   * Height of the image.
   */
  height?: number,
}

const GalleryItem = React.memo(function GalleryItem({ imageLink, title, description, hoverContent, link, width, height }: Props) {
  const children = (
    <>
      {imageLink ? (
        <div className={styles.imageContainer}>
          <div className={styles.hoverContentWrapper}>
            <p className={styles.hoverContentText}>{hoverContent}</p>
          </div>
          <Image
            className={styles.image}
            src={imageLink}
            width={width || 600}
            height={height || 200}
            objectFit="cover"
            objectPosition="50%"
            alt={`Preview banner for ${title}.`}
          />
        </div>
      ) : undefined}
      <div className={styles.details}>
        <p>
          <b>
            {title}
          </b>
        </p>
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : undefined}
      </div>
    </>
  );
  
  if (link) {
    return (
      <Link href={link || '/'} className={styles.container}>
        {children}
      </Link>
    );
  } else {
    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  }
});

export default GalleryItem;