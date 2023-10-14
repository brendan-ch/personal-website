import styles from './Card.module.css';
import { PageExternalLink } from "../../types";
import Image from 'next/image';
import ExternalLink from '../ExternalLink';

interface CardProps {
  /**
   * Title of the card.
   */
  title: string,

  /**
   * Description content of the card.
   */
  description: string,

  /**
   * Path to an image to display in the card.
   * This can be a local path within the `public` folder,
   * or it can be a remote URL.
   */
  imagePath: string,

  /**
   * Alt text for the provided gallery image.
   */
  imageAlt: string,

  /**
   * External links to display within the card.
   */
  externalLinks: PageExternalLink[],
}

/**
 * Component which displays a single 
 * @param param0 
 */
export default function Card({
  title,
  description,
  imagePath,
  imageAlt,
  externalLinks,
}: CardProps) {
  return <div className={styles.container}>
    <div className={styles.text}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className={styles.externalLinks}>
        {externalLinks.map((value, i) => (
          <ExternalLink
            action="open"
            {...value}
            key={i}
          />
        ))}
      </div>
    </div>
    <div className={styles.imageContainer}>
      <Image
        src={imagePath}
        alt={imageAlt}
        fill
      />
    </div>    
  </div>
}