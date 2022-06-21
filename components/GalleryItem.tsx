import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/GalleryItem.module.css';
import Next from './icons/Next';

interface Props {
  imageLink?: string,
  title: string,
  description?: string,
  link?: string,
}

export default function GalleryItem({ imageLink, title, description, link }: Props) {
  return (
    <Link href={link || '/'}>
      <a className={styles.container}>
        {imageLink ? (
          <Image
            className={styles.image}
            src={imageLink}
            width={355}
            height={187}
            objectFit="cover"
            alt={description}
          />
        ) : undefined}
        <div className={styles.textContainer}>
          <h3>{title}</h3>
          <Next
            width={40}
            height={40}
          />
        </div>
      </a>
    </Link>
  )
}