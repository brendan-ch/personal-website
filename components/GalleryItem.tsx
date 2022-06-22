import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/GalleryItem.module.css';
import Next from './icons/Next';

interface Props {
  imageLink?: string,
  title: string,
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
  return (
    <Link href={link || '/'}>
      <a className={styles.container}>
        {imageLink ? (
          <Image
            className={styles.image}
            src={imageLink}
            width={width || 700}
            height={height || 187}
            objectFit="cover"
            alt={description}
          />
        ) : undefined}
        <div className={styles.textContainer}>
          <p>{title}</p>
          <Next
            width={40}
            height={40}
          />
        </div>
      </a>
    </Link>
  )
}